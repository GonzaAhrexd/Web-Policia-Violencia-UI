/*
  [/login]
  Descripción: Este componente es el encargado de mostrar el formulario de inicio de sesión.
*/
// Hooks
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// Contexto
import { useAuth } from '../../context/auth'
// Componentes
import InputLogin from '../../components/InputComponents/InputLogin'
function Login() {
  // Importamos las funciones necesarias de useForm
  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  // Importamos la función navigate de react-router-dom
  const navigate = useNavigate();
  const { signIn, errorsAuth, user, isAuthenticated} = useAuth()
  // useEffect para redirigir al usuario si ya está autenticado
  useEffect(() => {
    if(isAuthenticated){
      navigate('/')
    }
  }, [user, isAuthenticated])
  return (
    <div className='gradient h-screen flex flex-col items-center align-middle justify-center'>
      <div className='flex flex-row align-middle justify-center bg-white h-screen w-screen sm:h-full sm:w-full sm:rounded-md sm:mt-0 md:h-full md:w-full md:rounded-md md:mt-0 lg:h-9/10 lg:w-6/10 lg:rounded-md lg:mt-0 xl:h-9/10 xl:w-5/10 xl:rounded-md xl:mt-0 2xl:h-5/6 2xl:w-2/5 2xl:rounded-md 2xl:mt-0'>
        <div className='w-screen flex flex-col items-center align-middle justify-center'>
          {errorsAuth && <div className='rounded-md bg-red-500 p-2 text-white'>{errorsAuth}</div>}
          <h1 className='open-sans text-3xl font-semibold'>¡Bienvenido!</h1>
         <figure className='flex flex-col'>
            <img className='w-28 sm:w-20' src="Escudo_Policia_Chaco_Transparente.png" alt="" />
          </figure>
          <h1 className='open-sans text-xl'>Dpto. Violencia Familiar y de Género</h1>
          <form className='flex flex-col items-center align-middle justify-center w-4/5 sm:w-3/5' action=""  onSubmit={handleSubmit(async(values) => {
            signIn(values)
            })}>
           <InputLogin campo={"nombre_de_usuario"} placeholder={"Nombre de usuario"} register={register} type="text" error={errors.nombre_de_usuario}></InputLogin>
            <InputLogin campo={"pass"} placeholder={"Contraseña"} register={register} type="password" error={errors.pass}></InputLogin>
             {/* <span>¿Has olvidado la contraseña? </span> <a href='/recover' className='text-sky-900'>Recuperar</a> */}
            <button className='bg-sky-900 hover:bg-sky-700 text-white w-full h-10 rounded-md my-2'>Iniciar Sesión</button>
           
            <span className='text-sm'>¿No tienes cuenta u olvidaste tu contraseña?<a href="https://policiadigital.chaco.gob.ar/" className='text-sky-900'>Ingresa aquí</a></span>           
           { /* <span className='text-sm'> ¿No tienes cuenta? <NavLink to='/register' className='text-sky-900'>Regístrate</NavLink> </span> */}
          </form> 
        </div>
      </div>
    </div>
  )
}

export default Login
