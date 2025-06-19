/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
// APIs del BackEnd
import { buscarDenunciasPorId } from '../../../api/CRUD/denuncias.crud';
// Librerías react
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2' // Librería para mostrar popups
// Iconos
import { PencilSquareIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import { columnsDenuncia } from '../BuscarDenuncias/columnsDataTableDenuncias'
import { customStyles } from '../../../GlobalConst/customStyles'
import EditTercero from '../../../components/EditMode/EditTercero';
// Importa expandedComponents con otro nombre
import { editarTercero } from '../../../api/CRUD/terceros.crud';
import expandedDenuncia from '../BuscarDenuncias/expandedComponents'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { useAuth } from '../../../context/auth';
import ModoImprimir from './ModoImprimir';

interface expandedComponentsProps {
    data: any
}
function expandedComponents({ data }: expandedComponentsProps) {
    // State para guardar los datos de la víctima
    const [editGlobal, setEditGlobal] = useState(false)
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [modoImprimir, setModoImprimir] = useState(false);
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()
    // Datos de la víctima
    // Mostrar datos del victimario
    const terceroDatosMostrar = [
        { nombre: "Nombre", valor: data.nombre },
        { nombre: "Apellido", valor: data.apellido },
        { nombre: "DNI", valor: data.DNI },
        { nombre: "Denuncias realizadas", valor: data.denuncias_realizadas?.length },
    ]

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    useEffect(() => {
        const fetchDenuncias = async (denunciaId: any) => {
            const result = await buscarDenunciasPorId(denunciaId);
            return result;
        }

        const fetchAllDenuncias = async () => {
            const denuncias = await Promise.all(data?.denuncias_realizadas?.map(fetchDenuncias) || []);
            // @ts-ignore
            setDenunciasAMostrar(denuncias);
        }

        fetchAllDenuncias();
    }, [])


    const {  user } = useAuth();


    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full scale-up-ver-top">
        {!editGlobal &&
            <>
                <div className='flex items-center'>
                    <h1 className='text-3xl my-5 font-sans mr-4'>Datos del tercero</h1> 
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="Datos" datos={terceroDatosMostrar} icono={<UserIcon className='h-6 w-6' />}/>
                </div>
                <div className='flex items-center'>
                <h1 className='text-3xl my-5 font-sans mr-4'>Denuncias</h1></div>
                <div className='flex flex-col'>
                    <DataTable
                        columns={columnsDenuncia}
                        data={denunciasAMostrar}
                        pagination
                        customStyles={customStyles}
                        responsive={true}
                        striped={true}
                        highlightOnHover={true}
                        noDataComponent="No hay denuncias para mostrar"
                        defaultSortFieldId={"Fecha"}
                        defaultSortAsc={false}
                        expandableIcon={expandableIcon}
                        expandableRows
                        expandableRowsComponent={expandedDenuncia}
                    />
                </div>
                <div className='my-5 flex flex-col md:flex-row items-center justify-center w-8/10 md:w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full '>
                    {user.rol == "agente" || user.rol == "admin" &&
                    <>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setModoImprimir(!modoImprimir)}>
                        <PrinterIcon className="w-7" />
                    </div>
                        <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                            <PencilSquareIcon className="w-7" />
                        </div>
                    </>
                    }
                </div>
            </>
        }
        {modoImprimir &&
            <div>
                <ModoImprimir modoImprimir={modoImprimir} setModoImprimir={setModoImprimir} denunciasAMostrar={denunciasAMostrar} user={user} data={data} />
            </div>
        }

        {editGlobal &&
            <div>
                <form
                    onSubmit={
                        handleSubmit(async (values) => {
                            // Llamamos a editar victima del backend
                            editarTercero(values)
                            // Llamamos a editar victimario del backend
                            // Utilizamos Swal para mostrar un mensaje de éxito
                            Swal.fire({
                                icon: 'success',
                                title: '¡Denuncia editada con éxito!',
                                showConfirmButton: true,
                                confirmButtonText: 'Aceptar',
                                confirmButtonColor: '#0C4A6E',
                            }).then((result) => {
                                // Si se confirma el mensaje, recargamos la página
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        })}>
                    <EditTercero datos={data} register={register} setValue={setValue} errors={errors} />

                    <div className='flex flex-col md:flex-row items-center justify-center w-full my-2'>
                        <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setEditGlobal(!editGlobal)}>
                            <XMarkIcon className="w-7" />
                        </div>
                        <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2 ' >
                            <CheckIcon className="w-7" />
                        </button>
                    </div>
                </form>
            </div>
        }


    </div>

}

export default expandedComponents