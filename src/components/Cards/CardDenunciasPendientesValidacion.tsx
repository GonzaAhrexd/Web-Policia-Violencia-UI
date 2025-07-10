/*
 * Componente utilizado en la página principal para mostrar rápidamente
 * la cantidad de denuncias que están pendientes de validación.
 */

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// APIs del BackEnd
import { mostrarDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';

export default function CardDenunciasPendientesValidacion(): JSX.Element {
  const [cantidadDenunciasPendientes, setCantidadDenunciasPendientes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false); // Estado para controlar la animación

  useEffect(() => {
    const cargarDenuncias = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Asumimos que mostrarDenunciasSinVerificar devuelve un array o un objeto con una propiedad 'length'
        const response = await mostrarDenunciasSinVerificar();
        setCantidadDenunciasPendientes(response.length || 0); // Asegurarse de que sea un número
      } catch (err) {
        console.error('Hubo un error al cargar las denuncias pendientes: ', err);
        setError("No se pudieron cargar las denuncias.");
      } finally {
        setIsLoading(false);
      }
    };

    cargarDenuncias();

    // Inicia la animación después de un breve retraso
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  // Determina el texto a mostrar (singular/plural)
  const denunciasTexto = cantidadDenunciasPendientes === 1 ? "Denuncia" : "Denuncias";
  const pendienteTexto = cantidadDenunciasPendientes === 1 ? "pendiente" : "pendientes";

  // Determina si la cantidad tiene 3 o más dígitos
  const esTresDigitosOMas = cantidadDenunciasPendientes.toString().length >= 3;


  return (
    <NavLink
      className={`rounded-lg text-center shadow-lg bg-neutral-700
                  transform transition-all duration-200 ease-out hover:scale-105
                  flex flex-col 3xl:flex-row items-center justify-center p-6
                  ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} // Animación de entrada
      to="/verificar-denuncias"
    >
      {isLoading ? (
        <div className="text-neutral-300 text-xl animate-pulse">Cargando...</div>
      ) : error ? (
        <div className="text-red-400 text-center text-sm px-2">
          {error}
        </div>
      ) : (
        <>
          <div className={`text-white font-bold
                          ${esTresDigitosOMas ? 'text-6xl mb-3' : 'text-7xl md:text-8xl lg:text-9xl mb-4 md:mb-0 md:mr-6'}`}>
            {cantidadDenunciasPendientes}
          </div>
          <div className={`text-white font-medium max-w-xs leading-tight
                          ${esTresDigitosOMas ? 'text-xl' : 'text-xl md:text-2xl lg:text-3xl'}`}>
            {denunciasTexto} {pendienteTexto} de validación
          </div>
        </>
      )}
    </NavLink>
  );
}