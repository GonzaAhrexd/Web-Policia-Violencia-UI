// Hooks
import { useEffect, useState } from "react";
// Librerías React
import Swal from "sweetalert2";
// Iconos
import { TrashIcon } from '@heroicons/react/24/solid'
// import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { PrinterIcon } from "@heroicons/react/24/outline";
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import EditRadiograma from "../../EditMode/ExpandirRadiograma";
import PDFRadiograma from "../../Cargar/CargarRadiograma/PDFRadiograma";
import ShowTextArea from "../../ShowData/ShowTextArea";
// Context
import { useAuth } from "../../../context/auth"
// BackEnd
import { pdf } from "@react-pdf/renderer";
import { getPreventivo } from "../../../api/CRUD/preventivo.crud";
import { getRadiogramaById, deleteRadiograma } from "../../../api/CRUD/radiograma.crud";

type expandedComponentProps = {
    data: any
}
// Expanded component RADIOGRAMA
function expandedComponentRadiograma({ data }: expandedComponentProps) {

    // const [editGlobal, setEditGlobal] = useState(false)
    const [ampliarRadiograma, setAmpliarRadiograma] = useState(false)
    const [dataRadiograma, setDataRadiograma] = useState(data);
    const { user } = useAuth();

    const [preventivoAmpliado, setPreventivoAmpliado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreventivo = async () => {
            try {
                const preventivo = await getPreventivo(dataRadiograma.preventivo_ID);
                if (preventivo && preventivo.preventivo_ampliado_ID) {
                    const ampliado = await getPreventivo(preventivo.preventivo_ampliado_ID);
                    setPreventivoAmpliado(ampliado ?? null); // Puede ser null si no existe
                }
            } catch (error) {
                console.error("Error al obtener los datos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreventivo();
    }, [dataRadiograma]);


    const handlePrint = async () => {
        const blob = await pdf(<PDFRadiograma datos={dataRadiograma} user={user}  ampliacion={dataRadiograma.tipo_radiograma == "Ampliación de radiograma"}/>).toBlob();

        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);
    }


    const handleVerRadiograma = async () => {
        console.log(dataRadiograma.ampliacion_ID)
        const radiogramaAmpliado = await getRadiogramaById(dataRadiograma.ampliacion_ID);
        if (radiogramaAmpliado) {
            setDataRadiograma(radiogramaAmpliado);
            setAmpliarRadiograma(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo encontrar el radiograma ampliado.',
                confirmButtonColor: '#0C4A6E'
            });
        }

    }


  const handleDelete = async (dataRadiograma: any) => {
        const result = await Swal.fire({
            title: '¿Está seguro de que desea eliminar el preventivo?',
            text: "No podrá revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, eliminar'
        })

        if (result.isConfirmed) {
            await deleteRadiograma(dataRadiograma._id)
        }
    }
    // Datos del preventivo
    const datosPreventivo = [
        { nombre: "Número de nota", valor: dataRadiograma.nro_nota_preventivo ? dataRadiograma.nro_nota_preventivo : "No ingresado" },
        { nombre: "Número de expediente", valor: dataRadiograma.nro_expediente ? dataRadiograma.nro_expediente : "No ingresado" },
        { nombre: "ID radiograma", valor: dataRadiograma._id ? dataRadiograma._id : "No ingresado" },
        { nombre: "Consultado", valor: dataRadiograma.consultado_preventivo ? dataRadiograma.consultado_preventivo : "No ingresado" },
        { nombre: "Fecha", valor: dataRadiograma.fecha ? dataRadiograma.fecha : "No ingresado" },
        { nombre: "Objeto", valor: dataRadiograma.objeto ? dataRadiograma.objeto : "No ingresado" },

    ]
    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: dataRadiograma.nombre_victima ? dataRadiograma.nombre_victima : "No ingresado" },
        { nombre: "Apellido de la víctima", valor: dataRadiograma.apellido_victima ? dataRadiograma.apellido_victima : "No ingresado" },
        { nombre: "Edad víctima", valor: dataRadiograma.edad_victima ? dataRadiograma.edad_victima : "No ingresado" },
        { nombre: "DNI víctima", valor: dataRadiograma.DNI_victima ? dataRadiograma.DNI_victima : "No ingresado" },
        { nombre: "Estado civil víctima", valor: dataRadiograma.estado_civil_victima ? dataRadiograma.estado_civil_victima : "No ingresado" },
        { nombre: "Ocupación víctima", valor: dataRadiograma.ocupacion_victima ? dataRadiograma.ocupacion_victima : "No ingresado" },
        { nombre: "Nacionalidad de la víctima", valor: dataRadiograma.nacionalidad_victima ? dataRadiograma.nacionalidad_victima : "No ingresado" },
        { nombre: "Género de la víctima", valor: dataRadiograma.genero_victima ? dataRadiograma.genero_victima : "No ingresado" },
        { nombre: "Domicilio de la víctima", valor: dataRadiograma.direccion_victima ? dataRadiograma.direccion_victima : "No ingresado" },
        { nombre: "Teléfono víctima", valor: dataRadiograma.telefono_victima ? dataRadiograma.telefono_victima : "No ingresado" },
    ]

    // Datos del instructor
    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: dataRadiograma.instructor?.nombre_completo_instructor ? dataRadiograma.instructor.nombre_completo_instructor : "No ingresado" },
        { nombre: "Jerarquía instructor", valor: dataRadiograma.instructor?.jerarquia_instructor ? dataRadiograma.instructor.jerarquia_instructor : "No ingresado" },
    ]

  
    if (loading) return <div>Cargando...</div>;

    if (ampliarRadiograma) {
        return (
            <EditRadiograma preventivoAmpliado={preventivoAmpliado} modoExpandir={true} data={dataRadiograma} />
        )
    }

    // else if (editGlobal) {
    //     return (
    //         <EditRadiograma data={dataRadiograma} />
    //     )
    // }
    else {
        return (

            <div>
                {((preventivoAmpliado) && !(dataRadiograma.ampliacion_ID) && (dataRadiograma.tipo_radiograma != "Ampliación de radiograma"))  && (
                    <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full "
                    onClick={() => setAmpliarRadiograma(true)}
                    >
                    Ampliar radiograma
                </button>
                )}
                { dataRadiograma.ampliacion_ID && (
                       <button
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full "
                    onClick={() => handleVerRadiograma()}
                    >
                    Ver radiograma ampliado
                </button>
                )}

                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos radiograma</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={datosPreventivo} />
                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos de la víctima</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={victimaDatosMostrar} />
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Destinatario</h1>
                    <ul className="flex flex-col">
                        <li>{dataRadiograma.destinatario}</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl my-4 font-sans mr-4">Resolución</h1>
                    <ShowTextArea dato={dataRadiograma.resolucion_preventivo} />

                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl my-4 font-sans mr-4">Solicita</h1>
                    <ShowTextArea dato={dataRadiograma.solicita} />

                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos del instructor</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={instructorDatosMostrar} />
                </div>

                <div className='flex flex-col md:flex-row items-center justify-center m-2 md:m-0'>
                    <div className="bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0" onClick={() => handlePrint()}>
                        <PrinterIcon className="w-7" />
                    </div>
                    {((user.rol === "admin") || (user.rol === "carga")) &&
                        <>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(dataRadiograma)}>
                                <TrashIcon className="w-7" />
                            </div>
                        </>
                    }
                </div>


            </div>


        )
    }
}


export default expandedComponentRadiograma