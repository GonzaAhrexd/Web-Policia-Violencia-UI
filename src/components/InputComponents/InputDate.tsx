/* [Input Date]
  Se utiliza para crear un input de tipo date.
*/
// Hooks
import { useState } from 'react'

// Iconos
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
interface InputDateProps {
    campo: string;
    nombre: string;
    register: any;
    type?: string;
    placeholder?: string;
    error: any;
    require?: boolean;
    valor?: string;
}

function InputDate({valor, campo, nombre, register, placeholder, error, require}: InputDateProps) {
  // Estado 
  const [avisoRequerido, setAvisoRequerido] = useState(false)

  return (
        <div className={`flex flex-col w-full xl:w-1/2`}>
            <span className={`flex font-medium ml-4 `}> {campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="date"
                {...register(nombre, { required: require === false ? false : true })} defaultValue={valor} placeholder={placeholder}  />
        </div>
  )
}

export default InputDate