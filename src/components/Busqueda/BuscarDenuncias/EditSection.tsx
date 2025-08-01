/*
_______________________________________________________________________________________________________
Uso del componente:
    EditSection recibe los datos de la victima, victimario, hecho y datos geograficos para pasarlos 
    a los componentes hijos EditVictima, EditVictimario y EditHecho y así poder ser mostrados para que estos
    sean editados y guardados en la base de datos.
_______________________________________________________________________________________________________
*/
// Hooks
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// APIs y BackEnd
import { editarTercero, crearTercero } from '../../../api/CRUD/terceros.crud'
import { editarVictimario } from '../../../api/CRUD/victimario.crud'
import { editarVictima } from '../../../api/CRUD/victimas.crud'
import { editarDenuncia } from '../../../api/CRUD/denuncias.crud'
// Componentes
import EditVictima from '../../EditMode/EditVictima'
import EditVictimario from '../../EditMode/EditVictimario'
import EditHecho from '../../EditMode/EditHecho'
import InputTextArea from '../../InputComponents/InputTextArea'
import InputCheckbox from '../../InputComponents/InputCheckbox'
import Swal from 'sweetalert2'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useStore } from '../../../pages/MisDenuncias/store'

// Tipos
import Victima from '../../../types/Victimas';
import Victimario from '../../../types/Victimario';
import Denuncia from '../../../types/Denuncia';
import Tercero from '../../../types/Tercero';

// Props
type EditSectionProps = {
    datosVictima: Victima
    datosVictimario: Victimario
    datosHecho: Denuncia
    datosGeograficos: any
    datosTerceros: Tercero
    editSection: boolean
    setEditSection: (boolean) => void
}

function EditSection({ datosHecho, datosVictima, datosVictimario, datosTerceros, datosGeograficos, editSection, setEditSection }: EditSectionProps) {
    // Utilizamos useForm para manejar los datos del formulario
    const { register, watch, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    const { setOpenModal, setTitle, setText } = useStore()

    // Estados

    // Función para abrir el modal
    const handleOpenModal = (text: string[]) => {
        setOpenModal(true);
        setText(text);
    }


    const [isSolicitudAprehension, setIsSolicitudAprehension] = useState(false)

    return (
        <div className='w-8/10 md:w-full'>
            {/* {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />} */}
            <form
                onSubmit={
                    handleSubmit(async (values) => {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: "Podrás seguir editando más adelante.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#0C4A6E',
                            cancelButtonColor: '#FF554C',
                            confirmButtonText: 'Sí, subir',
                            cancelButtonText: 'Cancelar'
                        }).then(async (result) => {

                            if (result.isConfirmed) {
                                // Llamamos a editar victima del backend
                                await editarVictima(values)
                                // Llamamos a editar victimario del backend
                                await editarVictimario(values)
                                // Editar tercero
                                if (values.denunciado_por_tercero) {
                                    if (datosHecho.denunciado_por_tercero) {
                                        await editarTercero(values)
                                    } else {
                                        const idTercero = await crearTercero(values)
                                        values.tercero_ID = idTercero
                                    }
                                }
                                // Formamos el expediente
                                values.nuevoExpediente = values.PrefijoExpediente + values.numero_expediente + values.Expediente + values.SufijoExpediente
                                // Evaluamos si el expediente está completo para asignarle true o false
                                if (values.Expediente !== 'S/N') {
                                    values.isExpedienteCompleto = true
                                } else {
                                    values.isExpedienteCompleto = false
                                }
                                // Llamamos a editar denuncia del backend
                                await editarDenuncia(values)
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
                                        // window.location.reload();
                                    }
                                })
                            }
                        })
                    })}>

                <EditVictima datos={datosVictima} register={register} setValue={setValue} errors={errors} watch={watch} cantidad_hijos_con_agresor={datosHecho.hijos_victima_con_victimario} convivencia={datosHecho.convivencia} dependencia_economica={datosHecho.dependencia_economica} vinculo_con_agresor={datosHecho.relacion_victima_victimario} />
                <EditVictimario datos={datosVictimario} register={register} setValue={setValue} errors={errors} />
                <EditHecho setIsSolicitudAprehension={setIsSolicitudAprehension} datosTerceros={datosTerceros} datosGeograficos={datosGeograficos} datos={datosHecho} handleOpenModal={handleOpenModal} setTitulo={setTitle} register={register} setValue={setValue} errors={errors} />

                <>
                    <h1 className='text-2xl my-5'>Observaciones</h1>
                    <InputCheckbox disabled={!isSolicitudAprehension} state={datosHecho.aprehension} campo="Aprehensión" nombre="aprehension" register={register} setValue={setValue} id="aprehension" />
                    <InputTextArea edit valor={datosHecho.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} />
                </>
                <div className='my-5 flex flex-col md:flex-row sm:items-center md:justify-center w-full '>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditSection(!editSection)}>
                        <XMarkIcon className="w-7" />
                    </div>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' >
                        <CheckIcon className="w-7" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditSection