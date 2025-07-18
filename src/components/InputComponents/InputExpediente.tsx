/*
    [InputExpediente]
    Este componente se utiliza para ingresar el número de expediente, que consta de 4 partes 
    (PrefijoExpediente, Comisaría, Expediente y SufijoExpediente).
*/

import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister, UseFormSetValue } from "react-hook-form";



// Props
interface InputExpedienteProps {
    campo: string;
    nombre: string;
    setValue: UseFormSetValue<FieldValues>;
    register: UseFormRegister<FieldValues>;
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    placeholder?: string;
    valor?: string;
    comisariaPertenece?: string;
    cargaAgente?: boolean
}

function InputExpediente({ campo, nombre, register, error, placeholder, comisariaPertenece, cargaAgente }: InputExpedienteProps) {
    // Función para obtener el año actual
    const handleDate = () => {
        //Obtener solo los últimos 2 números del año
        let date = new Date()
        let year = date.getFullYear().toString()
        return "-E/" + year
    }
    return (
        <div className={`flex flex-col ${cargaAgente && "lg:w-8/10 xl:w-6/10"}`}>
            <span className={`font-medium ml-4 `}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span>
            <div className="grid grid-cols-4">
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="text" defaultValue="130/"
                    {...register("PrefijoExpediente", { required: true })} placeholder={placeholder} />
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="text"
                    {...register(nombre, { required: false })} placeholder={placeholder} defaultValue={comisariaPertenece} />
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="text"
                    {...register("Expediente", { required: false })} placeholder={placeholder} />
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type="text" defaultValue={handleDate()}
                    {...register("SufijoExpediente", { required: true })} placeholder={placeholder} />
            </div>
        </div>
    )
}

export default InputExpediente