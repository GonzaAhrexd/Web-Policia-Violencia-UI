// Hook
import { useEffect, useState } from 'react'
// Iconos
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface InputRegisterProps {
    campo: string;
    nombre: string;
    setValue: UseFormSetValue<FieldValues>;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    valor?: any;
    placeholder?: string;
    require?: boolean;
    state: any;
    setState: (value: string) => void;
}

function InputDireccion ({state, setState, campo, nombre, register, error, require, valor, placeholder, setValue }: InputRegisterProps) {
    // Estado
    const [avisoRequerido, setAvisoRequerido] = useState(false)
    // Placeholder
    placeholder ? placeholder : ''
    // Si se ingresa require, se asigna el valor, sino se asigna true
    require ? require : true

    // Si se ingresa un valor, se asigna el valor al campo
    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }

    return (
        <div className={`flex flex-col xl:w-1/2`}>
            <span className={`flex font-medium ml-4 `}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="text"
                {...register(nombre, {  required: require === false ? false : true })} placeholder={placeholder} onChange={(e) => setState(e.target.value)} value={state && state}/>
        </div>
    )
}

export default InputDireccion