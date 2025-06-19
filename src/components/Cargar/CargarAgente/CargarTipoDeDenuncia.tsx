// Hooks
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
// Componentes
import SelectRegister from '../../Select/SelectRegister'
import SelectRegisterSingle from '../../Select/SelectRegisterSingle';
// Usuario
import { useAuth } from '../../../context/auth'

// Props
interface TipoDenunciaProps{
  setTipoDenuncia: any;
  tipoDenuncia: string;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors;
    }

function CargarTipoDeDenuncia({setTipoDenuncia, tipoDenuncia, register, setValue, errors}: TipoDenunciaProps) {

  const { user } = useAuth()
  const userRol = user.rol

let tipoDeDenuncia = [
    { nombre: 'Denuncia', value: 'Denuncia' },
    { nombre: 'Exposición', value: 'Exposición' },
];

// Verificamos si el userRol es carga o admin
if (userRol === 'carga' || userRol === 'admin') {
    tipoDeDenuncia = [
        ...tipoDeDenuncia,
        { nombre: 'Intervención Policial', value: 'Intervención Policial' },
        { nombre: 'Actuación por Oficio', value: 'Actuación por Oficio' },
        { nombre: 'Desobediencia Judicial', value: 'Desobediencia Judicial' }
    ];
}


    const tipoDenunciaV2 = [
      { nombre: "Denuncia Penal", value: "Denuncia Penal" },
      { nombre: "Denuncia Contravencional", value: "Denuncia Contravencional" },
      ]

    

  return (
    <div className='w-full lg:w-8/10 xl:w-6/10'>
     
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegister setTipoDenuncia={setTipoDenuncia} campo="Tipo de Actuación" nombre="modo_actuacion" opciones={tipoDeDenuncia} register={register} setValue={setValue} type="text" error={errors.modo_actuacion} />
      { tipoDenuncia === "Denuncia" && 
        <SelectRegisterSingle campo="Tipo de Denuncia" nombre="modo_actuacion_2" opciones={tipoDenunciaV2} setValue={setValue} error={errors.modo_actuacionV2} />
      }

      </div>

     </div>
  )
}

export default CargarTipoDeDenuncia