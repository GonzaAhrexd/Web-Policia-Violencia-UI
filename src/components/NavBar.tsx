// Hooks
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Iconos
import { ListBulletIcon, PencilSquareIcon, ChartPieIcon, UserPlusIcon, PresentationChartBarIcon, ArrowUpTrayIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

type NavBarProps = {
  user: any
}

function NavBar({ user }: NavBarProps) {

  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAdmin: boolean = user?.rol === 'admin';
  const isCarga: boolean = user?.rol === 'carga' || user?.rol === 'admin';
  const isAgente: boolean = user?.rol === 'agente' || user?.rol === 'admin' || user?.rol === 'carga';
  const APIURL = import.meta.env.VITE_BASE_URL
  // Menú de navegación
  const menuAdminItems = [
    "Administrar usuarios",
    "Registro de actividad",
    "Editar campos",
  ]
  // Menú de carga
  const menuCargaItems = [
    "Mis denuncias",
    "Verificar denuncias",
    "Cargar denuncias",
    "Estadísticas",
  ]

  // Menú de agente
  const menuAgenteItems = [
    "Búsqueda",
  ]

  // Seccion de denuncias para agentes
  const seccionDenunciasAgentes = [
    { titulo: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-6 w-6' /> },
    { titulo: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-6 w-6' /> },
  ]

  // Seccion de denuncias para carga
  const SeccionDenunciasCarga = [
    { titulo: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-6 w-6' /> },
    { titulo: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-6 w-6' /> },
    { titulo: 'Verificar denuncias', href: '/verificar-denuncias', icon: <ClipboardDocumentCheckIcon className='h-6 w-6' /> },
    { titulo: 'Estadísticas', href: '/estadísticas', icon: <ChartPieIcon className='h-6 w-6' /> },
  ]

  // Seccion de admin
  const SeccionAdmin = [
    { titulo: 'Administrar usuarios', href: '/administrar-usuarios', icon: <UserPlusIcon className='h-6 w-6' /> },
    { titulo: 'Registro de actividad', href: '/registro-de-actividad', icon: <PresentationChartBarIcon className='h-6 w-6' /> },
    { titulo: 'Editar campos', href: '/editar-campos', icon: <ArrowUpTrayIcon className='h-6 w-6' /> },
  ]
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (key) => {
    setIsDropdownOpen(prev => (prev === key ? null : key));
  };

  return (
    <div className='flex flex-row w-full bg-sky-900 text-white font-medium h-16 '>
      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className='flex flex-row items-center'>
        <button className="sm:hidden mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        <NavLink to='/' className="flex items-center space-x-2">
          <img className='w-10' src="Escudo_Policia_Chaco_Transparente.png" alt="Escudo" />
        </NavLink>
        </div>

        <div className="hidden sm:flex gap-6">
          {(isAgente && !isCarga) && (
            <div className="relative">
              <button onClick={() => toggleDropdown('denunciasAgentes')} className="hover:underline">Denuncias</button>
              {isDropdownOpen === 'denunciasAgentes' && (
                <div className="absolute mt-2 w-80 bg-white text-black border rounded shadow p-2 z-10">
                  {seccionDenunciasAgentes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      {item.icon} 
                      <NavLink to={item.href}> {item.titulo} </NavLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isCarga && (
            <div className="relative">
              <button onClick={() => toggleDropdown('denunciasCarga')} className="hover:underline">Denuncias</button>
              {isDropdownOpen === 'denunciasCarga' && (
                <div className="absolute mt-2 w-80 bg-white text-black border rounded shadow p-2 z-10">
                  {SeccionDenunciasCarga.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      {item.icon}
                      <NavLink to={item.href}>{item.titulo}</NavLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {isAgente && <NavLink to="/búsqueda">Búsqueda</NavLink>}

          {isAdmin && (
            <div className="relative">
              <button onClick={() => toggleDropdown('admin')} className="hover:underline">Admin</button>
              {isDropdownOpen === 'admin' && (
                <div className="absolute mt-2 w-80 bg-white text-black border rounded shadow p-2 z-10">
                  {SeccionAdmin.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      {item.icon}
                      <NavLink to={item.href}>{item.titulo}</NavLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              onClick={() => toggleDropdown('profile')}
              src={user.imagen !== "sin_definir" ? `${APIURL}/users/${user.id}/image` : "/user.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            />
            {isDropdownOpen === 'profile' && (
              <div className="absolute right-0 mt-2 w-60 bg-white text-black border rounded shadow p-2 z-10">
                <div className="mb-2">
                  <p className="font-semibold">Sesión iniciada como</p>
                  <p className="font-semibold">{user.nombre + " " + user.apellido}</p>
                </div>
                <NavLink to="/mi-perfil" className="block py-1 text-gray-700">Mi Perfil</NavLink>
                <NavLink to="/logout" className="block py-1 text-gray-700">Cerrar sesión</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
  <div
    className={`fixed inset-0 z-50 sm:hidden flex flex-col items-center bg-sky-900 py-8 space-y-6
      transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
  >
    {/* Botón para cerrar el menú */}
    <button
      className="absolute top-4 left-4 text-white text-3xl"
      onClick={() => setIsMenuOpen(false)}
    >
      ×
    </button>

    {/* Ícono y menú */}
    <img className="w-12 mb-4" src="Escudo_Policia_Chaco_Transparente.png" alt="Escudo" />

    {isCarga && menuCargaItems.map((item, i) => (
      <NavLink key={i} to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-2xl text-white">{item}</NavLink>
    ))}
    {isAgente && menuAgenteItems.map((item, i) => (
      <NavLink key={i} to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-2xl text-white">{item}</NavLink>
    ))}
    {isAdmin && menuAdminItems.map((item, i) => (
      <NavLink key={i} to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-2xl text-white">{item}</NavLink>
    ))}
  </div>
)}

    </div>
  );
}


export default NavBar