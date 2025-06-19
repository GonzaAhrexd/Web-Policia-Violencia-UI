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
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// IMPORTAR LAS IMÁGENES EXPLÍCITAMENTE
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// FIX PARA VITE + LEAFLET
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// import { Icon } from 'leaflet'
// Iconos
import { PencilSquareIcon, TrashIcon, MapPinIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { UsersIcon, UserIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, QueueListIcon, MapPinIcon as MapPinIconOutLine, ListBulletIcon, QuestionMarkCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
// Componentes
import SimpleTableCheckorX from '../../../components/ShowData/SimpleTableCheckorX';
import EditSection from '../../../components/EditMode/EditSection';
import ShowTextArea from '../../../components/ShowData/ShowTextArea';
// Estados globales
import { useAuth } from '../../../context/auth';


import { pdf } from '@react-pdf/renderer';
import PDF from './PDF';

interface expandedComponentsProps {
    data: any
}


// Expanded component DENUNCIA
function expandedComponents({ data }: expandedComponentsProps) {
    const APIURL = import.meta.env.VITE_BASE_URL

    // const markerIcon = new Icon({
    //     iconUrl: '/pin-de-ubicacion.png',
    //     iconSize: [30, 30],
    // });

    const fileInputRef = useRef(null)
    const { handleSubmit } = useForm();

    // Obtener datos del usuario
    const { user } = useAuth()
    // State para guardar los datos de la víctima
    const [victimaDatos, setVictimaDatos]: any = useState([])
    // State para guardar los datos del victimario
    const [victimarioDatos, setVictimarioDatos]: any = useState([])
    // Estado de editar global
    const [editGlobal,  setEditGlobal] = useState(false)
    // Guardar terceros
    const [terceroDatosObtener, setTerceroDatosObtener]: any = useState([])
    // Estado de carga

    // Función para obtener los datos de la víctima
    const victimaObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Response = await getVictima(id)
            // Establece en el hook los datos de la víctima
            setVictimaDatos(response)

        } catch (error) {
            console.log(error)
        }
    }
    const victimarioObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Response = await getVictimario(id)
            // Establece en el hook los datos de la víctima
            setVictimarioDatos(response)
        } catch (error) {
            console.log(error)
        }
    }

    const terceroObtener = async (id: string) => {
        try {
            // Llamada a la API
            const response: Response = await getTercero(id)
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

         console.log(latLng)

        }else{

        const latLng: Array<string> = data.GIS.split("-").slice(1)

        console.log(latLng)

        if(latLng[1] < latLng[0]){

        lat = parseFloat('-' + latLng[1]);
        lon = parseFloat('-' + latLng[0]);
        }else{
        lat = parseFloat(latLng[0]);
        lon = parseFloat(latLng[1]);
        }
        

    }

    

    // useEffect para obtener los datos de la víctima y el victimario
    useEffect(() => {
        victimaObtener(data.victima_ID); // Asegúrate de tener un 'id' válido aquí
        victimarioObtener(data.victimario_ID)
        if (data.denunciado_por_tercero) {
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

    // Mostrar datos de la victima
    const victimaDatosMostrar = [
        { nombre: "ID Víctima", valor: data.victima_ID },
        { nombre: "Nombre", valor: victimaDatos?.nombre ? victimaDatos.nombre : "No especificado" },
        { nombre: "Apellido", valor: victimaDatos?.apellido ? victimaDatos.apellido : "No especificado" },
        { nombre: "Género", valor: victimaDatos?.genero ? victimaDatos.genero : "No especificado" },
        { nombre: "Domicilio", valor: victimaDatos?.direccion ? victimaDatos.direccion : "No específicado" },
        { nombre: "Edad", valor: victimaDatos?.edad ? victimaDatos.edad : "No especificado" },
        { nombre: "DNI", valor: (victimaDatos?.DNI && victimaDatos?.DNI != "S/N") ? victimaDatos?.DNI : "No especificado" },
        { nombre: "Estado Civil", valor: victimaDatos?.estado_civil ? victimaDatos.estado_civil : "No especificado" },
        { nombre: "Ocupación", valor: victimaDatos?.ocupacion ? victimaDatos.ocupacion : "No especificado" },
        { nombre: "Convivencia", valor: data?.convivencia && data.convivencia },
        { nombre: "Dependencia económica", valor: data?.dependencia_economica && data.dependencia_economica },
        { nombre: "Vínculo con agresor", valor: data?.relacion_victima_victimario ? data.relacion_victima_victimario : "No especificado" },
        { nombre: "Condición de vulnerabilidad", valor: victimaDatos?.condicion_de_vulnerabilidad ? victimaDatos.condicion_de_vulnerabilidad : "No especificado" },
        { nombre: "Denuncias previas", valor: victimaDatos?.denuncias_realizadas?.length },
        { nombre: "Tiene hijos", valor: victimaDatos?.hijos?.tiene_hijos ? "Sí" : "No" }
    ]
    // Mostrar condiciones de vulnerabilidad
    const condicion_de_vulnerabilidad = [
        { nombre: "Embarazo", valor: victimaDatos?.condiciones_de_vulnerabilidad?.embarazo },
        { nombre: "Periodo Post-parto", valor: victimaDatos?.condiciones_de_vulnerabilidad?.periodo_post_parto },
        { nombre: "Periodo de lactancia", valor: victimaDatos?.condiciones_de_vulnerabilidad?.periodo_de_lactancia },
        { nombre: "Discapacidad", valor: victimaDatos?.condiciones_de_vulnerabilidad?.discapacidad },
        { nombre: "Enfermedad Crónica", valor: victimaDatos?.condiciones_de_vulnerabilidad?.enfermedad_cronica },
        { nombre: "Adulto mayor", valor: victimaDatos?.condiciones_de_vulnerabilidad?.adulto_mayor },
        { nombre: "Menor de edad", valor: victimaDatos?.condiciones_de_vulnerabilidad?.menor_de_edad },
        { nombre: "Tratamiento psicológico", valor: victimaDatos?.condiciones_de_vulnerabilidad?.tratamiento_psicologico },
    ]
    // Mostrar datos de los hijos
    const hijosVictima = [
        { nombre: "Mayores de edad", valor: victimaDatos?.hijos?.mayores_de_edad },
        { nombre: "Menores de edad", valor: victimaDatos?.hijos?.menores_de_edad },
        { nombre: "Menores discapacitados", valor: victimaDatos?.hijos?.menores_discapacitados },
        { nombre: "Hijos con el agresor", valor: data?.hijos_victima_con_victimario }
    ]
    // Mostrar datos del victimario
    const victimarioDatosMostrar = [
        { nombre: "ID Victimario", valor: data.victimario_ID },
        { nombre: "Nombre", valor: victimarioDatos.nombre ? victimarioDatos.nombre : "No especificado" },
        { nombre: "Apellido", valor: victimarioDatos.apellido ? victimarioDatos.apellido : "No especificado" },
        { nombre: "Domicilio", valor: victimarioDatos?.direccion ? victimarioDatos.direccion : "No específicado" },
        { nombre: "Edad", valor: victimarioDatos.edad ? victimarioDatos.edad : "No especificado" },
        { nombre: "DNI", valor: (victimarioDatos?.DNI && victimarioDatos?.DNI != "S/N") ? victimarioDatos?.DNI : "No especificado" },
        { nombre: "Estado Civil", valor: victimarioDatos.estado_civil ? victimarioDatos.estado_civil : "No especificado" },
        { nombre: "Ocupación", valor: victimarioDatos.ocupacion ? victimarioDatos.ocupacion : "No especificado" },
        { nombre: "Denuncias previas", valor: victimarioDatos?.denuncias_en_contra?.length }
    ]
    // Detalles del victimario
    const detallesVictimario = [
        { nombre: "Abuso de Alcohol", valor: victimarioDatos.abuso_de_alcohol },
        { nombre: "Antecedentes toxicológicos", valor: victimarioDatos.antecedentes_toxicologicos },
        { nombre: "Antecedentes Penales", valor: victimarioDatos.antecedentes_penales },
        { nombre: "Antecedentes Contravencionales", valor: victimarioDatos.antecedentes_contravencionales },
        { nombre: "Entrenamiento en combate", valor: victimarioDatos.entrenamiento_en_combate },
    ]
    // Datos del hecho
    const hechoDatosMostrar = [
        { nombre: "ID", valor: data._id },
        { nombre: "Número de expediente", valor: data.numero_de_expediente },
        { nombre: "Modo de actuación", valor: data.modo_actuacion ? data.modo_actuacion : "No ingresado"},
        { nombre: "Fecha", valor: `${new Date(data.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(data.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(data.fecha).getUTCFullYear()}` },
        { nombre: "Empleo de armas", valor: data.empleo_de_armas },
        { nombre: "Arma empleada", valor: data.arma_empleada },
        { nombre: "Juzgado Interviniente", valor: data.juzgado_interviniente + " " + (data.juzgado_interviniente_numero && data.juzgado_interviniente_numero) },
        { nombre: "Dependencia derivada", valor: data.dependencia_derivada },
    ]

    // Tipos de violencia
    const tiposDeViolencia = [
        { nombre: "Violencia", valor: data.violencia },
        { nombre: "Modalidad", valor: data.modalidades },
        { nombre: "Física", valor: data.tipo_de_violencia.Fisica },
        { nombre: "Psicológica", valor: data.tipo_de_violencia.Psicologica },
        { nombre: "Sexual", valor: data.tipo_de_violencia.Sexual },
        { nombre: "Económica y Patrimonial", valor: data.tipo_de_violencia.Economica_y_patrimonial },
        { nombre: "Simbólica", valor: data.tipo_de_violencia.Simbolica },
        { nombre: "Política", valor: data.tipo_de_violencia.Politica }
    ]

    // Datos geográficos
    const hechoDatosGeográficos = [
        { nombre: "Unidad de Carga", valor: data.unidad_de_carga },
        { nombre: "Municipio", valor: data.municipio },
        { nombre: "Lugar del hecho", valor: data.direccion },
        { nombre: "Barrio", valor: data.barrio },
        { nombre: "GIS", valor: data.GIS },
        { nombre: "Tipo de lugar", valor: data.tipo_de_lugar ? data.tipo_de_lugar : "Sin especificar" },
        { nombre: "Jurisdicción Policial", valor: data.jurisdiccion_policial },
        { nombre: "Cuadrícula", valor: data.cuadricula },
        { nombre: "División Familiar y de Género", valor: data.isDivision },
    ]

    // Datos del tercero
    const terceroDatos = [
        { nombre: "Nombre", valor: terceroDatosObtener.nombre },
        { nombre: "Apellido", valor: terceroDatosObtener.apellido },
        { nombre: "DNI", valor: terceroDatosObtener.DNI },
        { nombre: "Vínculo con la víctima", valor: data?.vinculo_con_la_victima_tercero ? data.vinculo_con_la_victima_tercero : "No especificado" }
    ]

    // Medidas
    const medidas = [
        { nombre: "Prohibición de acercamiento", valor: data.medida.prohibicion_de_acercamiento },
        { nombre: "Restitución de menor", valor: data.medida.restitucion_de_menor },
        { nombre: "Exclusión de Hogar", valor: data.medida.exclusion_de_hogar },
        { nombre: "Alimento Provisorio", valor: data.medida.alimento_provisorio },
        { nombre: "Derecho de Comunicación", valor: data.medida.derecho_de_comunicacion },
        { nombre: "Botón antipánico", valor: data.medida.boton_antipanico }
    ]


    // Medidas
    const medidaDispuestaPorLaAutoridadJudicial = [
        { nombre: "Prohibición de acercamiento", valor: data.medida_dispuesta.prohibicion_de_acercamiento },
        { nombre: "Exclusión de Hogar", valor: data.medida_dispuesta.exclusion_de_hogar },
        { nombre: "Botón antipánico", valor: data.medida_dispuesta.boton_antipanico },
        { nombre: "Solicitud de Aprehensión", valor: data.medida_dispuesta.solicitud_de_aprehension },
        { nombre: "Expediente con cautelar", valor: data.medida_dispuesta.expedientes_con_cautelar },
        { nombre: "Dado en libertad", valor: data.medida_dispuesta.en_libertad },
        { nombre: "Cese de hostigamiento", valor: data?.medida_dispuesta?.cese_de_hostigamiento ? data.medida_dispuesta.cese_de_hostigamiento : false },
        { nombre: "Notificación Expediente", valor: data?.medida_dispuesta?.notificacion_expediente ? data.medida_dispuesta.notificacion_expediente : false },
        { nombre: "Ninguna", valor: data.medida_dispuesta.ninguna }
    ]

    const detallesObservaciones = [
        { nombre: "Aprehensión", valor: data.aprehension },
    ]

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
                    eliminarDenuncia(data._id)
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

                    <ShowTextArea campo="Observaciones" dato={data.observaciones} />
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
                <EditSection datosTerceros={terceroDatos} datosGeograficos={hechoDatosGeográficos} datosHecho={data} datosVictima={victimaDatos} datosVictimario={victimarioDatos} setEditSection={setEditGlobal} editSection={editGlobal} />
            </>
        }
    </div>

}

export default expandedComponents