import { useEffect, useState } from 'react';

interface Opcion {
    value?: string;
    nombre?: string;
}

interface Props {
    campo: string;
    nombre: string;
    opciones: Opcion[];
    setValue: any
    error: any
    isRequired?: any
    valor?: any
    mid?: boolean
    setState?: (string) => void
}

function SelectRegister({setState, campo, nombre, opciones, setValue, error, isRequired, valor, mid }: Props) {
    // Estados
    const [requiredInput,] = useState(isRequired != null ? isRequired : true)
    const [selectedOpcion, setSelectedOpcion] = useState('');
    const [, setIsEmpty] = useState(false);

    useEffect(() => {
        if (valor) {
            setSelectedOpcion(valor);
            setValue(nombre, valor)

        } else {
            setSelectedOpcion('');
        }
    }, [valor]);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === '') {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
        const value = event.target.value;
        setState && setState(value)
        setSelectedOpcion(value);
        // Actualiza el valor en react-hook-form
        setValue(nombre, value)
       
        // mid ? setValue(campo, value) : setValue(nombre, value)
    }

    return (
        <div className={`flex flex-row w-full ${!mid ? "xl:w-1/2" : "w-full"}`}>
        <div className='flex flex-col w-full'>
            <span className='ml-4 font-medium '> {campo} </span> 
            <div className={`flex flex-col 2xl:flex-col  xl:w-full`}>
            <select
                className= {"border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10" }
                name={nombre}
                value={selectedOpcion}
                onChange={handleOptionChange}
                required={requiredInput}
            >
                <option value="">{valor ? valor : `Seleccione ${campo.toLowerCase()}`}</option>
                {opciones.map((unidad: Opcion) => (
                    <option key={unidad.value} value={unidad.value}>
                        {unidad.nombre}
                    </option>
                ))}
            </select>
            {error && <span className='text-red-500 text-xs'>Este campo es requerido</span>}                 
        </div>
        </div>
    </div>
    );

}

export default SelectRegister;