// Hooks
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Componentes
import InputText from "../../InputComponents/InputText";
import InputDate from "../../InputComponents/InputDate";
import InputCheckboxAcumulador from "../../InputComponents/InputCheckboxAcumulador";
import InputTextArea from "../../InputComponents/InputTextArea";
import CargarInstructorYSecretario from "../../Cargar/CargarAgente/CargarInstructor";
import PDF from "../../ReactPDF/PDFPreventivo";
// Librerías React
import Swal from "sweetalert2";
import { pdf } from "@react-pdf/renderer";
// Backend
import { editPreventivo, ampliarPreventivo } from "../../../api/CRUD/preventivo.crud";
// Contexto
import { useAuth } from "../../../context/auth";
import { useCampos } from "../../../context/campos";
import direccionDivisiones from "../../../GlobalConst/direccionDivisiones";
import autoridadesOpciones from "../../../GlobalConst/autoridadesCampos";
// Tipos de datos para el componente

import Preventivo from "../../../types/Preventivo";

type EditPrevencionProps = {
    data: Preventivo
    modoExpandir: boolean
}

function EditPrevencion({ data, modoExpandir }: EditPrevencionProps) {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    const [stringAcumulador, setStringAcumulador] = useState("")
    const { user } = useAuth()
    const [direccionValor, setDireccionValor] = useState('')
    const [telefonoValor, setTelefonoValor] = useState('')
    const [supervisionValor, setSupervisionValor] = useState('')
    const { unidades } = useCampos()
    const [stringSeparado, setStringSeparado] = useState([])

    useEffect(() => {
        const unidadesSeparadas = user.unidad.split(",")
        const unidadViolencia = "División Violencia Familiar y Género " + unidadesSeparadas[0]
        const municipio = unidadesSeparadas[1]?.trim()
        const comisaria = unidadesSeparadas[2]?.trim()

        if (municipio == undefined && comisaria == undefined) {
            setDireccionValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.direccion)
            setTelefonoValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.telefono)
            setSupervisionValor("Dpto. de Violencia Familiar y Género")
        } else if (comisaria == undefined) {

            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);

            const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
                ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
                : null;

            setDireccionValor(municipioEncontrado?.direccion)
            setTelefonoValor(municipioEncontrado?.telefono)
            setSupervisionValor(municipioEncontrado?.supervision)
        } else {
            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
            const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
                ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
                : null;

            const comisariaEncontrada = municipioEncontrado && Array.isArray(municipioEncontrado.subdivisiones)
                ? municipioEncontrado.subdivisiones.find((subdivision: any) => subdivision?.value === comisaria)
                : null;

            setDireccionValor(comisariaEncontrada?.direccion)
            setTelefonoValor(comisariaEncontrada?.telefono)
            setSupervisionValor(comisariaEncontrada?.supervision)
        }

        const stringSeparar = data.autoridades.split(",")

        setStringSeparado(stringSeparar)

    }, [])



    const handlePrint = async () => {
        const values = getValues()
        const nuevosValores = {
            ...data, // esto sobrescribe claves duplicadas con las de `data`
            ...values,
            numero_nota_anterior: data.numero_nota,
            objeto_anterior: data.objeto,
            autoridades: stringAcumulador
        };
        let blob;
        if (modoExpandir || data.tipo_preventivo == "Ampliación de preventivo") {
            // Preguntar y continuar luego
            blob = await pdf(<PDF datos={nuevosValores} user={user} ampliacion />).toBlob();
        } else {
            blob = await pdf(<PDF datos={data} user={user} />).toBlob();
        }
        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);
    }


    const editarPreventivo = (values) => {
        Swal.fire({
            title: '¿Está seguro de que desea editar el preventivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, editar preventivo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Preventivo editado!',
                    text: 'El preventivo ha sido editado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#0C4A6E',
                    cancelButtonColor: '#FF554C',
                    confirmButtonText: 'Aceptar'
                }
                )

                const instructor = {
                    nombre_completo_instructor: data.instructor.nombre_completo_instructor,
                    jerarquia_instructor: data.instructor.jerarquia_instructor
                }
                const secretario = {
                    nombre_completo_secretario: data.secretario.nombre_completo_secretario,
                    jerarquia_secretario: data.secretario.jerarquia_secretario,
                    plaza_secretario: data.secretario.plaza_secretario
                }

                const nuevosValores = {
                    ...data,
                    ...instructor,
                    ...secretario,
                    ...values,
                    autoridades: stringAcumulador
                };
                
                await editPreventivo(data._id, nuevosValores)

            }
        })
    }

    const expandirPreventivo = (values) => {
        Swal.fire({
            title: '¿Está seguro de que desea expandir el preventivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, ampliar preventivo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Preventivo ampliado!",
                    text:  "El preventivo ha sido ampliado correctamente." ,
                    icon: 'success',
                    confirmButtonColor: '#0C4A6E',
                    cancelButtonColor: '#FF554C',
                    confirmButtonText: 'Aceptar'
                }
                )
                const nuevosValores = {
                    ...data,
                    ...values,
                    numero_nota_anterior: data.numero_nota,
                    objeto_anterior: data.objeto,
                    con_denuncia_ampliada: true,
                    tipo_preventivo: "Ampliación de preventivo",
                    autoridades: stringAcumulador
                };
                await ampliarPreventivo(nuevosValores)
            }
        })
    }


    return (
        <>
            <h1 className='text-3xl my-5 font-sans'> Preventivo</h1>
            <form
                className='flex flex-col w-full'
                onSubmit={
                    handleSubmit(async (values) => {
                        if (modoExpandir) {
                            expandirPreventivo(values)
                        } else {
                            editarPreventivo(values)
                        }
                    })
                }>
                <div className='flex flex-col items-center justify-center'>
                    <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Supervisión" nombre="supervision" register={register} error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={supervisionValor} />
                    <InputDate campo="Fecha" nombre="fecha_preventivo" register={register} error={errors.fecha} valor={new Date(data.fecha).toISOString().slice(0, 10)} />
                    <div className='flex flex-row w-full  xl:w-5/10'>
                        <InputText valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} />
                        <InputText valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} />
                    </div>

                    <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Número de nota" nombre="numero_nota" register={register} error={errors.numero_nota} require placeholder="Número de nota" valor={`N°-CSPJ/${new Date().getFullYear()}`} setValue={setValue} />
                    <InputText valor={data.objeto} customSize="flex flex-col md:w-full xl:w-1/2" campo="Objeto" nombre="objeto" register={register} error={errors.objeto} require placeholder="Objeto" setValue={setValue} />
                    <InputText valor={data.consultado} customSize="flex flex-col md:w-full xl:w-1/2" campo="Consultado a" nombre="consulta" register={register} error={errors.consulta} require placeholder="Consultado a" setValue={setValue} />
                    {modoExpandir && 
                    <InputTextArea valor={data.observaciones} campo="Observaciones" nombre="observaciones" register={register}  required placeholder="Observaciones" setValue={setValue} /> 
                    }
                    <InputTextArea valor={data.resolucion} campo="Resolución" nombre="resolucion" register={register} required placeholder="Descripción" setValue={setValue} />
                </div>
                <h1 className='text-2xl'>Autoridades</h1>
                <div className='flex flex-col items-center justify-center'>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full md:w-5/10 '>
                        <InputCheckboxAcumulador defaultSelected={stringSeparado} opciones={autoridadesOpciones} stringAcumulador={stringAcumulador} setStringAcumulador={setStringAcumulador} />
                    </div>
                </div>
                {modoExpandir &&
                    <div className='flex flex-col'>
                        <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
                    </div>
                }

                <div className='flex flex-row items-center justify-center'>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
                        {modoExpandir ? "Crear preventivo" : "Editar preventivo"}
                    </button>
                    {modoExpandir &&
                        <div className="bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0" onClick={() => handlePrint()}>
                            Imprimir
                        </div>
                    }
                </div>

            </form >
        </>

    )
}

export default EditPrevencion