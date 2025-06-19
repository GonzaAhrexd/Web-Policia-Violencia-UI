/* 
  [ /register ] 
   Descripción: Página de registro de usuario donde se solicitan los datos del usuario para registrarse 
   en el sistema
*/
// Hooks
import { useEffect, useState } from 'react'
import { registerRequest } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useForm } from 'react-hook-form'

// Componentes
import InputRegister from '../../components/InputComponents/InputRegister'
import SelectRegister from '../../components/Select/SelectRegister'
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle'
import InputNumber from '../../components/InputComponents/InputNumber'

// Campos
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos'
import { zonaCampos } from '../../GlobalConst/zonaCampos'
import { useCampos } from '../../context/campos'

function Register() {
  // Extraer funciones de useForm
  const { register, handleSubmit, setValue, formState: {
    errors
  } } = useForm()
  // Extraer funciones de useAuth
  const { signUp, user, isAuthenticated } = useAuth()
  // Navegación
  const navigate = useNavigate();
  // Estados  
  const [mensajeError, setMensajeError] = useState("")
  // Estado para controlar que se presionó el botón
  const [buttonClicked, setButtonClicked] = useState(false)
  // Campos desde el contexto
  const { unidades: unidadCampos } = useCampos();

  // Validación si ya está identificado, si es así redirige a login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login')
    }
  }, [user, isAuthenticated])

  return (
    <div className='gradient xl:h-screen md:flex md:flex-col md:items-center md:align-top md:justify-center'>
      <div className='flex flex-row align-middle justify-center bg-white mt-56 sm:h-auto sm:w-auto sm:rounded-md sm:mt-0 md:h-full md:w-full md:rounded-md md:mt-0 lg:h-5/6 lg:w-4/6 lg:rounded-md lg:mt-0 xl:h-95/100 xl:w-4/6 xl:rounded-md xl:mt-0 2xl:h-5/6 2xl:w-2/5 2xl:rounded-md 2xl:mt-0 '>
        <div className=' h-screen w-screen sm:h-full sm:w-full flex flex-col items-center align-middle justify-center'>
          <h1 className='open-sans text-3xl font-semibold'>¡Registrate ahora!</h1>
          <form className='flex flex-col align-middle justify-center w-5/6' onSubmit={
            handleSubmit(async (values) => {

              if (values.pass.length < 6) {  //Validación longitud de contraseña
                setMensajeError("La contraseña debe tener mínimo 6 caracteres");
              } else if (values.pass !== values.passrepeat) { //Validación de contraseñas iguales
                setMensajeError("Las contraseñas no coinciden");
              } else if ((values.telefono).length !== 10) { //Validación de longitud de teléfono	
                setMensajeError("Los números de teléfono deben tener 10 dígitos");
              }
              else { //Si no hay errores
                setMensajeError("");
                try {
                  setButtonClicked(true)
                  const res = await registerRequest(values);
                  if (res.data == "Usuario ya existe o no se ingresaron datos") {
                    setMensajeError("Usuario ya existente")
                    setButtonClicked(false)
                  } else {
                    // Envía la información al backend
                    signUp(res)
                    // Redirecciona a login
                    navigate('/login');
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            })}>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} />
              <InputRegister campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputNumber campo="Teléfono" nombre="telefono" placeholder={"Ej. 3624123456"} register={register} setValue={setValue} type="text" error={errors.telefono} maxLenght={10}/>
              <InputRegister campo="Nombre de usuario" nombre="nombre_de_usuario" register={register} setValue={setValue} type="text" error={errors.nombre_de_usuario} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="Contraseña" nombre="pass" register={register} type="password" error={errors.pass} />
              <InputRegister campo="Repite la contraseña" nombre="passrepeat" register={register} setValue={setValue} type="password" error={errors.passrepeat} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister campo="N° de Credencial" nombre="credencial" register={register} setValue={setValue} type="text" error={errors.credencial} />
              <SelectRegisterSingle campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia} />
            </div>
            <div className='flex flex-col md:flex-row'>
              <InputRegister require={false} campo="N° de Plaza" nombre="plaza" register={register} setValue={setValue} type="text" error={errors.plaza} />
              <SelectRegisterSingle campo="Zona" nombre="zona" opciones={zonaCampos} setValue={setValue} error={errors.zona} />
            </div>
            <SelectRegister notComisaria campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
            <div className='flex flex-col m-4'>
              {/* <div className='flex flex-col md:w-full'>
                <span>DNI en formato PDF</span>
                <input name="pdf" type="file" accept=".pdf" />
              </div> */}
            </div>
            <div className='flex flex-col'>
              <span className='text-red-400'> {mensajeError} </span>
              <span className='text-sm'>Ya tienes cuenta? <a href='/login' className='text-sky-900'>Inicia sesión</a></span>
           { !buttonClicked && 
              <button className='bg-sky-900 hover:bg-sky-700 text-white w-full h-10 rounded-md my-2'>Crear cuenta</button>
           }
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Register
