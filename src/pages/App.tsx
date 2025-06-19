/*
  [Rutas]
  Descripción: En este archivo se  utiliza React router para crear las distintas rutas de nuestra aplicación .
  También, se importa el contexto de autenticación y campos para que estén disponibles en toda la aplicación.
*/
// Enrutamiento
import { useRoutes, HashRouter  } from 'react-router-dom'
// Páginas
// LOGIN E INICIO
import Home from './Home'
import Login from './Login'
// import Register from './Register'
import Logout from './Logout'
import Perfil from './Perfil'
// 404
import NotFound from './NotFound'
// DENUNCIAS
import CargarDenuncias from './CargarDenuncias'
import MisDenuncias from './MisDenuncias'
import VerificarDenuncias from './VerificarDenuncias'
// BÚSQUEDA
import Buscar from './Buscar'
// ADMIN
import ReportarErrores from './ReportarErrores'
import RegistroDeActividad from './RegistroDeActividad'
import EditarCampos from './EditarCampos'
// ESTADÍSTICAS
import Estadisticas from './Estadisticas'
// ADMIN
import AdministrarUsuarios from './AdministrarUsuarios'
// Contexto
import { AuthProvider } from '../context/auth'
import { CamposProvider } from '../context/campos'

// CSS
import '../App.css'

const AppRoutes = () => {
  // Rutas de la aplicación
  const routes = useRoutes([
    // Global
    { path: '/', element: <Home /> },
    { path: '/mi-perfil', element: <Perfil /> },
    // Denuncias
    { path: '/cargar-denuncias', element: <CargarDenuncias /> },
    { path: '/mis-denuncias', element: <MisDenuncias /> },
    { path: '/verificar-denuncias', element: <VerificarDenuncias />},
    // Búsqueda
    { path: '/búsqueda', element: <Buscar />},
    // Estadísticas
    { path: '/estadísticas', element: <Estadisticas />},
    // Admin
    {path: '/reportar-errores', element: <ReportarErrores />},
    // Autenticación (Global)
    // { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    // Admin
    { path: '/administrar-usuarios', element: <AdministrarUsuarios /> },
    { path: '/registro-de-actividad', element: <RegistroDeActividad /> },
    { path: '/editar-campos', element: <EditarCampos /> },
    // 404
    { path: '*', element: <NotFound /> },
  ])
  return routes
}

const App = () => {
  // AuthProvider valida el login del usuario
  // BrowserRouter utiliza las rutas y por dentro se encierra con AppRoutes que es la función que tenemos arriba
  return (
    <AuthProvider>
      <HashRouter>
      <CamposProvider>
        <AppRoutes />
      </CamposProvider>
      </HashRouter>
    </AuthProvider>

  )
}

export default App
