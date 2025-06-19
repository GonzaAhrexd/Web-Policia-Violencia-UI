// Componentes
import InputNumber from "../InputComponents/InputNumber"
import InputRadio from "../InputComponents/InputRadio"
import InputRegister from "../InputComponents/InputRegister"
import SelectRegisterSingle from "../Select/SelectRegisterSingle"
// Contexto
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { useCampos } from '../../context/campos'

// Tipos
type EditVictimaExposicionProps = {
  datos: any,
  register: any,
  setValue: any,
  errors: any
}


function EditVictimaExposicion({ datos, register, setValue, errors }: EditVictimaExposicionProps) {
  // Obtiene las ocupaciones del contexto 
  const { ocupaciones } = useCampos();

  // Opciones para el campo "Sabe leer y escribir"
  const opcionesSabeLeerYEscribir = [
    { nombre: 'Sí', value: 'si', id: "si_leer_escribir" },
    { nombre: 'No', value: 'no', id: "no_leer_escribir" },
  ]

  return (
    <div className='w-full lg:w-6/10'>
      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nombre" nombre="nombre_victima" valor={datos.nombre_victima} register={register} setValue={setValue} type="text" error={errors.nombre_victima} />
        <InputRegister campo="Apellido" nombre="apellido_victima" valor={datos.apellido_victima} register={register} setValue={setValue} type="text" error={errors.apellido_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo="Nacionalidad" nombre="nacionalidad_victima" valor={datos.nacionalidad_victima} register={register} setValue={setValue} type="text" error={errors.nacionalidad_victima} />
        <InputNumber campo="Edad" nombre="edad_victima" valor={datos.edad_victima} register={register} setValue={setValue} type="text" error={errors.edad_victima} maxLenght={2} />
      </div>

      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegisterSingle isRequired={false} campo="Estado Civil" nombre="estado_civil_victima" valor={datos.estado_civil_victima} opciones={estadoCivil} setValue={setValue} error={errors.estado_civil_victima} />
        <SelectRegisterSingle isRequired={false} campo="Ocupación" nombre="ocupacion_victima" valor={datos.ocupacion_victima} opciones={ocupaciones} setValue={setValue} error={errors.ocupacion_victima} />
      </div>

      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber campo="Teléfono celular" nombre="telefono_victima" valor={datos.telefono_victima} register={register} setValue={setValue} type="text" maxLenght={10} error={errors.nacionalidad_victima} />
        <InputNumber campo="DNI" nombre="dni_victima" valor={datos.DNI_victima} register={register} setValue={setValue} type="text" error={errors.dni_victima} maxLenght={8} />
        <InputRegister campo="Domicilio" nombre="direccion_victima" valor={datos.direccion_victima} register={register} setValue={setValue} type="text" error={errors.nacionalidad_victima} />
      </div>

      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium my-2'> ¿Sabe leer y escribir?</span>
        <InputRadio defaultValue={datos.sabe_leer_y_escribir_victima} campo="SabeLeerYEscribir" nombre="SabeLeerYEscribir" register={register} type="radio" opciones={opcionesSabeLeerYEscribir} />
      </div>

    </div>
  )
}

export default EditVictimaExposicion