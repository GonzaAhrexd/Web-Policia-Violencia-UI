// Hooks
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Campos y variables globales
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
import { zonaCampos } from '../../GlobalConst/zonaCampos';

// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputNumber from '../InputComponents/InputNumber'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
// Contexto
import { useAuth } from '../../context/auth';
import { useCampos } from '../../context/campos';

// Librerías
import Swal from 'sweetalert2'
import InputRadio from '../InputComponents/InputRadio';
interface InputRegisterProps {
    user: any
    setIsEditing: any
}

function CardEditDataUser({ user, setIsEditing }: InputRegisterProps) {
    const divisionZona = user.unidad.split(",")
    const [isDivision, setIsDivision] = useState(!(divisionZona.length > 1));

    const {watch, register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [mensajeError, setMensajeError] = useState('')

    const { editProfile } = useAuth()
    const { unidades: unidadCampos } = useCampos();

    const opcionesRadio = [
        { value: "si", nombre: "Sí" },
        { value: "no", nombre: "No" },
    ]
    
    return (
        <div className="bg-white shadow-lg rounded-lg md:w-8/10 p-4 scale-up-center">
            <form className='flex flex-col w-95/100'
                onSubmit={handleSubmit(async (values: any) => {
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
                                    values.id = user.id
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
                    <InputRegister disabled campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} valor={user.nombre} />
                    <InputRegister disabled campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} valor={user.apellido} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <InputNumber  require={false} campo="Teléfono" nombre="telefono" placeholder={user.telefono} register={register} setValue={setValue} type="text" error={errors.telefono} valor={user.telefono} maxLenght={14} />
                    <InputRegister disabled campo="Nombre de usuario" nombre="nombre_de_usuario" register={register} setValue={setValue} type="text" error={errors.nombre_de_usuario} valor={user.username} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <SelectRegisterSingle mid isRequired={false} valor={user.jerarquia} campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia} />
                    <SelectRegisterSingle mid isRequired={false} valor={user.zona} campo="Zona" nombre="zona" opciones={zonaCampos}  setValue={setValue}  error={errors.zona} />
                </div>

                { user.rol === 'admin' && 
                <>
                <span>¿División Violencia Familiar y de Género?</span>
            <InputRadio watch={watch} defaultValue={isDivision ? 0 : 1} handleChange={setIsDivision} campo="violencia_familiar" nombre="violencia_familiar" register={register} type="radio" opciones={opcionesRadio} />
           
            {isDivision ?
                <SelectRegister notMunicipio notComisaria isRequired={false} valor={user.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
                :
                <SelectRegister  isRequired={false} valor={user.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
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