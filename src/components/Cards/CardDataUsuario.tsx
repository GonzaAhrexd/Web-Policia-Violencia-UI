/*
  Componente utilizado en /mi-perfil
  Muestra los datos del usuario y cuenta con el botón para poner en modo de edición
*/
interface CardDataUsuarioProps {
    datosUsuario: any
    setIsEditing: any
}
function CardDataUsuario({datosUsuario, setIsEditing}: CardDataUsuarioProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg md:w-6/10 p-4 scale-up-center">
        <h2 className="text-3xl font-medium">Datos</h2>
        <p className="mt-2 text-xl"><b>Jerarquía: </b> {datosUsuario.jerarquia}</p>
        <p className="mt-2 text-xl"><b>Nombre de usuario:</b> {datosUsuario.username}</p>
        <p className="mt-2 text-xl"><b>Teléfono:</b> {datosUsuario.telefono}</p>
        <p className="mt-2 text-xl"><b>Zona:</b> {datosUsuario.zona}</p>
        <p className="mt-2 text-xl"><b>Unidad:</b> {datosUsuario.unidad}</p>
        <p className="mt-2 text-xl"><b>Rol:</b> {datosUsuario.rol}</p>

        <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full flex items-center justify-center mt-2 md:mt-0' onClick={() => setIsEditing(true)}>
                Editar datos
            </div>
      </div>
)
}

export default CardDataUsuario