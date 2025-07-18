// Hooks
import { useEffect, useState } from 'react';
// Iconos
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormSetValue } from 'react-hook-form';
// Props
interface InputRegisterProps {
  campo: string;
  nombre: string;
  register: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  customSize?: string;
  valor?: any;
  placeholder?: string;
  require?: boolean;
  maxLenght: number;
  disabled?: boolean;
}

function InputNumber({ campo, nombre, register, setValue, error, require, valor, placeholder, disabled, maxLenght, customSize  }: InputRegisterProps) {
  // Estados
  const [avisoRequerido, setAvisoRequerido] = useState(false)
  // Si el placeholder no tiene valor, se asigna un string vacío
  placeholder = placeholder || '';
  // UseEffect para asignar el valor al campo
  useEffect(() => {
    if (valor) {
      setValue(nombre, valor);
    }
  }, [setValue, nombre, valor]);



  // Función para manejar el input
  const handleInput = (event: any) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    if (event.target.value.length > maxLenght) {
      event.target.value = event.target.value.slice(0, maxLenght); // Corta el valor a los primeros 10 caracteres
    }
  };

  return (
    <div className={customSize ? customSize : "flex flex-col md:w-1/2"}>
      <span className={`flex font-medium ml-4`}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
      <input
        disabled={disabled ? disabled : false}
        className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`}
        type="text"
        {...register(nombre, {
          required: require === false ? false : true,
          pattern: {
            value: /^[0-9]*$/,
            message: "Solo se permiten números."
          },
        })}
        placeholder={placeholder}
        onInput={handleInput}
      />
    </div>
  )
}

export default InputNumber;