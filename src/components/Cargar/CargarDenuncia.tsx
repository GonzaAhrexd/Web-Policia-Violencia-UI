// Hooks
import { useEffect, useState } from 'react'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectCargaDenuncias from '../Select/SelectCargaDenuncias'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputDate from '../InputComponents/InputDate'
import InputExpediente from '../InputComponents/InputExpediente'
import EditExpediente from '../EditMode/EditExpediente';
import InputNumber from '../InputComponents/InputNumber'
// Apis y BackEnd
import { getCoords } from '../../api/coordinates'
import { opcionesViolencia } from '../../GlobalConst/violenciaCampos'
import { opcionesModalidades } from '../../GlobalConst/modalidadesCampos'
// import { opcionesTiposDeArma } from '../../GlobalConst/tiposDeArmasCampos'
import { tiposDeViolenciaText, tiposModalidades } from '../../GlobalConst/modalTextos'
// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
// Librerías
import Swal from 'sweetalert2'

//Zustand
import { useStore } from '../../pages/CargarDenuncias/store'

// Contexto
import { useCampos } from '../../context/campos'

// Props
interface denunciaProps {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>;
  errors: FieldErrors
  handleOpenModal: any
  setTitulo: any
  expediente?: any
  setTercero?: any
  setOpenModalTercero?: any
  modoActuacion?: string
  fecha?: string
}

function CargarDenuncia({ fecha, modoActuacion, setTitulo, handleOpenModal, register, setValue, errors, expediente, setTercero, setOpenModalTercero }: denunciaProps) {

  const [comisariaPertenece, setComisariaPertenece] = useState('')
  const [isArmas, setIsArmas] = useState(false)
  const [isDivision, setIsDivision] = useState(false)
  const [isDenunciadoPorTercero, setIsDenunciadoPorTercero] = useState(false)
  const [municipio, setMunicipio] = useState('')
  const [coordenadas, setCoordenadas] = useState('')
  const [direccion, setDireccion] = useState('')
  const [barrio, setBarrio] = useState('')

  const [isNinguna, setIsNinguna] = useState(false)
  const [isProhibicion, setIsProhibicion] = useState(false)
  const [isBoton, setIsBoton] = useState(false)
  const [isExclusion, setIsExclusion] = useState(false)
  const [isSolicitud, setIsSolicitud] = useState(false)
  const [isExpedientes, setIsExpedientes] = useState(false)
  const [isLibertad, setIsLibertad] = useState(false)
  const [isCeseDeHostigamiento, setIsCeseDeHostigamiento] = useState(false)
  const [isNotificacionExpediente, setIsNotificacionExpediente] = useState(false)

  const { juzgadoIntervinente, vinculo, tiposDeArmas: opcionesTiposDeArma, unidades: unidadCampos } = useCampos()

  const {
    setSolicitudAprehension,
  } = useStore();

  useEffect(() => {
    setSolicitudAprehension(isSolicitud)
  }, [isSolicitud])

  const tipoDenunciaV2 = [
    { nombre: "Denuncia", value: "Denuncia" },
    { nombre: 'Intervención Policial', value: 'Intervención Policial' },
    { nombre: "Actuado por oficio", value: "Actuado por oficio" },  
    { nombre: "Desobediencia judicial", value: "Desobediencia judicial" },
    { nombre: "Denuncia convencional", value: "Denuncia convencional" },
  ]


  const consultarCoordenadas = async () => {
    let buscarDir = direccion + "," + barrio + "," + municipio;

    const fetchCoords = async (query: any) => {
      try {
        const coords = await getCoords(query);
        if (coords && coords.lat && coords.lon) {
          const coordenadasObtenidas = coords.lat + " " + coords.lon;
          return coordenadasObtenidas;
        }
        return null;
      } catch (error) {
        console.error("Error al obtener coordenadas:", error);
        return null;
      }
    };

    if (buscarDir) {
      fetchCoords(buscarDir).then((response) => {
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
              Swal.fire({
                icon: 'error',
                title: 'Error al obtener coordenadas',
                text: 'No se pudieron obtener las coordenadas de la dirección ingresada. Por favor, verifique los datos ingresados.',
                confirmButtonColor: '#0C4A6E',
                confirmButtonText: 'Aceptar'
              });

            }
          });
        }
      });
    }
  };
  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col xl:flex-row'>
        <InputDate valor={fecha} campo="Fecha" nombre="fecha" register={register} type="text" error={errors.fecha} />
        <SelectRegisterSingle isRequired={modoActuacion ? false : true} valor={modoActuacion} campo="Actuación" nombre="modo_actuacion" opciones={tipoDenunciaV2} setValue={setValue} error={errors.modo_actuacion} />
      </div>
      <div className='flex flex-col my-2'>
        <SelectCargaDenuncias selectDivisiones consultarCoordenadas={consultarCoordenadas} direccion={direccion} barrio={barrio} setBarrio={setBarrio} setDireccion={setDireccion} coordenadas={coordenadas} setCoordenadas={setCoordenadas} errors={errors} setMunicipio={setMunicipio} campo="Unidad de carga" setComisariaPertenece={setComisariaPertenece} nombre="unidad_de_carga" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} state={isDivision} />
        <InputCheckbox campo="División Violencia Familiar y de Género" nombre="isDivision" register={register} setValue={setValue} setHook={setIsDivision} state={isDivision} id="division" />
        {!expediente ?
          <InputExpediente campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} />
          :
          <EditExpediente expediente={expediente} campo="Número de Expediente" comisariaPertenece={comisariaPertenece} nombre="numero_de_expediente" register={register} setValue={setValue} type="text" error={errors.expediente} ></EditExpediente>
        }
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <SelectRegisterSingle isRequired={true} campo="Organismo judicial interviniente" nombre="juzgado_interviniente" opciones={juzgadoIntervinente} setValue={setValue} error={errors.juzgado_interviniente} />
        <InputRegister require={false} campo="Número del organismo judicial" nombre="juzgado_interviniente_numero" register={register} setValue={setValue} type="text" error={errors.juzgado_interviniente_numero} />
      </div>
      <div className='flex flex-col md:flex-row my-2' >
        <SelectRegisterSingle campo="Violencia" nombre="violencia" opciones={opcionesViolencia} setValue={setValue} error={errors.violencia} />
        <SelectCargaDenuncias setTitulo={setTitulo} info={tiposModalidades} campo="Modalidades" nombre="modalidades" opciones={opcionesModalidades} register={register} setValue={setValue} type="text" error={errors.modalidades} handleOpenModal={handleOpenModal} />

      </div>
      <>
        <span className='ml-4 font-medium flex flex-row my-2'> Tipo de Violencia
          <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (setTitulo("Tipos de Violencia"), handleOpenModal(tiposDeViolenciaText))} />
        </span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 my-2`}>
          <InputCheckbox campo="Física" nombre="fisica" register={register} setValue={setValue} id="fisica" />
          <InputCheckbox campo="Psicológica" nombre="psicologica" register={register} setValue={setValue} id="psicologica" />
          <InputCheckbox campo="Sexual" nombre="sexual" register={register} setValue={setValue} id="sexual" />
          <InputCheckbox campo="Económica y Patrimonial" nombre="economica_y_patrimonial" register={register} setValue={setValue} id="economica_patrimonial" />
          <InputCheckbox campo="Simbólica" nombre="simbolica" register={register} setValue={setValue} id="simbolica" />
          <InputCheckbox campo="Política" nombre="politica" register={register} setValue={setValue} id="politica" />
        </div>
      </>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Empleo de armas </span>
        <div className='flex flex-col md:flex-row my-2'>
          <InputCheckbox campo="Empleo de Armas" nombre="empleo_de_armas" register={register} setValue={setValue} error={errors.empleo_de_armas} setHook={setIsArmas} state={isArmas} id="empleo_de_armas" />
          {isArmas &&
            <>
              <SelectRegisterSingle campo="Arma empleada" nombre="tipo_de_arma" opciones={opcionesTiposDeArma} setValue={setValue} error={errors.tipo_de_arma} />
            </>
          }
        </div>
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida Solicitada por la víctima</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 md:border-0 bg-white rounded-md`}>
        <InputCheckbox campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento" register={register} setValue={setValue} id="prohibicion" />
        <InputCheckbox campo="Botón Antipánico" nombre="boton_antipanico" register={register} setValue={setValue} id="botonAntipanico" />
        <InputCheckbox campo="Restitución de Menor" nombre="restitucion_de_menor" register={register} setValue={setValue} id="restitucion" />
        <InputCheckbox campo="Exclusión Hogar" nombre="exclusion_de_hogar" register={register} setValue={setValue} id="exclusion" />
        <InputCheckbox campo="Alimento Provisorio" nombre="alimento_provisorio" register={register} setValue={setValue} id="alimentoProvisorio" />
        <InputCheckbox campo="Derecho Comunicación" nombre="derecho_de_comunicacion" register={register} setValue={setValue} id="derechoComunicacion" />
        <div />
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'> Medida dispuesta por la autoridad judicial</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-white rounded-md`}>
        <InputCheckbox setHook={setIsProhibicion} disabled={isNinguna} campo="Prohibición de Acercamiento" nombre="prohibicion_de_acercamiento_dispuesta" register={register} setValue={setValue} id="prohibicion_dispuesta" />
        <InputCheckbox setHook={setIsBoton} disabled={isNinguna} campo="Botón Antipánico" nombre="boton_antipanico_dispuesta" register={register} setValue={setValue} id="botonAntipanico_dispuesta" />
        <InputCheckbox setHook={setIsExclusion} disabled={isNinguna} campo="Exclusión Hogar" nombre="exclusion_de_hogar_dispuesta" register={register} setValue={setValue} id="exclusion_dispuesta" />
        <InputCheckbox setHook={setIsSolicitud} disabled={isNinguna} campo="Solicitud de Aprehensión" nombre="solicitud_de_aprehension_dispuesta" register={register} setValue={setValue} id="solicitud_de_aprehension_dispuesta" />
        <InputCheckbox setHook={setIsExpedientes} disabled={isNinguna} campo="Expedientes c/cautelar" nombre="expedientes_con_cautelar_dispuesta" register={register} setValue={setValue} id="expedientes_con_cautelar_dispuesta" />
        <InputCheckbox setHook={setIsLibertad} disabled={isNinguna} campo="Dado en libertad" nombre="en_libertad" register={register} setValue={setValue} id="en_libertad" />
        <InputCheckbox setHook={setIsNotificacionExpediente} disabled={isNinguna} campo="Notificación expediente" nombre="notificacion_expediente" register={register} setValue={setValue} id="notificacion_expediente" />
        <InputCheckbox setHook={setIsCeseDeHostigamiento} disabled={isNinguna} campo="Cese de hostigamiento" nombre="cese_de_hostigamiento" register={register} setValue={setValue} id="cese_de_hostigamiento" />
        <InputCheckbox setHook={setIsNinguna} disabled={(isProhibicion || isBoton || isExclusion || isSolicitud || isExpedientes || isLibertad || isCeseDeHostigamiento || isNotificacionExpediente)} campo="Ninguna" nombre="ninguna" register={register} setValue={setValue} id="ninguna" />
      </div>
      <InputRegister notMid campo="Dependencia Derivada" nombre="dependencia_derivada" register={register} setValue={setValue} type="text" error={errors.dependencia_derivada} />
      <div className='flex flex-col '>
        <span className='ml-4 font-medium'> Denunciado por tercero</span>
        <div className='flex flex-col md:flex-row'>
          <InputCheckbox campo="Denunciado por tercero" nombre="denunciado_por_tercero" register={register} setValue={setValue} error={errors.denunciado_por_tercero} setHook={setIsDenunciadoPorTercero} state={isDenunciadoPorTercero} id="denunciadoPorTercero" />
        </div>
        {isDenunciadoPorTercero &&
          <>
            <div className='flex flex-row items-center'>
              <h1 className='text-2xl my-5'>Datos del Tercero</h1>
              <MagnifyingGlassIcon className='bg-sky-950 hover:bg-sky-700 flex items-center text-white justify-center cursor-pointer font-bold py-2 mx-5 rounded w-10 h-10' onClick={() => setOpenModalTercero(true)} />
            </div>
            {!setTercero ?
              <div className='flex flex-col md:flex-row'>
                <InputRegister campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre_tercero} />
                <InputRegister campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido_tercero} />
                <InputNumber maxLenght={8} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.dni_tercero} />
              </div>
              :
              <div className='flex flex-col md:flex-row'>
                <InputRegister valor={setTercero.nombre} campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} type="text" error={errors.nombre} />
                <InputRegister valor={setTercero.apellido} campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} type="text" error={errors.apellido} />
                <InputNumber maxLenght={8} valor={setTercero.DNI} campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} type="text" error={errors.DNI} />
              </div>
            }
            <div className='flex flex-col'>
              <SelectRegisterSingle campo="Vínculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor} />
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default CargarDenuncia