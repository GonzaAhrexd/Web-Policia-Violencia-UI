// Hooks
import { useEffect, useState } from 'react'
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputNumber from '../InputComponents/InputNumber'
import InputRadio from '../InputComponents/InputRadio'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
// Campos 
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
// import { vinculo } from '../../GlobalConst/vinculoCampos'

// Context
import {useCampos } from '../../context/campos'
import { generos } from '../../GlobalConst/generosCampos'
// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  watch: any;
}

function CargarVictima({watch, register, setValue, errors }: CargarVictimaProps) {
  // Estados
  const [isHijos, setIsHijos] = useState(false) // Para mostrar o no los campos de hijos si es seleccionado el checkbox hijos
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(false) // Para mostrar o no el campo de cantidad de hijos con el agresor si es seleccionado el checkbox hijos con el agresor
  const [isCondicionVulnerabilidad, setIsCondicionVulnerabilidad] = useState(false) // Para mostrar o no el campo de condición de vulnerabilidad si es seleccionado el checkbox condición de vulnerabilidad
  const [isAdultoMayor, setIsAdultoMayor] = useState(false) // Para mostrar o no el campo de adulto mayor si es seleccionado el checkbox adulto mayor
  const [isMenorEdad, setIsMenorEdad] = useState(false) // Para mostrar o no el campo de menor de edad si es seleccionado el checkbox menor de edad


  const { ocupaciones, vinculo } = useCampos();
  // Si se desmarca el checkbox hijos, se desmarca el checkbox hijos con el agresor
  useEffect(() => {
    if (!isHijos) {
      setIsHijosConAgresor(false)
    }
  }, [isHijos])

  const opcionesCondicionDeVulnerabilidad = [
    { nombre: 'Sí', value: 'si', id: "si_asistida" },
    { nombre: 'No', value: 'no', id: "no_asistida" },
  ]

  const opcionesConvivencia = [
    { nombre: 'Sí', value: 'si', id: "si_convivencia" },
    { nombre: 'No', value: 'no', id: "no_convivencia" },
  ]

  const opcionesHijos = [
    { nombre: 'Sí', value: 'si', id: "si_hijos" },
    { nombre: 'No', value: 'no', id: "no_hijos" },
  ]

  const opcionesDependenciaEconomica = [
    { nombre: 'Sí', value: 'si', id: "si_dependencia_economica" },
    { nombre: 'No', value: 'no', id: "no_dependencia_economica" },
  ]
  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} />
        <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} />
        <SelectRegisterSingle campo="Género" nombre="genero_victima" opciones={generos} setValue={setValue} error={errors.genero_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber campo="Edad" nombre="edad_victima" require={false} register={register} setValue={setValue} type="text" error={errors.edad_victima} maxLenght={2} />
        <InputNumber campo="DNI" nombre="dni_victima" require={false} register={register} setValue={setValue} type="text" error={errors.dni_victima} maxLenght={8} />
        <InputRegister campo="Domicilio" nombre="direccion_victima" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victima} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegisterSingle campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} setValue={setValue} error={errors.estado_civil_victima} />
        <SelectRegisterSingle campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} setValue={setValue} error={errors.ocupacion_victima} />
        <SelectRegisterSingle campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>Condición de vulnerabilidad</span>
        <InputRadio watch={watch} handleChange={setIsCondicionVulnerabilidad} campo="condicion_de_vulnerabilidad" nombre="condicion_de_vulnerabilidad" register={register} type="radio" opciones={opcionesCondicionDeVulnerabilidad} defaultValue={1} />
        {isCondicionVulnerabilidad && 
        <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
        <InputCheckbox campo="Embarazo" nombre="embarazo" register={register} setValue={setValue}  error={errors.embarazo} id="dependencia_economica" />
        <InputCheckbox campo="Periodo Post-parto" nombre="periodo_post_parto" register={register} setValue={setValue}  error={errors.periodo_post_parto} id="periodo_post_parto" />
        <InputCheckbox campo="Periodo de lactancia" nombre="periodo_de_lactancia" register={register} setValue={setValue}  error={errors.periodo_de_lactancia} id="periodo_de_lactancia" />
        <InputCheckbox campo="Discapacidad" nombre="discapacidad" register={register} setValue={setValue}  error={errors.discapacidad} id="discapacidad" />
        <InputCheckbox campo="Enfermedad Crónica" nombre="enfermedad_cronica" register={register} setValue={setValue}  error={errors.enfermedad_cronica} id="enfermedad_cronica" />
        <InputCheckbox setHook={setIsAdultoMayor} disabled={isMenorEdad} campo="Adulto mayor" nombre="adulto_mayor" register={register} setValue={setValue}  error={errors.adulto_mayor} id="adulto_mayor" /> 
        <InputCheckbox setHook={setIsMenorEdad} disabled={isAdultoMayor} campo="Menor de edad" nombre="menor_de_edad" register={register} setValue={setValue}  error={errors.menor_de_edad} id="menor_de_edad" /> 
        <InputCheckbox campo="Tratamiento psicológico" nombre="tratamiento_psicologico" register={register} setValue={setValue}  error={errors.tratamiento_psicologico} id="tratamiento_psicologico" />
        </div>
        }
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>¿Comparten vivienda?</span>      
        <InputRadio campo="convivencia" nombre="convivencia" register={register} type="radio" opciones={opcionesConvivencia} defaultValue={1} />
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>¿Hay Dependencia económica?</span>      
        <InputRadio campo="dependencia_economica" nombre="dependencia_economica" register={register} type="radio" opciones={opcionesDependenciaEconomica} defaultValue={1} />
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>Hijos</span>
        <InputRadio watch={watch} handleChange={setIsHijos} campo="hijos" nombre="hijos" register={register} type="radio" opciones={opcionesHijos} defaultValue={1} />
      </div>
      {isHijos &&
        <div className='bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md'>
          <div className={`grid grid-cols-1 md:grid-cols-3 my-2`}>
            <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue}  error={errors.mayor_de_18} id="mayores18" />
            <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue}  error={errors.menor_de_18} id="menores18" />
            <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue}  error={errors.menores_discapacitados} id="menoresDiscapacitados" />
            <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue}  error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />
          </div>
          {isHijosConAgresor &&
            <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} />
          }
        </div>
      }


    </div>

  )
}

export default CargarVictima