/*
  [/cargar-denuncias]
  Descripción: Página para cargar denuncias, dependiendo del rol del usuario, se mostrará un formulario diferente,
  si es carga o admin, se mostrará un formulario avanzado por defecto, si es agente, se mostrará un formulario simple.

  El usuario carga, puede elegir entre ambos modos.

*/
// Hooks
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
// Componentes
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal';
import CargarDenunciasRolCarga from './CargarDenunciasRolCarga';
import CargarDenunciasRolAgente from './CargarDenunciasRolAgente';
import LoadingScreen from '../../components/LoadingScreen';

function CargarDenuncias() {
  // Estados
  const [modoAvanzado, setModoAvanzado] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [texto, setTexto] = useState(['']);
  const [titulo, setTitulo] = useState('');

  // Abrir el modal y mostrar el texto
  const handleOpenModal = (text: string[]) => {
    setIsModalOpen(true);
    setTexto(text);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  // Cambiar entre modo avanzado y simple
  const handleModoAvanzado = () => {
    setModoAvanzado(!modoAvanzado);
  }



  // Obtener datos del usuario
  const { user, isAuthenticated, isLoading } = useAuth();
  // Si está cargando, mostrar "Cargando..."
  if (isLoading) return <LoadingScreen/>
  // Si no está autenticado, redirigir a la página de login
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />
  if (user?.rol === "sin_definir") return <Navigate to="/login" replace />

  return (
    <>
      <NavBar user={user} />
      <div>
        {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
      </div>

      {(user.rol === 'carga' || user.rol === 'admin') &&
        <div className='w-full flex flex-col justify-center items-center sm:h-full p-2 sm:p-10'>
          <h2 className='text-3xl my-5'>Modo</h2>
          <div className='flex items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold p-2 mx-5 rounded w-full md:w-3/10' onClick={() => handleModoAvanzado()} >{modoAvanzado ? "Modo Avanzado" : "Modo Simple"}</div>
        </div>
      }
      {((user.rol === 'carga' || user.rol === 'admin') && modoAvanzado) && <CargarDenunciasRolCarga setTitulo={setTitulo} handleOpenModal={handleOpenModal} user={user} />}
      {(user.rol === "agente" || !modoAvanzado) && <CargarDenunciasRolAgente user={user} />}
      <Footer />
    </>
  );
}


export default CargarDenuncias