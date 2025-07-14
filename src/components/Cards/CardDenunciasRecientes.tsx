/*
 * Componente que muestra las denuncias más recientes del usuario en la página principal.
 * Ideal para proporcionar un resumen rápido de la actividad reciente del usuario.
 * Este componente asume que las denuncias mostradas ya están en un estado aprobado o final.
 */

// Hooks
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// APIs del BackEnd
import { misDenuncias } from '../../api/CRUD/denuncias.crud';

// Definición de tipos para las denuncias
interface Denuncia {
    id: string; // Un ID único es crucial para las keys en React
    numero_de_expediente: string;
    fecha_creacion: string; // Para ordenar y asegurar que son las "más recientes"
}

type CardDenunciasRecientesProps = {
    title: string;
};

export default function CardDenunciasRecientes({ title }: CardDenunciasRecientesProps): JSX.Element {

    // Estados
    const [lastFiveDenuncias, setLastFiveDenuncias] = useState<Denuncia[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [hasAnimated, setHasAnimated] = useState(false); // Estado para controlar la animación

    // Carga las denuncias más recientes del usuario
    useEffect(() => {
        const fetchDenuncias = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Obtiene todas las denuncias propias del usuario
                const result: Denuncia[] = await misDenuncias([]);

                // Ordena las denuncias por fecha de creación (más recientes primero)
                const sortedDenuncias = result.sort((a, b) =>
                    new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
                );

                // Toma solo las 5 denuncias más recientes
                const recentDenuncias = sortedDenuncias.slice(0, 5);
                setLastFiveDenuncias(recentDenuncias);
            } catch (err) {
                console.error("Error al cargar denuncias:", err);
                setError("No se pudieron cargar las denuncias.");
            } finally {
                setIsLoading(false);
            }
        };

        // Inicia la carga de datos
        fetchDenuncias();

        // Inicia la animación después de un breve retraso
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100);

        return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }, []);

    return (
        <div
            className={`
                block rounded-lg text-center shadow-lg bg-neutral-700
                transform transition-all duration-200 ease-out hover:scale-105 overflow-hidden
                ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
        >
            <NavLink to="/mis-denuncias" className="h-full flex flex-col">

                {/* Encabezado de la tarjeta */}
                <div className="border-b-2 px-6 py-4 border-neutral-600 text-neutral-50 text-lg font-semibold bg-neutral-600">
                    {title}
                </div>

                {/* Contenido principal de la tarjeta */}
                <div className="p-6 flex flex-col items-center flex-grow">
                    {isLoading ? (
                        <div className="text-neutral-300">Cargando denuncias...</div>
                    ) : error ? (
                        <div className="w-full text-red-400 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-2">
                            {error}
                        </div>
                    ) : lastFiveDenuncias.length === 0 ? (
                        <div className='w-full text-neutral-300 bg-neutral-600 border border-neutral-500 rounded-lg p-2'>
                            No tienes denuncias recientes.
                        </div>
                    ) : (
                        lastFiveDenuncias.map((denuncia, index) => (
                            <div
                                key={index}
                                className='w-full text-neutral-800 bg-neutral-300 border border-neutral-400 rounded-lg mb-2 p-3 flex items-center justify-center shadow-sm'
                            >
                                <span className="font-medium text-center truncate">{denuncia.numero_de_expediente}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Enlace para ver todas las denuncias */}
                <div className="border-t-2 px-6 py-3 border-neutral-600 text-white hover:text-blue-200 bg-neutral-600 font-medium">
                    Ver todas mis denuncias
                </div>
            </NavLink>
        </div>
    );
}