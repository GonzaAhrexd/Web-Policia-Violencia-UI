/*
_____________________________________________________________________________________________ 
Uso del componente:
  expandedComponentDenunciasSinVerificar se utiliza en la tabla de /MisDenuncias para mostrar 
  detalles de denuncias sin verificar. Permite visualizar datos de la víctima, victimario y hechos 
  en una tabla y mapa, además de ofrecer opciones para editar, eliminar, ampliar, crear preventivos 
  o radiogramas, y visualizar ampliaciones o preventivos existentes.
_____________________________________________________________________________________________
*/

// Importaciones
// Librerías de React y utilidades
import { useEffect, useState } from 'react'; // Hook para manejar el estado del componente
import { pdf } from '@react-pdf/renderer'; // Utilidad para generar documentos PDF
import { useAuth } from '../../context/auth'; // Hook para obtener el contexto de autenticación
import DataTable from 'react-data-table-component'; // Componente para tablas dinámicas
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'; // Iconos para expandir/colapsar filas

// Componentes personalizados
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX'; // Tabla para mostrar datos con formato de check o cruz
import ShowTextArea from '../../components/ShowData/ShowTextArea'; // Componente para mostrar áreas de texto
import CargarAmpliacion from '../../components/Cargar/CargarAmpliacion/CargarAmpliacion'; // Componente para crear ampliaciones
import CargarPreventivo from '../../components/Cargar/CargarPreventivo/CargarPreventivo'; // Componente para crear preventivos
import CargarRadiograma from '../../components/Cargar/CargarRadiograma/CargarRadiograma'; // Componente para crear radiogramas
import ExpandedComponent from '../../components/Busqueda/BuscarPreventivo/ExpandedComponentPreventivo'; // Componente para mostrar detalles de preventivos
import PDF from '../../components/ReactPDF/PDFDenuncias'; // Componente para generar PDF de denuncias
import PDFAmpliacion from '../../components/ReactPDF/PDFAmpliacion'; // Componente para generar PDF de ampliaciones
import ExpandedComponentRadiograma from '../../components/Busqueda/BuscarRadiograma/expandedComponent';
// Funciones de API
import { getPreventivo } from '../../api/CRUD/preventivo.crud'; // Función para obtener datos de un preventivo
import { buscarAmpliaciones } from '../../api/CRUD/denunciasSinVerificar.crud'; // Función para obtener ampliaciones de una denuncia
import { columns } from './columnsDataTable'; // Configuración de columnas para DataTable
import { customStyles } from '../../GlobalConst/customStyles'; // Estilos personalizados para DataTable
import { mostrarDenunciasSinVerificarID } from '../../api/CRUD/denunciasSinVerificar.crud';
import { getRadiogramaById } from '../../api/CRUD/radiograma.crud'; // Función para obtener datos de un radiograma
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle';
import { useForm } from 'react-hook-form';
// Tipos
import DenunciaSinVerificar from '../../types/DenunciaSinVerificar';
// Define el tipo de las propiedades del componente
type ExpandedComponentsProps = {
    data: DenunciaSinVerificar; // Objeto que contiene los datos de la denuncia
};

// Datos estáticos
// Configuración de iconos para filas expandibles en DataTable
const expandableIcon = {
    collapsed: <ArrowDownCircleIcon className="h-6 w-6" />, // Icono para filas colapsadas
    expanded: <ArrowUpCircleIcon className="h-6 w-6" />, // Icono para filas expandidas
};

// Componente principal
// Muestra los detalles de una denuncia sin verificar y permite realizar acciones relacionadas
function ExpandedComponentDenunciasSinVerificar({ data }: ExpandedComponentsProps) {
    // Estados
    // Maneja los estados para controlar la visualización y creación de componentes
    const [ampliarDenuncia, setAmpliarDenuncia] = useState(false); // Controla la vista de ampliación
    const [crearPreventivo, setCrearPreventivo] = useState(false); // Controla la creación de preventivos
    const [crearRadiograma, setCrearRadiograma] = useState(false); // Controla la creación de radiogramas
    const [verPreventivo, setVerPreventivo] = useState(false); // Controla la visualización de preventivos
    const [verRadiograma, setVerRadiograma] = useState(false); // Controla la visualización de radiogramas
    const [verAmpliaciones, setVerAmpliaciones] = useState(false); // Controla la visualización de ampliaciones
    const [PreventivoData, setPreventivoData] = useState(null); // Almacena los datos del preventivo
    const [radiogramaData, setRadiogramaData] = useState(null); // Almacena los datos del radiograma
    const [listaAmpliaciones, setListaAmpliaciones] = useState([]); // Almacena la lista de ampliaciones
    const { user } = useAuth(); // Obtiene el usuario autenticado desde el contexto
    const [tienePreventivoPrevio, setTienePreventivoPrevio] = useState(false); // Controla si hay un preventivo previo
    const [printMode, setPrintMode] = useState(false); // Controla el modo de impresión
    // const [editMode, setEditMode] = useState(false); // Controla el modo de edición
 // Formulario
  const {  watch, setValue, formState: {
    errors
  } } = useForm()


    // Datos para mostrar en tablas
    // Información general de la denuncia
    const datosDenuncia = [
        { nombre: 'Número de expediente', valor: data.numero_de_expediente },
        { 
            nombre: 'Fecha de denuncia', 
            valor: (() => {
                const date = new Date(data.fecha);
                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                const year = date.getUTCFullYear();
                return `${day}/${month}/${year}`;
            })()
        },
        { nombre: 'División', valor: data.division },
        { nombre: 'Tipo de denuncia', valor: data.modo_actuacion },
    ];

    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: 'Nombre de la víctima', valor: data.nombre_victima },
        { nombre: 'Apellido de la víctima', valor: data.apellido_victima },
        { nombre: 'Edad víctima', valor: data.edad_victima },
        { nombre: 'DNI víctima', valor: data.DNI_victima },
        { nombre: "Género víctima", valor: data?.genero_victima ? data.genero_victima : "No especificado" },
        { nombre: 'Estado civil víctima', valor: data.estado_civil_victima },
        { nombre: 'Ocupación víctima', valor: data.ocupacion_victima },
        { nombre: 'Nacionalidad de la víctima', valor: data.nacionalidad_victima },
        { nombre: 'Domicilio de la víctima', valor: data.direccion_victima },
        { nombre: 'Teléfono víctima', valor: data.telefono_victima },
        { nombre: 'Con instrucción', valor: data.sabe_leer_y_escribir_victima },
    ];

    // Preguntas relacionadas con la denuncia
    const preguntas = [
        { nombre: '¿Desea ser asistida por la línea 137?', valor: data.preguntas.desea_ser_asistida },
        { nombre: '¿Desea ser examinada por un médico?', valor: data.preguntas.desea_ser_examinada_por_medico },
        { nombre: '¿Desea accionar penalmente?', valor: data.preguntas.desea_accionar_penalmente },
        { nombre: '¿Desea agregar, quitar o enmendar algo?', valor: data.preguntas.desea_agregar_quitar_o_enmendar },
    ];

    // Datos del secretario
    const secretarioDatosMostrar = [
        { nombre: 'Nombre del secretario', valor: data.secretario.nombre_completo_secretario },
        { nombre: 'Jerarquía secretario', valor: data.secretario.jerarquia_secretario },
        { nombre: 'Plaza secretario', valor: data.secretario.plaza_secretario },
    ];

    // Datos del instructor
    const instructorDatosMostrar = [
        { nombre: 'Nombre del instructor', valor: data.instructor.nombre_completo_instructor },
        { nombre: 'Jerarquía instructor', valor: data.instructor.jerarquia_instructor },
    ];

    const buscarDenunciaOriginal = async () => {
        try {
            const denunciaOriginal = await mostrarDenunciasSinVerificarID(data.ampliado_de)
            if (denunciaOriginal.preventivo_ID) {
                setTienePreventivoPrevio(denunciaOriginal.preventivo_ID);
            } else {
                setTienePreventivoPrevio(false);
            }
        } catch (error) {
            console.error("Error al buscar la denuncia original:", error);
        }
    }

    useEffect(() => {
        buscarDenunciaOriginal();
    }, [data.ampliado_de])


    // Funciones
    // Genera y abre un PDF de la denuncia o ampliación en una nueva pestaña
    const handleImprimir = async () => {
        const tipoDeHoja = watch('tipoHoja') || 'A4'; // Obtiene el tipo de hoja seleccionado o A4 por defecto 
        const blob = await pdf(
            data.modo_actuacion === 'Ampliación de denuncia' ? (
                <PDFAmpliacion isBusqueda genero={data.genero_victima} user={user} datos={{...data, tipoHoja: tipoDeHoja}} />
            ) : (
                <PDF isBusqueda={true} genero={data.genero_victima} tipoDenuncia={data.modo_actuacion} datos={{...data, tipoHoja: tipoDeHoja}} user={user} />
            )
        ).toBlob();
        window.open(URL.createObjectURL(blob));
    };

    // Obtiene y muestra los datos de un preventivo asociado
    const handleVerPreventivo = async () => {
        const preventivoData = await getPreventivo(data.preventivo_ID);
        setPreventivoData(preventivoData);
        setVerPreventivo(true);
    };

    // Obtiene y muestra la lista de ampliaciones de la denuncia
    const handleVerAmpliaciones = async () => {
        const ampliaciones = await buscarAmpliaciones(data._id);
        setListaAmpliaciones(ampliaciones);
        setVerAmpliaciones(true);
    };

    const handleVerRadiograma = async () => {
        const radiogramaData = await getRadiogramaById(data.radiograma_ID);
        setRadiogramaData(radiogramaData);
        setVerRadiograma(true);
    }

    // const handleEdit = () => {
    //     setEditMode(true);
    // }

    // Renderizado condicional

    if (verAmpliaciones) {
        return (
            <div className="flex flex-col w-full border-2 border-sky-950 rounded-lg p-5">
                {/* Botón para volver a la vista principal de la denuncia */}
                <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full mb-5"
                    onClick={() => setVerAmpliaciones(false)}
                >
                    Ver denuncia
                </button>
                {/* Título de la sección de ampliaciones */}
                <h2 className="text-2xl my-5">Ampliaciones de la denuncia</h2>
                {/* Tabla que muestra las ampliaciones */}
                <DataTable
                    columns={columns} // Columnas definidas para la tabla
                    data={listaAmpliaciones} // Lista de ampliaciones
                    pagination // Habilita paginación
                    expandableRows // Permite filas expandibles
                    expandableRowsComponent={ExpandedComponentDenunciasSinVerificar} // Componente para filas expandidas
                    customStyles={customStyles} // Estilos personalizados
                    responsive // Diseño adaptable
                    striped // Filas alternadas
                    highlightOnHover // Resalta filas al pasar el mouse
                    noDataComponent="No hay ampliaciones para mostrar" // Mensaje si no hay datos
                    defaultSortFieldId="fecha" // Ordena por fecha por defecto
                    defaultSortAsc={false} // Orden descendente
                    expandableIcon={expandableIcon} // Iconos de expandir/colapsar
                />
            </div>
        );
    }

    // Muestra los detalles de un preventivo asociado
    if (verPreventivo) {
        return (
            <>
                {/* Botón para volver a la vista principal de la denuncia */}
                <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full mb-5"
                    onClick={() => setVerPreventivo(false)}
                >
                    Ver denuncia
                </button>
                {/* Componente para mostrar detalles del preventivo */}
                <ExpandedComponent data={PreventivoData} />
            </>
        );
    }

    // Muestra la vista para radiogramas (pendiente de implementación)
    if (verRadiograma) {
        return (
            <>
                {/* Botón para volver a la vista principal de la denuncia */}
                <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full mb-5"
                    onClick={() => setVerRadiograma(false)}
                >
                    Ver denuncia
                </button>
                <ExpandedComponentRadiograma data={radiogramaData} />
            </>
        );
    }

    // Muestra el formulario para crear una ampliación
    if (ampliarDenuncia) {
        return <CargarAmpliacion data={data} setAmpliarDenuncia={setAmpliarDenuncia} />;
    }

    // Muestra el formulario para crear un preventivo
    if (crearPreventivo) {
        return <CargarPreventivo data={data} setCrearPreventivo={setCrearPreventivo} />;
    }

    // Muestra el formulario para crear un radiograma
    if (crearRadiograma) {
        return <CargarRadiograma data={data} setCrearRadiograma={setCrearRadiograma} />;
    }

    // Vista principal
    // Muestra todos los detalles de la denuncia y opciones de acción
    //  if (editMode) {
    //     return <CargarAmpliacion data={data} setAmpliarDenuncia={setAmpliarDenuncia} />;
    // }

    return (
        <div className="flex flex-col p-1 sm:p-10 max-w-full scale-up-ver-top">
            {/* Estado de la denuncia con íconos visuales */}
            <h1 className="text-5xl my-5 font-sans">
                Estado de la denuncia:{' '}
                {data.estado === 'En verificación' && 'En verificación ⏸️'}
                {data.estado === 'Aprobada' && 'Aprobado ✅'}
                {data.estado === 'Rechazada' && 'Rechazado ❌'}
            </h1>

            {/* Sección de acciones disponibles */}
            <h2 className="text-3xl my-5 font-sans">Acciones</h2>
            <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-center">
                {/* Botón para abrir el formulario de ampliación */}
                <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                    onClick={() => setAmpliarDenuncia(true)}
                >
                    Ampliar denuncia
                </button>
                {/* Botón para ver ampliaciones si existen */}
                {data.ampliaciones_IDs.length > 0 && (
                    <button
                        className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                        onClick={handleVerAmpliaciones}
                    >
                        Ver ampliaciones
                    </button>
                )}
                {/* Botones condicionales según existencia de preventivo */}
                {data.preventivo_ID ? (
                    <>
                        {/* Botón para ver el preventivo existente */}
                        <button
                            className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                            onClick={handleVerPreventivo}
                        >
                            Ver preventivo
                        </button>
                        {/* Botón para crear un radiograma */}
                        {data.radiograma_ID ? (
                            <button
                                className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                                onClick={() => handleVerRadiograma()}
                            >
                                Ver radiograma
                            </button>
                        ) : (
                            <button
                                className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                                onClick={() => setCrearRadiograma(true)}
                            >
                                Crear radiograma
                            </button>
                        )}
                    </>
                ) :
                    ((data.modo_actuacion == "Ampliación de denuncia" && tienePreventivoPrevio) || (data.modo_actuacion != "Ampliación de denuncia")) &&
                    (
                        /* Botón para crear un nuevo preventivo */
                        <button
                            className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                            onClick={() => setCrearPreventivo(true)}
                        >
                            Crear preventivo
                        </button>
                    )}
            </div>
            {/* Sección de datos generales de la denuncia */}
            {(!(tienePreventivoPrevio) && (data.modo_actuacion == "Ampliación de denuncia")) && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                    <p className="font-bold">Advertencia:</p>
                    <p>La denuncia base NO tiene un preventivo asociado.</p>
                </div>
            )}
            <h2 className="text-3xl my-5 font-sans">Datos de la denuncia</h2>
            <SimpleTableCheckorX datos={datosDenuncia} />

            {/* Sección de datos de la víctima */}
            <h2 className="text-3xl my-5 font-sans">Datos de la víctima</h2>
            <SimpleTableCheckorX datos={victimaDatosMostrar} />

            {/* Sección de preguntas relacionadas */}
            <h2 className="text-3xl my-5 font-sans">Preguntas</h2>
            <SimpleTableCheckorX datos={preguntas} />

            {/* Sección de observaciones */}
            <h2 className="text-3xl my-5 font-sans">Observaciones</h2>
            <ShowTextArea  dato={data.observaciones} />

            {/* Sección de exposición, si aplica */}
            {data.preguntas.desea_agregar_quitar_o_enmendar && (
                <>
                    <h2 className="text-3xl my-5 font-sans">Agrega</h2>
                    <ShowTextArea  dato={data.agrega} />
                </>
            )}

            {/* Sección de datos del secretario */}
            <h2 className="text-3xl my-5 font-sans">Secretario</h2>
            <SimpleTableCheckorX datos={secretarioDatosMostrar} />

            <h2 className="text-3xl my-5 font-sans">Instructor</h2>
            <SimpleTableCheckorX datos={instructorDatosMostrar} />

                

               {!printMode && (
                <div className="flex justify-center my-3">
                       {/* <div className='mb-1 flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => {
                    handleEdit()
                  }}>
                    Editar
                </div> */}
          
                  <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(true)}>Imprimir</div>
                  <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
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
                    handleImprimir()
                  }}>
                    Imprimir
                </div>
                  <div className='flex flex-col cursor-pointer  items-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(false)}>
                    Cancelar
                  </div>
                </div>

              )}
               
                  
        </div>
    );
}

// Exporta el componente para su uso en otras partes de la aplicación
export default ExpandedComponentDenunciasSinVerificar;