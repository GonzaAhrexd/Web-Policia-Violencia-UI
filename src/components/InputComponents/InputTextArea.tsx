// Hooks
import { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
// Props
interface InputRegisterProps {
    campo: string;
    nombre: string;
    register: UseFormRegister<FieldValues>;
    setValue?: UseFormSetValue<FieldValues>;
    edit: boolean
    valor?: string;
    placeholder?: string;
    required?: boolean;
}

function InputTextArea({ campo, nombre, register, setValue, edit, valor, placeholder , required }: InputRegisterProps) {
    const [notEnter, setNotEnter] = useState(true)
    const [avisoRequerido, setAvisoRequerido] = useState(false)
    // Si no se recibe un placeholder, se setea como string vacío
    placeholder ? placeholder : ''
    // Si se recibe un valor, se setea en el formulario directamente con setValue
    if (valor) {
        useEffect(() => {
            setValue(nombre, valor);
        }, [setValue, nombre, valor]);
    }
    return (
        <div className={`flex flex-col ${!edit ? 'w-full lg:w-8/10 xl:w-6/10' : "w-full h-56"} `}>
            <span className={`flex font-medium ml-4`}>  {campo} {(required && notEnter) && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <textarea className="border open-sans pl-4 py-5 resize-none text-lg border-gray-300 rounded-md w-full h-56 "
                {...register(nombre, { required: required === false ? false : true})} placeholder={placeholder} onChange={() => setNotEnter(false)} />
        </div>
    )
}
export default InputTextArea