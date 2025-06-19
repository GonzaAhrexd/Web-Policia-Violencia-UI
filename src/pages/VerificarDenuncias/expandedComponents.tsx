/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /VerificarDenuncias. 
    Recibe los datos para mostrarlos en una tabla. 
    Y desde aquí es posible verificar la denuncia o rechazarla.
_____________________________________________________________________________________________
*/

// Hooks
import { useState } from 'react';
// APIs del BackEnd
import { eliminarDenunciaSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
// Librerías react
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
// Componentes
import SimpleTableCheckorX from '../../components/ShowData/SimpleTableCheckorX';
import EditSectionSinVerificar from '../../components/EditMode/EditSectionSinVerificar';
import ShowTextArea from '../../components/ShowData/ShowTextArea';

// Props
type expandedComponentsProps = {
    data: any
}

function expandedComponents({ data }: expandedComponentsProps) {
    // Estado para controlar si se está editando
    const [editGlobal, setEditGlobal] = useState(false)
    // Datos para mostrar en la tabla
    const datosDenuncia = [
        {nombre: "Número de expediente", valor: data.numero_de_expediente},
        {nombre: "Fecha de denuncia", valor: data.fecha},
    ]
    // Datos del denunciante
    const denuncianteDatos = [
        { nombre: "Nombre", valor: data.nombre_victima },
        { nombre: "Apellido", valor: data.apellido_victima },
        { nombre: "DNI", valor: data.DNI_victima },
        { nombre: "Nacionalidad", valor: data.nacionalidad_victima },
        { nombre: "Género", valor: data.genero_victima },
        { nombre: "Domicilio", valor: data.direccion_victima },
        { nombre: "Teléfono", valor: data.telefono_victima },
        { nombre: "Tipo de actuación", valor: data.modo_actuacion },
        { nombre: "¿Sabe leer y Escribir?", valor: data.sabe_leer_y_escribir_victima },
    ]
    // Preguntas para mostrar en la tabla
    const preguntas = [
        { nombre: "¿Desea ser asistida?", valor: data.preguntas.desea_ser_asistida },
        { nombre: "¿Desea ser examinada por un médico?", valor: data.preguntas.desea_ser_examinada_por_medico },
        { nombre: "¿Desea accionar penalmente?", valor: data.preguntas.desea_accionar_penalmente },
        { nombre: "Desea agregar quitar o enmendar algo?", valor: data.preguntas.desea_agregar_quitar_o_enmendar },
    ]

    // Función para borrar la denuncia
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
                    eliminarDenunciaSinVerificar(data._id)
                    // Mensaje de éxito
                    Swal.fire({
                        title: 'Borrado',
                        text: 'La denuncia ha sido borrada con éxito',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                    }).then(() => {
                        // Recarga la página
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

    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full">
    
       <h1 className='text-3xl my-5 font-sans'>Datos de la denuncia</h1>
            <div className='flex flex-col'>
                <SimpleTableCheckorX campo="" datos={datosDenuncia} />
            </div>
        <h1 className='text-3xl my-5 font-sans	'>Datos del denunciante</h1>
        <div className='flex flex-col'>
            <SimpleTableCheckorX campo="" datos={denuncianteDatos} />
        </div>
        <h1 className='text-3xl my-5 font-sans	'>Datos del hecho</h1>
        <ShowTextArea campo="Hecho" dato={data.observaciones} />
        <div className='flex flex-col'>
            <SimpleTableCheckorX campo="" datos={preguntas} />
        </div>
        {data.preguntas.desea_agregar_quitar_o_enmendar &&
            <>
                <h1 className='text-3xl my-5 font-sans	'>Adjunto</h1>
                <ShowTextArea campo="Hecho" dato={data.agrega} />
            </>
        }
        {editGlobal &&
             <EditSectionSinVerificar datos={data} setEditSection={setEditGlobal} editSection={editGlobal}/>
        }
        {!editGlobal && 
        <div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>
            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                <PencilSquareIcon className="w-7" />
            </div>
            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                <TrashIcon className="w-7" />
            </div>
        </div>
        }
    </div>

}

export default expandedComponents