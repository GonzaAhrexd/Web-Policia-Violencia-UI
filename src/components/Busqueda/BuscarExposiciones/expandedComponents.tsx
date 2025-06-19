/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState } from 'react';
// APIs del BackEnd
import { eliminarExposicion } from '../../../api/CRUD/exposicion.crud';
// Librerías react
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { TrashIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline'

// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import ShowTextArea from '../../../components/ShowData/ShowTextArea';
import EditExposicion from '../../EditMode/EditExposicion';

import { useAuth } from '../../../context/auth';

type expandedComponentsProps = {
    data: any
}
// Expanded component EXPOSICION
function expandedComponents({ data }: expandedComponentsProps) {

    // Estado de editar global
    const [editGlobal, setEditGlobal] = useState(false)
    // Datos del hecho

    const { user } = useAuth()

    const victimaDatosMostrar = [
        { nombre: "Nombre de la víctima", valor: data.nombre_victima },
        { nombre: "Apellido de la víctima", valor: data.apellido_victima },
        { nombre: "Edad víctima", valor: data.edad_victima },
        { nombre: "DNI víctima", valor: data.DNI_victima },
        { nombre: "Estado civil víctima", valor: data.estado_civil_victima },
        { nombre: "Ocupación víctima", valor: data.ocupacion_victima },
        { nombre: "Nacionalidad de la víctima", valor: data.nacionalidad_victima },
        { nombre: "Domicilio de la víctima", valor: data.direccion_victima },
        { nombre: "Teléfono víctima", valor: data.telefono_victima },
        { nombre: "Con instrucción", valor: data.sabe_leer_y_escribir_victima },
    ]

    const secretarioDatosMostrar = [
        { nombre: "Nombre del secretario", valor: data.secretario.nombre_completo_secretario },
        { nombre: "Jerarquía secretario", valor: data.secretario.jerarquia_secretario },
        { nombre: "Plaza secretario", valor: data.secretario.plaza_secretario },
    ]

    const instructorDatosMostrar = [
        { nombre: "Nombre del instructor", valor: data.instructor.nombre_completo_instructor },
        { nombre: "Jerarquía instructor", valor: data.instructor.jerarquia_instructor },
    ]
    // Controlar cuando se da a eliminar
    const handleDelete = async (data: any) => {
        // Popup de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Llamada a la API
                    eliminarExposicion(data._id)
                    // Mensaje de éxito
                    Swal.fire({
                        title: 'Borrado',
                        text: 'La denuncia ha sido borrada con éxito',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                    }).then(() => {
                        window.location.reload()
                    })

                } catch (error) {
                    // Si hay un error
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al borrar la denuncia',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                    }
                    )
                }
            }
        })
    }

    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full scale-up-ver-top">
        {!editGlobal ?
            <>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos de la víctima</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="Datos" datos={victimaDatosMostrar} icono={<UserIcon className='h-6 w-6' />} />
                </div>
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans mr-4'>Exposición</h2>
                </div>
                <div className="flex flex-row">
                    <ShowTextArea campo="Observaciones" dato={data.observaciones} />
                </div>
                {data.preguntas.desea_agregar_quitar_o_enmendar &&
                    <>
                        <div className='flex items-center'>
                            <h2 className='text-3xl my-5 font-sans	'>Agrega</h2>
                        </div>
                        <div className="flex flex-row">
                            <ShowTextArea campo="Observaciones" dato={data.agrega} />
                        </div>
                    </>
                }
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans'>Secretario</h2>
                </div>
                <div className='flex flex-row'>
                    <SimpleTableCheckorX campo="" datos={secretarioDatosMostrar} icono={<UserIcon className='h-6 w-6' />} />
                </div>
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans'>Instructor</h2>
                </div>
                <div className='flex flex-row'>
                    <SimpleTableCheckorX campo="" datos={instructorDatosMostrar} icono={<UserIcon className='h-6 w-6' />} />
                </div>
                <div className='my-5 flex flex-col md:flex-row md:items-center md:justify-center w-full '>
                    {(user.rol === 'admin' || user.rol === 'carga') &&
                        <>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                                <PencilSquareIcon className="w-7" />
                            </div>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                                <TrashIcon className="w-7" />
                            </div>
                        </>
                    }
                </div>
            </>
            :
            <>
                <EditExposicion datos={data} setEditMode={setEditGlobal} />
            </>
        }
    </div>

}

export default expandedComponents