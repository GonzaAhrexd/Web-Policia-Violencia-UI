// Hooks
import { useState, useEffect } from 'react';
// BACKEND
import { misDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
import { misDenuncias } from '../../api/CRUD/denuncias.crud';
// Dependencias
import { NavLink } from 'react-router-dom';

// --- Type Definitions ---
// Define interface for the user prop
interface User {
  rol: 'carga' | 'admin' | string; // Specify possible roles or make it more general if needed
  // Add other user properties if they are used, e.g., id: string;
}

// Define interface for a single denuncia (complaint) item
interface Denuncia {
  numero_de_expediente: string;
  // Add other denuncia properties if they are displayed or used, e.g., id: string;
}

// Props interface
interface CardUserDenunciasRecientesProps {
  user: User;
}

function CardUserDenunciasRecientes({ user }: CardUserDenunciasRecientesProps) {
  const [lastFiveDenuncias, setLastFiveDenuncias] = useState<Denuncia[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDenuncias = async () => {
      setIsLoading(true);
      setError(null); // Reset error
      try {
        const values = [{ desde: "no_ingresado" }, { hasta: "no_ingresado" }, { numero_de_expediente: "no_ingresado" }];
        let result: Denuncia[]; // Ensure result is typed as an array of Denuncia

        if (user.rol === 'carga' || user.rol === 'admin') {
          result = await misDenuncias(values);
        } else {
          result = await misDenunciasSinVerificar(values);
        }

        // Ensure result is an array before slicing
        if (Array.isArray(result)) {
          const fiveRecent = result.slice(Math.max(result.length - 5, 0)).reverse();
          setLastFiveDenuncias(fiveRecent);
        } else {
          // Handle cases where the API might return non-array data
          console.error("API did not return an array:", result);
          setError("Error al cargar denuncias. Inténtalo de nuevo.");
        }
      } catch (err) {
        console.error("Error fetching denuncias:", err);
        setError("No se pudieron cargar las denuncias. Por favor, revisa tu conexión.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDenuncias();
  }, [user.rol]); // Add user.rol to dependency array if it can change and should re-fetch

  return (
    <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg md:w-3/10 p-4 scale-up-center">
      <h2 className="text-3xl font-medium mb-4">Denuncias Recientes</h2> {/* Added bottom margin */}

      <div className="flex-grow"> {/* Allows this section to grow and push the button to the bottom */}
        {isLoading ? (
          <div className='w-full p-4 text-center text-gray-600 bg-neutral-100 rounded-lg'>Cargando denuncias...</div>
        ) : error ? (
          <div className='w-full p-4 text-center text-red-700 bg-red-100 border border-red-200 rounded-lg'>{error}</div>
        ) : lastFiveDenuncias.length === 0 ? (
          <div className='w-full p-4 text-center text-black bg-neutral-300 rounded-lg'>
            No tienes denuncias recientes.
          </div>
        ) : (
          <div className="space-y-3"> {/* Added space between items */}
            {lastFiveDenuncias.map((denuncia, index) => (
              <div
                key={index} // Consider using a unique ID from denuncia if available
                className='w-full p-3 text-black border border-gray-200 rounded-lg font-medium text-xl bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out'
              >
                {denuncia.numero_de_expediente}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NavLink and Button for "Ver todo" */}
      <NavLink
        to="/mis-denuncias"
        className="block mt-6" // Added top margin
      >
        <button
          className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
        >
          Ver todo
        </button>
      </NavLink>
    </div>
  );
}

export default CardUserDenunciasRecientes;