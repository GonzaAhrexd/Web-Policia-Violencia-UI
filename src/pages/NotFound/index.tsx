/* 
  [ ERROR 404 ] 
   Descripción: Página de error 404 que se muestra cuando una ruta no es encontrada
*/

// React router
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="md:w-5/10 lg:w-3/10">
        <div className="text-center">
          <h1 className="text-9xl md:text-10xl font-bold text-black mb-10">Ups...</h1>
          <p className="text-2xl mt-4">404 - PÁGINA NO ENCONTRADA</p>
          <p className="m-2 break-words ">La página a la que estás intentando acceder no se encuentra disponible. Es posible que no exista, se haya eliminado o no esté temporalmente disponible</p>
          <Link to="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold leading-6 text-center text-white bg-sky-900 hover:bg-sky-700 rounded-md shadow-sm">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
