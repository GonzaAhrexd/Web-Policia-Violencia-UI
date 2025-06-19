// Hooks
import { useEffect, useState } from 'react'
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
    disabled?: boolean;
    customSize?: string;
}

function InputRegister({customSize, busqueda, disabled, notMidMD, notMid, campo, nombre, register, type, error, require, valor, placeholder, setValue }: InputRegisterProps) {
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

    // Función para obtener el nombre de la clase dependiendo del campo
    function getClassName(campo:String, nombre:String, notMid:any, notMidMD:any, customSize:string) {
        if(customSize != ""){
            return customSize;
        }
        else if (campo === 'Barrio' || nombre === 'numero_de_expediente') {
            return "flex flex-col w-full xl:w-1/2";
        } else if (notMid) {
            return "flex flex-col w-full md:w-full";
        } else if (notMidMD) {
            return "flex flex-col md:w-full xl:w-1/2";
        } else if (busqueda) {
            return "flex flex-col w-full xl:w-1/2";
        } else {
            return "flex flex-col md:w-1/2";
        }
    }

    return (
        <div className={getClassName(campo, nombre, notMid, notMidMD, customSize ? customSize : "")}>
            <span className={`flex font-medium ml-4`}> {nombre === "id" ? "" : campo} {error && <ExclamationCircleIcon className='w-6 text-red-600 cursor-pointer' onMouseEnter={() => setAvisoRequerido(true)} onMouseLeave={() => setAvisoRequerido(false)} />} {avisoRequerido && <span className="text-red-600">Requerido</span>} </span>
            <input disabled={disabled ? disabled : false} className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 ${campo === "Cantidad" && "xl:w-12"} 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={(type == "text" || type == "number") ? "text" : type}
                {...register(nombre, { required: require === false ? false : true })} placeholder={placeholder} min={0} max={(nombre == "edad_victima") || (nombre == "edad_victimario") ? "130" : "null"}
            />
        </div>
    )
}

export default InputRegister