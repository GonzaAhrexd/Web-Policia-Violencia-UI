// React
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
// Librerias
import Swal from "sweetalert2"
import { pdf } from "@react-pdf/renderer"
// Contexto
import { useAuth } from "../../../context/auth"
import { useCampos } from "../../../context/campos"
// Store
import { useStore } from "../../../pages/CargarDenuncias/store"
// Componentes
import CargarVictimaAgente from "../CargarAgente/CargarVictimaAgente"
import CargarInstructorYSecretario from "../CargarAgente/CargarInstructor"
import CargarPreguntas from "../CargarAgente/CargarPreguntas"
import InputExpediente from "../../InputComponents/InputExpediente"
import InputDate from "../../InputComponents/InputDate"
import InputRegister from "../../InputComponents/InputRegister"
import InputTextArea from "../../InputComponents/InputTextArea"
import PDF from "./PDF"
// API
import { crearDenunciaSinVerificar, agregarAmpliacionDenuncia } from "../../../api/CRUD/denunciasSinVerificar.crud"
type CargarAmpliacionProps = {
  data: any;
  setAmpliarDenuncia: any;
}
function CargarAmpliacion({ data, setAmpliarDenuncia }: CargarAmpliacionProps) {
  // Formulario


  const [tipoDenuncia, setTipoDenuncia] = useState("")
  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [direccionValor, setDireccionValor] = useState('')
  const [telefonoValor, setTelefonoValor] = useState('')

  const { user } = useAuth()


  const { watch, register, handleSubmit, setValue, getValues, formState: {
    errors
  } } = useForm({

  })
  const { setGenero, genero, } = useStore()
  const { unidades } = useCampos()


  useEffect(() => {
    setGenero(data.genero_victima)
    setTipoDenuncia(data.modo_actuacion)
  }
    , [])
  const handlePrint = async () => {
    const datos = getValues()
    const blob = await pdf(<PDF isBusqueda={false} genero={genero} datos={datos} user={user} />).toBlob();
    // Crea una URL de objeto a partir del blob
    const url = URL.createObjectURL(blob);
    // Abre la URL en una nueva pestaña
    window.open(url);
  }

  const direccionDivisiones: any[] = [
    { division: "Metropolitana", direccion: "Avenida Alvear Nº 126", telefono: "362461832" },
    { division: "La Leonesa", direccion: "Santiago del Estero y Entre Ríos", telefono: "3624644562" },
    { division: "Lapachito", direccion: "25 de Mayo S/N", telefono: "3624605783" },
    { division: "Roque Saenz Peña", direccion: "Calle 7e/12 y 14", telefono: "3644431835" },
    { division: "Villa Ángela", direccion: "Echeverría N° 35", telefono: "3735 431438" },
    { division: "General San Martín", direccion: "Esq. Maipú y Urquiza", telefono: "3725422202" },
    { division: "Charata", direccion: "9 de Julio N° 575", telefono: "3624222322" },
    { division: "Juan José Castelli", direccion: "Av. Perón N° 470", telefono: "3624702665" }
  ]

  const getNumeroUnidad = (unidad: string) => {
    switch (unidad) {
      case "Metropolitana":
        setComisariaPertenece("371-")
        break;
      case "Lapachito":
        setComisariaPertenece("125-")
        break;
      case "La Leonesa":
        setComisariaPertenece("108-")
        break;
      case "Villa Ángela":
        setComisariaPertenece("261-")
        break;
      case "Charata":
        setComisariaPertenece("262-")
        break;
      case "San Martín":
        setComisariaPertenece("260-")
        break;
      case "Juan José Castelli":
        setComisariaPertenece("258-")
        break;
      case "Presidencia Roque Sáenz Peña":
        setComisariaPertenece("235-")
        break;
    }
  }

  useEffect(() => {
    const unidadesSeparadas = user.unidad.split(",")
    const unidadViolencia = "División Violencia Familiar y Género " + unidadesSeparadas[0]
    const municipio = unidadesSeparadas[1]?.trim()
    const comisaria = unidadesSeparadas[2]?.trim()
    // Busca la unidad en el array de unidad    es
    // Haz un find para encontrar la unidad que coincida con la unidadViolencia
    if (municipio == undefined && comisaria == undefined) {
      getNumeroUnidad(unidadesSeparadas[0])
      setDireccionValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.direccion)
      setTelefonoValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.telefono)
    } else if (comisaria == undefined) {

      const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);

      const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
        ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
        : null;

      setComisariaPertenece(municipioEncontrado?.prefijo + '-')
      setDireccionValor(municipioEncontrado?.direccion)
      setTelefonoValor(municipioEncontrado?.telefono)

    } else {
      const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
      const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
        ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
        : null;

      const comisariaEncontrada = municipioEncontrado && Array.isArray(municipioEncontrado.subdivisiones)
        ? municipioEncontrado.subdivisiones.find((subdivision: any) => subdivision?.value === comisaria)
        : null;

      setComisariaPertenece(comisariaEncontrada?.prefijo + '-')
      setDireccionValor(comisariaEncontrada?.direccion)
      setTelefonoValor(comisariaEncontrada?.telefono)
    }

  }, [user, unidades])

  return (
    <div>
      <div className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full ' onClick={() => setAmpliarDenuncia(false)} >Cancelar</div>
      <h1 className='text-3xl my-5 font-sans'>Ampliación de denuncias </h1>
      <form action="" onSubmit={handleSubmit(async (values) => {
        Swal.fire({
          title: '¿Está seguro de que desea enviar la ampliación de denuncia?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0C4A6E',
          cancelButtonColor: '#FF554C',
          confirmButtonText: 'Sí, enviar!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            values.modo_actuacion = "Ampliación de denuncia"
            values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente
            const fecha = new Date().setHours(0, 0, 0, 0)

            const horaActual = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')

            values.fecha = fecha
            values.hora = horaActual
            values.ampliado_de = data._id

            const denunciaAmpliada: any = await crearDenunciaSinVerificar(values)

            await agregarAmpliacionDenuncia(data._id, denunciaAmpliada._id)
            Swal.fire({
                  title: `Enviado`,
                  icon: 'success',
                  confirmButtonText: 'Ok',            
                  allowOutsideClick: false
                })
            // setAmpliarDenuncia(false)
          } else if (result.isDenied) {
            Swal.fire('No se envió la ampliación', '', 'info')
          }
        })

      })}
      >
        <h1 className='text-2xl my-5'>Expediente</h1>
        <div className='flex justify-center'>
          <InputExpediente cargaAgente={true} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
        </div>
        <div className='flex flex-row w-full justify-center'>
          <div className='flex flex-row w-full lg:w-8/10 xl:w-6/10'>
            <InputDate campo="Fecha" nombre="fecha" register={register} error={errors.fecha} type="date" />
            <InputRegister valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
            <InputRegister valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
          </div>
        </div>
        <h2 className="text-2xl my-5 font-sans">Víctima</h2>
        <div className='flex flex-col items-center justify-center md:flex-row my-2'>
          <CargarVictimaAgente valores={data} register={register} setValue={setValue} errors={errors} />
        </div>
        <h1 className='text-2xl my-5'>Denuncia</h1>
        <div className="flex flex-col w-full items-center justify-center">
          <div className='flex flex-col items-center w-2/3 justify-center '>
            <InputTextArea variante={"edit"} valor={data.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register} type="text" />
          </div>
        </div>
        <h1 className='text-2xl my-5'>Preguntas</h1>
        <div className='flex justify-center'>
          <CargarPreguntas watch={watch} genero={genero} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
        </div>
        <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
        <div className='flex flex-row items-center justify-center'>
          <div onClick={() => handlePrint()} className='flex flex-col items-center justify-center cursor-pointer mr-2 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
            Imprimir
          </div>
          <button
            className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'
          >
            Enviar denuncia
          </button>
        </div>
      </form>
    </div>
  )
}

export default CargarAmpliacion