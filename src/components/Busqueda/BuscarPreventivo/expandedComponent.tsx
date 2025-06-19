// Hooks
import { useState } from "react";
// Librerías React
import Swal from "sweetalert2";
// Iconos
import { TrashIcon } from '@heroicons/react/24/solid'
import { PrinterIcon } from "@heroicons/react/24/outline";
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import EditPrevencion from "../../EditMode/EditPrevencion";
// Context
import { useAuth } from "../../../context/auth"
// BackEnd
import { deletePreventivo } from "../../../api/CRUD/preventivo.crud";
import { pdf } from "@react-pdf/renderer";
import PDF from "../../Cargar/CargarPreventivo/PDF";
import ShowTextArea from "../../ShowData/ShowTextArea";
import { getPreventivo } from "../../../api/CRUD/preventivo.crud";
type expandedComponentProps = {
    data: any
}
// Expanded component PREVENTIVO
function expandedComponent({ data }: expandedComponentProps) {

    const [ampliarPreventivo, setAmpliarPreventivo] = useState(false)
    const [dataPreventivo, setDataPreventivo] = useState(data);
    const { user } = useAuth();

    const handleVerAmpliación = async () => {
        const ampliacionPreventivo = await  getPreventivo(dataPreventivo.preventivo_ampliado_ID);
        setDataPreventivo(ampliacionPreventivo);


    }
    const handlePrint = async () => {
        const blob = await pdf(<PDF datos={dataPreventivo} user={user} ampliacion={dataPreventivo.tipo_preventivo === "Ampliación de preventivo"} />).toBlob();
        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);

    }

    // Datos del preventivo
    const datosPreventivo = [
        { nombre: "Número de nota", valor: dataPreventivo.numero_nota ? dataPreventivo.numero_nota : "No ingresado" },
        { nombre: "ID preventivo", valor: dataPreventivo._id ? dataPreventivo._id : "No ingresado" },
        { nombre: "Fecha", valor: dataPreventivo.fecha ? dataPreventivo.fecha : "No ingresado" },
        { nombre: "Objeto", valor: dataPreventivo.objeto ? dataPreventivo.objeto : "No ingresado" },

    ]
    // Datos de la víctima
    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: dataPreventivo.nombre_victima ? dataPreventivo.nombre_victima : "No ingresado" },
        { nombre: "Apellido de la víctima", valor: dataPreventivo.apellido_victima ? dataPreventivo.apellido_victima : "No ingresado" },
        { nombre: "Edad víctima", valor: dataPreventivo.edad_victima ? dataPreventivo.edad_victima : "No ingresado" },
        { nombre: "DNI víctima", valor: dataPreventivo.DNI_victima ? dataPreventivo.DNI_victima : "No ingresado" },
        { nombre: "Estado civil víctima", valor: dataPreventivo.estado_civil_victima ? dataPreventivo.estado_civil_victima : "No ingresado" },
        { nombre: "Ocupación víctima", valor: dataPreventivo.ocupacion_victima ? dataPreventivo.ocupacion_victima : "No ingresado" },
        { nombre: "Nacionalidad de la víctima", valor: dataPreventivo.nacionalidad_victima ? dataPreventivo.nacionalidad_victima : "No ingresado" },
        { nombre: "Género de la víctima", valor: dataPreventivo.genero_victima ? dataPreventivo.genero_victima : "No ingresado" },
        { nombre: "Domicilio de la víctima", valor: dataPreventivo.direccion_victima ? dataPreventivo.direccion_victima : "No ingresado" },
        { nombre: "Teléfono víctima", valor: dataPreventivo.telefono_victima ? dataPreventivo.telefono_victima : "No ingresado" },
    ]
    // Datos del secretario
    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: dataPreventivo.secretario?.nombre_completo_secretario ? dataPreventivo.secretario.nombre_completo_secretario : "No ingresado" },
        { nombre: "Jerarquía secretario", valor: dataPreventivo.secretario?.jerarquia_secretario ? dataPreventivo.secretario.jerarquia_secretario : "No ingresado" },
        { nombre: "Plaza secretario", valor: dataPreventivo.secretario?.plaza_secretario ? dataPreventivo.secretario.plaza_secretario : "No ingresado" },
    ]
    // Datos del instructor
    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: dataPreventivo.instructor?.nombre_completo_instructor ? dataPreventivo.instructor.nombre_completo_instructor : "No ingresado" },
        { nombre: "Jerarquía instructor", valor: dataPreventivo.instructor?.jerarquia_instructor ? dataPreventivo.instructor.jerarquia_instructor : "No ingresado" },
    ]

    const handleDelete = async (dataPreventivo: any) => {
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
            await deletePreventivo(dataPreventivo._id)
        }
    }

    if (ampliarPreventivo) {
        return (
            <EditPrevencion modoExpandir={true} data={dataPreventivo} />
        )
    }

    // else if (editGlobal) {
    //     return (
    //         <EditPrevencion modoExpandir={false} data={dataPreventivo} />
    //     )
    // }
    else {
        return (

            <div>
                {(dataPreventivo.preventivo_ampliado_ID)  ?
                    <button
                        className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full "
                        onClick={() => handleVerAmpliación()}
                    >
                        Ver ampliación
                    </button>

                    : (
                        (dataPreventivo.tipo_preventivo !== "Ampliación de preventivo") && (
                            <button
                            className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full "
                            onClick={() => setAmpliarPreventivo(true)}
                            >
                            Ampliar preventivo
                        </button>
                        )
                    )

                }
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos preventivo</h1>
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
                    <h1 className='text-3xl my-5 font-sans mr-4'>Autoridades</h1>
                    <ul className="flex flex-col">
                        <li>{dataPreventivo.autoridades}</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Observaciones</h1>
                    <ShowTextArea dato={dataPreventivo.observaciones} />
                </div>
                <div>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Resolución</h1>
                    <ShowTextArea dato={dataPreventivo.resolucion} />
                </div>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos del secretario</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="" datos={secretarioDatosMostrar} />
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
                            {/* <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                                <PencilSquareIcon className="w-7" />
                            </div> */}
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(dataPreventivo)}>
                                <TrashIcon className="w-7" />
                            </div>
                        </>
                    }
                </div>


            </div>


        )
    }
}


export default expandedComponent