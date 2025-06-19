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
import { useEffect, useState } from 'react'
// APIs y BackEnd
import { agregarVictimario } from '../../api/CRUD/victimario.crud'
import { agregarVictima } from '../../api/CRUD/victimas.crud'
import { aprobarDenuncia } from '../../api/CRUD/denunciasSinVerificar.crud'
import { crearDenuncia } from '../../api/CRUD/denuncias.crud'
// Componentes
import VerificarDenunciante from '../VerificarDenuncias/VerificarDenunciante'
import CargarVictimario from '../Cargar/CargarVictimario'
import CargarDenuncia from '../Cargar/CargarDenuncia'
import EditVictimario from './EditVictimario'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/auth';
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputTextArea from '../InputComponents/InputTextArea'
// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'
// Dependencias
import { useStore } from '../../pages/CargarDenuncias/store'
// Props
interface EditSectionProps {
  datos: any
  setEditSection?: any
  editSection?: boolean
  datosGeograficos?: any
}

function EditSectionSinVerificar({ datos, setEditSection, editSection }: EditSectionProps) {

  const { user } = useAuth();
  // Utilizamos useForm para manejar los datos del formulario
  const { register, watch, handleSubmit, setValue, formState: {
    errors
  } } = useForm()


  // Función para abrir el modal
  const handleOpenModal = (text: string[]) => {
    setIsModalOpen(true);
    setTexto(text);
  }

  // Función para cerrar el modal


  const datosVictima = {
    nombre: datos.nombre_victima,
    apellido: datos.apellido_victima,
    DNI: datos.DNI_victima,
    edad: datos.edad_victima,
    genero: datos.genero_victima,
    direccion: datos.direccion_victima,
    estado_civil: datos.estado_civil_victima,
    ocupacion: datos.ocupacion_victima,
    telefono: datos.telefono_victima,
  }
  // Función para dividir el expediente
  const dividirExpediente = (expediente: string) => {
    let division = expediente.split("-")
    let division2 = division[0].split("/")
    let divisionCompleta = []

    divisionCompleta[0] = division2[0]
    divisionCompleta[1] = division2[1]
    divisionCompleta[2] = division[1]
    divisionCompleta[3] = division[2]

    return divisionCompleta
  }
  const [expedienteDividido] = useState(dividirExpediente(datos.numero_de_expediente))

  const {
 
    isSolicitudAprehension,

    victimaCargar,
    victimarioCargar,
    terceroCargar,

    setTexto,
    setTitulo,
    setIsModalOpen,
    setOpenModalVictima,
    setOpenModalVictimario,
    setOpenModalTercero,

    
  } = useStore();

  useEffect(() => {
    console.log(datosVictima)

  })

  return (
    <div>

      <form
        encType="multipart/form-data"
        method='post'
        onSubmit={
          handleSubmit(async (values) => {

            Swal.fire({
              title: '¿Estás seguro?',
              text: "Podrás editarlo más adelante.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0C4A6E',
              cancelButtonColor: '#FF554C',
              confirmButtonText: 'Sí, subir',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              if (result.isConfirmed) {

                // Verifica si se cambió el select de estado civil y ocupación, si es así, conserva los valores, sino, los reemplaza por los que ya estaban
                values.estado_civil_victima ? values.estado_civil_victima = values.estado_civil_victima : values.estado_civil_victima = datosVictima.estado_civil
                values.ocupacion_victima ? values.ocupacion_victima = values.ocupacion_victima : values.ocupacion_victima = datosVictima.ocupacion
                const idVictima = await agregarVictima(values).then((id) => {
                  return id
                })
                values.dni_victimario = values.dni_victimario ? values.dni_victimario : 'S/N'
                const idVictimario = await agregarVictimario(values).then((id) => {
                  return id
                })
                values.victima_ID = idVictima
                values.victimario_ID = idVictimario
                if (!values.Expediente) {
                  values.Expediente = 'S/N'
                  values.is_expediente_completo = false
                } else {
                  values.is_expediente_completo = true
                }


                values.user_id = user.id
                values.numero_de_expediente = values.PrefijoExpediente + values.numero_expediente + values.Expediente + values.SufijoExpediente

                values.modo_actuacion = values.modo_actuacion ? values.modo_actuacion : datos.modo_actuacion


                try {

                  const denuncia = {
                    ...values,
                  };

                  await crearDenuncia(denuncia)
                  await aprobarDenuncia(datos._id)

                  Swal.fire({
                    title: '¡Denuncia enviada!',
                    text: 'La denuncia ha sido cargada con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0C4A6E',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                } catch (error) {
                  console.log(error)
                }
              }
            })
          })}>
        <div className='flex items-center'>

          <h1 className='text-2xl my-5'>Víctima</h1>
          <MagnifyingGlassIcon className='bg-sky-950 hover:bg-sky-700 flex items-center text-white justify-center cursor-pointer font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalVictima(true)} />
        </div>
        <div className='flex justify-center'>
          <VerificarDenunciante watch={watch} datos={victimaCargar ? victimaCargar : datosVictima} register={register} setValue={setValue} errors={errors} />
        </div>
        <div className='flex items-center'>
          <h1 className='text-2xl my-5'>Victimario</h1>
          <MagnifyingGlassIcon className='bg-sky-950 hover:bg-sky-700 flex items-center text-white justify-center cursor-pointer font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalVictimario(true)} />
        </div>
        {!victimarioCargar ?
          <div className='flex justify-center'>
            <CargarVictimario watch={watch} register={register} setValue={setValue} errors={errors} />
          </div>
          :
          <div className='flex justify-center'>
            <EditVictimario md={true} datos={victimarioCargar} register={register} setValue={setValue} errors={errors} />
          </div>
        }
        <h1 className='text-2xl my-5'>Hecho</h1>
        <div className='flex justify-center'>
          <CargarDenuncia fecha={new Date(datos.fecha).toISOString().slice(0, 10)} modoActuacion={datos.modo_actuacion} setOpenModalTercero={setOpenModalTercero} setTercero={terceroCargar} expediente={expedienteDividido} setTitulo={setTitulo} register={register} setValue={setValue} errors={errors} handleOpenModal={handleOpenModal} />
        </div>
        <h1 className='text-2xl my-5'>Observaciones</h1>
        <div className='flex flex-col justify-center items-center h-80 w-full'>
          <div className='flex flex-col items-start justify-start'>
            <InputCheckbox disabled={!isSolicitudAprehension} campo="Aprehensión" nombre="aprehension" register={register} setValue={setValue}  id="aprehension" />
          </div>
          <div className='flex flex-col items-center w-6/10'>
            <InputTextArea variante={"edit"} valor={datos.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center w-full my-2'>
          <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setEditSection(!editSection)}>
            <XMarkIcon className="w-7" />
          </div>
          <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2 ' >
            <CheckIcon className="w-7" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditSectionSinVerificar