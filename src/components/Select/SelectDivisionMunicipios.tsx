/*
    [SelectDivisionMunicipios]
        Se encarga de mostrar un select con divisiones de municipios, comisarías, etc.
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
    selectDivisiones?: boolean;
}



function SelectDivisionMunicipios({selectDivisiones, campo, opciones, nombre, setValue, isRequired, valor }: Props) {

    // Estados
    const [requiredInput,] = useState(isRequired != null ? isRequired : true)
    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
     const [municipiosTodo, setMunicipiosTodo] = useState([]);
    const [showAllMunicipios, setShowAllMunicipios] = useState(false);
    const [, setIsEmpty] = useState(false);

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

        setValue('division', value);

    };
     const getAllMunicipios = () => {
        // Obtiene todos los municipios de las opciones
        const municipios: string[] = [];
        opciones.forEach((unidad: Opcion) => {
            unidad.subdivisiones?.forEach((subunidad: Opcion) => {
                if (subunidad.value) {
                    municipios.push(subunidad.value);
                }
            });
        });
        // Elimina los duplicados y ordena alfabéticamente
        return Array.from(new Set(municipios)).sort();
    }

    const handleMostrarTodo = () => {
        setShowAllMunicipios(!showAllMunicipios)
        setMunicipiosTodo(getAllMunicipios());
    }



    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        // Actualiza el valor en react-hook-form
        setValue('municipio', `${value}`);
    };

    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        // Actualiza el valor en react-hook-form
        setValue('comisaria', `${value}`);
    };
    return (
        <div className={`flex flex-row w-full xl:w-1/2`}>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium '> {campo} </span>
                <div className={`flex flex-col 2xl:flex-col  ${campo == "Unidad" ? "xl:w-full 2xl:w-full 2xl:h-10 xl:h-12 xl:mb-5" : "xl:w-full"}`}>
                    <select
                        className={campo == "Unidad" ? "border open-sans mt-0.5 border-gray-300 rounded-md w-95/100 h-10 xl:h-8/10 mx-3 xl:w-full 2xl:h-10 2xl:w-full " : "border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"}
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
                      {selectDivisiones &&
                    <div className='flex flex-col items-center justify-center'>
                    <div className=' hover:cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center mt-2 md:mt-0' onClick={() => handleMostrarTodo()}>{showAllMunicipios ? "Mostrar reducido" : "Mostrar todos los municipios"}</div>
                    </div>
                    }
                    {selectedUnidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                        <div className='flex flex-row xl:h-full 2xl:h-full xl:w-full'>
                            <select
                                className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                name="subunidad"
                                value={selectedSubunidad}
                                onChange={handleSubunidadChange}>
                                <option value="">Seleccione el municipio</option>
                                { !showAllMunicipios ?
                                 opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                    <option key={subunidad.value} value={subunidad.value}>
                                        {subunidad.nombre}
                                    </option>
                                )) : 
                                 municipiosTodo.map((municipio: string) => (
                                    <option key={municipio} value={municipio}>
                                        {municipio}
                                    </option>
                                ))
                                }
                            </select>
                            {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones && (
                                <select
                                    className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                    name="subsubunidad"
                                    value={selectedSubsubunidad}
                                    onChange={handleSubsubunidadChange}>
                                    <option value="">Seleccione la comisaría</option>
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

export default SelectDivisionMunicipios