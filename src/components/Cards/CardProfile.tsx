/* 
    Este componente es un card que muestra la información de un usuario.
    Se utiliza en la vista de perfil de usuario y en la vista de usuarios.
*/
import { NavLink } from 'react-router-dom';

type Props = {
    title: string,
    description: string,
    usuario: any
};
const APIURL = import.meta.env.VITE_BASE_URL

export default function CardProfile({ title, usuario }: Props): JSX.Element {

    const diasDesde = (fecha: Date): number => {
        fecha = new Date(fecha);
        let hoy: Date = new Date();
        
        return Math.ceil((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    }

    return (
        <div
            className="block hover:bg-neutral-900 cursor-pointer rounded-lg  text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700 transform transition-transform duration-300 ease-in-out hover:scale-105">
            <NavLink to="/mi-perfil">

            <div
                className="border-b-2 px-6 py-3 border-neutral-600 text-neutral-50">
                {title}
            </div>
            <div className="p-6">
                { /* Pon una imagen en un círculo */}
                <div className="bg-neutral-500 h-20 w-20 rounded-full flex items-center justify-center mx-auto">
                    <img
                        className="h-16 w-16 rounded-full"
                        src={usuario.imagen != "sin_definir" ? `${APIURL}/users/${usuario.id}/image` : '/user.png'}
                        alt="Foto de perfil"
                    />
                </div>
                <h5
                    className="mb-2 text-xl font-medium leading-tight  text-neutral-50">
                    {usuario?.nombre + ' ' + usuario?.apellido}
                </h5>
                <p className="text-base  text-neutral-200">
                    Teléfono: {usuario?.telefono}
                </p>
                <p className=" text-base  text-neutral-200">
                    Jerarquía: {usuario?.jerarquia}
                </p>
                <p className=" text-base  text-neutral-200">
                    Unidad: {usuario?.unidad}
                </p>
                <div className="flex w-full">
                </div>
            </div>
            <div
                className="border-t-2 px-6 py-3 border-neutral-600 text-neutral-50">
                {diasDesde(usuario?.createdAt) + " días de servicio"}
            </div>
            </NavLink>
        </div>
    );
}