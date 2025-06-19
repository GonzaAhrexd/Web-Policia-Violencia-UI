// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
// Componentes
import InputRadio from '../../InputComponents/InputRadio'
import InputTextArea from '../../InputComponents/InputTextArea'

// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  tipoDenuncia: string;
  watch?: any;
  genero?: string;
}

function CargarPreguntas({genero, watch, tipoDenuncia, register }: CargarVictimaProps) {

  const [isAgregado, setIsAgregado] = useState(false)

  const opcionesAsistidaPorDichoOrganismo = [
    { nombre: 'Sí', value: 'si', id: "si_asistida" },
    { nombre: 'No', value: 'no', id: "no_asistida" },
  ]

  const opcionesExaminadaMedicoPolicial = [
    { nombre: 'Sí', value: 'si', id: "si_examinacion_medica" },
    { nombre: 'No', value: 'no', id: "no_examinacion_medica" },
  ]

  const opcionesAccionarPenalmente = [
    { nombre: 'Sí', value: 'si', id: "si_accion_penal" },
    { nombre: 'No', value: 'no', id: "no_accion_penal" },
  ]

  const opcionesAgregarQuitarOEnmendarAlgo = [
    { nombre: 'Sí', value: 'si', id: "si_agregado" },
    { nombre: 'No', value: 'no', id: "no_agregado" },
  ]
  if (tipoDenuncia != "Exposición") {
    return (
      <div className='w-full lg:w-8/10 xl:w-6/10'>
        {genero == "Femenino" &&
          <div className='flex flex-col my-2'>
            <p> Se le hace saber que existe la Línea 137, ubicado en Calle Mitre N° 171 en la Ciudad de Resistencia, donde se brinda asesoramiento legal y
              asistencia psicológica las 24 horas del día de manera GRATUITA, y la Línea 102 ubicado en Avenida Sarmiento
              N° 1675, Ciudad de Resistencia.</p>
            <span className='ml-4 font-medium  my-2'> ¿Desea ser asistid{genero == "Femenino" ? "a" : "o"} por dicho organismo? </span>
            <InputRadio campo="AsistidaPorDichoOrganismo" nombre="AsistidaPorDichoOrganismo" register={register}  type="radio" opciones={opcionesAsistidaPorDichoOrganismo} defaultValue={3} />
          </div>
        }
        <div className='flex flex-col my-2'>
          <span className='ml-4 font-medium  my-2'> ¿Desea ser examinad{genero == "Femenino" ? "a" : "o"} por el medico policial en turno? </span>
          <InputRadio campo="ExaminadaMedicoPolicial" nombre="ExaminadaMedicoPolicial" register={register}  type="radio" opciones={opcionesExaminadaMedicoPolicial} defaultValue={3} />
        </div>
        <div className='flex flex-col my-2'>
          <span className='ml-4 font-medium  my-2'> ¿Desea accionar penalmente por el delito que diera lugar? </span>
          <InputRadio campo="AccionarPenalmente" nombre="AccionarPenalmente" register={register}  type="radio" opciones={opcionesAccionarPenalmente} defaultValue={3} />
        </div>
        <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium  my-2'> ¿Desea agregar, quitar o enmendar algo a lo expuesto precedentemente? </span>
        <InputRadio handleChange={setIsAgregado} state={isAgregado} watch={watch} campo="AgregarQuitarOEnmendarAlgo" nombre="AgregarQuitarOEnmendarAlgo" register={register} type="radio" opciones={opcionesAgregarQuitarOEnmendarAlgo} defaultValue={3} />
       </div>
        {isAgregado &&
        <div className='flex flex-col my-2'>
          <InputTextArea variante={"edit"} campo="Agrega" nombre="agrega" register={register} type="textarea"></InputTextArea>
          </div>
        }
      </div>
    )
  } else {
    return ( 
      <div className='w-full lg:w-6/10'>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium my-2'> ¿Desea agregar, quitar o enmendar algo a lo expuesto precedentemente? </span>
        <InputRadio handleChange={setIsAgregado} state={isAgregado} watch={watch} campo="AgregarQuitarOEnmendarAlgo" nombre="AgregarQuitarOEnmendarAlgo" register={register} type="radio" opciones={opcionesAgregarQuitarOEnmendarAlgo} defaultValue={3} />
       </div>
        {isAgregado &&
        <div className='flex flex-col my-2'>
          <InputTextArea variante={"edit"} campo="Agrega" nombre="agrega" register={register} type="textarea"></InputTextArea>
          </div>
        }
      </div>
      )
    
  }
}

export default CargarPreguntas