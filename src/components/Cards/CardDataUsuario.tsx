/*
  Componente utilizado en /mi-perfil
  Muestra los datos del usuario y cuenta con el botón para poner en modo de edición
*/

interface UserData {
  jerarquia: string;
  username: string;
  telefono: string;
  zona: string;
  unidad: string;
  rol: string;
}

interface CardDataUsuarioProps {
  datosUsuario: UserData;
  setIsEditing: (isEditing: boolean) => void;
}

function CardDataUsuario({ datosUsuario, setIsEditing }: CardDataUsuarioProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg md:w-6/10 p-6 flex flex-col min-h-full scale-up-center"> {/* Increased padding for more breathing room */}
      <h2 className="text-3xl font-medium mb-4">Datos del Usuario</h2> {/* Added bottom margin to title */}

      <div className="flex-grow space-y-4"> {/* Increased space between data lines */}
        <p className="text-xl">
          <strong className="text-gray-800">Jerarquía:</strong> {datosUsuario.jerarquia}
        </p>
        <p className="text-xl">
          <strong className="text-gray-800">Nombre de usuario:</strong> {datosUsuario.username}
        </p>
        <p className="text-xl">
          <strong className="text-gray-800">Teléfono:</strong> {datosUsuario.telefono}
        </p>
        <p className="text-xl">
          <strong className="text-gray-800">Zona:</strong> {datosUsuario.zona}
        </p>
        <p className="text-xl">
          <strong className="text-gray-800">Unidad:</strong> {datosUsuario.unidad}
        </p>
        <p className="text-xl">
          <strong className="text-gray-800">Rol:</strong> {datosUsuario.rol}
        </p>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-6 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
      >
        Editar datos
      </button>
    </div>
  );
}

export default CardDataUsuario;