import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type Opcion = {
    value: string;
    nombre: string;
    subdivisiones?: Opcion[]; // Opcional, indica que puede tener subniveles
}

type SelectRegisterSingleProps = {
    campo: string; // Etiqueta principal (e.g., "Género", "Tipo de Denuncia", "Unidad")
    nombre: string; // Nombre del campo principal para react-hook-form
    opciones: Opcion[]; // Opciones para el primer nivel de select
    setValue: any; // De react-hook-form
    error?: any; // Para mostrar errores de validación de react-hook-form
    isRequired?: boolean;
    valor?: any; // Valor predeterminado para el select principal
    mid?: boolean; // Prop para estilos condicionales (width)
    // Props específicas para el caso de SelectRegister (con cascada)
    notComisaria?: boolean;
    notMunicipio?: boolean;
    // Props específicas para el caso de SelectDivisionMunicipios
    selectDivisiones?: boolean; // Si es true, usa lógica de divisiones y botón "Mostrar todos"
    // Props para el modal del Select simple
    modal?: boolean; // Si es true, muestra el icono de ayuda y permite abrir un modal
    setTitulo?: (titulo: string) => void; // Para establecer el título del modal
    setState?: (value: string) => void; // Para el select simple
    info?: any;
    handleOpenModal?: any;
}

function SelectRegisterSingle({ campo, nombre, opciones, setValue, error, isRequired = true, valor, mid, notComisaria, notMunicipio, selectDivisiones, modal, setTitulo, setState, info, handleOpenModal }: SelectRegisterSingleProps) {
    // Determina si es un select simple o en cascada
    const isCascading = opciones.some(op => op.subdivisiones && op.subdivisiones.length > 0);

    // Estados para selects en cascada
    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');

    // Estado para el select simple
    const [selectedOpcionSimple, setSelectedOpcionSimple] = useState('');

    // Estados para SelectDivisionMunicipios
    const [municipiosTodo, setMunicipiosTodo] = useState<string[]>([]);
    const [showAllMunicipios, setShowAllMunicipios] = useState(false);

    // Inicialización de valores con 'valor' prop
    useEffect(() => {
        if (valor) {
            if (isCascading) {
                // Para selects en cascada, si valor es una cadena, solo inicializa la primera unidad
                // Si 'valor' representa una ruta completa, esto se vuelve más complejo
                setSelectedUnidad(valor);
                // Aquí necesitarías una lógica para parsear 'valor' si es una cadena como "unidad,subunidad,subsubunidad"
                // y setear los estados de subunidad y subsubunidad. Por simplicidad, solo el primer nivel.
                if (selectDivisiones) {
                    setValue('division', valor); // Si es el de divisiones
                } else {
                    setValue(nombre, valor); // Si es el de registro general
                }
            } else {
                setSelectedOpcionSimple(valor);
                setValue(nombre, valor);
            }
        } else {
            // Limpiar estados si valor no está presente
            if (isCascading) {
                setSelectedUnidad('');
                setSelectedSubunidad('');
                setSelectedSubsubunidad('');
            } else {
                setSelectedOpcionSimple('');
            }
        }
    }, [valor, nombre, setValue, isCascading, selectDivisiones]);


    // --- Handlers para select simple ---
    const handleOptionChangeSimple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value; // Obtiene el valor seleccionado
        setSelectedOpcionSimple(value); // Actualiza el estado local
        setValue(nombre, value); // Para pasarle el valor a react-hook-form
        setState && setState(value); // Para establecer el estado si es que se pasa
    };

    // --- Handlers para selects en cascada ---
    const handleUnidadChangeCascada = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value; // Obtiene el valor seleccionado
        setSelectedUnidad(value); // Actualiza el estado local
        setSelectedSubunidad(''); // Limpia subunidad y subsubunidad al cambiar unidad
        setSelectedSubsubunidad(''); // Limpia subsubunidad al cambiar unidad

        if (selectDivisiones) { // Si es un select de divisiones
            setValue('division', value); // Actualiza el valor de división
            setValue('municipio', ''); // Limpia municipio al cambiar división
            setValue('comisaria', ''); // Limpia comisaría al cambiar división
        } else {
            setValue(nombre, value); // Actualiza el valor del campo principal
        }
    };

    const handleSubunidadChangeCascada = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value; // Obtiene el valor seleccionado
        setSelectedSubunidad(value); // Actualiza el estado local
        setSelectedSubsubunidad(''); // Limpia subsubunidad al cambiar subunidad

        if (selectDivisiones) {
            setValue('municipio', value);
            setValue('comisaria', '');
        } else {
            setValue('unidad', `${selectedUnidad}, ${value}`); // Asumiendo que 'unidad' es el campo
        }
    };

    const handleSubsubunidadChangeCascada = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);

        if (selectDivisiones) {
            setValue('comisaria', value);
        } else {
            setValue('unidad', `${selectedUnidad}, ${selectedSubunidad}, ${value}`); // Asumiendo que 'unidad' es el campo
        }
    };

    // Lógica para "Mostrar todos los municipios"
    const getAllMunicipios = () => {
        const municipios: string[] = [];
        opciones.forEach((unidad: Opcion) => {
            unidad.subdivisiones?.forEach((subunidad: Opcion) => {
                if (subunidad.value && !municipios.includes(subunidad.value)) {
                    municipios.push(subunidad.value);
                }
            });
        });
        return municipios.sort((a, b) => a.localeCompare(b));
    };

    const handleMostrarTodo = () => {
        setShowAllMunicipios(!showAllMunicipios);
        if (!showAllMunicipios && municipiosTodo.length === 0) {
            setMunicipiosTodo(getAllMunicipios());
        }
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        setValue('municipio', '');
        setValue('comisaria', '');
    };

    // Datos para selects en cascada
    const selectedUnidadData = opciones.find((unidad: Opcion) => unidad.value === selectedUnidad);
    const selectedSubunidadData = selectedUnidadData?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad);

    return (
        <div className={`flex flex-row w-full ${!mid ? "xl:w-1/2" : "w-full"}`}>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center justify-start'>
                    <span className='ml-4 font-medium '> {campo} </span>
                    {/* El modal solo para el select simple */}
                    {!isCascading && modal && (
                        <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (
                            setTitulo && setTitulo(campo), // Solo llama si está definida
                            handleOpenModal && handleOpenModal(info) // Solo llama si está definida
                        )} />
                    )}
                </div>

                <div className={`flex flex-col 2xl:flex-col ${campo === "Unidad" && isCascading ? "xl:w-full 2xl:w-full 2xl:h-10 xl:h-12 xl:mb-5" : "xl:w-full"}`}>
                    {/* Renderizado condicional del select */}
                    {!isCascading ? (
                        // --- CASO: SELECT SIMPLE ---
                        <select
                            className={"border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"}
                            name={nombre}
                            value={selectedOpcionSimple}
                            onChange={handleOptionChangeSimple}
                            required={isRequired}
                        >
                            <option value="">{valor ? valor : `Seleccione ${campo.toLowerCase()}`}</option>
                            {opciones.map((opcion: Opcion) => (
                                <option key={opcion.value} value={opcion.value}>
                                    {opcion.nombre}
                                </option>
                            ))}
                        </select>
                    ) : (
                        // --- CASO: SELECTS EN CASCADA ---
                        <>
                            {/* Primer Select (Unidad/División) */}
                            <select
                                className={campo === "Unidad" ? "border open-sans mt-0.5 border-gray-300 rounded-md w-95/100 h-10 xl:h-8/10 mx-3 xl:w-full 2xl:h-10 2xl:w-full " : "border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"}
                                name={selectDivisiones ? "division" : nombre} // Nombre del campo para react-hook-form
                                value={selectedUnidad}
                                onChange={handleUnidadChangeCascada}
                                required={isRequired}
                            >
                                <option value="">{valor ? valor : `Seleccione ${campo.toLowerCase()}`}</option>
                                {opciones.map((unidad: Opcion) => (
                                    <option key={unidad.value} value={unidad.value}>
                                        {unidad.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Botón para mostrar todos los municipios (Solo para SelectDivisiones) */}
                            {selectDivisiones && (
                                <div className='flex flex-col items-center justify-center'>
                                    <div
                                        className='hover:cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center mt-2 md:mt-0'
                                        onClick={handleMostrarTodo}
                                    >
                                        {showAllMunicipios ? "Mostrar reducido" : "Mostrar todos los municipios"}
                                    </div>
                                </div>
                            )}

                            {/* Segundo Select (Subunidad/Municipio) */}
                            {selectedUnidadData?.subdivisiones && selectedUnidadData.subdivisiones.length > 0 && !notMunicipio && (
                                <div className='flex flex-row xl:h-full 2xl:h-full xl:w-full'>
                                    <select
                                        className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                        name={selectDivisiones ? "municipio" : "subunidad"}
                                        value={selectedSubunidad}
                                        onChange={handleSubunidadChangeCascada}
                                    >
                                        <option value="">
                                            {selectDivisiones ? "Seleccione el municipio" : "Seleccione una subunidad"}
                                        </option>
                                        {!showAllMunicipios ? (
                                            selectedUnidadData.subdivisiones.map((subunidad) => (
                                                <option key={subunidad.value} value={subunidad.value}>
                                                    {subunidad.nombre}
                                                </option>
                                            ))
                                        ) : (
                                            municipiosTodo.map((municipio: string) => (
                                                <option key={municipio} value={municipio}>
                                                    {municipio}
                                                </option>
                                            ))
                                        )}
                                    </select>

                                    {/* Tercer Select (Subsubunidad/Comisaría) */}
                                    {selectedSubunidadData?.subdivisiones && selectedSubunidadData.subdivisiones.length > 0 && !notComisaria && (
                                        <select
                                            className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                            name={selectDivisiones ? "comisaria" : "subsubunidad"}
                                            value={selectedSubsubunidad}
                                            onChange={handleSubsubunidadChangeCascada}
                                        >
                                            <option value="">
                                                {selectDivisiones ? "Seleccione la comisaría" : "Seleccione una subsubunidad"}
                                            </option>
                                            {selectedSubunidadData.subdivisiones.map((subsubunidad) => (
                                                <option key={subsubunidad.value} value={subsubunidad.value}>
                                                    {subsubunidad.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    {error && <span className='text-red-500 text-xs'>Este campo es requerido</span>}
                </div>
            </div>
        </div>
    );
}

export default SelectRegisterSingle;