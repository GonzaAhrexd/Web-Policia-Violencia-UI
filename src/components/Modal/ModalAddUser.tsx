type ModalAddUserProps = {
  setOpenModal: any
}

// Hooks
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

// Componentes
import SelectRegisterUser from '../Select/SelectRegisterUser'
import InputNumber from '../InputComponents/InputNumber'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
import InputRadio from '../InputComponents/InputRadio'
// Dependencias
import Swal from 'sweetalert2'

// APIs
import { altaUsuario } from '../../api/auth'
// import InputRegister from '../InputComponents/InputRegister'
// Campos

import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos'
import { zonaCampos } from '../../GlobalConst/zonaCampos'
import { useCampos } from '../../context/campos'
import { XCircleIcon } from '@heroicons/react/24/outline'
import SelectRegister from '../Select/SelectRegister'
function ModalAddUser({ setOpenModal }: ModalAddUserProps) {
  const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm();
  useEffect(() => {
    // Al presionar esc del teclado se cierra el modal
    const cerrarModal = (e: any) => {
      if (e.key === 'Escape') {
        setOpenModal(false);
      }
    };

    // Agregar el evento al cargar el componente
    window.addEventListener('keydown', cerrarModal);
    // Remover el evento al desmontar el componente
    return () => {
      window.removeEventListener('keydown', cerrarModal);
    };
  }, []);

  const [division, setDivision] = useState(false);

  const opcionesRadio = [
    { value: "si", nombre: "Sí" },
    { value: "no", nombre: "No" },
  ]

  const rolesCampos = [
    { nombre: 'Admin', value: 'admin' },
    { nombre: "Agente", value: 'agente' },
    { nombre: "Carga", value: 'carga' },
    { nombre: "Pendiente", value: 'sin_definir' }
  ]
  const { unidades: unidadCampos } = useCampos();


  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white w-9/10 md:w-6/10 h-9/10 rounded p-5 relative overflow-auto scale-up-center">
          <XCircleIcon className='h-6 w-6 absolute top-2 right-2 text-black cursor-pointer' onClick={() => setOpenModal(false)} />
          <form className='flex flex-col items-center justify-center w-full' onSubmit={
            handleSubmit(async (values) => {
              Swal.fire({
                title: '¿Estás seguro de que deseas agregar este usuario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0C4A6E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, agregar',
                cancelButtonText: 'Cancelar'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    // Agregar usuario
                    const usuarioResponse = await altaUsuario(values);
                    console.log(values)
                    if(usuarioResponse.mensaje == "No se encontró el usuario"){
                      Swal.fire({
                        title: 'DNI no encontrado',
                        text: 'Comprueba si está escrito correctamente.',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                        confirmButtonText: 'Aceptar'
                      })
                    }else if(usuarioResponse.mensaje == "Ya está dado de alta"){
                      Swal.fire({
                        title: 'Usuario ya dado de alta',
                        text: 'El usuario ingresado ya está dado de alta.',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                        confirmButtonText: 'Aceptar'
                      })
                    }else if(usuarioResponse.mensaje == "Usuario creado con éxito"){
                    Swal.fire({
                      title: 'Usuario agregado',
                      icon: 'success',
                      confirmButtonColor: '#0C4A6E',
                      confirmButtonText: 'Aceptar'
                    });
                  }
                  } catch (error) {
                    Swal.fire({
                      title: 'Error',
                      text: 'No se pudo agregar el usuario',
                      icon: 'error',
                      confirmButtonColor: '#0C4A6E',
                      confirmButtonText: 'Aceptar'
                    });
                  }
                }
              });
            })
          }>
            <h1 className='text-4xl'>Alta de nuevo usuario</h1>
            <div className='w-9/10 md:w-5/10'>
            <p>Desde este apartado, se puede dar de alta a un usuario con cuenta en Policía Digital. Si el usuario no tiene cuenta, deberá solicitarla <a className='text-sky-800' href="https://policiadigital.chaco.gob.ar/" >aquí</a> </p>
            </div>
            <InputNumber busqueda campo="DNI" nombre="dni" register={register} maxLenght={8} type="text" error={errors.dni} />
            <SelectRegisterSingle campo="Rol" nombre="rol" setValue={setValue} error={errors.rol} opciones={rolesCampos} />
            <SelectRegisterSingle campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia} />
            <SelectRegisterSingle campo="Zona" nombre="zona" opciones={zonaCampos} setValue={setValue} error={errors.zona} />
            <span>¿División Violencia Familiar y de Género?</span>
            <InputRadio watch={watch} defaultValue={1} handleChange={setDivision} campo="violencia_familiar" nombre="violencia_familiar" register={register} type="radio" opciones={opcionesRadio} />
           
           {division ? 
            <SelectRegister notMunicipio notComisaria campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
            :
          <SelectRegisterUser campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
          }

            <button type='submit' className='bg-sky-900 hover:bg-sky-700 text-white w-4/10 h-10 rounded-md my-2'>Agregar</button>

          </form>

        </div>
      </div>
    </div>
  )

}

export default ModalAddUser