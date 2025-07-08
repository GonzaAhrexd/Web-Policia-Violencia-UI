// Hooks
import { useEffect, useState } from 'react';
// Backend
import { getDenunciasEstadisticaPeriodos } from '../../api/CRUD/denuncias.crud';
// Dependencias
import { NavLink } from 'react-router-dom';
// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Definimos un tipo para la estructura de los datos de las denuncias por período
interface DenunciaEstadistica {
    hoy: number;
    semana: number;
    mes: number;
    anio: number;
}

function CardDenunciasTotales(): JSX.Element {
    const [periodo, setPeriodo] = useState<keyof DenunciaEstadistica>('hoy'); // Tipado para el período
    const [denunciasEstadisticas, setDenunciasEstadisticas] = useState<DenunciaEstadistica | null>(null);
    const [mostrarValor, setMostrarValor] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasAnimated, setHasAnimated] = useState(false); // Estado para controlar la animación

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response: DenunciaEstadistica = await getDenunciasEstadisticaPeriodos();
                if (response) {
                    setDenunciasEstadisticas(response);
                    // Establecer 'hoy' como período inicial y su valor correspondiente
                    setPeriodo('hoy');
                    setMostrarValor(response.hoy || 0);
                } else {
                    // Si la respuesta es nula o vacía, asumimos que no hay datos
                    setDenunciasEstadisticas({ hoy: 0, semana: 0, mes: 0, anio: 0 });
                    setPeriodo('hoy');
                    setMostrarValor(0);
                }
            } catch (err) {
                console.error("Error al obtener las denuncias totales por periodo:", err);
                setError("No se pudieron cargar las estadísticas.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();

        // Inicia la animación después de un breve retraso
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100);

        // Limpia el temporizador si el componente se desmonta
        return () => clearTimeout(timer);
    }, []); // Dependencia vacía para que se ejecute solo una vez al montar

    const handlePeriodoChange = (nuevoPeriodo: keyof DenunciaEstadistica) => {
        setPeriodo(nuevoPeriodo);
        if (denunciasEstadisticas) {
            setMostrarValor(denunciasEstadisticas[nuevoPeriodo] || 0);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-between min-h-[250px] bg-neutral-700 hover:bg-neutral-800 text-white rounded-lg p-6 shadow-lg
                         transform transition-all duration-200 ease-out hover:scale-105
                         ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}> {/* Animación de entrada */}

            {/* Selector de Período */}
            <div className="flex space-x-3 mb-4 w-full justify-center">
                <button
                    onClick={() => handlePeriodoChange('hoy')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                 ${periodo === 'hoy' ? 'bg-gray-500 text-white shadow-md' : 'bg-neutral-600 text-neutral-300 hover:bg-neutral-500'}`}
                >
                    Hoy
                </button>
                <button
                    onClick={() => handlePeriodoChange('semana')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                 ${periodo === 'semana' ? 'bg-gray-500 text-white shadow-md' : 'bg-neutral-600 text-neutral-300 hover:bg-neutral-500'}`}
                >
                    7 días
                </button>
                <button
                    onClick={() => handlePeriodoChange('mes')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                 ${periodo === 'mes' ? 'bg-gray-500 text-white shadow-md' : 'bg-neutral-600 text-neutral-300 hover:bg-neutral-500'}`}
                >
                    30 días
                </button>
                <button
                    onClick={() => handlePeriodoChange('anio')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                 ${periodo === 'anio' ? 'bg-gray-500 text-white shadow-md' : 'bg-neutral-600 text-neutral-300 hover:bg-neutral-500'}`}
                >
                    Año
                </button>
            </div>

            {/* Contenedor principal para el valor y mensaje, con flex-grow para ocupar el espacio restante */}
            <div className="flex flex-col items-center justify-center flex-grow w-full">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-neutral-300 text-2xl animate-pulse">Cargando...</div>
                        <div className="h-10 w-10 border-4 border-t-4 border-neutral-400 border-solid rounded-full animate-spin mt-4"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-center text-lg p-4 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="text-8xl md:text-9xl font-extrabold text-white mb-2">
                            {mostrarValor}
                        </div>
                        <div className="text-xl md:text-2xl text-neutral-200 font-semibold">
                            Denuncias realizadas
                        </div>
                    </>
                )}
            </div>

            {/* Enlace de Búsqueda */}
            <NavLink
                to="/busqueda"
                className='mt-auto w-full flex items-center justify-center p-3 bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors duration-200 text-neutral-200 font-medium'
            >
                <MagnifyingGlassIcon className='h-6 w-6 mr-3' />
                <span>Buscar denuncias</span>
            </NavLink>
        </div>
    );
}

export default CardDenunciasTotales;