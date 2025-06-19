/*
    [InputExpediente]
    Este componente se utiliza para ingresar el número de expediente, que consta de 4 partes 
    (PrefijoExpediente, Comisaría, Expediente y SufijoExpediente).
*/



// Props
interface InputExpedienteProps {
    campo: string;
    nombre: string;
    register: any;
    type: string;
    error: any;
    placeholder?: string;
    setValue?: any;
    valor?: any;
    comisariaPertenece?: any;
    expediente?: any
    cargaAgente?: boolean
}

function InputExpediente({campo, nombre, register, type, error, placeholder, comisariaPertenece, expediente, cargaAgente}: InputExpedienteProps) {
    // Función para obtener el año actual
    const handleDate = () => {
        //Obtener solo los últimos 2 números del año
        let date = new Date()
        let year = date.getFullYear().toString()
        return "-E/" + year
    }
    return (
        <div className={`flex flex-col ${cargaAgente && "lg:w-8/10 xl:w-6/10" }`}>
            <span className={`font-medium ml-4 `}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span> 
            {expediente && <span className='ml-4'>Pendiente de verificación: {expediente } </span> }
            <div className="grid grid-cols-4">
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue="130/"
                {...register("PrefijoExpediente", { required: true })} placeholder={placeholder} />            
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register(nombre, { required: false })} placeholder={placeholder} defaultValue={comisariaPertenece}/>
                            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                {...register("Expediente", { required: false })}  placeholder={placeholder} />
            <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue={handleDate()  }
                {...register("SufijoExpediente", { required: true })}  placeholder={placeholder} />
                </div>
        </div>
  )
}

export default InputExpediente