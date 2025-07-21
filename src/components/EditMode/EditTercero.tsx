/* [Uso del componente]
    EditVictima recibe los datos de las victimas para ser mostrados y editados en el formulario de la sección de victima.
    Este componente es utilizado en editSection. */
//Componentes
import InputText from '../InputComponents/InputText'
import InputNumber from '../InputComponents/InputNumber';

// Tipos

import Tercero from '../../types/Tercero';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type CargarVictimaProps = {
    datos: Tercero;
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

function EditTercero({ datos, register, setValue, errors }: CargarVictimaProps) {
    
    return (
        <div className='w-full'>
            <h1 className='text-2xl my-5'>Tercero</h1>
            <InputText campo="" nombre="tercero_id" register={register} setValue={setValue} hidden error={errors.id} valor={datos._id} />
            <div className='flex flex-col md:flex-row my-2'>
                <InputText campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} error={ errors.nombre_tercero } valor={datos.nombre} />
                <InputText campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} error={ errors.apellido_tercero } valor={datos.apellido} />
                <InputNumber campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} error={errors.dni_tercero} valor={datos.DNI} maxLenght={8}/>
            </div>
        </div>
    )
}

export default EditTercero