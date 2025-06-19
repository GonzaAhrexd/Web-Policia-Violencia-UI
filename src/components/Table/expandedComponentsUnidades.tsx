
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../GlobalConst/customStyles';
import Swal from 'sweetalert2';
// Componentes
import columnsUnidades from './columnsTablaUnidades';
import InputRegister from '../InputComponents/InputRegister';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import expandedComponentsMunicipios from './Comisarias/expandedComponentMunicipios';
// Hooks
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Backend 
import { editarUnidad, agregarMunicipio } from '../../api/CRUD/unidades.crud';
import { useState } from 'react';

type expandedComponentsUnidadesProps = {
    data: any;
}

function expandedComponentsUnidades({ data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [showAddMunicipio, setShowAddMunicipio] = useState(false)

    useEffect(() => {
        console.log(data)
    }, [data])

    if (data.subdivisiones.length > 0) {
        return (
            <div className='p-4 border-solid border-4 border-gray-600'>
                <h1 className='text-4xl'>Unidad</h1>
                {!showAddMunicipio &&
                    <>
                        <h2 className='text-2xl'>Editar datos de la unidad</h2>

                        <form className='w-full flex flex-col items-center justify-center'
                            onSubmit={handleSubmit((values) => {
                                console.log(values)
                                Swal.fire({
                                    title: '¿Estás seguro de editar la unidad?',
                                    icon: 'warning',
                                    confirmButtonColor: '#0C4A6E',
                                    cancelButtonColor: '#FF554C',
                                    showCancelButton: true,
                                    confirmButtonText: 'Sí, editar',
                                    cancelButtonText: 'Cancelar'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        values.id = data._id
                                        await editarUnidad(values)
                                        Swal.fire({
                                            title: '¡Editado!',
                                            text: 'La unidad ha sido editada correctamente',
                                            icon: 'success',
                                            confirmButtonColor: '#0C4A6E',
                                            cancelButtonColor: '#FF554C',
                                        }
                                        ).then(() => {
                                            window.location.reload()
                                        })
                                    }
                                })


                            }
                            )}
                        >
                            <InputRegister busqueda campo="Nombre" nombre="nombre_unidad" register={register} type="text" error={errors.nombre} valor={data.nombre} setValue={setValue} />
                            <InputRegister busqueda campo="Valor" nombre="valor_unidad" register={register} type="text" error={errors.valor} valor={data.value} setValue={setValue} />
                            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full xl:w-3/10 mr-2'>
                                Editar Unidad
                            </button>
                        </form>
                    </>
                }
                <h1 className='text-4xl'>Municipios</h1>
                <h2 className='text-2xl'>Agregar un nuevo municipio</h2>
                <div className='flex flex-col items-center justify-center'>
                    {!showAddMunicipio &&
                        <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full xl:w-3/10 mr-2' onClick={() => setShowAddMunicipio(true)}>
                            Agregar Municipio
                        </button>
                    }
                </div>
                {showAddMunicipio &&
                    <form className='w-full flex flex-col items-start md:items-center justify-start md:justify-center'
                        onSubmit={handleSubmit((values) => {
                            Swal.fire({
                                title: '¿Estás seguro de agregar el municipio?',
                                icon: 'warning',
                                confirmButtonColor: '#0C4A6E',
                                cancelButtonColor: '#FF554C',
                                showCancelButton: true,
                                confirmButtonText: 'Sí, agregar',
                                cancelButtonText: 'Cancelar'
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    values.id = data._id
                                    await agregarMunicipio(values)
                                    Swal.fire({
                                        title: '¡Agregado!',
                                        text: 'El municipio ha sido agregado correctamente',
                                        icon: 'success',
                                        confirmButtonColor: '#0C4A6E',
                                        cancelButtonColor: '#FF554C',
                                    }
                                    ).then(() => {
                                        window.location.reload()
                                    })
                                }
                            })
                        }
                        )}
                    >
                        <InputRegister campo="Nombre" nombre="nombre_municipio" register={register} type="text" error={errors.nombre_municipio} />
                        <InputRegister campo="Valor" nombre="valor_municipio" register={register} type="text" error={errors.valor_municipio} />
                        <InputRegister campo="Prefijo" nombre="prefijo_municipio" register={register} type="text" error={errors.prefijo_municipio} require={false} />
                        <InputRegister campo="Teléfono" nombre="telefono_municipio" register={register} type="text" error={errors.telefono_municipio} require={false} />
                        <InputRegister campo="Dirección" nombre="direccion_municipio" register={register} type="text" error={errors.direccion_municipio} require={false} />
                        <InputRegister campo="Supervisión" nombre="supervision_municipio" register={register} type="text" error={errors.supervision_municipio} require={false} />

                        <div className='flex flex-row w-full items-center justify-center'>
                            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 xl:w-3/10 mr-2'>
                                Agregar Municipio
                            </button>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 xl:w-3/10 mr-2 flex items-center justify-center cursor-pointer'  onClick={() => setShowAddMunicipio(false)}>
                                Cancelar
                            </div>
                        </div>

                    </form>
                }
                <h2 className='text-2xl'>Lista de municipios</h2>
                <DataTable
                    columns={columnsUnidades}
                    data={data.subdivisiones}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponentsMunicipios}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay denuncias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    defaultSortAsc={false}
                    expandableIcon={expandableIcon}
                />
            </div>
        )
    }
}

export default expandedComponentsUnidades