// Hooks
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Campos y variables globales
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
//import { unidadCampos } from '../../GlobalConst/unidadCampos';
import { zonaCampos } from '../../GlobalConst/zonaCampos';
// Componentes
import InputRegister from '../InputComponents/InputRegister'
import SelectRegister from '../Select/SelectRegister'
import InputNumber from '../InputComponents/InputNumber'

// Backend
import { editUser } from '../../api/CRUD/usuarios.crud'
import { useCampos } from '../../context/campos'
// Librerías
import Swal from 'sweetalert2'
import InputRadio from '../InputComponents/InputRadio';
interface InputRegisterProps {
    datos: any
    setIsEditing: any
}

function CardEditDatadatos({ datos, setIsEditing }: InputRegisterProps) {

    const divisionZona = datos.unidad.split(",")
    const [isDivision, setDivision] = useState(!(divisionZona.length > 1));

    
  const opcionesRadio = [
    { value: "si", nombre: "Sí" },
    { value: "no", nombre: "No" },
  ]
  

    const {watch, register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [mensajeError, setMensajeError] = useState('')

    const { unidades: unidadCampos } = useCampos();
    return (
        <div className="bg-white shadow-lg rounded-lg md:w-8/10 p-4">
            <form className='flex flex-col w-95/100'
                onSubmit={handleSubmit(async (values: any) => {
                    // Evalúa la longitud del teléfono  
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
                                values.id = datos._id
                                // Edita el perfil
                                const response = await editUser(values);
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
                })}>
                <div className='flex flex-col md:flex-row'>
                    <InputRegister disabled campo="Nombre" nombre="nombre" register={register} setValue={setValue} type="text" error={errors.nombre} valor={datos.nombre} />
                    <InputRegister disabled campo="Apellido" nombre="apellido" register={register} setValue={setValue} type="text" error={errors.apellido} valor={datos.apellido} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <InputNumber require={false} campo="Teléfono" nombre="telefono" placeholder={datos.telefono} register={register} setValue={setValue} type="text" error={errors.telefono} valor={datos.telefono} maxLenght={14} />
                </div>

                <div className='flex flex-col md:flex-row'>
                    <InputRegister require={false} campo="N° de Credencial" nombre="credencial" register={register} setValue={setValue} type="text" error={errors.credencial} valor={datos.credencial} />
                    <InputRegister require={false} campo="N° de Plaza" nombre="plaza" register={register} setValue={setValue} type="text" error={errors.plaza} valor={datos.plaza} />
                </div>
                <div className='flex flex-col md:flex-row'>
                    <SelectRegister mid isRequired={false} valor={datos.jerarquia} campo="Jerarquía" nombre="jerarquia" opciones={jerarquiaCampos} register={register} setValue={setValue} type="text" error={errors.jerarquia} />
                    <SelectRegister mid isRequired={false} valor={datos.zona} campo="Zona" nombre="zona" opciones={zonaCampos} register={register} setValue={setValue} type="text" error={errors.zona} />
                </div>
                <div>
                    <span>¿División Violencia Familiar y de Género?</span>
            <InputRadio watch={watch} defaultValue={isDivision ? 0 : 1} handleChange={setDivision} campo="violencia_familiar" nombre="violencia_familiar" register={register} type="radio" opciones={opcionesRadio} />
           
                </div>
                {isDivision ?
                    <SelectRegister notComisaria notMunicipio isRequired={false} valor={datos.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
                    :
                    <SelectRegister isRequired={false} valor={datos.unidad} campo="Unidad" nombre="unidad" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.unidad} />
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

export default CardEditDatadatos