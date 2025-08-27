/*
_____________________________________________________________________________________________ 
Uso del componente:
    expandedComponents es una dependencia de la tabla mostrada en /MisDenuncias 
    Recibe los datos de la víctima, victimario y hecho para mostrarlos en una tabla
    y en un mapa. Además, se puede editar la denuncia y eliminarla.
_____________________________________________________________________________________________
*/
// Hooks
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
// APIs del BackEnd
import { getTercero } from '../../../api/CRUD/terceros.crud';
import { eliminarDenuncia, editarImagenDenuncia } from '../../../api/CRUD/denuncias.crud';
import { getVictima } from '../../../api/CRUD/victimas.crud';
import { getVictimario } from '../../../api/CRUD/victimario.crud';
// Librerías react
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' // Librería para mostrar mapas
import Swal from 'sweetalert2' // Librería para mostrar popups
import { pdf } from '@react-pdf/renderer';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// FIX PARA VITE + LEAFLET
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Iconos
import { PencilSquareIcon, TrashIcon, MapPinIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { UsersIcon, UserIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, QueueListIcon, MapPinIcon as MapPinIconOutLine, ListBulletIcon, QuestionMarkCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

// Componentes
import SimpleTableCheckorX from '../../ShowData/SimpleTableCheckorX';
import EditSection from './EditSection';
import ShowTextArea from '../../ShowData/ShowTextArea';
import PDF from './PDF';

// Estados globales
import { useAuth } from '../../../context/auth';

// Tipos
import Denuncia from '../../../types/Denuncia';
import Victima from '../../../types/Victimas';
import Victimario from '../../../types/Victimario';
import Tercero from '../../../types/Tercero';

type expandedComponentsProps = {
    data: Denuncia;
}


// Expanded component DENUNCIA
function ExpandedComponentDenuncias({ data }: expandedComponentsProps) {
    const APIURL = import.meta.env.VITE_BASE_URL

    const fileInputRef = useRef(null)
    const { handleSubmit } = useForm();

    // Obtener datos del usuario
    const { user } = useAuth()
    // State para guardar los datos de la víctima
    const [victimaDatos, setVictimaDatos] = useState<Victima | null>(null)
    // State para guardar los datos del victimario
    const [victimarioDatos, setVictimarioDatos] = useState<Victimario | null>(null)
    // Estado de editar global
    const [editGlobal, setEditGlobal] = useState(false)
    // Guardar terceros
    const [terceroDatosObtener, setTerceroDatosObtener] = useState<Tercero | null>(null)
    // Estado de carga

    // Función para obtener los datos de la víctima
    const victimaObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Victima = await getVictima(id)

            // Establece en el hook los datos de la víctima
            setVictimaDatos(response)

        } catch (error) {
            console.log(error)
        }
    }
    const victimarioObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Victimario = await getVictimario(id)
            // Establece en el hook los datos de la víctima
            setVictimarioDatos(response)
        } catch (error) {
            console.log(error)
        }
    }

    const terceroObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Tercero = await getTercero(id)
            // Establece en el hook los datos de la víctima
            setTerceroDatosObtener(response)
        } catch (error) {
            console.log(error)
        }
    }
    let lat: number = 0
    let lon: number = 0
    // Separar las coordenadas
    if (data.GIS.length > 6 && data.GIS.includes(" ")) {
        const latLng: Array<string> = data.GIS.split(" ")
        lat = parseFloat(latLng[0]);
        lon = parseFloat(latLng[1]);

    } else {

        const latLng: Array<string> = data.GIS.split("-").slice(1)


        if (latLng[1] < latLng[0]) {

            lat = parseFloat('-' + latLng[1]);
            lon = parseFloat('-' + latLng[0]);
        } else {
            lat = parseFloat(latLng[0]);
            lon = parseFloat(latLng[1]);
        }


    }



    // useEffect para obtener los datos de la víctima y el victimario
    useEffect(() => {
        victimaObtener(data.victima_ID); // Asegúrate de tener un 'id' válido aquí
        victimarioObtener(data.victimario_ID)
        if (data.tercero_ID) {
            terceroObtener(data.tercero_ID)
        }

    }, [data]); // Se ejecuta cuando el componente se monta y cada vez que 'id' cambia




    // Función para abrir Google Maps con el mapa de y las coordenadas
    const handleClick = (GIS: string) => {
        // Separar las coordenadas
        const coordenadasSeparadas = GIS.split(' ')
        // URL de Google Maps
        const url = `https://www.google.com/maps/d/viewer?mid=1n-ERiPIZT9Q0WlRQoWI_NmvI9jJffohO&g_ep=CAESCjExLjEyNC4xMDIYACDdYio_LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDQ3MDg3MTEyLDQ3MDg0MzkzQgJBUg%3D%3D&shorturl=1&ll=${coordenadasSeparadas[0]}%2C${coordenadasSeparadas[1]}&z=20`
        // Abrir en una nueva pestaña
        window.open(url, '_blank');
    }

    const safeValue = (value: any, fallback: string = "No especificado") => {
        if (
            value === null ||
            value === undefined ||
            value === "" ||
            value === "S/N" ||
            (typeof value === "string" && value.trim() === "")
        ) return fallback;
        return value;
    };

    const formatDate = (dateStr?: string | Date): string => {
        try {
            const d = new Date(dateStr ?? "");
            return isNaN(d.getTime())
                ? "Fecha inválida"
                : `${d.getUTCDate().toString().padStart(2, '0')}/${(d.getUTCMonth() + 1).toString().padStart(2, '0')}/${d.getUTCFullYear()}`;
        } catch {
            return "Fecha inválida";
        }
    };


    // Mostrar datos de la victima
    const victimaDatosMostrar = [
        { nombre: "ID Víctima", valor: safeValue(data?.victima_ID) },
        { nombre: "Nombre", valor: safeValue(victimaDatos?.nombre) },
        { nombre: "Apellido", valor: safeValue(victimaDatos?.apellido) },
        { nombre: "Género", valor: safeValue(victimaDatos?.genero) },
        { nombre: "Domicilio", valor: safeValue(victimaDatos?.direccion) },
        { nombre: "Edad", valor: safeValue(victimaDatos?.edad) },
        { nombre: "DNI", valor: safeValue(victimaDatos?.DNI) },
        { nombre: "Estado Civil", valor: safeValue(victimaDatos?.estado_civil) },
        { nombre: "Etnia", valor: safeValue(victimaDatos?.etnia) },
        { nombre: "Ocupación", valor: safeValue(victimaDatos?.ocupacion) },
        { nombre: "Convivencia", valor: safeValue(data?.convivencia) },
        { nombre: "Dependencia económica", valor: safeValue(data?.dependencia_economica) },
        { nombre: "Vínculo con agresor", valor: safeValue(data?.relacion_victima_victimario) },
        { nombre: "Condición de vulnerabilidad", valor: safeValue(victimaDatos?.condicion_de_vulnerabilidad) },
        { nombre: "Denuncias previas", valor: victimaDatos?.denuncias_realizadas?.length ?? 0 },
        { nombre: "Tiene hijos", valor: victimaDatos?.hijos?.tiene_hijos ? "Sí" : "No" }
    ];

    const condicion_de_vulnerabilidad = [
        { nombre: "Embarazo", valor: victimaDatos?.condiciones_de_vulnerabilidad?.embarazo ?? false },
        { nombre: "Periodo Post-parto", valor: victimaDatos?.condiciones_de_vulnerabilidad?.periodo_post_parto ?? false },
        { nombre: "Periodo de lactancia", valor: victimaDatos?.condiciones_de_vulnerabilidad?.periodo_de_lactancia ?? false },
        { nombre: "Discapacidad", valor: victimaDatos?.condiciones_de_vulnerabilidad?.discapacidad ?? false },
        { nombre: "Enfermedad Crónica", valor: victimaDatos?.condiciones_de_vulnerabilidad?.enfermedad_cronica ?? false },
        { nombre: "Adulto mayor", valor: victimaDatos?.condiciones_de_vulnerabilidad?.adulto_mayor ?? false },
        { nombre: "Menor de edad", valor: victimaDatos?.condiciones_de_vulnerabilidad?.menor_de_edad ?? false },
        { nombre: "Tratamiento psicológico", valor: victimaDatos?.condiciones_de_vulnerabilidad?.tratamiento_psicologico ?? false },
    ];

    const hijosVictima = [
        { nombre: "Mayores de edad", valor: safeValue(victimaDatos?.hijos?.mayores_de_edad) },
        { nombre: "Menores de edad", valor: safeValue(victimaDatos?.hijos?.menores_de_edad) },
        { nombre: "Menores discapacitados", valor: safeValue(victimaDatos?.hijos?.menores_discapacitados) },
        { nombre: "Hijos con el agresor", valor: safeValue(data?.hijos_victima_con_victimario) }
    ];

    const victimarioDatosMostrar = [
        { nombre: "ID Victimario", valor: safeValue(data?.victimario_ID) },
        { nombre: "Nombre", valor: safeValue(victimarioDatos?.nombre) },
        { nombre: "Apellido", valor: safeValue(victimarioDatos?.apellido) },
        { nombre: "Domicilio", valor: safeValue(victimarioDatos?.direccion) },
        { nombre: "Edad", valor: safeValue(victimarioDatos?.edad) },
        { nombre: "DNI", valor: safeValue(victimarioDatos?.DNI) },
        { nombre: "Estado Civil", valor: safeValue(victimarioDatos?.estado_civil) },
        { nombre: "Ocupación", valor: safeValue(victimarioDatos?.ocupacion) },
        { nombre: "Denuncias previas", valor: victimarioDatos?.denuncias_en_contra?.length ?? 0 }
    ];

    const detallesVictimario = [
        { nombre: "Abuso de Alcohol", valor: victimarioDatos?.abuso_de_alcohol ?? false },
        { nombre: "Antecedentes toxicológicos", valor: victimarioDatos?.antecedentes_toxicologicos ?? false },
        { nombre: "Antecedentes Penales", valor: victimarioDatos?.antecedentes_penales ?? false },
        { nombre: "Antecedentes Contravencionales", valor: victimarioDatos?.antecedentes_contravencionales ?? false },
        { nombre: "Entrenamiento en combate", valor: victimarioDatos?.entrenamiento_en_combate ?? false },
    ];

    const hechoDatosMostrar = [
        { nombre: "ID", valor: safeValue(data?._id) },
        { nombre: "Número de expediente", valor: safeValue(data?.numero_de_expediente) },
        { nombre: "Modo de actuación", valor: safeValue(data?.modo_actuacion) },
        { nombre: "Fecha", valor: formatDate(data?.fecha) },
        { nombre: "Empleo de armas", valor: safeValue(data?.empleo_de_armas) },
        { nombre: "Arma empleada", valor: safeValue(data?.arma_empleada) },
        { nombre: "Juzgado Interviniente", valor: `${safeValue(data?.juzgado_interviniente, "")} ${safeValue(data?.juzgado_interviniente_numero, "")}`.trim() || "No especificado" },
        { nombre: "Dependencia derivada", valor: safeValue(data?.dependencia_derivada) },
    ];

    const tiposDeViolencia = [
        { nombre: "Violencia", valor: safeValue(data?.violencia) },
        { nombre: "Modalidad", valor: safeValue(data?.modalidades) },
        { nombre: "Física", valor: data?.tipo_de_violencia?.Fisica ?? false },
        { nombre: "Psicológica", valor: data?.tipo_de_violencia?.Psicologica ?? false },
        { nombre: "Sexual", valor: data?.tipo_de_violencia?.Sexual ?? false },
        { nombre: "Económica y Patrimonial", valor: data?.tipo_de_violencia?.Economica_y_patrimonial ?? false },
        { nombre: "Simbólica", valor: data?.tipo_de_violencia?.Simbolica ?? false },
        { nombre: "Política", valor: data?.tipo_de_violencia?.Politica ?? false },
    ];

    const hechoDatosGeográficos = [
        { nombre: "Unidad de Carga", valor: safeValue(data?.unidad_de_carga) },
        { nombre: "Municipio", valor: safeValue(data?.municipio) },
        { nombre: "Lugar del hecho", valor: safeValue(data?.direccion) },
        { nombre: "Barrio", valor: safeValue(data?.barrio) },
        { nombre: "GIS", valor: safeValue(data?.GIS) },
        { nombre: "Tipo de lugar", valor: safeValue(data?.tipo_de_lugar, "Sin especificar") },
        { nombre: "Jurisdicción Policial", valor: safeValue(data?.jurisdiccion_policial) },
        { nombre: "Cuadrícula", valor: safeValue(data?.cuadricula) },
        { nombre: "División Familiar y de Género", valor: data?.isDivision ?? false },
    ];

    const terceroDatos = [
        { nombre: "Nombre", valor: safeValue(terceroDatosObtener?.nombre) },
        { nombre: "Apellido", valor: safeValue(terceroDatosObtener?.apellido) },
        { nombre: "DNI", valor: safeValue(terceroDatosObtener?.DNI) },
        { nombre: "Vínculo con la víctima", valor: safeValue(data?.vinculo_con_la_victima_tercero) },
    ];

    const medidas = [
        { nombre: "Prohibición de acercamiento", valor: data?.medida?.prohibicion_de_acercamiento ?? false },
        { nombre: "Restitución de menor", valor: data?.medida?.restitucion_de_menor ?? false },
        { nombre: "Exclusión de Hogar", valor: data?.medida?.exclusion_de_hogar ?? false },
        { nombre: "Alimento Provisorio", valor: data?.medida?.alimento_provisorio ?? false },
        { nombre: "Derecho de Comunicación", valor: data?.medida?.derecho_de_comunicacion ?? false },
        { nombre: "Botón antipánico", valor: data?.medida?.boton_antipanico ?? false },
        { nombre: "Restitución de bienes", valor: data?.medida?.restitucion_de_bienes?.[0] ?? false },
        { nombre: "Ninguna solicitada", valor: data?.medida?.ninguna_solicitada ?? false },
    ];

    const medidaDispuestaPorLaAutoridadJudicial = [
        { nombre: "Prohibición de acercamiento", valor: data?.medida_dispuesta?.prohibicion_de_acercamiento ?? false },
        { nombre: "Exclusión de Hogar", valor: data?.medida_dispuesta?.exclusion_de_hogar ?? false },
        { nombre: "Botón antipánico", valor: data?.medida_dispuesta?.boton_antipanico ?? false },
        { nombre: "Solicitud de Aprehensión", valor: data?.medida_dispuesta?.solicitud_de_aprehension ?? false },
        { nombre: "Expediente con cautelar", valor: data?.medida_dispuesta?.expedientes_con_cautelar ?? false },
        { nombre: "Dado en libertad", valor: data?.medida_dispuesta?.en_libertad ?? false },
        { nombre: "Cese de hostigamiento", valor: data?.medida_dispuesta?.cese_de_hostigamiento ?? false },
        { nombre: "Notificación Expediente", valor: data?.medida_dispuesta?.notificacion_expediente ?? false },
        { nombre: "Ninguna", valor: data?.medida_dispuesta?.ninguna ?? false }
    ];

    const detallesObservaciones = [
        { nombre: "Aprehensión", valor: data?.aprehension ?? false }
    ];


    const handlePrint = async (data: any) => {
        try {

            const blob = await pdf(<PDF datos={data} user={user} />).toBlob();
            // Crea una URL de objeto a partir del blob
            const url = URL.createObjectURL(blob);
            // Abre la URL en una nueva pestaña
            window.open(url);

        } catch (error) {
            console.log(error)
        }

    }

    // Controlar cuando se da a eliminar
    const handleDelete = async (data: any) => {
        // Popup de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Llamada a la API
                    await eliminarDenuncia(data._id)
                    // Mensaje de éxito
                    Swal.fire({
                        title: 'Borrado',
                        text: 'La denuncia ha sido borrada con éxito',
                        icon: 'success',
                        confirmButtonColor: '#0C4A6E',
                    }).then(() => {
                        window.location.reload()
                    })

                } catch (error) {
                    // Si hay un error
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al borrar la denuncia',
                        icon: 'error',
                        confirmButtonColor: '#0C4A6E',
                    }
                    )
                }
            }
        })
    }




    return <div className="flex flex-col p-1 sm:p-10 max-w-2xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full scale-up-ver-top">
        {!editGlobal &&
            <>
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans mr-4'>Datos de la víctima
                    </h2>
                </div>
                <div className='flex flex-col'>
                    <SimpleTableCheckorX campo="Datos" datos={victimaDatosMostrar} icono={<UserIcon className='h-6 w-6' />} />
                    {victimaDatos?.condicion_de_vulnerabilidad && <SimpleTableCheckorX campo="Condición de vulnerabilidad" datos={condicion_de_vulnerabilidad} icono={<ExclamationTriangleIcon className='h-6 w-6' />} />}
                    {victimaDatos?.hijos?.tiene_hijos && <SimpleTableCheckorX campo="Datos de sus hijos" datos={hijosVictima} icono={<UsersIcon className='h-6 w-6' />} />}
                </div>
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans mr-4'>Datos del victimario</h2>
                </div>
                <SimpleTableCheckorX campo="Datos" datos={victimarioDatosMostrar} icono={<UserIcon className='h-6 w-6' />} />
                <SimpleTableCheckorX campo="Detalles" datos={detallesVictimario} icono={<QueueListIcon className='h-6 w-6' />} />
                <div>
                    <div className='flex items-center'>
                        <h2 className='text-3xl my-5 font-sans mr-4'>Hecho</h2>
                    </div>
                </div>
                <SimpleTableCheckorX campo="Datos" datos={hechoDatosMostrar} icono={<ClipboardDocumentCheckIcon className='h-6 w-6' />} />
                <SimpleTableCheckorX campo="Datos geográficos" datos={hechoDatosGeográficos} icono={<MapPinIconOutLine className='h-6 w-6' />} />

                <div className='flex flex-col w-8/10 lg:w-7/10 h-4/10 items-center justify-center mx-4 md:mx-auto my-5'>
                    {hechoDatosGeográficos[4].valor ?
                        <>
                            <MapContainer center={[lat, lon]} zoom={20} style={{ height: "60vh", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[lat, lon]} >
                                    <Popup>
                                        {data.direccion + "," + data.barrio}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-1/2 flex items-center justify-center mt-2 ' onClick={() => handleClick(data.GIS)}>
                                <MapPinIcon className='w-7 h-7' />
                            </div>
                        </>
                        :
                        <div className='font-bold py-2 px-4 rounded w-full flex items-center justify-center'>
                            <p>No es posible cargar el mapa. Verifique si el GIS está ingresado de manera correcta</p>
                        </div>
                    }

                </div>
                <SimpleTableCheckorX campo="Tipo de Violencia" datos={tiposDeViolencia} icono={<ListBulletIcon className='h-6 w-6' />} />
                <SimpleTableCheckorX campo="Medida solicitada por la víctima" datos={medidas} icono={<QuestionMarkCircleIcon className='h-6 w-6' />} />
                <SimpleTableCheckorX campo="Medida dispuesta por la autoridad judicial" datos={medidaDispuestaPorLaAutoridadJudicial} icono={<img src="./Judge.svg" alt="Icono" className='h-6 w-6' />} />
                <div className='flex flex-col'>
                    {data.denunciado_por_tercero &&
                        <>
                            <SimpleTableCheckorX campo="Tercero" datos={terceroDatos} icono={<QueueListIcon className='h-6 w-6' />} />
                        </>
                    }
                </div >
                <div>

                </div>
                <div className='flex items-center'>
                    <h2 className='text-3xl my-5 font-sans mr-4'>Observaciones</h2></div>
                <div className="flex flex-col">
                    <SimpleTableCheckorX campo="Detalles" datos={detallesObservaciones} icono={<InformationCircleIcon className='h6 w-6' />} />
                    {data.imagen &&
                        <div className='flex flex-col'>
                            <figure className='w-full h-5/10 flex flex-row items-center justify-center'>
                                <img className='w-4/10' src={`${APIURL}/Denuncias/${data._id}/image`} alt="" />

                            </figure>
                        </div>
                    }
                    <form action="" className='w-8/10 md:w-full flex flex-col md:flex-row items-center justify-center'
                        method='post'
                        onSubmit={
                            handleSubmit(async () => {
                                Swal.fire({
                                    title: '¿Estás seguro?',
                                    text: "¡La imagen anterior se perderá!",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#0C4A6E',
                                    cancelButtonColor: '#FF554C',
                                    confirmButtonText: 'Sí, cambiar',
                                    cancelButtonText: 'Cancelar'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        try {
                                            // @ts-ignore
                                            const file = fileInputRef?.current?.files[0];
                                            const denuncia = {
                                                id: data._id,
                                                imagen: file,
                                            };
                                            await editarImagenDenuncia(denuncia);
                                            Swal.fire({
                                                title: 'Imagen cambiada',
                                                text: 'La imagen ha sido cambiada con éxito',
                                                icon: 'success',
                                                confirmButtonColor: '#0C4A6E',
                                            }).then(() => {
                                                window.location.reload()
                                            })
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                })

                            })
                        }

                    >
                        <input ref={fileInputRef} type="file" accept="image/*" className='mb-2' required={false} />

                        <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' >
                            Cambiar
                        </button>
                    </form>

                    <ShowTextArea dato={data.observaciones} />
                </div>
                <div className='my-5 flex flex-col md:flex-row sm:items-center md:justify-center w-full '>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handlePrint(data)} >
                        <PrinterIcon className='w-7' />
                    </div>
                    {(user.rol == "carga" || user.rol == "admin") &&
                        <>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setEditGlobal(!editGlobal)}>
                                <PencilSquareIcon className="w-7" />
                            </div>
                            <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => handleDelete(data)}>
                                <TrashIcon className="w-7" />
                            </div>
                        </>
                    }
                </div>
            </>
        }
        {editGlobal &&
            <>
                <EditSection
                    datosHecho={data}
                    datosVictima={victimaDatos}
                    datosVictimario={victimarioDatos}
                    datosTerceros={terceroDatosObtener}
                    datosGeograficos={hechoDatosGeográficos}
                    setEditSection={setEditGlobal}
                    editSection={editGlobal} />
            </>
        }
    </div>

}

export default ExpandedComponentDenuncias