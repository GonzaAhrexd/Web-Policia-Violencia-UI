// Hooks
import { useEffect, useState } from 'react';
// Iconos
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
// Props
interface InputRegisterProps {
  campo: string;
  nombre: string;
  register: any;
  type: string;
  error: any;
  variante?: any;
  valor?: any;
  placeholder?: string;
  setValue?: any;
  require?: boolean;
  notMid?: boolean;
  notMidMD?: boolean;
  busqueda?: boolean;
  maxLenght: number;
  disabled? : boolean;
}

function InputNumber({disabled, maxLenght, busqueda, notMidMD, notMid, campo, nombre, register, error, require, valor, placeholder, setValue }: InputRegisterProps) {
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

  // Función para obtener la clase del input
  function getClassName( notMid?: boolean, notMidMD?: boolean) {
    if (notMid) {
      return "flex flex-col w-full md:w-full";
    } else if (notMidMD) {
      return "flex flex-row md:w-full xl:w-1/2";
    } else if (busqueda) {
      return "flex flex-col w-full xl:w-1/2";
    } else {
      return "flex flex-col md:w-1/2";
    }
  }


  // Función para manejar el input
  const handleInput = (event: any) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    if (event.target.value.length > maxLenght ) {
      event.target.value = event.target.value.slice(0, maxLenght); // Corta el valor a los primeros 10 caracteres
    }
  };

  return (
    <div className={getClassName( notMid, notMidMD)}>
      <span className={`flex font-medium ml-4`}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
      <input
        disabled = {disabled ? disabled : false}
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