// Componentes
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputNumber from '../InputComponents/InputNumber'

// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'

// Contexto
import { useCampos } from '../../context/campos'

// Hooks
import { useState } from 'react'

interface CargarVictimarioProps {
  datos: any;
  register: any;
  setValue: any;
  errors: any;
  md?: boolean;
  existente?: any;
}

function EditVictimario({ existente, md, datos, register, setValue, errors }: CargarVictimarioProps) {

  const { ocupaciones } = useCampos();

  const [isAprehendido, setIsAprehendido] = useState(datos.esta_aprehendido)
  const [isLiberado, setIsLiberado] = useState(datos.fue_liberado)


  return (
    <div className={`w-full ${md && "lg:w-6/10"}`}>
      {!existente && <h1 className='text-2xl my-5'>Victimario</h1>}
      <InputRegister campo="" nombre="victimario_ID" register={register} setValue={setValue} type="hidden" error={errors.nombre_victima} valor={datos._id} />
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victimario" register={register} setValue={setValue} type="text" error={errors.nombre_victimario} valor={datos.nombre} />
        <InputRegister campo="Apellido" nombre="apellido_victimario" register={register} setValue={setValue} type="text" error={errors.apellido_victimario} valor={datos.apellido} />
      </div>
      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber require={false} campo="Edad" nombre="edad_victimario" register={register} setValue={setValue} type="text" error={errors.edad_victimario} valor={datos.edad} maxLenght={2} />
        <InputNumber require={false} maxLenght={8} campo="DNI" nombre="dni_victimario" register={register} setValue={setValue} type="text" error={errors.dni_victimario} valor={datos.DNI != "S/N" ? datos.DNI : ""} />
        <InputRegister campo="Domicilio" nombre="direccion_victimario" require={false} register={register} setValue={setValue} type="text" error={errors.direccion_victimario} valor={datos.direccion} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister campo="Estado Civil" nombre="estado_civil_victimario" opciones={estadoCivil} register={register} setValue={setValue} type="text" error={errors.estado_civil_victimario} valor={datos.estado_civil} isRequired={false} />
        <SelectRegister campo="Ocupación" nombre="ocupacion_victimario" opciones={ocupaciones} register={register} setValue={setValue} type="text" error={errors.ocupaciones_victimario} valor={datos.ocupacion} isRequired={false} />
      </div>
      <>
        <span className='ml-4 font-medium '>Detalles</span>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}>
          <InputCheckbox campo="Abuso de Alcohol" nombre="abuso_de_alcohol" register={register} setValue={setValue}  id="abusoAlcohol" state={datos.abuso_de_alcohol} />
          <InputCheckbox campo="Antecedentes toxicológicos" nombre="antecedentes_toxicologicos" register={register} setValue={setValue}  id="antecedentesToxicologicos" state={datos.antecedentes_toxicologicos} />
          <InputCheckbox campo="Antecedentes psicológicos" nombre="antecedentes_psicologicos" register={register} setValue={setValue}  id="antecedentesPsicologicos"  state={datos.antecedentes_psicologicos} />
          <InputCheckbox campo="Antecedentes penales" nombre="antecedentes_penales" register={register} setValue={setValue}  id="antecedentesPenales" state={datos.antecedentes_penales} />
          <InputCheckbox campo="Antecedentes contravencionales" nombre="antecedentes_contravencionales" register={register} setValue={setValue}  id="antecedentesConvencionales" state={datos.antecedentes_contravencionales} />
          <InputCheckbox campo="Entrenamiento en  combate" nombre="entrenamiento_en_combate" register={register} setValue={setValue}  id="entrenamientoCombate" state={datos.entrenamiento_en_combate} />
        </div>
        <span 
        className='ml-4 font-medium '>Detalles de aprehensión</span>
      {/* Haz que sean dos inputs de tipo radio que sean excluyentes, uno con aprehension y otro con en libertad */}
          <div>
            <InputCheckbox setHook={setIsAprehendido} disabled={isLiberado} campo="Aprehensión" nombre="esta_aprehendido" register={register} setValue={setValue}  id="aprehendido" state={datos.esta_aprehendido} />
            <InputCheckbox setHook={setIsLiberado} disabled={isAprehendido} campo="En libertad" nombre="fue_liberado" register={register} setValue={setValue}  id="liberado" state={datos.fue_liberado} />
          </div>
      </>

    </div>
  )
}

export default EditVictimario 