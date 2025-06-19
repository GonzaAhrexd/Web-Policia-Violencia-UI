// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import InputRegister from '../../InputComponents/InputRegister'
import SelectRegisterSingle from '../../Select/SelectRegisterSingle'
// Campos 
import { jerarquiaCampos } from '../../../GlobalConst/jerarquiaCampos';

// Props
interface CargarVictimaProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
}

function CargarInstructorYSecretario({ register, setValue, errors }: CargarVictimaProps) {

  // Toma jerarquiaCampos, pero elimina "Civil"
  const jerarquiaCamposSinCivil = jerarquiaCampos.filter((campo) => campo.value !== 'Civil')


  return (
    <>
      <h1 className='text-2xl my-5'>Instructor</h1>
      <div className='flex justify-center'>
        <div className='w-full lg:w-8/10 xl:w-6/10'>
          <div className='flex flex-col lg:flex-row my-2'>
            <InputRegister notMidMD campo="Nombre y apellido" nombre="nombre_completo_instructor" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegisterSingle campo='Jerarquía' nombre="jerarquia_instructor" opciones={jerarquiaCampos} setValue={setValue}  error={errors.jerarquia_instructor} />
          </div>
        </div>
      </div>
      <h1 className='text-2xl my-5'>Secretario</h1>
      <div className='flex justify-center'>
        <div className='w-full lg:w-8/10 xl:w-6/10'>
          <div className='flex flex-col lg:flex-row my-2'>
            <InputRegister notMidMD campo="Nombre y apellido" nombre="nombre_completo_secretario" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegisterSingle campo='Jerarquía' nombre="jerarquia_secretario" opciones={jerarquiaCamposSinCivil} setValue={setValue}  error={errors.jerarquia_instructor} />
            <InputRegister require={false} notMidMD campo="Plaza" nombre="plaza_secretario" register={register} setValue={setValue} type="text" error={errors.plaza} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CargarInstructorYSecretario