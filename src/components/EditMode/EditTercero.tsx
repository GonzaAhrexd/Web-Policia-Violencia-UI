/* [Uso del componente]
    EditVictima recibe los datos de las victimas para ser mostrados y editados en el formulario de la sección de victima.
    Este componente es utilizado en editSection. */
//Componentes
import InputText from '../InputComponents/InputText'
import SelectRegisterSingle from '../Select/SelectRegisterSingle';
import InputNumber from '../InputComponents/InputNumber';
// Campos
import { useCampos } from '../../context/campos'

interface CargarVictimaProps {
    datos: any;
    register: any;
    setValue: any;
    errors: any;
}
function EditTercero({ datos, register, setValue, errors }: CargarVictimaProps) {
    const { vinculo } = useCampos();
    
    return (
        <div className='w-full'>
            <h1 className='text-2xl my-5'>Tercero</h1>
            <InputText campo="" nombre="tercero_id" register={register} setValue={setValue} hidden error={errors.id} valor={datos._id} />
            <div className='flex flex-col md:flex-row my-2'>
                <InputText campo="Nombre" nombre="nombre_tercero" register={register} setValue={setValue} error={errors.nombre_victima} valor={datos.nombre} />
                <InputText campo="Apellido" nombre="apellido_tercero" register={register} setValue={setValue} error={errors.apellido_victima} valor={datos.apellido} />
            </div>
            <div className='flex flex-col md:flex-row my-2'>
                <SelectRegisterSingle valor={datos.vinculo_con_victima} campo="Vínculo con la víctima" nombre="vinculo_con_la_victima" opciones={vinculo}  setValue={setValue} error={errors.relacion_con_la_victima} isRequired={false} />
                <InputNumber campo="DNI" nombre="dni_tercero" register={register} setValue={setValue} error={errors.dni_victima} valor={datos.DNI} maxLenght={8}/>
            </div>
        </div>
    )
}

export default EditTercero