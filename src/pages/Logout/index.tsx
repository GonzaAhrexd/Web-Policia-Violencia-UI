/*
  [/logout] 
  Descripción: Página de cierre de sesión, solo muestra un mensaje de cerrando sesión
*/
// Hooks
import { useAuth } from '../../context/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function index() {
    // Autenticación
    const { logOut, isAuthenticated } = useAuth()
    // Navegación
    const navigate = useNavigate();
    // Cerrar sesión
    useEffect(() => {
        if(isAuthenticated){
            logOut()
            setTimeout(() => {
            navigate('/login')
            }, 2000)
        }
      }, [isAuthenticated])

      // Si está autenticado muestra el mensaje de cerrando sesión con un menú de carga
      return (
        <div className="logout-container">
          <div className="spinner"></div>
          <p>Cerrando sesión...</p>
        </div>
      );
    }

export default index