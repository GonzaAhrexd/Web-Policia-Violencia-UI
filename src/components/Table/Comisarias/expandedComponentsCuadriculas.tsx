
//  Componentes
import { useForm } from 'react-hook-form';
import InputRegister from '../../InputComponents/InputRegister';

// Backend
import { editarCuadriculaDesdeComisaria, eliminarCuadriculaDesdeComisaria, eliminarCuadriculaDesdeMunicipio, editarCuadriculaDesdeMunicipio } from '../../../api/CRUD/unidades.crud';

type expandedComponentsUnidadesProps = {
    data: any
    municipio: string
    comisaria?: string
    tipo: string
}
import Swal from 'sweetalert2';

function expandedComponentsUnidades({ data, municipio, comisaria, tipo }: expandedComponentsUnidadesProps) {


    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleDeleteCuadricula = (cuadricula: string, comisaria: string | any, municipio: string) => {
        try{
            Swal.fire({
                title: '¿Estás seguro de eliminar la cuadrícula?',
                icon: 'warning',
                text: "Esta acción NO se puede deshacer",
                confirmButtonColor: '#0C4A6E',
                cancelButtonColor: '#FF554C',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (tipo === 'comisaría') {
                    await eliminarCuadriculaDesdeComisaria(cuadricula, comisaria, municipio)
                    } else {
                        await eliminarCuadriculaDesdeMunicipio(cuadricula, municipio)
                    }
                     
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'La cuadrícula ha sido eliminada correctamente',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                        cancelButtonColor: '#FF554C',
                    })
                }
            }).then((result: any) => {
                if (result.isConfirmed) {
                window.location.reload()
                }
            })
        }catch(error){
            console.log(error)
        }
    }
        return (
            <div className='p-4 border-solid border-4 border-gray-600'>
                <h1 className='text-4xl'>Cuadriculas</h1>
                <form  className='w-full flex flex-col items-center justify-center m-4 '
                    onSubmit={handleSubmit((values) => {
                        Swal.fire({
                            title: '¿Estás seguro de editar la cuadrícula?',
                            icon: 'warning',
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, editar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                values.nombre_municipio = municipio
                                values.nombre_original = data.nombre
                                if(tipo === 'comisaria') {
                                    values.nombre_comisaria = comisaria
                                    await editarCuadriculaDesdeComisaria(values)
                                }else{
                                    await editarCuadriculaDesdeMunicipio(values)
                                }
                                Swal.fire({
                                    title: '¡Cuadrícula editada!',
                                    icon: 'success',
                                    confirmButtonColor: '#0C4A6E',
                                    confirmButtonText: 'Ok'
                                }).then(() => {
                                    window.location.reload()
                                })
                            }
                        })

                    }
                    )}
                >
                    <InputRegister busqueda campo="Nombre" nombre="nombre_cuadricula" register={register} type="text" error={errors.nombre_cuadricula} valor={data.nombre} setValue={setValue} />
                    <InputRegister busqueda campo="Valor" nombre="valor_cuadricula" register={register} type="text" error={errors.nombre_valor} valor={data.value} setValue={setValue} />
                    <div className='flex flex-row items-center justify-center w-1/2'>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2'>
                        Editar cuadrícula
                    </button>
                    <div className='flex flex-col items-center justify-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-4/10 md:w-3/10 mr-2 cursor-pointer' onClick={() =>  handleDeleteCuadricula(data.nombre, comisaria, municipio)}>
                        Eliminar cuadrícula
                    </div>
                    </div>
                
                </form>
                </div>
        )
}

export default expandedComponentsUnidades