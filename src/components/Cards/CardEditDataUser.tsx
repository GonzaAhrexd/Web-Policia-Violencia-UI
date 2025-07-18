// Hooks
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Campos y variables globales
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
import { zonaCampos } from '../../GlobalConst/zonaCampos';

// Componentes
import InputText from '../InputComponents/InputText'
import InputNumber from '../InputComponents/InputNumber'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
// Contexto
import { useAuth } from '../../context/auth';
import { useCampos } from '../../context/campos';

// Librerías
import Swal from 'sweetalert2'
import InputRadio from '../InputComponents/InputRadio';
// Tipos
import User from '../../types/Usuarios'

type Radio = {
    value: string;
    nombre: string;
    id?: string;
}

interface InputRegisterProps {
    user: User
    setIsEditing: (isEditing: boolean) => void
}

function CardEditDataUser({ user, setIsEditing }: InputRegisterProps) {
    const divisionZona = user.unidad.split(",")
    const [isDivision, setIsDivision] = useState(!(divisionZona.length > 1));

    const {watch, register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [mensajeError, setMensajeError] = useState('')

    const { editProfile } = useAuth()
    const { unidades: unidadCampos } = useCampos();

    const opcionesRadio:Radio[] = [
        { value: "si", nombre: "Sí" },
        { value: "no", nombre: "No" },
    ]
    
    return (
        <div className="bg-white shadow-lg rounded-lg md:w-8/10 p-4 scale-up-center">
            <form className='flex flex-col w-95/100'
                onSubmit={handleSubmit(async (values: User) => {
                    // Evalúa la longitud del teléfono
                    if (values.telefono.length && values.telefono.length != 10) {
                        setMensajeError("El teléfono debe tener 10 dígitos");
                    } else {
                        try {
                            Swal.fire({
                                title: '¿Estás seguro?',
                                text: "Podrás volver a editar más adelante.",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#0C4A6E',
                                cancelButtonColor: '#FF554C',
                                confirmButtonText: 'Sí, editar',
                                cancelButtonText: 'Cancelar'
                            }).then(async (result: any) => {
                                if (result.isConfirmed) {
                                    values._id = user._id
                                    // Edita el perfil
                                    const response = await editProfile(values);
                                    // Si esta da respuesta, recarga la página
                                    if (response) { 
                                        setMensajeError('')
                                        window.location.reload()
                                    } else { // Sino, el devuelve como mensaje de error que el usuario ya existe, si se intenta cambiar el nombre de usuario
                                        setMensajeError("Usuario ya existe")
                                    }
                                }
                            })

                        } catch (error: any) { // Si ocurre un error, devuelve que ha ocurrido el error del usuario existente
                            setMensajeError("Usuario ya existente")
                        }

                    }
                })}>
                {/* ID oculta para luego pasarlo al submit */}
                <div className='flex flex-col md:flex-row'>
                    <InputText disabled campo="Nombre" nombre="nombre" register={register} setValue={setValue}  error={errors.nombre} valor={user.nombre} />
                    <InputText disabled campo="Apellido" nombre="apellido" register={register} setValue={setValue}  error={errors.apellido} valor={user.apellido} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <InputNumber  require={false} campo="Teléfono" nombre="telefono" placeholder={user.telefono} register={register} setValue={setValue} error={errors.telefono} valor={user.telefono} maxLenght={14} />
                    <InputText disabled campo="Nombre de usuario" nombre="nombre_de_usuario" register={register} setValue={setValue}  error={errors.nombre_de_usuario} valor={user.nombre_de_usuario} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <SelectRegisterSingle mid isRequired={false} valor={user.jerarquia} campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia} />
                    
                    <SelectRegisterSingle mid isRequired={false} valor={user.zona} campo="Zona" nombre="zona" opciones={zonaCampos}  setValue={setValue}  error={errors.zona} />
                </div>

                { user.rol === 'admin' && 
                <>
                <span>¿División Violencia Familiar y de Género?</span>
            <InputRadio watch={watch} defaultValue={isDivision ? 0 : 1} handleChange={setIsDivision} campo="violencia_familiar" nombre="violencia_familiar" register={register}  opciones={opcionesRadio} />
           
            {isDivision ?
                <SelectRegisterSingle notMunicipio notComisaria isRequired={false} valor={user.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} setValue={setValue}  />
                :
                <SelectRegisterSingle  isRequired={false} valor={user.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} setValue={setValue}  />
            }
            </>
        }

                <span className='text-red-400 pl-3'> {mensajeError} </span>

                <div className="flex gap-2 px-2 py-2">
                    <button
                        className="flex-1 rounded-full bg-sky-950 hover:bg-sky-700 text-white dark:text-white antialiased font-bold px-4 py-2">
                        Modificar
                    </button>
                    <div className="flex justify-center cursor-pointer flex-1 rounded-full bg-sky-950 hover:bg-sky-700 text-white dark:text-white antialiased font-bold px-4 py-2"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancelar
                    </div>
                </div>
            </form>



        </div>
    )
}

export default CardEditDataUser