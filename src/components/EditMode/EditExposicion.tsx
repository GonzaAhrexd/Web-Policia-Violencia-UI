
import EditVictimaExposicion from './EditVictimaExposicion'
type EditExposicionProps = {
    datos: any,
    setEditMode: any,
}
import { useForm } from 'react-hook-form'   
import InputTextArea from '../InputComponents/InputTextArea'
import Swal from 'sweetalert2'

import { editarExposicion } from '../../api/CRUD/exposicion.crud'


function EditExposicion({datos, setEditMode }: EditExposicionProps) {
  
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    return (
           <>
           <form action=""
           onSubmit={handleSubmit(async (data) => {
                
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Se modificará la exposición",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, modificar',
                cancelButtonText: 'Cancelar'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  // Aquí se debe hacer la petición al backend
                data._id = datos._id
                await editarExposicion(data)
                  Swal.fire(
                    {
                        title: '¡Exposición modificada!',
                        icon: 'success',
                        showConfirmButton: false,
                        
                    }).then(() => {
                        window.location.reload()
                    })
                }
            })
           })}
           >

              <h1 className='text-2xl my-5'>Expositor</h1>
              <div className='flex justify-center'>
                <EditVictimaExposicion datos={datos} register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
              <InputTextArea variante={"edit"} valor={datos.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" />
              </div>
              {/* <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas watch={watch} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} /> */}
              <div className="flex justify-center my-3">
                <div className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10 flex flex-col items-center justify-center cursor-pointer' onClick={() => setEditMode(false)}>Cancelar</div>
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
                </div>
           </form>
            </>
  )
}

export default EditExposicion