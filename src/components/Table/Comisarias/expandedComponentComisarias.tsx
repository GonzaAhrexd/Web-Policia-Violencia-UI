type expandedComponentsUnidadesProps = {
    data: any;
    municipio: string;
}
// Dependencias
import DataTable from 'react-data-table-component';
import { customStyles } from '../../../GlobalConst/customStyles';
// Componentes
import columnsUnidades from '../columnsTablaUnidades';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import ExpandedComponentsCuadriculas from './expandedComponentsCuadriculas';
import { useForm } from 'react-hook-form';
import InputRegister from '../../InputComponents/InputRegister';

import { useState } from 'react';
import Swal from 'sweetalert2';

import { editarComisaria, eliminarComisaria, agregarCuadricula } from '../../../api/CRUD/unidades.crud';


function expandedComponentsUnidades({ municipio, data }: expandedComponentsUnidadesProps) {

    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showAddCuadricula, setShowAddCuadricula] = useState(false)

    const ExpandedRowComponent = ({ data: row }: any) => (
        // @ts-ignore
        <ExpandedComponentsCuadriculas
            municipio={municipio}
            comisaria={data.nombre}
            data={row} // Pasa los datos de la fila expandida
            tipo="comisaría"
        />
    );

    const handleDeleteComisaria = ( nombre: string, municipio: string) => {
        try{
            Swal.fire({
                title: '¿Estás seguro de eliminar la comisaría?',
                icon: 'warning',
                text: "Esta acción NO se puede deshacer",
                confirmButtonColor: '#0C4A6E',
                cancelButtonColor: '#FF554C',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await eliminarComisaria(nombre, municipio)
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'La comisaría ha sido eliminada correctamente',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                        cancelButtonColor: '#FF554C',
                    }
                    ).then(() => {
                        window.location.reload()
                    })
                }
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='p-4 border-solid border-4 border-gray-600'>
            <h1 className='text-4xl'>Comisaría</h1>
            {!showAddCuadricula &&
                <>
                    <h2 className='text-2xl'>Editar datos de la comisaría</h2>
                    <form className='w-full flex flex-col items-center justify-center'
                        onSubmit={handleSubmit((values) => {
                            Swal.fire({
                                title: '¿Estás seguro de editar el municipio?',
                                icon: 'warning',
                                confirmButtonColor: '#0C4A6E',
                                cancelButtonColor: '#FF554C',
                                showCancelButton: true,
                                confirmButtonText: 'Sí, editar',
                                cancelButtonText: 'Cancelar'
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    values.nombre_original = data.nombre
                                    values.nombre_municipio = municipio
                                    await editarComisaria(values)
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
                        <InputRegister busqueda campo="Nombre" nombre="nombre_comisaria" register={register} type="text" error={errors.nombre_comisaria} valor={data.nombre} setValue={setValue} />
                        <InputRegister busqueda campo="Valor" nombre="valor_comisaria" register={register} type="text" error={errors.valor_comisaria} valor={data.value} setValue={setValue} />
                        <InputRegister busqueda campo="Prefijo" nombre="prefijo_comisaria" register={register} type="text" error={errors.prefijo_comisaria} valor={data.prefijo} setValue={setValue} />
                        <InputRegister busqueda campo="Teléfono" nombre="telefono_comisaria" register={register} type="text" error={errors.telefono_comisaria} valor={data.telefono} setValue={setValue} require={false} />
                        <InputRegister busqueda campo="Dirección" nombre="direccion_comisaria" register={register} type="text" error={errors.direccion_comisaria} valor={data.direccion} setValue={setValue} require={false}/>
                        <InputRegister busqueda campo="Supervisión" nombre="supervision_comisaria" register={register} type="text" error={errors.supervision_comisaria} valor={data.supervision} setValue={setValue} require={false}/>

                        <div className='flex items-center justify-center w-1/2'>
                            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                                Editar Comisaría
                            </button>
                            <div className='flex items-center justify-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2' onClick={() => handleDeleteComisaria(data.nombre, municipio)} > 
                                Eliminar Comisaría
                            </div>
                        </div>
                    </form>
                </>
            }
            <h1 className='text-4xl'>Cuadrículas</h1>
            <h2 className='text-2xl'>Agregar una cuadrícula</h2>
            <div className='flex flex-col items-center justify-center'>
                {!showAddCuadricula && 
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 rounded w-full xl:w-3/10'
                onClick={() => setShowAddCuadricula(true)}
                >
                    Agregar Cuadricula
                </button>
                }
            </div>
            {showAddCuadricula &&
                <form className='w-full flex flex-col items-center justify-center m-4'
                    onSubmit={handleSubmit((values) => {
                        Swal.fire({
                            title: '¿Estás seguro de agregar la cuadrícula?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, agregar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.nombre_municipio = municipio
                                values.nombre_comisaria = data.nombre
                                await agregarCuadricula(values)
                                Swal.fire({
                                    title: '¡Agregada!',
                                    text: 'La comisaría ha sido agregada correctamente',
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
                    <InputRegister campo="Nombre" nombre="nombre_cuadricula" register={register} type="text" error={errors.nombre_comisaria} />
                    <InputRegister campo="Valor" nombre="valor_cuadricula" register={register} type="text" error={errors.valor_comisaria} />
                    <div className='flex flex-row items-center w-full justify-center'>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 xl:w-3/10 mr-2'>
                    Agregar Cuadrícula
                    </button>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 xl:w-3/10 mr-2 flex items-center justify-center cursor-pointer' onClick={() => setShowAddCuadricula(false)}>
                        Cancelar
                    </div>
                    </div>
                </form>
            }
            <h2 className='text-2xl'>Lista de cuadrículas</h2>
            <DataTable
                columns={columnsUnidades}
                data={data.cuadriculas}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedRowComponent}
                customStyles={customStyles}
                responsive={true}
                striped={true}
                highlightOnHover={true}
                noDataComponent="No hay cuadrículas para mostrar"
                defaultSortFieldId={"Fecha"}
                defaultSortAsc={false}
                expandableIcon={expandableIcon}
            />
        </div>
    )

}

export default expandedComponentsUnidades