// Hooks
import { useEffect } from 'react'
import { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'

// Props
type props = {
    nombre: string
    campo: any
    state?: boolean
    id?: string
    opciones?: Radio[]
    defaultValue?: number
    register: UseFormRegister<FieldValues>;
    watch?: UseFormWatch<FieldValues>
    handleChange?: (value: boolean) => void
}

type Radio = {
    value: string;
    nombre: string;
    id?: string;
}

function InputRadio({watch, register, nombre, defaultValue, handleChange, opciones }: props) {
    // watchRadio para ver si el radio button está seleccionado
    let watchRadio:any;
    // Si se recibe un watch, se asigna el valor a watchRadio
    watch ? watchRadio = watch(nombre) : watchRadio = null
    // UseEffect para asignar el valor al campo
    
    useEffect(() => {
        if (watchRadio) {
            handleChange(watchRadio == "Sí")
        }
    }, [watchRadio])
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {opciones.map((opcion: any, index: number) => (
                <div className="flex justify-start items-center" key={opcion.id}>
                    <div>
                        <input
                            className="cursor-pointer border open-sans border-gray-300 rounded-md h-6 xl:h-6 xl:w-5 2xl:h-6 my-2 xl:my-1 xl:m-2 m-4 pl-2"
                            type="radio"
                            id={opcion.id}
                            {...register(nombre)}
                             value={opcion.nombre}
                            defaultChecked={index === defaultValue}
                        />
                    </div>
                    <div>
                        <label htmlFor={opcion.id} className="cursor-pointer font-medium xl:text-sm">
                            {opcion.nombre}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InputRadio