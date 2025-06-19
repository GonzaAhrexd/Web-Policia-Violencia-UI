/*
  [ VerificarDenuncias ] Sección de la página de inicio que muestra las denuncias sin verificar, cargado
   por los agentes que aún faltan rellenar datos estadísticos.
*/
// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// APIs del BackEnd
import { mostrarDenunciasSinVerificar } from '../../api/CRUD/denunciasSinVerificar.crud';
// Componentes
import NavBar from '../../components/NavBar';
import LoadingScreen from '../../components/LoadingScreen';
import Footer from '../../components/Footer/Footer';
// Librerías React
import DataTable from 'react-data-table-component';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// DataTable
import { customStyles } from '../../GlobalConst/customStyles'
import { columnsDataTableVerificar } from './columnsDataTableVerificar'
import expandedComponents from './expandedComponents'

import { useStore } from '../CargarDenuncias/store' // Store de Zustand para manejar el estado global
import Modal from '../../components/Modal';
import BuscarExistenteModal from '../../components/ModalBusqueda/BuscarExistenteModal';


function VerificarDenuncias() {

  // Autenticación
  const { user, isAuthenticated, isLoading } = useAuth();
  // Estados
  const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
  // Cargar denuncias sin verificar
  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const response = await mostrarDenunciasSinVerificar();
        // Setea las denuncias a mostrar con las denuncias sin verificar obtenidas de la API
        setDenunciasAMostrar(response);
      } catch (error) {
        console.error('Hubo un error al cargar las denuncias: ', error);
      }
    };
    // Llama a la función cargarDenuncias
    cargarDenuncias();
  }, []);

  // Iconos de expandir y colapsar
  const expandableIcon = {
    collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
    expanded: <ArrowUpCircleIcon className='h-6 w-6' />
  }

  const { isModalOpen, titulo,texto, setIsModalOpen, openModalVictima, openModalVictimario, openModalTercero, setOpenModalVictima, setOpenModalVictimario, setOpenModalTercero, setVictimaCargar, setVictimarioCargar, setTerceroCargar } = useStore((state) => ({
    isModalOpen: state.isModalOpen,
    titulo: state.titulo,
    texto: state.texto,
    setIsModalOpen: state.setIsModalOpen,
    setTitulo: state.setTitulo,
    setTexto: state.setTexto,
    openModalVictima: state.openModalVictima,
    openModalVictimario: state.openModalVictimario,
    openModalTercero: state.openModalTercero,
    setOpenModalVictima: state.setOpenModalVictima,
    setOpenModalVictimario: state.setOpenModalVictimario,
    setOpenModalTercero: state.setOpenModalTercero,
    setVictimaCargar: state.setVictimaCargar,
    setVictimarioCargar: state.setVictimarioCargar,
    setTerceroCargar: state.setTerceroCargar
  }))

  const handleCloseModal = () => {
    setOpenModalVictima(false)
    setOpenModalVictimario(false)
    setOpenModalTercero(false)
    setIsModalOpen(false)
  }


  // Si está cargando muestra la pantalla de carga
  if (isLoading) return <LoadingScreen />

  // Si no está autenticado redirige a la página de login
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />

  // Si el usuario no es carga o admin redirige a la página de login
  if ((user.rol !== "carga") && (user.rol !== "admin")) return <Navigate to="/login" replace />

  return (
    <div className='h-full flex flex-grow flex-col'>
      <NavBar user={user} />
      {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
      {openModalVictima && <BuscarExistenteModal variante={"Víctima"} setOpenModal={setOpenModalVictima} setVictimaCargar={setVictimaCargar} />}
      {openModalVictimario && <BuscarExistenteModal variante={"Victimario"} setOpenModal={setOpenModalVictimario} setVictimaCargar={setVictimarioCargar} />}
      {openModalTercero && <BuscarExistenteModal variante={"Tercero"} setOpenModal={setOpenModalTercero} setVictimaCargar={setTerceroCargar} />}

      <div className='min-h-screen sm:h-full p-2 sm:p-10'>
        <h1 className='text-3xl my-5'>Denuncias sin verificar</h1>
        <div className="flex flex-col w-full">
          <h2 className='text-2xl my-5'>Denuncias</h2>
          <DataTable
            columns={columnsDataTableVerificar} // Columnas de la tabla
            data={denunciasAMostrar} // Datos de la tabla
            className='scale-up-ver-top' // Animación de entrada
            pagination // Paginación
            expandableRows // Filas expandibles
            expandableRowsComponent={expandedComponents} // Componente de filas expandibles
            customStyles={customStyles} // Estilos personalizados
            responsive={true} // Diseño responsivo
            striped={true} // Filas alternadas
            highlightOnHover={true} // Resaltar al pasar el mouse
            noDataComponent="No hay denuncias para verificar" // Mensaje si no hay datos
            defaultSortFieldId={"Fecha"} // Campo por defecto para ordenar
            expandableIcon={expandableIcon} // Iconos de expandir y colapsar
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default VerificarDenuncias