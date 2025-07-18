/*
______________________________________________________________________________
    Uso del componente:
    EditHecho recibe los datos del hecho para ser mostrados y editados en el formulario
    de la sección de hecho.
______________________________________________________________________________ */
// Hooks
import {  useEffect, useState } from 'react'
// import { unidadCampos } from '../../GlobalConst/unidadCampos'
import { opcionesViolencia } from '../../GlobalConst/violenciaCampos'
import { opcionesModalidades } from '../../GlobalConst/modalidadesCampos'
// import { opcionesTiposDeArma } from '../../GlobalConst/tiposDeArmasCampos'
import { tiposDeViolenciaText, tiposModalidades } from '../../GlobalConst/modalTextos'
// Backend
import { getCoords } from '../../api/coordinates'
// Componentes
import InputText from '../InputComponents/InputText'
import SelectCargaDenuncias from '../Select/SelectCargaDenuncias'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputDate from '../InputComponents/InputDate'
import SimpleTableCheckorX from '../ShowData/SimpleTableCheckorX'
import EditExpediente from '../EditMode/EditExpediente'
//Iconos
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

// Contexto
import { useCampos } from '../../context/campos'

// Tipos
import Denuncia from '../../types/Denuncia';
import Tercero from '../../types/Tercero';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

// Props
interface denunciaProps {
    register: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
  errors: any
  handleOpenModal: any
  setTitulo: any
  datos: Denuncia
  datosGeograficos: any
  datosTerceros: Tercero
  setIsSolicitudAprehension: any
}

function EditHecho({ setIsSolicitudAprehension, datosTerceros, datosGeograficos, datos, setTitulo, handleOpenModal, register, setValue, errors }: denunciaProps) {
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


  // Estados
  const [expedienteDividido] = useState(dividirExpediente(datos.numero_de_expediente))
  const [comisariaPertenece, setComisariaPertenece] = useState(expedienteDividido[1] + "-")
  const [isArmas, setIsArmas] = useState(datos.empleo_de_armas)
  const [isDivision, setIsDivision] = useState(false)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(datos.denunciado_por_tercero)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')
  const [modificarDatosGeograficos, setModificarDatosGeograficos] = useState(false)
  const [barrio, setBarrio] = useState('')
  // Estados para las medidas solicitadas
  const [isProhibicionAcercamientoSolicitada, setIsProhibicionAcercamientoSolicitada] = useState(datos.medida.prohibicion_de_acercamiento)
  const [isBotonAntipanicoSolicitada, setIsBotonAntipanicoSolicitada] = useState(datos.medida.boton_antipanico)
  const [isRestitucionMenorSolicitada, setIsRestitucionMenorSolicitada] = useState(datos.medida.restitucion_de_menor)
  const [isExclusionHogarSolicitada, setIsExclusionHogarSolicitada] = useState(datos.medida.exclusion_de_hogar)
  const [isAlimentoProvisorioSolicitada, setIsAlimentoProvisorioSolicitada] = useState(datos.medida.alimento_provisorio)
  const [isDerechoComunicacionSolicitada, setIsDerechoComunicacionSolicitada] = useState(datos.medida.derecho_de_comunicacion)
  const [isRestitucionBienesSolicitada, setIsRestitucionBienesSolicitada] = useState(datos.medida.restitucion_de_bienes)
  const [isNingunaSolicitada, setIsNingunaSolicitada] = useState(datos.medida.ninguna_solicitada)
  // Estados para las medidas dispuestas
  const [isNinguna, setIsNinguna] = useState(datos.medida_dispuesta.ninguna)
  const [isProhibicion, setIsProhibicion] = useState(datos.medida_dispuesta.prohibicion_de_acercamiento)
  const [isBoton, setIsBoton] = useState(datos.medida_dispuesta.boton_antipanico)
  const [isExclusion, setIsExclusion] = useState(datos.medida_dispuesta.exclusion_de_hogar)
  const [isSolicitud, setIsSolicitud] = useState(datos.medida_dispuesta.solicitud_de_aprehension)
  const [isExpedientes, setIsExpedientes] = useState(datos.medida_dispuesta.expedientes_con_cautelar)
  const [isLibertad, setIsLibertad] = useState(datos.medida_dispuesta.en_libertad  )
  const [isCeseDeHostigamiento, setIsCeseDeHostigamiento] = useState(datos?.medida_dispuesta?.cese_de_hostigamiento? datos?.medida_dispuesta?.cese_de_hostigamiento : false)
  const [isNotificacionExpediente, setIsNotificacionExpediente] = useState(datos?.medida_dispuesta?.notificacion_expediente ? datos?.medida_dispuesta?.notificacion_expediente : false) 
  
  const { juzgadoIntervinente, vinculo, tiposDeArmas: opcionesTiposDeArma } = useCampos()
useEffect(() => {
  console.log(datos)
  setIsSolicitudAprehension(isSolicitud)
}, [isSolicitud])

  // Función para consultar las coordenadas
  const consultarCoordenadas = async () => {
    // Dirección a buscar
    let buscarDir = direccion + "," + barrio + "," + municipio;
    // Función para obtener las coordenadas
    const fetchCoords = async (query: any) => {
      try {
        // Obtener las coordenadas
        const coords = await getCoords(query);
        // Si se obtienen las coordenadas
        if (coords && coords.lat && coords.lon) {
          // Devolver las coordenadas
          const coordenadasObtenidas = coords.lat + " " + coords.lon;
          return coordenadasObtenidas;
        }
        return null;
      } catch (error) {
        console.error("Error al obtener coordenadas:", error);
        return null;
      }
    };

    // Si se ingresó una dirección
    if (buscarDir) {
      // Obtener las coordenadas con la dirección completa
      fetchCoords(buscarDir).then((response) => {
        // Si se obtuvieron coordenadas
        if (response) {
          // Si se obtuvieron coordenadas con la dirección completa
          setCoordenadas(response);
          setValue('GIS', coordenadas);
        } else {
          // Si no se obtuvieron coordenadas, intentar solo con barrio y municipio
          const buscarSinDireccion = barrio + "," + municipio;
          fetchCoords(buscarSinDireccion).then((responseSinDireccion) => {
            if (responseSinDireccion) {
              setCoordenadas(responseSinDireccion);
              setValue('GIS', coordenadas);
            } else {
              console.log("No se pudieron obtener las coordenadas.");
            }
          });
        }
      });
    }
  };
  const tipoDenunciaV2 = [
    { nombre: "Denuncia", value: "Denuncia" },
    { nombre: "Actuado por oficio", value: "Actuado por oficio" },
    { nombre: "Desobediencia judicial", value: "Desobediencia judicial" },
    { nombre: "Denuncia convencional", value: "Denuncia convencional" },
  ]
  



  return (
    <div className='w-full'>
      <InputText campo="" nombre="denuncia_id" register={register} setValue={setValue}  error={errors._id} valor={datos._id} hidden/>
      <InputText campo="" nombre="tercero_ID" register={register} setValue={setValue}  error={errors.tercero_ID} valor={datos.tercero_ID ? datos.tercero_ID : "No hay tercero"} hidden/>
      <h1 className='text-2xl my-5'>Hecho</h1>
      <div className='flex flex-col xl:flex-row'>
        <InputDate valor={new Date(datos.fecha).toISOString().slice(0, 10)} campo="Fecha" nombre="fecha" register={register}  error={errors.fecha} />
        <SelectRegisterSingle isRequired={false} valor={datos.modo_actuacion} campo="Actuación" nombre="modo_actuacion" opciones={tipoDenunciaV2} setValue={setValue} error={errors.modo_actuacion} />
      </div>

      <div className='flex flex-col my-2'>
        {modificarDatosGeograficos ?
          <SelectCargaDenuncias selectDivisiones consultarCoordenadas={consultarCoordenadas} direccion={direccion} barrio={barrio} setBarrio={setBarrio} setDireccion={setDireccion} coordenadas={coordenadas} setCoordenadas={setCoordenadas} errors={errors} setMunicipio={setMunicipio} campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="unidad_de_carga"  register={register} setValue={setValue} error={errors.unidad} state={isDivision} />
          :
          <SimpleTableCheckorX campo="Datos geográficos" datos={datosGeograficos} />
        }
        <div className='flex flex-col md:flex-row items-center justify-center w-full mt-2 '>
          <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mt-2 md:mt-0 mx-2' onClick={() => setModificarDatosGeograficos(!modificarDatosGeograficos)}>
            {!modificarDatosGeograficos ? <PencilIcon className='h-6' /> : <XMarkIcon className='h-6' />}
          </div>
        </div>
        <InputCheckbox campo="División Violencia Familiar y de Género" nombre="isDivision" register={register} setValue={setValue}  setHook={setIsDivision} state={isDivision} id="division" />
        <EditExpediente expediente={expedienteDividido} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} error={errors.expediente} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <SelectRegisterSingle isRequired={false} valor={datos.juzgado_interviniente} campo="Organismo judicial interviniente" nombre="juzgado_interviniente" opciones={juzgadoIntervinente} setValue={setValue}  error={errors.juzgado_interviniente} />
        <InputText require={false} valor={datos.juzgado_interviniente_numero} campo="Número del organismo judicial" nombre="juzgado_interviniente_numero" register={register} setValue={setValue} error={errors.juzgado_interviniente_numero} />
        <InputText customSize='flex flex-col w-full md:w-full' campo="Dependencia Derivada" nombre="dependencia_derivada" register={register} setValue={setValue} error={errors.dependencia_derivada} valor={datos.dependencia_derivada} />
      </div>
      <div className='flex flex-col md:flex-row my-2' >
        <SelectRegisterSingle isRequired={false} valor={datos.violencia} campo="Violencia" nombre="violencia" opciones={opcionesViolencia} setValue={setValue} error={errors.violencia} />
        <SelectRegisterSingle isRequired={false} valor={datos.modalidades} modal={true} setTitulo={setTitulo} info={tiposModalidades} campo="Modalidades" nombre="modalidades" opciones={opcionesModalidades} setValue={setValue} error={errors.modalidades} handleOpenModal={handleOpenModal} />
      </div>
      <>
        <span className='ml-4 font-medium  flex flex-row my-2'> Tipo de Violencia
          <QuestionMarkCircleIcon className="w-6 h-4 cursor-pointer" onClick={() => (
            setTitulo("Tipos de Violencia"),
            handleOpenModal(tiposDeViolenciaText)
          )} />

        </span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-2`}>
          <InputCheckbox campo="Física" nombre="fisica" register={register} setValue={setValue}  id="fisica" state={datos.tipo_de_violencia.Fisica} />
          <InputCheckbox campo="Psicológica" nombre="psicologica" register={register} setValue={setValue}  id="psicologica" state={datos.tipo_de_violencia.Psicologica} />
          <InputCheckbox campo="Sexual" nombre="sexual" register={register} setValue={setValue}  id="sexual" state={datos.tipo_de_violencia.Sexual} />
          <InputCheckbox campo="Económica y Patrimonial" nombre="economica_y_patrimonial" register={register} setValue={setValue}  id="economica_patrimonial" state={datos.tipo_de_violencia.Economica_y_patrimonial} />
          <InputCheckbox campo="Simbólica" nombre="simbolica" register={register} setValue={setValue}  id="simbolica" state={datos.tipo_de_violencia.Simbolica} />
          <InputCheckbox campo="Política" nombre="politica" register={register} setValue={setValue}  id="politica" state={datos.tipo_de_violencia.Politica} />
        </div>
      </>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium '> Empleo de armas </span>

        <div className='flex flex-col md:flex-row my-2'>
          <InputCheckbox campo="Empleo de Armas" nombre="empleo_de_armas" register={register} setValue={setValue}  error={errors.hijos} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
          {isArmas &&
            <>
              <SelectRegisterSingle isRequired={false} valor={datos.arma_empleada} campo="Arma empleada" nombre="tipo_de_arma" opciones={ opcionesTiposDeArma} setValue={setValue} error={errors.modalidad} />
            </>
          }
        </div>
      </div>
     
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida Solicitada por la víctima</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 rounded-md`}>
        <InputCheckbox setHook={setIsProhibicionAcercamientoSolicitada} disabled={isNingunaSolicitada} state={isProhibicionAcercamientoSolicitada} campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento" register={register} setValue={setValue}  id="prohibicion" />
        <InputCheckbox setHook={setIsBotonAntipanicoSolicitada} disabled={isNingunaSolicitada} state={isBotonAntipanicoSolicitada} campo="Botón Antipánico" nombre="boton_antipanico" register={register} setValue={setValue}  id="botonAntipanico" />
        <InputCheckbox setHook={setIsRestitucionMenorSolicitada} disabled={isNingunaSolicitada} state={isRestitucionMenorSolicitada} campo="Restitución de Menor" nombre="restitucion_de_menor" register={register} setValue={setValue}  id="restitucion" />
        <InputCheckbox setHook={setIsExclusionHogarSolicitada} disabled={isNingunaSolicitada} state={isExclusionHogarSolicitada} campo="Exclusión Hogar" nombre="exclusion_de_hogar" register={register} setValue={setValue}  id="exclusion" />
        <InputCheckbox setHook={setIsAlimentoProvisorioSolicitada} disabled={isNingunaSolicitada} state={isAlimentoProvisorioSolicitada} campo="Alimento Provisorio" nombre="alimento_provisorio" register={register} setValue={setValue}  id="alimentoProvisorio" />
        <InputCheckbox setHook={setIsDerechoComunicacionSolicitada} disabled={isNingunaSolicitada} state={isDerechoComunicacionSolicitada} campo="Derecho Comunicación" nombre="derecho_de_comunicacion" register={register} setValue={setValue}  id="derechoComunicacion" />
        <InputCheckbox setHook={setIsRestitucionBienesSolicitada} disabled={isNingunaSolicitada} state={isRestitucionBienesSolicitada} campo="Restitución de Bienes" nombre="restitucion_de_bienes" register={register} setValue={setValue}  id="restitucion_bienes" />
        <InputCheckbox setHook={setIsNingunaSolicitada} disabled={isProhibicionAcercamientoSolicitada || isBotonAntipanicoSolicitada || isRestitucionMenorSolicitada || isExclusionHogarSolicitada || isAlimentoProvisorioSolicitada || isDerechoComunicacionSolicitada || isRestitucionBienesSolicitada} state={isNingunaSolicitada} campo="Ninguna" nombre="ninguna_solicitada" register={register} setValue={setValue}  id="ninguna_solicitada" />
        <div />
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida dispuesta por la autoridad judicial</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-white rounded-md`}>
        <InputCheckbox setHook={setIsProhibicion} disabled={isNinguna} state={datos.medida_dispuesta.prohibicion_de_acercamiento } campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento_dispuesta" register={register} setValue={setValue}  id="prohibicion_dispuesta" />
        <InputCheckbox setHook={setIsBoton} disabled={isNinguna} state={datos.medida_dispuesta.boton_antipanico } campo="Botón Antipánico" nombre="boton_antipanico_dispuesta" register={register} setValue={setValue}  id="botonAntipanico_dispuesta" />
        <InputCheckbox setHook={setIsExclusion} disabled={isNinguna} state={datos.medida_dispuesta.exclusion_de_hogar} campo="Exclusión Hogar" nombre="exclusion_de_hogar_dispuesta" register={register} setValue={setValue}  id="exclusion_dispuesta" />
        <InputCheckbox setHook={setIsSolicitud} disabled={isNinguna} state={datos.medida_dispuesta.solicitud_de_aprehension} campo="Solicitud de Aprehensión" nombre="solicitud_de_aprehension_dispuesta" register={register} setValue={setValue}  id="solicitud_de_aprehension_dispuesta" />
        <InputCheckbox setHook={setIsExpedientes} disabled={isNinguna} state={datos.medida_dispuesta.expedientes_con_cautelar} campo="Expedientes c/cautelar" nombre="expedientes_con_cautelar_dispuesta" register={register} setValue={setValue}  id="expedientes_con_cautelar_dispuesta" />
        <InputCheckbox setHook={setIsLibertad} state={datos.medida_dispuesta.en_libertad} disabled={isNinguna} campo="Dado en libertad" nombre="en_libertad" register={register} setValue={setValue}  id="en_libertad" />
        <InputCheckbox setHook={setIsCeseDeHostigamiento} state={datos.medida_dispuesta.cese_de_hostigamiento} disabled={isNinguna} campo="Cese de hostigamiento" nombre="cese_de_hostigamiento" register={register} setValue={setValue} id="cese_de_hostigamiento" />
        <InputCheckbox setHook={setIsNotificacionExpediente} state={datos.medida_dispuesta.notificacion_expediente} disabled={isNinguna} campo="Notificación expediente" nombre="notificacion_expediente" register={register} setValue={setValue} id="notificacion_expediente" />
        <InputCheckbox setHook={setIsNinguna} disabled={(isProhibicion || isBoton || isExclusion || isSolicitud || isExpedientes || isLibertad || isCeseDeHostigamiento || isNotificacionExpediente)} state={datos.medida_dispuesta.ninguna} campo="Ninguna" nombre="ninguna" register={register} setValue={setValue}  id="ninguna" />
      </div>
     
      <div className='flex flex-col '>
        <span className='ml-4 font-medium '> Denunciado por tercero</span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue}  error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
        </div>
        {isDenunciadoPorTercero &&
          <>
            <div className='flex flex-col md:flex-row'>
              <InputText valor={datosTerceros.nombre} campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue}  error={errors.nombre} />
              <InputText valor={datosTerceros.apellido} campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue}  error={errors.apellido} />
              <InputText valor={datosTerceros.DNI} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue}  error={errors.DNI} />
            </div>
            <div className='flex flex-col'>
              <SelectRegisterSingle isRequired={false} valor={datos.vinculo_con_la_victima_tercero} campo="Vínculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default EditHecho