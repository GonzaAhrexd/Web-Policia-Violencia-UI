import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { crearRadiograma, ampliarRadiograma } from '../../api/CRUD/radiograma.crud'
import InputDate from '../InputComponents/InputDate'
import InputRegister from '../InputComponents/InputRegister';

import { useAuth } from '../../context/auth'; // Hook para obtener el usuario autenticado
import InputTextArea from '../InputComponents/InputTextArea';
import SelectRegisterSingle from '../Select/SelectRegisterSingle';
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
import { pdf } from '@react-pdf/renderer';
import PDFRadiograma from '../Cargar/CargarRadiograma/PDFRadiograma';

type CargarRadiogramaProps = {
  // Define the props for the CargarRadiograma component here
  data: any;
  preventivoAmpliado?: any
  modoExpandir?: boolean; // Indica si el modo es expandido
}

function EditRadiograma({preventivoAmpliado, data, modoExpandir }: CargarRadiogramaProps) {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm(); // Hook para manejar el formulario
  const { user } = useAuth(); // Obtiene el usuario autenticado


  const handlePrint = async () => {
    const values = getValues();
    console.log(preventivoAmpliado)
    const nuevosValores = {
      ...data,
      ...values,
      nro_nota_preventivo_anterior: data.numero_nota_anterior,
      nro_nota_preventivo: preventivoAmpliado.numero_nota,
      fecha_anterior: data.fecha,
    };

    console.log(nuevosValores)
    if (modoExpandir) {
      const blob = await pdf(
        <PDFRadiograma datos={nuevosValores} user={user} ampliacion={true} />
      ).toBlob();

      window.open(URL.createObjectURL(blob));
    } else {
      console.warn("No se generó el PDF porque modoExpandir es false.");
    }
  };



  return (
    <div className="max-w-md md:max-w-none">
      <h2 className='text-3xl my-5 font-sans'> Radiograma</h2>
      <form
        className='flex flex-col w-full'
        onSubmit={handleSubmit(async (value) => {

          Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas crear el radiograma?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, crear radiograma'
          }).then(async (result) => {
            if (result.isConfirmed) {


              const valoresParaEnviar = {
                ...data,
                ...value,
                ampliado_de: data._id,
                nro_nota_preventivo_anterior: preventivoAmpliado.numero_nota_anterior,
                nro_nota_preventivo: preventivoAmpliado.numero_nota,
                fecha_anterior: data.fecha,
                tipo_radiograma: "Ampliación de radiograma",
              }

              console.log(valoresParaEnviar)

              const radiogramaNuevo = await crearRadiograma(valoresParaEnviar);
              await ampliarRadiograma(data._id, radiogramaNuevo._id);
              
              Swal.fire(
                '¡Creado!',
                'El radiograma ha sido creado.',
                'success'
              )
            }
          })
        })}
      >
        <div className='flex flex-col md:items-center justify-start md:justify-center'>
          <InputRegister notMidMD campo="Supervisión" nombre="supervision" register={register} type="text" error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={data?.supervision} />
          <InputDate campo="Fecha" nombre="fecha" register={register} error={errors.fecha} type="date" valor={new Date(data.fecha).toISOString().slice(0, 10)} />
          <InputRegister notMidMD valor={data.direccion} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
          <InputRegister notMidMD valor={data.telefono} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
          <InputTextArea valor={data.solicita} campo="Solicita" nombre="solicita" register={register} type="text" required placeholder="Solicita" setValue={setValue} />
        </div>
        <h1 className='text-2xl'>Destinatario</h1>
        <div className='flex flex-col md:items-center justify-center'>
          <InputRegister valor={data.destinatario} notMidMD campo="Destinatario" nombre="destinatario" register={register} type="text" error={errors.supervision} require placeholder="Destinatario" setValue={setValue} />
        </div>
        <h1 className='text-2xl my-5'>Instructor</h1>
        <div className='flex flex-col justify-center items-center w-full '>
          <div className='flex flex-col lg:flex-row my-2 w-full lg:w-8/10 xl:w-6/10'>
            <InputRegister valor={data.instructor.nombre_completo_instructor} notMidMD campo="Nombre y apellido" nombre="nombre_completo_instructor" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegisterSingle valor={data.instructor.jerarquia_instructor} campo='Jerarquía' nombre="jerarquia_instructor" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia_instructor} />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <div onClick={() => handlePrint()} className='flex flex-col items-center justify-center cursor-pointer mr-2 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
            Imprimir
          </div>
          <button
            className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
            Ampliar radiograma
          </button>
        </div>
      </form>

    </div>
  )
}

export default EditRadiograma