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
import { UserIcon, QueueListIcon } from '@heroicons/react/24/outline'
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import { columnsDenuncia } from '../BuscarDenuncias/columnsDataTableDenuncias'
import { customStyles } from '../../../GlobalConst/customStyles'
import EditVictimario from '../../../components/EditMode/EditVictimario';
// Importa expandedComponents con otro nombre
import { editarVictimario } from '../../../api/CRUD/victimario.crud';
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
    const victimarioDatosMostrar = [
        { nombre: "ID", valor: data._id},
        { nombre: "Nombre", valor: data.nombre ? data.nombre : "No especificado" },
        { nombre: "Apellido", valor: data.apellido ? data.apellido : "No especificado" },
        { nombre: "Domicilio del victimario", valor: data.direccion ? data.direccion : "No especificado" },
        { nombre: "Edad", valor: data.edad ? data.edad : "No especificado" },
        { nombre: "DNI", valor: (data.DNI && data.DNI != "S/N") ? data.DNI : "No especificado" },
        { nombre: "Estado Civil", valor: data.estado_civil ? data.estado_civil : "No especificado" },
        { nombre: "Ocupación", valor: data.ocupacion ? data.ocupacion : "No especificado" },
        { nombre: "Denuncias previas", valor: data.denuncias_en_contra.length }
    ]
    // Detalles del victimario
    const detallesVictimario = [
        { nombre: "Abuso de Alcohol", valor: data.abuso_de_alcohol },
        { nombre: "Antecedentes toxicológicos", valor: data.antecedentes_toxicologicos },
        { nombre: "Antecedentes Penales", valor: data.antecedentes_penales },
        { nombre: "Antecedentes Contravencionales", valor: data.antecedentes_contravencionales },
        { nombre: "Entrenamiento en combate", valor: data.entrenamiento_en_combate },
        { nombre: "Aprehensión", valor: data.esta_aprehendido ? data.esta_aprehendido : false },
        { nombre: "En libertad", valor: data.fue_liberado ? data.fue_liberado : false },
    ]

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    useEffect(() => {
        // Función para buscar las denuncias por ID
        const fetchDenuncias = async (denunciaId: any) => {
            const result = await buscarDenunciasPorId(denunciaId);
            return result;
        }

        // Función para buscar todas las denuncias
        const fetchAllDenuncias = async () => {
            const denuncias = await Promise.all(data?.denuncias_en_contra?.map(fetchDenuncias) || []);
            // Filtrar resultados nulos o indefinidos
            const denunciasFiltradas = denuncias.filter(denuncia => denuncia !== null && denuncia !== undefined);
            // @ts-ignore
            setDenunciasAMostrar(denunciasFiltradas);
        }

        fetchAllDenuncias();
    }, [])

    // Hook para obtener el usuario
    const { user } = useAuth();

    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full scale-up-ver-top">
        {!editGlobal &&
            <>
                <div className='flex items-center'>
                <h1 className='text-3xl my-5 font-sans mr-4'>Datos del victimario</h1>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="Datos" datos={victimarioDatosMostrar} icono={<UserIcon className='h-6 w-6'/>}/>
                    <SimpleTableCheckorX campo="Detalles" datos={detallesVictimario} icono={<QueueListIcon className='h-6 w-6' />}/>
                </div>
                <div className='flex items-center'>
                <h1 className='text-3xl my-5 font-sans mr-4'>Denuncias</h1>
                </div>
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
                <div className='my-5 flex flex-col md:flex-row md:items-center md:justify-center w-full '>
                <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10  md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setModoImprimir(!modoImprimir)}>
                        <PrinterIcon className="w-7" />
                    </div>
                    {(user.rol == "carga" || user.rol == "admin") &&
                       <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                            <PencilSquareIcon className="w-7" />
                        </div>
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
                            editarVictimario(values)
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
                    <EditVictimario datos={data} register={register} setValue={setValue} errors={errors} />
                    <div className='my-5 flex flex-col md:flex-row sm:items-center md:justify-center w-full '>
                        <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                            <XMarkIcon className="w-7" />
                        </div>
                        <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' >
                            <CheckIcon className="w-7" />
                        </button>
                    </div>
                </form>
            </div>
        }


    </div>

}

export default expandedComponents