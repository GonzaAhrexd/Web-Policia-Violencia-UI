/*
  [/]
  Descripción: Este componente es la página de inicio de la aplicación,
  aquí se muestran los accesos directos a las diferentes 
  secciones de la aplicación.
*/

// Hooks
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
// Componentes
import NavBar from '../../components/NavBar';
import CardActions from '../../components/Cards/CardsActions';
import CardProfile from '../../components/Cards/CardProfile';
import CardDenunciasRecientes from '../../components/Cards/CardDenunciasRecientes';
import CardDenunciasPendientesValidacion from '../../components/Cards/CardDenunciasPendientesValidacion';
import CardMostrarSeccionAdmin from '../../components/Cards/CardMostrarSeccionAdmin';
import CardDenunciasTotales from '../../components/Cards/CardDenunciasTotales';
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import CardDenunciasGrafico from '../../components/Cards/CardDenunciasGrafico';
import WarningMessage from '../../components/Warnings/WarningMessage';
// Iconos
import { ExclamationTriangleIcon, UserIcon, MagnifyingGlassIcon, ListBulletIcon, PencilSquareIcon, ClipboardDocumentCheckIcon, ChartPieIcon, UserPlusIcon, PresentationChartBarIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
// Tipos
type seccionesType = {
  mostrar: string;
  url: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}


function Home() {
  // Obtiene los datos del usuario y verifica si está autenticado desde el contexto
  const { user, isAuthenticated, isLoading } = useAuth();
  // Estados
  const [showAdminSection, setShowAdminSection] = useState<boolean>(false);
  const [isInscripciones, setIsInscripciones] = useState<boolean>(false);

  useEffect(() => {
    // Si la fecha está entre el 07/07/2025 y el 20/07/2025 pon en true isInscripciones
    const fechaActual: Date = new Date();
    const fechaInicio: Date = new Date('2025-07-07');
    const fechaFin: Date = new Date('2025-07-21');

    if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
      setIsInscripciones(true);
    } else {
      setIsInscripciones(false);
    }
  },[]);
  // Validación de cargando y si está logeado
  if (isLoading) return <LoadingScreen />

  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />


  const seccionesAgente: seccionesType[] = [
    { mostrar: "Búsqueda", url: "/búsqueda", svg: MagnifyingGlassIcon },
    { mostrar: "Mis denuncias", url: "/mis-denuncias", svg: ListBulletIcon },
    { mostrar: "Cargar denuncias", url: "/cargar-denuncias", svg: PencilSquareIcon },
  ]

  const seccionesCarga: seccionesType[] = [
    { mostrar: "Verificar denuncias", url: "/verificar-denuncias", svg: ClipboardDocumentCheckIcon },
    { mostrar: "Estadísticas", url: "/estadísticas", svg: ChartPieIcon },
  ]


  const seccionesAdmin: seccionesType[] = [
    { mostrar: "Administrar usuarios", url: "/administrar-usuarios", svg: UserPlusIcon },
    { mostrar: "Registro de Actividad", url: "/registro-de-actividad", svg: PresentationChartBarIcon },
    { mostrar: "Editar campos", url: "/editar-campos", svg: ArrowUpTrayIcon },
  ]

  const isAdmin: boolean = user?.rol === 'admin';
  const isCarga: boolean = user?.rol === 'carga' || user?.rol === 'admin';
  const isAgente: boolean = user?.rol === 'agente' || user?.rol === 'admin' || user?.rol === 'carga';

  // Función para saludar dependiendo de la hora
  const saludosDependiendoLaHora = () => {
    const fecha: Date = new Date();
    const hora: number = fecha.getHours();
    if (hora >= 6 && hora < 12) {
      return 'Buenos días';
    } else if (hora >= 12 && hora <= 19) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  }



  return (
    <>
      <NavBar user={user} />
      <div className='h-screen flex flex-grow flex-col'>
        {isInscripciones && (
          <WarningMessage
            mensaje="Debido al inicio del período de inscripciones para la Escuela de Policía, la aplicación podría experimentar lentitud por la alta demanda en el servidor."
          />
        )}
        <div className='p-10'>
          <h1 className='text-4xl sm:text-7xl'>¡{saludosDependiendoLaHora()}, {user?.nombre}!</h1>
          {user?.rol === 'sin_definir' && (
            <div className='flex mt-10 text-xl'>
              <p>Aún se te está asignando el rol, regresa pronto.</p>
            </div>
          )}
          <div>
            <h2 className='text-3xl my-5'>Accesos directos</h2>
            <div className='grid gap-1 grid-cols-1 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 w-full '>
              <CardActions mostrar={"Mi perfil"} url={"/mi-perfil"} SVGIcon={UserIcon} />
              <CardActions mostrar={"Sugerencia o error"} url={"/reportar-errores"} SVGIcon={ExclamationTriangleIcon} />

              {isAgente && seccionesAgente.map((seccion, index) => (
                <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
              ))}
              
              {isCarga && seccionesCarga.map((seccion, index) => (
                <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
              ))}


              {isAdmin &&
                <CardMostrarSeccionAdmin mostrar="Mostrar sección admin" showAdminSection={showAdminSection} setShowAdminSection={setShowAdminSection} url={""} />
              }

              {(isAdmin && showAdminSection) && seccionesAdmin.map((seccion, index) => (
                <CardActions key={index} mostrar={seccion.mostrar} url={seccion.url} SVGIcon={seccion.svg} />
              ))}

            </div>
          </div>
          <div>
            <h2 className='text-3xl my-5 '>Resumen</h2>
            <div className='grid gap-1 grid-cols-1 sm:grid-cols-1 sm:gap-5 md:grid-cols-3 xl:grid-cols-5 w-full p-2'>
              <CardProfile title="Mi cuenta" user={user} />
              {(user?.rol === 'admin' || user?.rol === 'carga') && (
                <>
                  <CardDenunciasRecientes/>
                  <CardDenunciasPendientesValidacion />
                  <CardDenunciasTotales />
                  <CardDenunciasGrafico />
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
}

export default Home;