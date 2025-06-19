import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import Swal from "sweetalert2"
import { useState } from "react"
import { useForm } from "react-hook-form"
import InputRegister from "../InputComponents/InputRegister"
import { agregarCampo, editarCampo, eliminarCampo } from "../../api/CRUD/campos.crud"


type TablaCamposProps = {
    campos: any;
    tipo: any
}

function TablaCampos({ campos, tipo }: TablaCamposProps) {
    const [showAddNew, setShowAddNew] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [toEdit, setToEdit] = useState<any>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const handleDelete = (campo: any) => {
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
                await eliminarCampo(campo._id)
                Swal.fire({
                    title: 'Borrado!',
                    text: 'El campo ha sido eliminado.',
                    icon: 'success',
                    confirmButtonColor: '#0C4A6E',
                }).then(() => {
                    window.location.reload()
                })
            }
        })
    }

    const handleEdit = (campo: any) => {
        setShowEdit(!showEdit);
        setToEdit(campo)
    }

    const handleAdd = () => {
        setShowAddNew(!showAddNew);
    }
    return (

        <div className="table w-full h-full xl:w-5/10 m-4 border-2 border-sky-800">
            {showEdit ? (
                <form className="flex flex-col items-center justify-between w-full m-1"
                    onSubmit={handleSubmit((data) => {
                        Swal.fire({
                            icon: 'warning',
                            title: "¿Estás seguro?",
                            text: "Podrás editarlo más tarde",
                            showCancelButton: true,
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            confirmButtonText: 'Sí, editar',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                data._id = toEdit?._id
                                data.tipo = tipo
                                await editarCampo(data)
                                window.location.reload()
                                setShowEdit(false)
                            }
                        }
                        )
                    })
                    }

                >
                    <div className="flex flex-col w-full md:w-3/4">
                        <h1 className="text-4xl">Edición</h1>
                        <InputRegister
                            notMid
                            campo="Campo"
                            nombre="campo"
                            register={register}
                            setValue={setValue}
                            type="text"
                            error={errors.campo}
                            valor={toEdit?.nombre}
                        />
                        <InputRegister
                            notMid
                            campo="Valor"
                            nombre="value"
                            register={register}
                            setValue={setValue}
                            type="text"
                            error={errors.value}
                            valor={toEdit?.value}
                        />
                    </div>
                    <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded w-full md:w-3/4">Guardar</button>
                    <div className="cursor-pointer flex items-center justify-center bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded w-full md:w-3/4" onClick={() => setShowEdit(false)}>Cancelar</div>
                </form>
            )
                : <>

                    <div className='table-row'>
                        <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                            <div className="w-4/10 ml-4">Nombre</div>
                            <div className="w-4/10">Valor</div>
                            <div className="w-5/10 sm:w-3/10">Acciones</div>
                        </div>
                    </div>
                    {campos?.map((campo: any, index: number) => (
                        <div key={index} className='table-row'>
                            <div className="flex items-center justify-between word-wrap md:h-10 m-1 ">
                                <div className="w-4/10 ml-4 text-lg">{campo.nombre}</div>
                                <div className="w-4/10 ">{campo.value}</div>
                                <div className="w-5/10 sm:w-3/10">
                                    <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1  rounded" onClick={() => handleEdit(campo)}><PencilSquareIcon className="w-6 h-6" /></button>
                                    <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={() => handleDelete(campo)}><TrashIcon className="w-6 h-6" /></button>
                                </div>
                                {/* Linea gris */}
                            </div>
                                <div className="w-full h-0.5 bg-sky-800">
                                    </div>
                        </div>
                    ))}
                    <div className="h-full">

                        {showAddNew && (
                            <form className="flex flex-col items-center justify-between w-full m-1"
                                onSubmit={handleSubmit((data) => {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: "¿Estás seguro?",
                                        text: "Podrás editarlo más tarde",
                                        showCancelButton: true,
                                        confirmButtonColor: '#0C4A6E',
                                        cancelButtonColor: '#FF554C',
                                        confirmButtonText: 'Sí, agregar',
                                        cancelButtonText: 'Cancelar'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            data.tipo = tipo
                                            agregarCampo(data)
                                            window.location.reload()
                                            setShowAddNew(false)
                                        }
                                    }
                                    )
                                })}>
                                <div className="flex flex-col w-full md:w-3/4">
                                    <InputRegister
                                        notMid
                                        campo="Campo"
                                        nombre="campo"
                                        register={register}
                                        type="text"
                                        error={errors.campo}
                                    />
                                    <InputRegister
                                        notMid
                                        campo="Valor"
                                        nombre="value"
                                        register={register}
                                        type="text"
                                        error={errors.value}
                                    />
                                </div>
                                <div className="w-7/10 flex flex-row">
                                <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/4">
                                    Guardar
                                </button>
                                <div className="ml-2 flex flex-col items-center justify-center bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/4" onClick={() => handleAdd()}>
                                    Cancelar
                                </div>
                                </div>
                            </form>

                        )}
                        <div className="flex items-center justify-center">
                            {!showAddNew && <button className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={() => handleAdd()}>Agregar</button>}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TablaCampos