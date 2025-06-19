// Hooks
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
// Conexión con BackEnd
import { crearDenunciaSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
import { crearExposicion } from '../../api/CRUD/exposicion.crud';
// Librerías React
import Swal from 'sweetalert2'
import { pdf } from '@react-pdf/renderer';
// Componentes
import CargarVictimaAgente from '../../components/Cargar/CargarAgente/CargarVictimaAgente';
import CargarObservaciones from '../../components/Cargar/CargarObservaciones';
import CargarPreguntas from '../../components/Cargar/CargarAgente/CargarPreguntas';
import CargarInstructorYSecretario from '../../components/Cargar/CargarAgente/CargarInstructor';
import CargarTipoDeDenuncia from '../../components/Cargar/CargarAgente/CargarTipoDeDenuncia';
import PDF from './PDF';
import InputExpediente from '../../components/InputComponents/InputExpediente';
import InputRegister from '../../components/InputComponents/InputRegister';
import { useCampos } from '../../context/campos';

import { useStore } from './store';
type CargarDenunciasRolCargaProps = {
  user: any;
}

function CargarDenunciasRolAgente({ user }: CargarDenunciasRolCargaProps) {
  // Formulario
  const { watch, register, handleSubmit, setValue, getValues, formState: {
    errors
  } } = useForm()

  // Estados
  const [tipoDenuncia, setTipoDenuncia] = useState('')
  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [direccionValor, setDireccionValor] = useState('')
  const [telefonoValor, setTelefonoValor] = useState('')

  const userDivisionZona = user.unidad.split(",")
  const [isDivision,] = useState(!(userDivisionZona.length > 1));

  const { genero } = useStore((state) => ({
    genero: state.genero,
  }))

  const { unidades } = useCampos()

  // Función para imprimir
  const handleImprimir = async () => {
    const datos = getValues()
    const blob = await pdf(<PDF isBusqueda={false} genero={genero} tipoDenuncia={tipoDenuncia} datos={datos} user={user} />).toBlob();
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
    <div className='min-h-screen sm:h-full p-2 sm:p-10'>
      <h2 className='text-3xl my-5'>Cargar nueva denuncia</h2>
      <div>
        <form onSubmit={
          handleSubmit(async (values) => {

            Swal.fire({
              title: '¿Estás seguro?',
              text: "Una vez enviado, debe ser verificado.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0C4A6E',
              cancelButtonColor: '#FF554C',
              confirmButtonText: 'Sí, subir',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              // Si el usuario confirma
              if (result.isConfirmed) {

                if (values.modo_actuacion == "Exposición") {
                  crearExposicion(values)
                }
                else {
                  if (values.modo_actuacion == "Denuncia") {
                    values.modo_actuacion = values.modo_actuacion_2
                  }

                  // Crea un date con la fecha actual, pero haz que quede siempre guardado como hora 00:00
                  const now = new Date();
                  const fecha = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));


                  const horaActual = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0')

                  values.fecha = fecha
                  values.hora = horaActual


                  values.numero_de_expediente = values.PrefijoExpediente + values.numero_de_expediente + values.Expediente + values.SufijoExpediente
                  await crearDenunciaSinVerificar(values)
                }
                Swal.fire({
                  title: `${values.modo_actuacion == "Exposición" ? "Exposición" : "Denuncia"} cargada`,
                  icon: 'success',
                  confirmButtonText: 'Ok',            
                  allowOutsideClick: false
                }).then((result) => {
                  // Si el usuario confirma
                  if (result.isConfirmed) {
                    // Recarga la página
                    window.location.reload()
                  }
                })
              }
            })
          })}
        >
          <h1 className='text-2xl my-5'>Tipo de denuncia</h1>
          <div className='flex flex-col items-center justify-center'>
            <CargarTipoDeDenuncia tipoDenuncia={tipoDenuncia} setTipoDenuncia={setTipoDenuncia} register={register} setValue={setValue} errors={errors} />
          </div>
          {(tipoDenuncia != "Exposición" && tipoDenuncia != "") && (
            <>
              <h1 className='text-2xl my-5'>Expediente</h1>
              <div className='flex justify-center'>
                <InputExpediente cargaAgente={true} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
              </div>
              <div className='flex flex-col md:flex-row w-full justify-center'>
                <div className='flex flex-col md:flex-row w-full lg:w-8/10 xl:w-6/10'>
                  <InputRegister valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
                  <InputRegister valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
                </div>
              </div>
              <h1 className='text-2xl my-5'>Denunciante</h1>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>
              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones rolAgenteHidden setValue={setValue} register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas watch={watch} genero={genero} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              <div className="flex justify-center my-3">
                <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleImprimir()}>Imprimir</div>
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
              </div>
            </>
          )}
          {tipoDenuncia == "Exposición" && (
            <>
              {!isDivision &&
                <div className='flex flex-row w-full justify-center'>
                  <div className='flex flex-row w-full lg:w-6/10'>
                    <InputRegister campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
                    <InputRegister campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
                  </div>
                </div>
              }
              <h1 className='text-2xl my-5'>Expositor</h1>
              <div className='flex justify-center'>
                <CargarVictimaAgente register={register} setValue={setValue} errors={errors} />
              </div>

              <h1 className='text-2xl my-5'>Denuncia</h1>
              <div className='flex justify-center'>
                <CargarObservaciones rolAgenteHidden register={register} />
              </div>
              <h1 className='text-2xl my-5'>Preguntas</h1>
              <div className='flex justify-center'>
                <CargarPreguntas watch={watch} tipoDenuncia={tipoDenuncia} register={register} setValue={setValue} errors={errors} />
              </div>
              <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
              <div className="flex justify-center my-3">
                <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => handleImprimir()}>Imprimir</div>
                <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' type="submit">Enviar</button>
              </div>
            </>
          )}

        </form>
      </div>
    </div>

  )
}


export default CargarDenunciasRolAgente