/*
 Uso del componente:
    EditVictima recibe los datos de las victimas para ser mostrados y editados en el formulario
    de la sección de victima.
    Este componente es utilizado en editSection.
*/
// Hooks
import { useState } from 'react'
//Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputRadio from '../InputComponents/InputRadio'
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import InputNumber from '../InputComponents/InputNumber'

import { useCampos } from '../../context/campos'
import { generos } from '../../GlobalConst/generosCampos'

interface CargarVictimaProps {
  datos: any;
  register: any;
  setValue: any;
  errors: any;
  watch: any;
}

function VerificarDenunciante({ watch, datos, register, setValue, errors }: CargarVictimaProps) {

  // Estados
  const [isHijos, setIsHijos] = useState(false)
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(datos.hijos ? datos.hijos.hijos_con_el_agresor > 0 : false)
  const [isCondicionVulnerabilidad, setIsCondicionVulnerabilidad] = useState(false)
  const [isAdultoMayor, setIsAdultoMayor] = useState(false) // Para mostrar o no el campo de adulto mayor si es seleccionado el checkbox adulto mayor
  const [isMenorEdad, setIsMenorEdad] = useState(false) // Para mostrar o no el campo de menor de edad si es seleccionado el checkbox menor de edad

  const { ocupaciones, vinculo } = useCampos();

  // Opciones radio
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
        <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} type="text" error={errors.nombre_victima} valor={datos.nombre} />
        <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} type="text" error={errors.apellido_victima} valor={datos.apellido} />
        <InputNumber campo="Edad" nombre="edad_victima" register={register} setValue={setValue} type="text" error={errors.edad_victima} valor={datos.edad} maxLenght={2} />
      </div>
      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber campo="DNI" nombre="dni_victima" register={register} setValue={setValue} type="text" error={errors.dni_victima} valor={datos.DNI} maxLenght={8} />
        <InputRegister campo="Domicilio" nombre="direccion_victima" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victima} valor={datos.direccion} />
        <SelectRegister campo="Género" nombre="genero_victima" opciones={generos} register={register} setValue={setValue} type="text" error={errors.genero} isRequired={false} valor={datos.genero} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victima} isRequired={false} valor={datos.estado_civil} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupacion_victima} isRequired={false} valor={datos.ocupacion} />
        <SelectRegister campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} register={register} setValue={setValue} type="text" error={errors.vinculo_con_agresor_victima} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
      </div>
      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>Condición de vulnerabilidad</span>
        <InputRadio watch={watch} handleChange={setIsCondicionVulnerabilidad} campo="condicion_de_vulnerabilidad" nombre="condicion_de_vulnerabilidad" register={register} type="radio" opciones={opcionesCondicionDeVulnerabilidad} defaultValue={1} />
        {isCondicionVulnerabilidad &&
          <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
            <InputCheckbox campo="Embarazo" nombre="embarazo" register={register} setValue={setValue}  error={errors.dependencia_economica} id="dependencia_economica" />
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
        <span className='ml-4 font-medium'>Convivencia</span>
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
            <InputCheckbox campo="Dependencia económica" nombre="dependencia_economica" register={register} setValue={setValue}  error={errors.dependencia_economica} id="dependenciaEconomica" />
            <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue}  error={errors.mayor_de_18} id="mayores18" />
            <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue}  error={errors.menor_de_18} id="menores18" />
            <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue}  error={errors.menores_discapacitados} id="menoresDiscapacitados" />
            <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue}  error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />          </div>
          {isHijosConAgresor &&
            <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} type="text" error={errors.cantidad_hijos_con_agresor} maxLenght={2} />
          }

        </div>
      }
    </div>

  )
}

export default VerificarDenunciante