/* 
__________________________________________________________________________________________________
Uso del componente:
    EditExpediente recibe los datos de los expedientes para ser mostrados y editados en el formulario
    de la sección de expediente.
    Este depende del valor de comisariaPertenece para ir variando en el número a mostrar dependiendo de 
    la comisaría a la que pertenezca.
__________________________________________________________________________________________________
*/
// Hooks
import { useEffect } from 'react';
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
    expediente?: any;
}

function EditExpediente({ expediente, campo, nombre, register, type, error, placeholder, setValue, comisariaPertenece }: InputExpedienteProps) {
    const handleDate = () => {
        //Obtener solo los últimos 2 números del año
        let date = new Date()
        let year = date.getFullYear().toString()
        return "-E/" + year
    }

    //Haz que guarde correctamente el número de expediente con un useEffect
    useEffect(() => {
        if(comisariaPertenece){ 
            setValue("numero_expediente", comisariaPertenece)
        }
    }, [comisariaPertenece])

    return (
        <div className={`flex flex-col`}>
            <span className={`font-medium ml-4`}> {nombre === "id" ? "" : campo} {error && <span className='text-red-500'>Requerido</span>} </span>
            <div className="grid grid-cols-4">
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue="130/"
                    {...register("PrefijoExpediente", { required: true })} placeholder={placeholder} />
                
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                    {...register("numero_expediente", { required: true })} placeholder={placeholder} defaultValue={expediente[1] + '-'} />
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type}
                    {...register("Expediente", { required: false })} placeholder={placeholder} defaultValue={expediente[2]} />
                
                <input className={`border open-sans border-gray-300 rounded-md h-10 xl:h-8  2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 pl-2`} type={type} defaultValue={handleDate()}
                    {...register("SufijoExpediente", { required: true })} placeholder={placeholder} />
            </div>
        </div>
    )
}

export default EditExpediente