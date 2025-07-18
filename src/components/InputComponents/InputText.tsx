// Hooks
import { useEffect, useState } from 'react'
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
    valor?: string | number;
    placeholder?: string;
    require?: boolean;
    disabled?: boolean;
    customSize?: string;
    hidden?: boolean
    pass?: boolean
}

function InputText({ campo, nombre, register, setValue, error, require, valor, placeholder, hidden, pass, customSize, disabled }: InputRegisterProps) {
    // Estados
    const [avisoRequerido, setAvisoRequerido] = useState(false)
    // Si no se recibe un placeholder, se setea como string vacío
    placeholder ? placeholder : ''
    // Si se recibe un valor, se setea en el formulario directamente con setValue
    useEffect(() => {
        if (valor) {
            setValue(nombre, valor);
        }
    }, [setValue, nombre, valor]);

    return (
        <div className={customSize ? customSize : "flex flex-col md:w-1/2"}>
            <span className={`flex font-medium ml-4`}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <input disabled={disabled ? disabled : false} className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} 
                {...register(nombre, { required: require === false ? false : true })} type={hidden ? "hidden" : pass ? "password" : "text"} placeholder={placeholder} min={0} max={(nombre == "edad_victima") || (nombre == "edad_victimario") ? "130" : "null"}
            />
        </div>
    )
}

export default InputText