// Hooks
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/auth';
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer/Footer';
import CardDataUsuario from '../../components/Cards/CardDataUsuario';
import CardUserDenunciasRecientes from '../../components/Cards/CardUserDenunciasRecientes';
import CardEditDataUser from '../../components/Cards/CardEditDataUser';
import LoadingScreen from '../../components/LoadingScreen';
// Datatable
import DataTable from 'react-data-table-component';
// Iconos
import { PencilIcon } from '@heroicons/react/24/outline' // Asegúrate de tener instalado Heroicons
// Backend
import { editUserImg } from '../../api/auth';
// Configuraciones
import { customStyles } from '../../GlobalConst/customStyles'
import { columns } from './columnsDataTable'
// Backend 
import { obtenerMiActividad } from '../../api/CRUD/actividadReciente.crud';

const APIURL = import.meta.env.VITE_BASE_URL;

function Index() {
  // Autenticación
  const { user, isAuthenticated, isLoading } = useAuth();
  // Carga de imagen
  const fileInputRef: any  = useRef(null);
  // Estados
  const [isEditing, setIsEditing] = useState(false);
  const [userImage, setUserImage] = useState('/user.png');
  const [listaActividad, setListaActividad] = useState([]);

  // Controla el cambio de imagen
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Cambia la imagen del usuario
  const handleImageChange = async (e: any)  => {
    const file = e.target.files[0];
    // Si no hay archivo, no hace nada
    if (!file) return;

    // Edita la imagen del usuario
    await editUserImg(user.id, file);
    // Recarga la página para mostrar la nueva imagen
    window.location.reload();
  };

  useEffect(() => {
    // Carga la imagen del usuario
    const fetchUserImage = async () => {
      // Si el usuario existe y tiene un id
      if (user && user.id) {
        // Intenta cargar la imagen del usuario
        try {
          // Ruta de la imagen
          const imagePath = `${APIURL}/users/${user.id}/image`
          // Establece la imagen del usuario
          setUserImage(imagePath);
        } catch (error) {
          console.error("Error al cargar la imagen del usuario", error);
        }
      }
    };
    // Carga la actividad del usuario
    const fetchActividad = async () => {
      const actividades = await obtenerMiActividad(user?.id);
      setListaActividad(actividades);
    }
    // Llama a las funciones fetchUserImage y fetchActividad
    fetchActividad();
    fetchUserImage();
  }, [user]);

  // Si está cargando, mostrar una pantalla de carga
  if (isLoading) return <LoadingScreen/>

  // Si no está autenticado, redirigir a la página de login
  if (!isLoading && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className='h-full flex flex-grow flex-col'>
      <NavBar user={user} />
      <div className='min-h-screen flex flex-grow flex-col'>
        <div className="flex justify-center mt-10">
          <form encType="multipart/form-data">
            <div
              className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden cursor-pointer group"
              onClick={handleImageClick} // Al hacer click en la imagen, se abre el input de carga de imagen
            >
              <img
                className="h-32 w-32 rounded-full object-cover"
                src={user.imagen != "sin_definir" ? userImage : "/user.png"} 
                alt="Imagen de perfil" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PencilIcon className="h-10 w-10 text-white" />
              </div>
              <input
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange} 
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-semibold">{user.nombre} {user.apellido}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly mt-10 p-14">
          {!isEditing ?
            <>
              {user.rol !== 'sin_definir' ?
                <>
                  <CardDataUsuario datosUsuario={user} setIsEditing={setIsEditing} />
                  <CardUserDenunciasRecientes user={user} />
                </>
                :
                <CardDataUsuario datosUsuario={user} setIsEditing={setIsEditing} />
              }
            </>
            :
            <CardEditDataUser user={user} setIsEditing={setIsEditing} />
          }
        </div>
        
          <div className='h-full p-4 sm:p-10'>
            <h2 className='text-2xl my-5'>Mi Actividad reciente</h2>
            {listaActividad?.length > 0 &&
            <div className='w-full break-words'>
              <DataTable
                columns={columns} // Columnas de la tabla
                data={listaActividad} // Datos de la tabla
                pagination // Paginación
                customStyles={customStyles} // Estilos personalizados
                responsive={true} // Diseño responsivo
                striped={true} // Filas alternadas
                highlightOnHover={true} // Resaltar al pasar el mouse
                noDataComponent="No se encontró actividad reciente" // Mensaje si no hay datos
                defaultSortFieldId={"fecha"} // Campo por defecto para ordenar
                defaultSortAsc={false} // Orden ascendente
                />
                </div>
            }
          </div>
        
      <Footer/>
      </div>
      </div>
  );
}

export default Index;
