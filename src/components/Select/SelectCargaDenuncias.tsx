/*
    [SelectCargaDenuncias]
    Este componente es un select que se utiliza en el formulario de carga de denuncias. 
*/
// Hooks
import { useEffect, useState } from 'react'
// Componentes
import InputDireccion from '../InputComponents/InputDireccion';
// Iconos
import { QuestionMarkCircleIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
// Campos
import { useCampos } from '../../context/campos';

type Opcion = {
    value?: string;
    nombre?: string;
    subdivisiones?: Opcion[];
    prefijo?: any;
    cuadriculas?: Opcion[];
}

type Props = {
    campo: string;
    opciones: Opcion[];
    register: any
    setValue: any
    type: string
    nombre: string
    error: any
    setComisariaPertenece?: any
    state?: any
    setMunicipio?: any
    direccion?: any
    setDireccion?: any
    barrio?: any
    setBarrio?: any
    coordenadas?: any
    setCoordenadas?: any
    errors?: any
    consultarCoordenadas?: any
    handleOpenModal?: any
    info?: any
    setTitulo?: any
    valor?: any
    isRequired?: any
    selectDivisiones?: boolean
}


function SelectCargaDenuncias({selectDivisiones, isRequired, valor, handleOpenModal, consultarCoordenadas, direccion, setDireccion, barrio, setBarrio, coordenadas, setCoordenadas, errors, setMunicipio, campo, opciones, nombre, register, setValue, setComisariaPertenece, state, info, setTitulo }: Props) {

    // Estados para guardar las opciones seleccionadas
    const [requiredInput,] = useState(isRequired != null ? isRequired : true)
    const [selectedUnidad, setSelectedUnidad] = useState('');
    const [selectedSubunidad, setSelectedSubunidad] = useState('');
    const [selectedSubsubunidad, setSelectedSubsubunidad] = useState('');
    const [selectedCuadricula, setSelectedCuadricula] = useState('');
    const [municipiosTodo, setMunicipiosTodo] = useState([]);
    const [showAllMunicipios, setShowAllMunicipios] = useState(false);
    
    const { tiposDeLugar: opcionesTipoDeLugar } = useCampos()
    
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
    const handleBuscarPrefijo = (comisaria: String) => {
        //Busca el prefijo de la comisaria entre las opciones, tiene que coincidir con el valor de la comisaria
        let prefijo = ''
        // Utiliza un map anidado para recorrer las opciones y buscar el prefijo de la comisaria
        opciones.map((unidad: Opcion) => {
            // Si la unidad no es la comisaria, busca en las subdivisiones
            if (unidad != comisaria) {
                // Si la comisaria tiene subdivisiones, busca en ellas
                unidad.subdivisiones?.map((subunidad: Opcion) => {
                    // Si la comisaria coincide con el valor de la comisaria, guarda el prefijo
                    if (subunidad.value == comisaria && subunidad.prefijo != undefined) {
                        // Guarda el prefijo de la comisaria
                        prefijo = subunidad.prefijo
                    }
                    // Si la comisaria tiene subdivisiones, busca en ellas
                    if (subunidad.subdivisiones != undefined) {
                        // Si la comisaria coincide con el valor de la comisaria, guarda el prefijo
                        subunidad.subdivisiones.map((subsubunidad: Opcion) => {
                            // Si la comisaria coincide con el valor de la comisaria, guarda el prefijo
                            if (subsubunidad.value == comisaria && subsubunidad.prefijo != undefined) {
                                // Guarda el prefijo de la comisaria
                                prefijo = subsubunidad.prefijo
                            }
                        })
                    }
                })
            }
        })

        return prefijo
    }

    useEffect(() => {

        if (state == false) {
            selectedSubunidad && setComisariaPertenece(handleBuscarPrefijo(selectedSubunidad) + "-")
            selectedSubsubunidad && setComisariaPertenece(handleBuscarPrefijo(selectedSubsubunidad) + "-")
        }

        // Setea el prefijo de la comisaria según la unidad seleccionada si se selecciona que fue en la división de género
        if (state && selectedUnidad == "Metropolitana") {
            setComisariaPertenece("371-")
        } else if (state && selectedUnidad == "La Leonesa") {
            setComisariaPertenece("108-")
        } else if (state && selectedUnidad == "Lapachito") {
            setComisariaPertenece("125-")
        } else if (state && selectedUnidad == "General San Martín") {
            setComisariaPertenece("260-")
        }
        else if (state && selectedUnidad == "Villa Ángela") {
            setComisariaPertenece("261-")
        }
        else if (state && selectedUnidad == "Charata") {
            setComisariaPertenece("262-")
        }
        else if (state && selectedUnidad == "Juan José Castelli") {
            setComisariaPertenece("258-")
        }
        else if (state && selectedUnidad == "Roque Saenz Peña") {
            setComisariaPertenece("235-")
        }


    }, [state])



    const handleUnidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedUnidad(value);
        setSelectedSubunidad('');
        setSelectedSubsubunidad('');
        setSelectedCuadricula('');
        // Actualiza el valor en react-hook-form       
        campo == "Unidad de carga" && setValue('unidad_de_carga', value)
        nombre == "modalidades" && setValue('modalidades', value)

    };

    const handleSubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubunidad(value);
        setSelectedSubsubunidad('');
        setSelectedCuadricula('');
        setComisariaPertenece(handleBuscarPrefijo(value) + "-")
        // Actualiza el valor en react-hook-form
        setValue('municipio', `${value}`);
        setMunicipio(value)
    }



    const handleSubsubunidadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSubsubunidad(value);
        setSelectedCuadricula('');
        setComisariaPertenece(handleBuscarPrefijo(value) + "-")
        // Actualiza el valor en react-hook-form
        selectedSubunidad != "Puerto Vilelas" ? setValue('jurisdiccion_policial', `${value}`) : setValue('Cuadrícula', `${value}`);

    };
    const handleCuadriculaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCuadricula(value);
        // Actualiza el valor en react-hook-form
        setValue('cuadricula', `${value}`);
    };

    const handleTipoDeLugar = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setValue('tipo_de_lugar', value);
    }


    // Abre una nueva pestaña con las coordenadas en Google Maps
    const handleClick = (coordenadas: any) => {
        // Separa las coordenadas en latitud y longitud
        const coordenadasSeparadas = coordenadas.split(' ')
        // Forma la URL de Google Maps con las coordenadas
        const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
        // Abre la URL en una nueva pestaña
        window.open(url, '_blank');
    };

    useEffect(() => {
        if (coordenadas) {
            setValue('GIS', coordenadas);
        }
    }, [coordenadas, setValue]);


    return (
        <div className={`flex flex-row w-full`}>
            <div className='flex flex-col w-full'>
                <span className='ml-4 font-medium flex flex-row '> {nombre != "tipo_de_arma" ? campo : ""}  <span className='text-red-500'> </span>

                    {campo === "Modalidades" &&
                        <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (
                            setTitulo("Modalidades"),
                            handleOpenModal(info)
                        )} />}
                </span>
                <div className={`flex flex-col xl:w-full"}`}>
                    <select
                        className="border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"
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

                </div>
                {selectedUnidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones && (
                    <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                        <span className='ml-4 font-medium '> Municipio  <span className='text-red-500'> </span> </span>
                        <select
                            className="border open-sans border-gray-300 rounded-md h-10 xl:h-8 2xl:h-10 my-2 xl:my-1 xl:m-2 m-4 w-95/10"
                            name="subunidad"
                            value={selectedSubunidad}
                            required={requiredInput}
                            onChange={handleSubunidadChange}>
                            <option value="">Seleccione municipio</option>
                            {!showAllMunicipios ?
                                opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.map((subunidad) => (
                                    <option key={subunidad.value} value={subunidad.value}>
                                        {subunidad.nombre}
                                    </option>
                                )):
                                // Utilza el contenido en municipiosTodo para mostrar todos los municipios
                                municipiosTodo.map((municipio: string) => (
                                    <option key={municipio} value={municipio}>
                                        {municipio}
                                    </option>
                                ))
                                }
                        </select>
                    </div>
                )}

                {selectedSubunidad &&
                    <>
                        <div className='flex flex-col xl:flex-row'>
                            <InputDireccion require={true} state={direccion} setState={setDireccion} campo="Lugar del hecho" nombre="direccion" register={register} setValue={setValue} type="text" error={errors.direccion} />
                            <InputDireccion require={false} state={barrio} setState={setBarrio} campo="Barrio" nombre="barrio" register={register} setValue={setValue} type="text" error={errors.barrio} />
                            <InputDireccion require={true} state={coordenadas} setState={setCoordenadas} campo="GIS" nombre="GIS" register={register} setValue={setValue} type="text" error={errors.GIS} />
                            <div className='cursor-pointer flex flex-col items-center mt-5 md:flex-row'>
                                <div className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-1/2 md:mr-1 flex items-center justify-center' onClick={() => consultarCoordenadas()}>
                                    <MagnifyingGlassIcon className="w-7 h-7" />
                                </div>
                                <div className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-1/2 flex items-center justify-center mt-2 md:mt-0' onClick={() => handleClick(coordenadas)}>
                                    <MapPinIcon className="w-7 h-7" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                                <span className='ml-4 font-medium '> Tipo de lugar <span className='text-red-500'> </span> </span>
                                <select
                                    className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                    name="tipo_de_lugar"
                                    required={true}
                                    onChange={handleTipoDeLugar}>

                                    <option value="">Seleccione el tipo de lugar</option>
                                    {opcionesTipoDeLugar.map((unidad: Opcion) => (
                                        <option key={unidad.value} value={unidad.value}>
                                            {unidad.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </>
                }
                {selectedSubunidad &&
                    // @ts-ignore
                    opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) =>
                        subunidad.value === selectedSubunidad
                    )?.subdivisiones?.length > 0 && (

                        <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                            <span className='ml-4 font-medium '> Jurisdicción policial <span className='text-red-500'> </span> </span>
                            <select
                                className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                name="subsubunidad"
                                value={selectedSubsubunidad}
                                required={requiredInput}
                                onChange={handleSubsubunidadChange}>

                                <option value="">Seleccione jurisdicción policial</option>
                                {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.map((subsubunidad) => (
                                    <option key={subsubunidad.value} value={subsubunidad.value}>
                                        {subsubunidad.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                {/* @ts-ignore */}
                {selectedSubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) =>
                    subunidad.value === selectedSubunidad)?.cuadriculas?.length > 0 && (


                        <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>

                            <span className='ml-4 font-medium '> Cuadricula <span className='text-red-500'> </span> </span>

                            <select
                                className=" border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                                name="subsubunidad"
                                value={selectedSubsubunidad}
                                required={true}
                                onChange={handleSubsubunidadChange}>
                                <option value="">Seleccione cuadrícula</option>
                                {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.cuadriculas?.map((cuadricula) => (
                                    <option key={cuadricula.value} value={cuadricula.value}>
                                        {cuadricula.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                {/* @ts-ignore */}
                {selectedSubsubunidad && opciones.find((unidad: Opcion) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.find((subsubunidad: Opcion) => subsubunidad.value === selectedSubsubunidad)?.cuadriculas?.length > 0 && (
                    <div className='flex flex-col xl:h-full 2xl:h-full xl:w-full'>
                        <span className='ml-4 font-medium '> Cuadricula </span>
                        <select
                            className="border open-sans mt-0.5 border-gray-300 rounded-md w-full h-10 xl:h-8/10 mx-2 xl:w-full 2xl:h-10 2xl:w-full"
                            name="cuadricula"
                            value={selectedCuadricula}
                            required={true}
                            onChange={handleCuadriculaChange}
                        >
                            <option value="">Seleccione una cuadrícula</option>
                            {opciones.find((unidad) => unidad.value === selectedUnidad)?.subdivisiones?.find((subunidad: Opcion) => subunidad.value === selectedSubunidad)?.subdivisiones?.find((subsubunidad: Opcion) => subsubunidad.value === selectedSubsubunidad)?.cuadriculas?.map((cuadricula) => (
                                <option key={cuadricula.value} value={cuadricula.value}>
                                    {cuadricula.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}


            </div>
        </div>
    )
}

export default SelectCargaDenuncias

