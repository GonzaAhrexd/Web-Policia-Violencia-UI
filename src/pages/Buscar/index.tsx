/*
  [Búsqueda]
  Descripción: Página para buscar denuncias, víctimas, victimarios, terceros y exposiciones, mediante distintos filtros.
*/
// React hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// Contexto  y store 
import { useAuth } from '../../context/auth';
import { useStore } from '../MisDenuncias/store';
// Componentes
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import Modal from '../../components/Modal';
// Boton búsqueda
import BotonBusqueda from '../../components/Busqueda/BotonBusqueda';
// Secciones de búsqueda
import BuscarDenuncias from '../../components/Busqueda/BuscarDenuncias/BuscarDenuncias';
import BuscarVictimas from '../../components/Busqueda/BuscarVictimas/BuscarVictimas';
import BuscarVictimario from '../../components/Busqueda/BuscarVictimarios/BuscarVictimario';
import BuscarTerceros from '../../components/Busqueda/BuscarTerceros/BuscarTerceros';
import BuscarExposiciones from '../../components/Busqueda/BuscarExposiciones/BuscarExposiciones';
import BuscarDenunciasSinVerificar from '../../components/Busqueda/BuscarDenunciasSinVerificar/BuscarDenunciasSinVerificar';
// import BuscarPreventivos from '../../components/Busqueda/BuscarPreventivo/BuscarPreventivos';

function Buscar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { setOpenModal, openModal, title, text } = useStore();
  const [activeSearch, setActiveSearch] = useState('denuncias');
  const [showUnverified, setShowUnverified] = useState(false);

  // Mapa de componentes de búsqueda
  const searchComponents = {
    victima: BuscarVictimas,
    victimario: BuscarVictimario,
    terceros: BuscarTerceros,
    denuncias:
      user?.rol === 'agente'
        ? BuscarDenunciasSinVerificar
        : showUnverified
          ? BuscarDenunciasSinVerificar
          : BuscarDenuncias,
    // preventivo: BuscarPreventivos,
    // radiograma: BuscarRadiograma,
    exposicion: BuscarExposiciones,
  };

  // Configuración de botones por rol
  const buttonConfig = {
    'admin-carga': [
      { label: 'Víctima', type: 'victima' },
      { label: 'Victimario', type: 'victimario' },
      { label: 'Terceros', type: 'terceros' },
      { label: 'Denuncias', type: 'denuncias' },
      { label: 'Exposiciones', type: 'exposicion' },
    ],
    agente: [
      { label: 'Denuncias', type: 'denuncias' },
      // { label: 'Radiograma', type: 'radiograma' },
      { label: 'Exposiciones', type: 'exposicion' },
    ],
  };

  // Función para cambiar el componente activo
  const handleSearchChange = (type) => {
    setActiveSearch(type);
    setShowUnverified(false); // Resetear estado de denuncias sin verificar
  };

  // Renderizado del componente activo
  const ActiveComponent = searchComponents[activeSearch];

  // Determinar la clave de buttonConfig según el rol
  const configKey = user?.rol === 'agente' ? 'agente' : 'admin-carga';

  // Validaciones de autenticación
  if (isLoading) return <LoadingScreen />;
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.rol === 'sin_definir') return <Navigate to="/login" replace />;

  return (
    <div className="h-full flex flex-grow flex-col">
      <NavBar user={user} />
      {openModal && <Modal titulo={title} texto={text} onClose={() => setOpenModal(false)} />}
      <div className="min-h-screen flex flex-grow flex-col">
        <div className="flex flex-col md:flex-row items-center justify-center m-2 md:m-0">
          {buttonConfig[configKey]?.map(({ label, type }) => (
            <BotonBusqueda
              width="w-full md:w-2/10 lg:w-3/10 xl:w-1/10"
              key={type}
              label={label}
              isSelected={activeSearch === type}
              onClick={() => handleSearchChange(type)}
            />
          ))}
        </div>
        <div className="h-full p-2 sm:p-10">
          <h1 className="text-3xl my-5">Búsqueda</h1>
          {/* Botón para alternar entre denuncias verificadas y sin verificar solo para admin y carga */}
          {(user?.rol === 'admin' || user?.rol === 'carga') && activeSearch === 'denuncias' && (
            <div className="flex flex-col md:flex-row items-center justify-center m-2 md:m-0">
              <BotonBusqueda
                width="w-full md:w-3/10"
                label={showUnverified ? 'Denuncias sin verificar' : 'Denuncias verificadas'}
                isSelected={showUnverified}
                onClick={() => setShowUnverified(!showUnverified)}
              />
            </div>
          )}
          <ActiveComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Buscar;