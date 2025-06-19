/*
    Componente utilizado en el index de la página
    Muestra de forma rápida las denuncias que están pendientes de validación
*/

import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// APIs del BackEnd
import { mostrarDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';

function CardDenunciasPendientesValidacion() {
  const [cantidadDenunciasPendientes, setCantidadDenunciasPendientes] = useState(0);
  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const response = await mostrarDenunciasSinVerificar();
        // @ts-ignore
        setCantidadDenunciasPendientes(response.length);
      } catch (error) {
        console.error('Hubo un error al cargar las denuncias: ', error);
      }
    };
  
    cargarDenuncias();
  }, []); 

  return (

    <NavLink
    className="flex items-center hover:bg-neutral-900 cursor-pointer rounded-lg text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700 transform transition-transform duration-300 ease-in-out hover:scale-105" to="/verificar-denuncias">
      <div className='flex p-6'>
        <div className='text-white text-9xl'>
          {cantidadDenunciasPendientes}
        </div>
        <div className='flex text-white text-2xl justify-center items-center'>
          Denuncia{cantidadDenunciasPendientes > 1 ? "s" : ""} pendiente{cantidadDenunciasPendientes > 1 ? "s" : ""} de validación
        </div>
        </div>
      </NavLink>
   
  )
}

export default CardDenunciasPendientesValidacion