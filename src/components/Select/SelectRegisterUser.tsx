/* 
    [SelectRegister]
    Este componente se utiliza para renderizar un select con opciones que se pueden dividir en subunidades y subsubunidades.

*/
// Hooks
import { useState } from 'react';

interface Opcion {
    value?: string;
    nombre?: string;
    subdivisiones?: Opcion[];
}

interface Props {
    campo: string;
    opciones: Opcion[];
    register: any
    setValue: any
    type: string
    nombre: string
    error: any
    isRequired?: any
    valor?: any
    mid?: boolean
    setTipoDenuncia?: any
    notComisaria?: boolean
    notMunicipio?: boolean
}


function SelectRegisterUser({notMunicipio, notComisaria, mid, setTipoDenuncia, campo, opciones, nombre, setValue, isRequired, valor }: Props) {
    // Estados
    const [requiredInput, ] = useState(isRequired!=null ? isRequired : true)
    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
    const [ , setIsEmpty] = useState(false);

    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === '') {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
        const value = event.target.value;
        setSelectedUnidad(value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        setTipoDenuncia && setTipoDenuncia(value)
      
    };
      
    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        setValue('unidad',  `${selectedUnidad}, ${value}`);
    };
      
    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        // Actualiza el valor en react-hook-form
        setValue('unidad', `${selectedUnidad}, ${selectedSubunidad}, ${value}`);
    };
    return (
        <div className={`flex flex-row w-full ${!mid ? "xl:w-1/2" : "w-full"}`}>
             <div className='flex flex-col w-full'>
            <span className='ml-4 font-medium '> {campo} </span> 
            <div className={`flex flex-col 2xl:flex-col  xl:w-full`}>
            <select
                className= {"border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10" }
                  name={nombre}
                    value={selectedUnidad}
                    onChange={handleUnidadChange}
                    required={requiredInput}
                >
                    <option value="">{valor ? valor : `Seleccione ${campo.toLowerCase()}`}</option>
                    {opciones.map((unidad: Opcion) => (
                        <option key={unidad.value} value={unidad.value}>
                            {unidad.nombre}
                        </option>
                    ))}
                </select>
                    

                {(selectedUnidad && !notMunicipio) && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                <div className='flex flex-row xl:h-full 2xl:h-full xl:w-full'>
                        
                        <select
                            className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                            name="subunidad"
                            value={selectedSubunidad}
                            onChange={handleSubunidadChange}>
                            <option value="">Seleccione una subunidad</option>
                            {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                <option key={subunidad.value} value={subunidad.value}>
                                    {subunidad.nombre}
                                </option>
                            ))}
                        </select>

                        {(selectedSubunidad && !notComisaria) && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones && (
                                <select
                                    className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                    name="subsubunidad"
                                    value={selectedSubsubunidad}
                                    onChange={handleSubsubunidadChange}>
                                    <option value="">Seleccione una subsubunidad</option>
                                    {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.map((subsubunidad) => (
                                        <option key={subsubunidad.value} value={subsubunidad.value}>
                                            {subsubunidad.nombre}
                                        </option>
                                    ))}
                                </select>
                        )}
                    </div>
                    
                )}
            </div>
            </div>
        </div>
    )
}

export default SelectRegisterUser