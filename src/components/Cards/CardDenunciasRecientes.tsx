/*
    Componente utilizado en 
    Componente que muestra las denuncias más recientes del usuario en el index de la página
*/

// Hooks
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

// APIs del BackEnd
import { misDenuncias } from '../../api/CRUD/denuncias.crud';

type Props = {
    title: string,
};

export default function CardDenunciasRecientes({ title }: Props): JSX.Element {

    // Estados
    const [lastFiveDenuncias, setLastFiveDenuncias] = useState([]);

    // Carga las denuncias más recientes del usuario
    useEffect(() => {
        const fetchDenuncias = async () => {
            // Le pasa un array vacío para obtener todas las denuncias propia del usuario
            const result = await misDenuncias([]);
            // Busca entre estas, solamente las últimas 5 y las pone en orden ascendente
            const lastFiveDenuncias = result.slice(Math.max(result.length - 5, 0)).reverse();
            // Actualiza el estado con las últimas 5 denuncias
            setLastFiveDenuncias(lastFiveDenuncias);
        };
        // Llama a la función asíncrona
        fetchDenuncias();
    }, []);

    return (
        <div
            className="block hover:bg-neutral-900 cursor-pointer rounded-lg text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700 transform transition-transform duration-300 ease-in-out hover:scale-105">
            <NavLink to="/mis-denuncias">
                <div
                    className="border-b-2 px-6 py-3 border-neutral-600 text-neutral-50">
                    {title}
                </div>
                <div className="p-6">
                    {lastFiveDenuncias.length === 0 ? (
                        <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                            No tienes denuncias
                        </div>
                    ) : (
                        lastFiveDenuncias.map((denuncia: any, index: number) => (
                            <div key={index} className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                                {denuncia.numero_de_expediente}
                            </div>
                        ))
                    )
                    }
                    <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>Ver todo</div>
                </div>
                <div
                    className="border-t-2 px-6 py-3 border-neutral-600 text-neutral-50">
                </div>
            </NavLink>
        </div>
    );
}