// Hooks
import { useState, useEffect } from 'react';
// BACKEND 
import {  misDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
import { misDenuncias } from '../../api/CRUD/denuncias.crud';
// Dependencias
import { NavLink } from 'react-router-dom';

// Props
interface CardUserDenunciasRecientesProps {
    user: any;
}

function CardUserDenunciasRecientes({ user }: CardUserDenunciasRecientesProps) {

    const [lastFiveDenuncias, setLastFiveDenuncias] = useState([]);
    useEffect(() => {
        const fetchDenuncias = async () => {
            let values = [{ desde: "no_ingresado" }, { hasta: "no_ingresado" }, { numero_de_expediente: "no_ingresado" }]
            let result
            if (user.rol === 'carga' || user.rol === 'admin') {
                result = await misDenuncias(values);
            } else {
                result = await misDenunciasSinVerificar(values);
            }
            const lastFiveDenuncias = result.slice(Math.max(result.length - 5, 0)).reverse();
            setLastFiveDenuncias(lastFiveDenuncias);
        };

        fetchDenuncias();
    }, []);

    return (
        <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg md:w-3/10 p-4 scale-up-center">
            <h2 className="text-3xl font-medium">Denuncias Recientes</h2>
            <div>
                {lastFiveDenuncias.length === 0 ? (
                    <div className='w-full text-black  bg-neutral-300 border rounded-lg mb-2'>
                        No tienes denuncias
                    </div>
                ) : (
                    lastFiveDenuncias.map((denuncia: any, index: number) => (
                        <div key={index} className='w-full text-black border rounded-lg mb-2 font-medium text-xl'>
                            {denuncia.numero_de_expediente}
                        </div>
                    ))
                )
                }
            </div>
            <NavLink to="/mis-denuncias">
                <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full flex items-center justify-center mt-2 md:mt-0' >
                    Ver todo
                </div>
            </NavLink>
        </div>
    )
}

export default CardUserDenunciasRecientes