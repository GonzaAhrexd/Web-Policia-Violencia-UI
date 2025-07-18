// React
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
// Librerias
import Swal from "sweetalert2"
import { pdf } from "@react-pdf/renderer"
// Contexto
import { useAuth } from "../../../context/auth"
import { useCampos } from "../../../context/campos"
import direccionDivisiones from "../../../GlobalConst/direccionDivisiones"
// Store
import { useStore } from "../../../pages/CargarDenuncias/store"
// Componentes
import CargarVictimaAgente from "../CargarAgente/CargarVictimaAgente"
import CargarInstructorYSecretario from "../CargarAgente/CargarInstructor"
import CargarPreguntas from "../CargarAgente/CargarPreguntas"
import InputExpediente from "../../InputComponents/InputExpediente"
import InputDate from "../../InputComponents/InputDate"
import InputText from "../../InputComponents/InputText"
import InputTextArea from "../../InputComponents/InputTextArea"
import PDF from "../../ReactPDF/PDFAmpliacion"
// API
import { crearDenunciaSinVerificar, agregarAmpliacionDenuncia } from "../../../api/CRUD/denunciasSinVerificar.crud"
import SelectRegisterSingle from "../../Select/SelectRegisterSingle"
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
  const [printMode, setPrintMode] = useState(false) // Controla el modo de impresión
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
          <InputExpediente cargaAgente={true} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} error={errors.expediente} />
        </div>
        <div className='flex flex-row w-full justify-center'>
          <div className='flex flex-row w-full lg:w-8/10 xl:w-6/10'>
            <InputDate campo="Fecha" nombre="fecha" register={register} error={errors.fecha} />
            <InputText valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} />
            <InputText valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} />
          </div>
        </div>
        <h2 className="text-2xl my-5 font-sans">Víctima</h2>
        <div className='flex flex-col items-center justify-center md:flex-row my-2'>
          <CargarVictimaAgente valores={data} register={register} setValue={setValue} errors={errors} />
        </div>
        <h1 className='text-2xl my-5'>Denuncia</h1>
        <div className="flex flex-col w-full items-center justify-center">
          <div className='flex flex-col items-center w-2/3 justify-center '>
            <InputTextArea edit valor={data.observaciones} campo="" nombre="observaciones" setValue={setValue} register={register}/>
          </div>
        </div>
        <h1 className='text-2xl my-5'>Preguntas</h1>
        <div className='flex justify-center'>
          <CargarPreguntas watch={watch} genero={genero} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
        </div>
        <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />

        {!printMode && (
          <div className="flex justify-center my-3">
            <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(true)}>Imprimir</div>
            <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
          </div>
        )}
        {printMode && (
          <div className="flex flex-col items-center justify-center my-3">
            <h1 className='text-2xl my-5'>Elegir tipo de hoja</h1>
            <SelectRegisterSingle campo="Tipo de Hoja" nombre="tipoHoja" setValue={setValue} error={errors.tipoHoja} opciones={
              [
                { nombre: "A4", value: "A4" },
                { nombre: "Legal", value: "LEGAL" }
              ]
            } />
            <div className='mb-1 flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => {
              handlePrint()
            }}>
              Imprimir
            </div>
            <div className='flex flex-col items-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(false)}>
              Cancelar
            </div>
          </div>

        )}

      </form>
    </div>
  )
}

export default CargarAmpliacion