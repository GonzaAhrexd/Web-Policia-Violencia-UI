// Hooks
import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Iconos de Heroicons
import {
  ListBulletIcon,
  PencilSquareIcon,
  ChartPieIcon,
  UserPlusIcon,
  PresentationChartBarIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Tipos
type NavBarProps = {
  user: {
    rol: string;
    id: string;
    imagen: string;
    nombre: string;
    apellido: string;
  };
};

// Componente NavBar
function NavBar({ user }: NavBarProps) {
  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Referencias para cerrar los dropdowns al hacer clic fuera
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const API_URL = import.meta.env.VITE_BASE_URL;

  // Roles de usuario
  const isAdmin = user?.rol === 'admin';
  const isCarga = user?.rol === 'carga' || isAdmin;
  const isAgente = user?.rol === 'agente' || isCarga;

  // Definición de ítems del menú con sus rutas e íconos
  const navItems = {
    denunciasAgentes: [
      { title: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-5 w-5' /> },
      { title: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-5 w-5' /> },
    ],
    denunciasCarga: [
      { title: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-5 w-5' /> },
      { title: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-5 w-5' /> },
      { title: 'Verificar denuncias', href: '/verificar-denuncias', icon: <ClipboardDocumentCheckIcon className='h-5 w-5' /> },
      { title: 'Estadísticas', href: '/estadísticas', icon: <ChartPieIcon className='h-5 w-5' /> },
    ],
    admin: [
      { title: 'Administrar usuarios', href: '/administrar-usuarios', icon: <UserPlusIcon className='h-5 w-5' /> },
      { title: 'Registro de actividad', href: '/registro-de-actividad', icon: <PresentationChartBarIcon className='h-5 w-5' /> },
      { title: 'Editar campos', href: '/editar-campos', icon: <ArrowUpTrayIcon className='h-5 w-5' /> },
    ],
    agenteSearch: { title: 'Búsqueda', href: '/búsqueda', icon: <MagnifyingGlassIcon className='h-5 w-5' /> },
  };

  // Función para alternar el estado de los dropdowns
  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Efecto para cerrar el menú desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedOutside = true;
      for (const key in dropdownRefs.current) {
        if (dropdownRefs.current[key] && dropdownRefs.current[key]?.contains(event.target as Node)) {
          clickedOutside = false;
          break;
        }
      }

      if (clickedOutside) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRefs]);

  return (
    <nav className='relative flex h-16 w-full items-center bg-sky-900 px-4 text-white shadow-md'>
      {/* Sección Izquierda: Logo y botón de menú móvil */}
      <div className='flex items-center'>
        <button className='mr-4 sm:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='Abrir menú'>
          <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>
        <NavLink to='/' className='flex items-center space-x-2'>
          <img className='h-12 w-12' src='./Escudo_Policia_Chaco_Transparente.png' alt='Escudo Policía del Chaco' />
          {/* <span className='hidden text-lg font-semibold md:block'>Sistema de Denuncias</span> */}
        </NavLink>
      </div>

      {/* Sección Central: Menú de navegación principal (Desktop) */}
      {/* Este div usa flex-1 y justify-center para ocupar el espacio restante y centrar su contenido */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='hidden sm:flex gap-6 border-x border-white px-4'>
          {isAgente && !isCarga && (
            <div className='relative' ref={el => dropdownRefs.current.denunciasAgentes = el}>
              <button onClick={() => toggleDropdown('denunciasAgentes')} className='flex items-center gap-1 hover:text-sky-200 focus:outline-none'>
                Denuncias
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </button>
              {activeDropdown === 'denunciasAgentes' && (
                <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-60 rounded border border-gray-200 bg-white p-2 text-gray-800 shadow-lg z-10'>
                  {navItems.denunciasAgentes.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100'
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {isCarga && (
            <div className='relative' ref={el => dropdownRefs.current.denunciasCarga = el}>
              <button onClick={() => toggleDropdown('denunciasCarga')} className='flex items-center gap-1 hover:text-sky-200 focus:outline-none'>
                Denuncias
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </button>
              {activeDropdown === 'denunciasCarga' && (
                <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-60 rounded border border-gray-200 bg-white p-2 text-gray-800 shadow-lg z-10'>
                  {navItems.denunciasCarga.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100'
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {isAgente && (
            <NavLink to={navItems.agenteSearch.href} className='hover:text-sky-200'>
              {navItems.agenteSearch.title}
            </NavLink>
          )}

          {isAdmin && (
            <div className='relative' ref={el => dropdownRefs.current.admin = el}>
              <button onClick={() => toggleDropdown('admin')} className='flex items-center gap-1 hover:text-sky-200 focus:outline-none'>
                Administración
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </button>
              {activeDropdown === 'admin' && (
                <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-60 rounded border border-gray-200 bg-white p-2 text-gray-800 shadow-lg z-10'>
                  {navItems.admin.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100'
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sección Derecha: Menú de perfil de usuario */}
      <div className='relative flex items-center' ref={el => dropdownRefs.current.profile = el}>
        <img
          onClick={() => toggleDropdown('profile')}
          src={user.imagen !== 'sin_definir' ? `${API_URL}/usuario/${user.id}/image` : '/user.png'}
          alt='Avatar del usuario'
          className='h-10 w-10 cursor-pointer rounded-full border-2 border-white object-cover'
        />
        {activeDropdown === 'profile' && (
          <div className='absolute right-0 top-full mt-2 w-60 rounded border border-gray-200 bg-white p-2 text-gray-800 shadow-lg z-10'>
            <div className='mb-2 border-b border-gray-200 pb-2'>
              <p className='text-sm text-gray-600'>Sesión iniciada como:</p>
              <p className='font-semibold'>{`${user.nombre} ${user.apellido}`}</p>
            </div>
            <NavLink to='/mi-perfil' className='block rounded-md px-3 py-2 hover:bg-gray-100' onClick={() => setActiveDropdown(null)}>
              Mi Perfil
            </NavLink>
            <NavLink to='/logout' className='block rounded-md px-3 py-2 text-red-600 hover:bg-gray-100' onClick={() => setActiveDropdown(null)}>
              Cerrar sesión
            </NavLink>
          </div>
        )}
      </div>

      {/* Menú móvil (oculto en desktop) */}
      <div
        className={`fixed inset-0 z-40 transform bg-sky-900 transition-transform duration-300 ease-in-out sm:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col items-center py-8'>
          {/* Botón para cerrar el menú */}
          <button className='absolute left-4 top-4 text-4xl text-white' onClick={() => setIsMenuOpen(false)} aria-label='Cerrar menú'>
            &times;
          </button>

          {/* Ícono y menú en móvil */}
          <img className='mb-8 w-16' src='/Escudo_Policia_Chaco_Transparente.png' alt='Escudo Policía del Chaco' />

          {isCarga && (
            <>
              <h3 className='mb-2 text-lg font-semibold text-gray-300'>Denuncias</h3>
              {navItems.denunciasCarga.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className='flex items-center gap-3 py-3 text-xl text-white hover:text-sky-200'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              ))}
            </>
          )}

          {isAgente && !isCarga && (
            <>
              <h3 className='mb-2 text-lg font-semibold text-gray-300'>Denuncias</h3>
              {navItems.denunciasAgentes.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className='flex items-center gap-3 py-3 text-xl text-white hover:text-sky-200'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              ))}
            </>
          )}

          {isAgente && (
            <NavLink
              to={navItems.agenteSearch.href}
              className='flex items-center gap-3 py-3 text-xl text-white hover:text-sky-200'
              onClick={() => setIsMenuOpen(false)}
            >
              {navItems.agenteSearch.icon}
              {navItems.agenteSearch.title}
            </NavLink>
          )}

          {isAdmin && (
            <>
              <h3 className='mb-2 mt-4 text-lg font-semibold text-gray-300'>Administración</h3>
              {navItems.admin.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className='flex items-center gap-3 py-3 text-xl text-white hover:text-sky-200'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;