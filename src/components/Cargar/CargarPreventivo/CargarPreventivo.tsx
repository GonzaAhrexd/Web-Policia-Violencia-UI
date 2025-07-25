/*
_____________________________________________________________________________________________
Uso del componente:
  CargarPreventivo se utiliza para crear un preventivo asociado a una denuncia en /MisDenuncias.
  Permite completar un formulario con datos del preventivo, generar un PDF y confirmar la creación
  del preventivo mediante una API. También carga información de dirección y supervisión según la
  unidad del usuario autenticado.
_____________________________________________________________________________________________
*/

// Importaciones
// Librerías y utilidades
import { useForm } from 'react-hook-form'; // Hook para manejar formularios
import { pdf } from '@react-pdf/renderer'; // Utilidad para generar documentos PDF
import { useAuth } from '../../../context/auth'; // Hook para obtener el usuario autenticado
import { useEffect, useState } from 'react'; // Hooks para efectos secundarios y estado
import Swal from 'sweetalert2'; // Librería para mostrar alertas interactivas

// Componentes personalizados
import InputText from '../../InputComponents/InputText'; // Componente para campos de texto
import InputDate from '../../../components/InputComponents/InputDate'; // Componente para campos de fecha
import InputTextArea from '../../InputComponents/InputTextArea'; // Componente para áreas de texto
import InputCheckboxAcumulador from '../../InputComponents/InputCheckboxAcumulador'; // Componente para checkboxes acumuladores
import CargarInstructorYSecretario from '../../Cargar/CargarAgente/CargarInstructor'; // Componente para cargar datos de instructor y secretario
import PDF from '../../ReactPDF/PDFPreventivo'; // Componente para generar el PDF del preventivo

// Funciones de API
import { crearPreventivo, getPreventivo } from '../../../api/CRUD/preventivo.crud'; // Función para crear un preventivo
import { mostrarDenunciasSinVerificarID } from '../../../api/CRUD/denunciasSinVerificar.crud'; // Función para obtener una denuncia por ID
import { useCampos } from '../../../context/campos'; // Hook para obtener datos de unidades

// Componentes y contexto
import autoridadesOpciones from '../../../GlobalConst/autoridadesCampos';
import SelectRegisterSingle from '../../Select/SelectRegisterSingle';
import direccionDivisiones from '../../../GlobalConst/direccionDivisiones';

// Tipos
// Define las propiedades del componente
import DenunciaSinVerificar from '../../../types/DenunciaSinVerificar';
type CargarPreventivoProps = {
    setCrearPreventivo: (value: boolean) => void; // Función para cerrar el formulario
    data: DenunciaSinVerificar; // Datos de la denuncia asociada
};

function CargarPreventivo({ data, setCrearPreventivo }: CargarPreventivoProps) {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm(); // Hook para manejar el formulario
    const { user } = useAuth(); // Obtiene el usuario autenticado
    const { unidades } = useCampos(); // Obtiene las unidades desde el contexto
    const [numeroNotaAnterior, setNumeroNotaAnterior] = useState(''); // Número de nota del preventivo base (para ampliaciones)
    const [objetoAnterior, setObjetoAnterior] = useState(''); // Objeto del preventivo base (para ampliaciones)
    const [numeroDeExpedienteDenuncia, setNumeroDeExpedienteDenuncia] = useState(data.numero_de_expediente); // Número de expediente de la denuncia
    const [direccionValor, setDireccionValor] = useState(''); // Dirección de la unidad
    const [telefonoValor, setTelefonoValor] = useState(''); // Teléfono de la unidad
    const [supervisionValor, setSupervisionValor] = useState(''); // Supervisión de la unidad
    const [stringAcumulador, setStringAcumulador] = useState(''); // Acumula las autoridades seleccionadas
    const [printMode, setPrintMode] = useState(false); // Controla el modo de impresión

    // Efecto para cargar dirección, teléfono y supervisión según la unidad del usuario
    useEffect(() => {
        const unidadesSeparadas = user.unidad.split(','); // Divide la unidad del usuario en partes
        const unidadViolencia = `División Violencia Familiar y Género ${unidadesSeparadas[0]}`; // Construye el nombre de la unidad
        const municipio = unidadesSeparadas[1]?.trim(); // Municipio (si existe)
        const comisaria = unidadesSeparadas[2]?.trim(); // Comisaría (si existe)

        // Caso 1: Solo división (sin municipio ni comisaría)
        if (!municipio && !comisaria) {
            const division = direccionDivisiones.find((div) => div.division === unidadesSeparadas[0]);
            setDireccionValor(division?.direccion || '');
            setTelefonoValor(division?.telefono || '');
            setSupervisionValor('Dpto. de Violencia Familiar y Género');
        }
        // Caso 2: División y municipio (sin comisaría)
        else if (!comisaria) {
            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
            const municipioEncontrado = unidadEncontrada?.subdivisiones?.find(
                (subdivision: any) => subdivision?.nombre === municipio
            );
            setDireccionValor(municipioEncontrado?.direccion || '');
            setTelefonoValor(municipioEncontrado?.telefono || '');
            setSupervisionValor(municipioEncontrado?.supervision || '');
        }
        // Caso 3: División, municipio y comisaría
        else {
            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
            const municipioEncontrado = unidadEncontrada?.subdivisiones?.find(
                (subdivision: any) => subdivision?.nombre === municipio
            );
            const comisariaEncontrada = municipioEncontrado?.subdivisiones?.find(
                (subdivision: any) => subdivision?.value === comisaria
            );
            setDireccionValor(comisariaEncontrada?.direccion || '');
            setTelefonoValor(comisariaEncontrada?.telefono || '');
            setSupervisionValor(comisariaEncontrada?.supervision || '');
        }
    }, [user, unidades]); // Ejecuta el efecto cuando cambian user o unidades

    // Función para generar y abrir el PDF del preventivo
    const handlePrint = async () => {
        const values = getValues(); // Obtiene los valores actuales del formulario

        // Si es una ampliación, carga los datos del preventivo base
        if (data.modo_actuacion === 'Ampliación de denuncia') {
            const denunciaBase = await mostrarDenunciasSinVerificarID(data.ampliado_de); // Obtiene la denuncia base


            const preventivoBase = await getPreventivo(denunciaBase.preventivo_ID); // Obtiene el preventivo base

            setNumeroDeExpedienteDenuncia(preventivoBase.numero_expediente); // Establece el número de expediente de la denuncia
            setNumeroNotaAnterior(preventivoBase.numero_nota); // Establece el número de nota anterior
            setObjetoAnterior(preventivoBase.objeto); // Establece el objeto anterior
        }

        // Combina los datos del formulario con los datos de la denuncia
        const nuevosValores = {
            ...data,
            ...values,
            autoridades: stringAcumulador,
            numero_nota_anterior: numeroNotaAnterior,
            objeto_anterior: objetoAnterior,
            numero_de_expediente: numeroDeExpedienteDenuncia,
        };

        // Genera el PDF según el tipo de denuncia
        const blob = await pdf(
            data.modo_actuacion === 'Ampliación de denuncia' ? (
                <PDF datos={{...nuevosValores, tipoHoja: values.tipoHoja}} user={user} ampliacion={true} />
            ) : (
                <PDF datos={{...nuevosValores, tipoHoja: values.tipoHoja}} user={user} />
            )
        ).toBlob();

        // // Abre el PDF en una nueva pestaña
        window.open(URL.createObjectURL(blob));
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full ' onClick={() => setCrearPreventivo(false)} >Cancelar</div>
            <h1 className='text-3xl my-5 font-sans'> Preventivo</h1>
            <form
                className='flex flex-col w-full'
                onSubmit={
                    handleSubmit(async (values) => {
                        if (data.modo_actuacion === 'Ampliación de denuncia') {
                            const denunciaBase = await mostrarDenunciasSinVerificarID(data.ampliado_de); // Obtiene la denuncia base
                            const preventivoBase = await getPreventivo(denunciaBase.preventivo_ID); // Obtiene el preventivo base


                            setNumeroDeExpedienteDenuncia(preventivoBase.numero_expediente); // Establece el número de expediente de la denuncia
                            setNumeroNotaAnterior(preventivoBase.numero_nota); // Establece el número de nota anterior
                            setObjetoAnterior(preventivoBase.objeto); // Establece el objeto anterior
                        }


                        const nuevosValores = {
                            ...data, // esto sobrescribe claves duplicadas con las de `data`
                            ...values,
                            numero_expediente: data.numero_de_expediente,
                            autoridades: stringAcumulador,
                            numero_nota_anterior: numeroNotaAnterior,
                            objeto_anterior: objetoAnterior,
                            tipo_preventivo: data.modo_actuacion == "Ampliación de denuncia" ? "Ampliación de preventivo" : "Preventivo",
                        };


                        Swal.fire({
                            title: '¿Está seguro de que desea crear el preventivo?',
                            text: "No podrá modificarlo después.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            confirmButtonText: 'Sí, crear preventivo!'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: 'Preventivo creado!',
                                    text: 'El preventivo ha sido creado correctamente.',
                                    icon: 'success',
                                    confirmButtonColor: '#0C4A6E',
                                    cancelButtonColor: '#FF554C',
                                    confirmButtonText: 'Aceptar'
                                }
                                )
                                await crearPreventivo(nuevosValores)
                            }
                        })


                    })}
            >
                <div className='flex flex-col items-center justify-center'>
                    <InputText campo="Supervisión" nombre="supervision" register={register} error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={supervisionValor} />
                    <InputDate campo="Fecha" nombre="fecha_preventivo" register={register} error={errors.fecha}/>
                    <div className='flex flex-row w-full  xl:w-5/10'>
                        <InputText valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} />
                        <InputText valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} />
                    </div>

                    <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Número de nota" nombre="numero_nota" register={register} error={errors.numero_nota} require placeholder="Número de nota" valor={`N°-CSPJ/${new Date().getFullYear()}`} setValue={setValue} />
                    <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Objeto" nombre="objeto" register={register} error={errors.objeto} require placeholder="Objeto" setValue={setValue} />
                    <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Consultado a" nombre="consultado" register={register} error={errors.consultado} require placeholder="Consultado a" setValue={setValue} />
                    <InputTextArea campo="Resolución" nombre="resolucion" register={register} required placeholder="Descripción" setValue={setValue} />
                </div>
                <h1 className='text-2xl'>Autoridades</h1>
                <div className='flex flex-col items-center justify-center'>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full md:w-5/10 '>
                        <InputCheckboxAcumulador opciones={autoridadesOpciones} stringAcumulador={stringAcumulador} setStringAcumulador={setStringAcumulador} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
                </div>


                {!printMode && (
                    <div className="flex justify-center my-3">
                        <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(true)}>Imprimir</div>
                        <button
                            className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'
                        >
                            Crear preventivo
                        </button>
                    </div>
                )}
                {printMode && (
                    <div className="flex flex-col items-center justify-center my-3">
                        <h1 className='text-2xl my-5'>Elegir tipo de hoja</h1>
                        <SelectRegisterSingle campo="Tipo de Hoja" nombre="tipoHoja" setValue={setValue} error={errors.tipoHoja} opciones={
                            [
                                { nombre: "A4", value: "A4" },
                                { nombre: "Legal", value: "LEGAL" }
                            ]
                        } />
                        <div className='mb-1 flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => {
                            handlePrint()
                        }}>
                            Imprimir
                        </div>
                        <div className='flex flex-col items-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(false)}>
                            Cancelar
                        </div>
                    </div>

                )}

            </form>
        </>


    )

}

export default CargarPreventivo