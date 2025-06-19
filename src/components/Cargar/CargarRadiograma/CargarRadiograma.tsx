// Hooks
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
// Librerías
import Swal from 'sweetalert2';
import { pdf } from '@react-pdf/renderer';
// Componentes
import InputDate from '../../InputComponents/InputDate';
import InputRegister from '../../InputComponents/InputRegister';
import InputTextArea from '../../InputComponents/InputTextArea';
import SelectRegisterSingle from '../../Select/SelectRegisterSingle';
import PDFRadiograma from './PDFRadiograma';
// API
import { crearRadiograma } from '../../../api/CRUD/radiograma.crud';
import { getPreventivo } from '../../../api/CRUD/preventivo.crud';
// Contexto
import { jerarquiaCampos } from '../../../GlobalConst/jerarquiaCampos';
import { useAuth } from '../../../context/auth'; // Hook para obtener el usuario autenticado
import { useCampos } from '../../../context/campos';

type CargarRadiogramaProps = {
  // Define the props for the CargarRadiograma component here
  data: any;
  setCrearRadiograma: (value: boolean) => void; // Función para cambiar el estado de creación del radiograma
}

function CargarRadiograma({ data, setCrearRadiograma }: CargarRadiogramaProps) {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm(); // Hook para manejar el formulario
  const { user } = useAuth(); // Obtiene el usuario autenticado

  const { unidades } = useCampos(); // Obtiene las unidades desde el contexto
  const [direccionValor, setDireccionValor] = useState(''); // Dirección de la unidad
  const [telefonoValor, setTelefonoValor] = useState(''); // Teléfono de la unidad
  const [supervisionValor, setSupervisionValor] = useState(''); // Supervisión de la unidad
  const [stringAcumulador, ] = useState(''); // Acumula las autoridades seleccionadas

  const direccionDivisiones: any[] = [
    { division: "Metropolitana", direccion: "Avenida Alvear Nº 126", telefono: "362461832" },
    { division: "La Leonesa", direccion: "Santiago del Estero y Entre Ríos", telefono: "3624644562" },
    { division: "Lapachito", direccion: "25 de Mayo S/N", telefono: "3624605783" },
    { division: "Roque Saenz Peña", direccion: "Calle 7e/12 y 14", telefono: "3644431835" },
    { division: "Villa Ángela", direccion: "Echeverría N° 35", telefono: "3735 431438" },
    { division: "General San Martín", direccion: "Esq. Maipú y Urquiza", telefono: "3725422202" },
    { division: "Charata", direccion: "9 de Julio N° 575", telefono: "3624222322" },
    { division: "Juan José Castelli", direccion: "Av. Perón N° 470", telefono: "3624702665" }
  ]

  const obtenerNroPreventivo = async () => {
    try {

      const preventivoData = await getPreventivo(data.preventivo_ID);

      if (preventivoData) {
        return preventivoData; // Retorna el número de nota preventivo
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handlePrint = async () => {
    const values = getValues(); // Obtiene los valores del formulario

    const Preventivo = await obtenerNroPreventivo();
    const nuevosValores = {
      ...data,
      ...values,
      autoridades: stringAcumulador,
      nro_expediente: data.numero_de_expediente,
      nro_nota_preventivo: Preventivo.numero_nota,
      consultado_preventivo: Preventivo.consultado,
      resolucion_preventivo: Preventivo.resolucion,
      objeto: Preventivo.objeto,
    }

    const blob = await pdf(
      data.modo_actuacion === 'Ampliación de denuncia' ? (
        <PDFRadiograma datos={nuevosValores} user={user} ampliacion={true} />
      ) : (
        <PDFRadiograma datos={nuevosValores} user={user} />
      )
    ).toBlob();

    // // Abre el PDF en una nueva pestaña
    window.open(URL.createObjectURL(blob));

  };

  useEffect(() => {
    const unidadesSeparadas = user.unidad.split(','); // Divide la unidad del usuario en partes
    const unidadViolencia = `División Violencia Familiar y Género ${unidadesSeparadas[0]}`; // Construye el nombre de la unidad
    const municipio = unidadesSeparadas[1]?.trim(); // Municipio (si existe)
    const comisaria = unidadesSeparadas[2]?.trim(); // Comisaría (si existe)

    // Caso 1: Solo división (sin municipio ni comisaría)
    if (!municipio && !comisaria) {
      const division = direccionDivisiones.find((div) => div.division === unidadesSeparadas[0]);
      setDireccionValor(division?.direccion || '');
      setTelefonoValor(division?.telefono || '');
      setSupervisionValor('Dpto. de Violencia Familiar y Género');
    }
    // Caso 2: División y municipio (sin comisaría)
    else if (!comisaria) {
      const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
      const municipioEncontrado = unidadEncontrada?.subdivisiones?.find(
        (subdivision: any) => subdivision?.nombre === municipio
      );
      setDireccionValor(municipioEncontrado?.direccion || '');
      setTelefonoValor(municipioEncontrado?.telefono || '');
      setSupervisionValor(municipioEncontrado?.supervision || '');
    }
    // Caso 3: División, municipio y comisaría
    else {
      const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
      const municipioEncontrado = unidadEncontrada?.subdivisiones?.find(
        (subdivision: any) => subdivision?.nombre === municipio
      );
      const comisariaEncontrada = municipioEncontrado?.subdivisiones?.find(
        (subdivision: any) => subdivision?.value === comisaria
      );
      setDireccionValor(comisariaEncontrada?.direccion || '');
      setTelefonoValor(comisariaEncontrada?.telefono || '');
      setSupervisionValor(comisariaEncontrada?.supervision || '');
    }
  }, [user, unidades]); // Ejecuta el efecto cuando cambian user o unidades



  return (
    <div className="max-w-md md:max-w-none">
      <button className='flex flex-col items-center justify-center cursor-pointer bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full ' onClick={() => setCrearRadiograma(false)}>Cancelar</button>
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

              const Preventivo = await obtenerNroPreventivo();

              const valoresParaEnviar = {
                ...data,
                ...value,
                autoridades: stringAcumulador,
                nro_expediente: data.numero_de_expediente,
                nro_nota_preventivo: Preventivo.numero_nota,
                consultado_preventivo: Preventivo.consultado,
                resolucion_preventivo: Preventivo.resolucion,
                preventivo_ID: data.preventivo_ID,
                objeto: Preventivo.objeto,
                id_denuncia_sin_verificar: data._id,
              }

              await crearRadiograma(valoresParaEnviar);
              // setCrearRadiograma(false);
              Swal.fire({
                title: `Creado`,
                text: "El radiograma ha sido creado correctamente.",
                icon: 'success',
                confirmButtonText: 'Ok',
                allowOutsideClick: false
              })
            }
          })
        })}
      >
        <div className='flex flex-col md:items-center justify-start md:justify-center'>
          <InputRegister notMidMD campo="Supervisión" nombre="supervision" register={register} type="text" error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={supervisionValor} />
          <InputDate campo="Fecha" nombre="fecha_preventivo" register={register} error={errors.fecha} type="date" />
          <InputRegister notMidMD valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
          <InputRegister notMidMD valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
          <InputTextArea campo="Solicita" nombre="solicita" register={register} type="text" required placeholder="Solicita" setValue={setValue} />
        </div>
        <h1 className='text-2xl'>Destinatario</h1>
        <div className='flex flex-col md:items-center justify-center'>
          <InputRegister notMidMD campo="Destinatario" nombre="destinatario" register={register} type="text" error={errors.supervision} require placeholder="Supervisión" setValue={setValue} />
        </div>
        <h1 className='text-2xl my-5'>Instructor</h1>
        <div className='flex flex-col justify-center items-center w-full '>
          <div className='flex flex-col lg:flex-row my-2 w-full lg:w-8/10 xl:w-6/10'>
            <InputRegister notMidMD campo="Nombre y apellido" nombre="nombre_completo_instructor" register={register} setValue={setValue} type="text" error={errors.nombre_completo_instructor} />
            <SelectRegisterSingle campo='Jerarquía' nombre="jerarquia_instructor" opciones={jerarquiaCampos} setValue={setValue} error={errors.jerarquia_instructor} />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <div onClick={() => handlePrint()} className='flex flex-col items-center justify-center cursor-pointer mr-2 bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
            Imprimir
          </div>
          <button
            className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
            Crear Radiograma
          </button>
        </div>
      </form>

    </div>
  )
}

export default CargarRadiograma