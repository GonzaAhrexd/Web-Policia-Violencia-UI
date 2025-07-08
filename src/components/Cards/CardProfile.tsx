import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Importar useState y useEffect

type User = {
    id: string;
    nombre: string;
    apellido: string;
    imagen: string;
    telefono: string;
    jerarquia: string;
    unidad: string;
    createdAt: string; // O Date si ya se convierte antes de pasar al componente
};

type CardProfileProps = {
    title: string;
    user: User;
};

const APIURL = import.meta.env.VITE_BASE_URL;

export default function CardProfile({ title, user }: CardProfileProps): JSX.Element {
    const [hasAnimated, setHasAnimated] = useState(false); // Estado para controlar la animación

    useEffect(() => {
        // Establece hasAnimated a true después de un pequeño retraso
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100); // 100ms de retraso para que la tarjeta aparezca suavemente
        return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }, []);

    // Función para calcular los días desde la fecha de creación
    const getDaysSinceCreation = (createdAt: string): number => {
        const creationDate = new Date(createdAt);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - creationDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const imageUrl = user.imagen !== "sin_definir"
        ? `${APIURL}/usuario/${user.id}/image`
        : '/user.png';

    return (
        <div
            className={`
                block hover:bg-neutral-800 cursor-pointer rounded-lg text-center shadow-lg bg-neutral-700
                transform transition-all duration-200 ease-out hover:scale-105 overflow-hidden
                ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
        >
            <NavLink to="/mi-perfil" className="h-full flex flex-col">

                {/* Encabezado de la tarjeta */}
                <div className="border-b-2 px-6 py-4 border-neutral-600 text-neutral-50 text-lg font-semibold bg-neutral-600">
                    {title}
                </div>

                {/* Contenido principal de la tarjeta */}
                <div className="p-6 flex flex-col items-center flex-grow justify-center">
                    {/* Imagen de perfil */}
                    <div className="bg-neutral-600 h-24 w-24 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-neutral-50">
                        <img
                            className="h-full w-full object-cover rounded-full"
                            src={imageUrl}
                            alt={`Foto de perfil de ${user.nombre}`}
                            onError={(e) => { e.currentTarget.src = '/user.png'; }}
                        />
                    </div>

                    {/* Nombre completo del usuario */}
                    <h5 className="mb-2 text-2xl font-bold leading-tight text-neutral-50">
                        {user.nombre} {user.apellido}
                    </h5>

                    {/* Detalles del usuario */}
                    <p className="text-base text-neutral-300">
                        <span className="font-medium">Teléfono:</span> {user.telefono}
                    </p>
                    <p className="text-base text-neutral-300">
                        <span className="font-medium">Jerarquía:</span> {user.jerarquia}
                    </p>
                    <p className="text-base text-neutral-300 mb-4">
                        <span className="font-medium">Unidad:</span> {user.unidad}
                    </p>
                </div>

                {/* Pie de página con días de servicio */}
                <div className="border-t-2 px-6 py-3 border-neutral-600 text-neutral-200 text-sm bg-neutral-600">
                    <span className="font-medium">{getDaysSinceCreation(user.createdAt)}</span> días de servicio
                </div>
            </NavLink>
        </div>
    );
}