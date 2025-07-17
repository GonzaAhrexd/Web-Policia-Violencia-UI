/*
  [/login]
  Descripción: Este componente es el encargado de mostrar el formulario de inicio de sesión.
*/
// Hooks
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react'; // Importar useState
import { useNavigate } from 'react-router-dom';
// Contexto
import { useAuth } from '../../context/auth';
// Componentes
import InputLogin from '../../components/InputComponents/InputLogin';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { signIn, errorsAuth, user, isAuthenticated } = useAuth();

  // Nuevo estado para controlar la animación
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      window.location.reload();
    }
  }, [user, isAuthenticated, navigate]);

  // useEffect para la animación de entrada
  useEffect(() => {
    // Al montar el componente, establece showForm a true después de un pequeño retardo
    // Esto permite que el navegador primero aplique el estado inicial (opacity-0, translate-y-4)
    // y luego anime la transición.
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 100); // Pequeño retardo para asegurar que el DOM se renderice primero

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, []); // Se ejecuta solo una vez al montar

  return (
    <div className='gradient min-h-screen flex items-center justify-center md:p-4'>
      <div className={`flex flex-col items-center justify-center bg-white shadow-2xl p-8
                        h-screen w-screen rounded-none
                        md:h-full md:w-full md:rounded-lg md:max-w-xl
                        lg:h-9/10 lg:w-6/10 lg:rounded-lg
                        xl:h-9/10 xl:w-5/10 xl:rounded-lg
                        2xl:h-5/6 2xl:w-2/5 2xl:rounded-lg
                        transition-all duration-500 ease-out transform ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

        <div className='w-full flex flex-col items-center justify-center'>
          {errorsAuth && (
            <div className='rounded-md bg-red-600 p-3 text-white text-center mb-4 text-sm font-medium'>
              {errorsAuth}
            </div>
          )}
          <h1 className='open-sans text-4xl font-extrabold text-gray-800 mb-2'>¡Bienvenido!</h1>
          <figure className='flex flex-col items-center mb-4'>
            <img className='w-32 sm:w-28 drop-shadow-md' src="Escudo_Policia_Chaco_Transparente.png" alt="Escudo Policía del Chaco" />
          </figure>
          <h2 className='open-sans text-xl sm:text-2xl text-gray-700 text-center mb-6'>Dpto. Violencia Familiar y de Género</h2>

          <form
            className='flex flex-col items-center w-full max-w-sm'
            onSubmit={handleSubmit(async (values) => {
              await signIn(values);
            })}
          >
            <InputLogin
              campo={"nombre_de_usuario"}
              placeholder={"Nombre de usuario"}
              register={ register }
              type="text"
              error={errors.nombre_de_usuario}
            />
            <InputLogin
              campo={"pass"}
              placeholder={"Contraseña"}
              register={ register }
              type="password"
              error={errors.pass}
            />

            <button
              type="submit"
              className='bg-sky-800 hover:bg-sky-700 text-white text-xl font-semibold w-full h-12 rounded-lg my-4 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg'
            >
              Iniciar Sesión
            </button>

            <span className='text-sm text-gray-600 text-center mt-2'>
              ¿No tenés cuenta u olvidaste tu contraseña?{' '}
              <a href="https://policiadigital.chaco.gob.ar/" className='text-sky-800 hover:text-sky-600 font-medium transition-colors duration-200'>
                Ingresa aquí
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;