// Hooks
import { useEffect, useState } from 'react';
// Backend
import { getDenunciasEstadisticaPeriodos } from '../../api/CRUD/denuncias.crud';
// Dependencias
import { NavLink } from 'react-router-dom';
// Iconos
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function CardDenunciasTotales() {
  const [periodo, setPeriodo] = useState('hoy'); // Estado para manejar el período seleccionado
  const [denunciasTotales, setDenunciasTotales] = useState([]);
  const [mostrarValor, setMostrarValor] = useState(0);
  
  const fetchDenunciasTotales = async () => {
    try {
      const response = await getDenunciasEstadisticaPeriodos();
      return response;
    } catch (error) {
      console.error("Error al obtener las denuncias totales por periodo:", error);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    const data = await fetchDenunciasTotales();
    if (data) {
      setDenunciasTotales(data);
      setPeriodo('hoy');
      setMostrarValor(data['hoy'] || 0);
    }
  };
  fetchData();
}, []);

  const handlePeriodoChange = (nuevoPeriodo) => {
    setPeriodo(nuevoPeriodo);
    setMostrarValor(denunciasTotales[nuevoPeriodo] || 0); 
  }

  
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-700 hover:bg-neutral-900 text-white rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transform transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="flex space-x-2 mb-4">
        <button onClick={() => handlePeriodoChange('hoy')} className={`btn ${periodo === 'hoy' ? 'border-b-2 border-white' : ''}`}>Hoy</button>
        <button onClick={() => handlePeriodoChange('semana')} className={`btn ${periodo === 'semana' ? 'border-b-2 border-white' : ''}`}>7 días</button>
        <button onClick={() => handlePeriodoChange('mes')} className={`btn ${periodo === 'mes' ? 'border-b-2 border-white' : ''}`}>30 días</button>
        <button onClick={() => handlePeriodoChange('anio')} className={`btn ${periodo === 'anio' ? 'border-b-2 border-white' : ''}`}>Año</button>
      </div>
      <div className="text-9xl font-bold">
        {mostrarValor}
      </div>
      <div className="text-2xl mt-4">
        Denuncias realizadas
      </div>
      <NavLink to="/búsqueda" className='mt-2 flex justify-start p-1 bg-neutral-600 w-full rounded-lg'>
        <MagnifyingGlassIcon className='h-6 w-6' />
        <span className='ml-4'> Buscar </span>
      </NavLink>
    </div>
  );
}

export default CardDenunciasTotales;
