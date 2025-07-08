import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import DenunciasMes from '../Graficos/DenunciasMes'; // Asegúrate que esta ruta sea correcta

function CardDenunciasGrafico(): JSX.Element {
    const currentYear = new Date().getFullYear(); // Obtenemos el año actual una sola vez
    const [hasAnimated, setHasAnimated] = useState(false); // Estado para controlar la animación

    useEffect(() => {
        // Inicia la animación después de un breve retraso
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100);

        // Limpia el temporizador si el componente se desmonta
        return () => clearTimeout(timer);
    }, []); // Dependencia vacía para que se ejecute solo una vez al montar

    return (
        <NavLink
            to="/estadísticas"
            className={`flex flex-col h-full rounded-lg shadow-lg bg-neutral-700
                        transform transition-all duration-200 ease-out hover:scale-105
                        cursor-pointer overflow-hidden group
                        ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} // Animación de entrada
        >
            {/* Encabezado de la tarjeta */}
            <div className="border-b-2 px-6 py-4 border-neutral-600 text-neutral-50 text-lg font-semibold bg-neutral-600 flex flex-col items-center justify-center">
                Estadísticas de Denuncias
            </div>

            {/* Área del gráfico */}
            <div className="flex-grow p-4 flex items-center justify-center bg-neutral-700">
                {/* Asumo que DenunciasMes maneja su propio tamaño interno o se ajusta al contenedor */}
                <DenunciasMes inicio />
            </div>

            {/* Pie de página con el año */}
            <div className="border-t-2 px-6 py-3 border-neutral-600 text-neutral-200 text-base bg-neutral-600 font-medium
                            group-hover:text-white transition-colors duration-300 flex flex-col items-center justify-center">
                <span>Denuncias {currentYear}</span>
            </div>
        </NavLink>
    );
}

export default CardDenunciasGrafico;