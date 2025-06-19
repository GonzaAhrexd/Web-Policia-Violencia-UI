import { NavLink } from 'react-router-dom'
import DenunciasMes from '../Graficos/DenunciasMes'
function CardDenunciasGrafico() {
    return (
        <div className="flex flex-col bg-neutral-700 hover:bg-neutral-900 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-4 h-full transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
            <NavLink to="/estadísticas">
            <div>
            <DenunciasMes inicio/>
            </div>
            <div className='flex items-center justify-center'>
                <span className='text-white text-2xl'>Denuncias {new Date().getFullYear()}</span>
            </div>
            </NavLink>
        </div>
    )
}

export default CardDenunciasGrafico