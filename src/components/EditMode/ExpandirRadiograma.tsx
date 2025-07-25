import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { crearRadiograma, ampliarRadiograma, editRadiograma } from '../../api/CRUD/radiograma.crud'
import InputDate from '../InputComponents/InputDate'
import InputText from '../InputComponents/InputText';

import { useAuth } from '../../context/auth'; // Hook para obtener el usuario autenticado
import InputTextArea from '../InputComponents/InputTextArea';
import SelectRegisterSingle from '../Select/SelectRegisterSingle';
import { jerarquiaCampos } from '../../GlobalConst/jerarquiaCampos';
import { pdf } from '@react-pdf/renderer';
import PDFRadiograma from '../ReactPDF/PDFRadiograma';
import { useState } from 'react';

import Radiograma from '../../types/Radiograma'; // Importa el tipo de dato Radiograma

type CargarRadiogramaProps = {
  // Define the props for the CargarRadiograma component here
  data: Radiograma;
  preventivoAmpliado?: any
  modoExpandir?: boolean; // Indica si el modo es expandido
}

function EditRadiograma({ preventivoAmpliado, data, modoExpandir }: CargarRadiogramaProps) {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm(); // Hook para manejar el formulario
  const { user } = useAuth(); // Obtiene el usuario autenticado
  const [printMode, setPrintMode] = useState(false); // Estado para controlar el modo de impresión

  const handlePrint = async () => {
    const values = getValues();
    const nuevosValores = {
      ...data,
      ...values,
      nro_nota_preventivo_anterior: preventivoAmpliado.numero_nota_anterior,
      nro_nota_preventivo: preventivoAmpliado.numero_nota,
      fecha_anterior: data.fecha,
    };

    if (modoExpandir) {
      const blob = await pdf(
        <PDFRadiograma datos={{ ...nuevosValores, tipoHoja: values.tipoHoja }} user={user} ampliacion={true} />
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
              
              if(!modoExpandir) {
                const valoresParaEnviar = {
                  ...data,
                  ...value,

                }
   
                await editRadiograma(data._id, valoresParaEnviar);
                Swal.fire(
                  '¡Editado!',
                  'El radiograma ha sido editado.',
                  'success'
                )
                return
              }

              const valoresParaEnviar = {
                ...data,
                ...value,
                ampliado_de: data._id,
                nro_nota_preventivo_anterior: preventivoAmpliado.numero_nota_anterior,
                nro_nota_preventivo: preventivoAmpliado.numero_nota,
                fecha_anterior: data.fecha,
                tipo_radiograma: "Ampliación de radiograma",
              }


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
          <InputText customSize="flex flex-col md:w-full xl:w-1/2" campo="Supervisión" nombre="supervision" register={register} error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={data?.supervision} />
          <InputDate campo="Fecha" nombre="fecha" register={register} error={errors.fecha} valor={new Date(data.fecha).toISOString().slice(0, 10)} />
          <InputText customSize="flex flex-col md:w-full xl:w-1/2" valor={data.direccion} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} />
          <InputText customSize="flex flex-col md:w-full xl:w-1/2" valor={data.telefono} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} />
          <InputTextArea valor={data.solicita} campo="Solicita" nombre="solicita" register={register} required placeholder="Solicita" setValue={setValue} />
        </div>
        <h1 className='text-2xl'>Destinatario</h1>
        <div className='flex flex-col md:items-center justify-center'>
          <InputText valor={data.destinatario} customSize="flex flex-col md:w-full xl:w-1/2" campo="Destinatario" nombre="destinatario" register={register} error={errors.supervision} require placeholder="Destinatario" setValue={setValue} />
        </div>
        <h1 className='text-2xl my-5'>Instructor</h1>
        <div className='flex flex-col justify-center items-center w-full '>
          <div className='flex flex-col lg:flex-row my-2 w-full lg:w-8/10 xl:w-6/10'>
            <InputText valor={data.instructor.nombre_completo_instructor} customSize="flex flex-col md:w-full xl:w-1/2" campo="Nombre y apellido" nombre="nombre_completo_instructor" register={register} setValue={setValue} error={errors.nombre_completo_instructor} />
            <SelectRegisterSingle valor={data.instructor.jerarquia_instructor} campo='Jerarquía' nombre="jerarquia_instructor" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia_instructor} />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>

          {!modoExpandir && (
            <div className="flex justify-center my-3 w-full">
              <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
                Editar radiograma
              </button>
            </div>
          )}

          {(!printMode && modoExpandir) && (
            <div className="flex justify-center my-3">
              <div className='flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(true)}>Imprimir</div>
              <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
                Ampliar radiograma
              </button>
            </div>
          )}
          {printMode && (
            <div className="flex flex-col items-center justify-center my-3">
              <h1 className='text-2xl my-5'>Elegir tipo de hoja</h1>
              <SelectRegisterSingle campo="Tipo de Hoja" nombre="tipoHoja" setValue={setValue} error={errors.tipoHoja} opciones={
                [
                  { nombre: "A4", value: "A4" },
                  { nombre: "Legal", value: "LEGAL" }
                ]
              } />
              <div className='mb-1 flex flex-row items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => {
                handlePrint()
              }}>
                Imprimir
              </div>
              <div className='flex flex-col items-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 mx-5 rounded w-3/10' onClick={() => setPrintMode(false)}>
                Cancelar
              </div>
            </div>

          )}
        </div>
      </form>

    </div>
  )
}

export default EditRadiograma