import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputRegister from "../InputComponents/InputRegister";
import InputDate from "../InputComponents/InputDate";
import InputCheckboxAcumulador from "../InputComponents/InputCheckboxAcumulador";
import { editPreventivo, ampliarPreventivo } from "../../api/CRUD/preventivo.crud";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCampos } from "../../context/campos";
import InputTextArea from "../InputComponents/InputTextArea";
import CargarInstructorYSecretario from "../Cargar/CargarAgente/CargarInstructor";
import { pdf } from "@react-pdf/renderer";
import PDF from "../Cargar/CargarPreventivo/PDF";

type EditPrevencionProps = {
    data: any
    modoExpandir: boolean
}

function EditPrevencion({ data, modoExpandir }: EditPrevencionProps) {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    const [stringAcumulador, setStringAcumulador] = useState("")
    const { user } = useAuth()
    const [direccionValor, setDireccionValor] = useState('')
    const [telefonoValor, setTelefonoValor] = useState('')
    const [supervisionValor, setSupervisionValor] = useState('')
    const { unidades } = useCampos()
    const [stringSeparado, setStringSeparado] = useState([])


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

    useEffect(() => {
        const unidadesSeparadas = user.unidad.split(",")
        const unidadViolencia = "División Violencia Familiar y Género " + unidadesSeparadas[0]
        const municipio = unidadesSeparadas[1]?.trim()
        const comisaria = unidadesSeparadas[2]?.trim()

        if (municipio == undefined && comisaria == undefined) {
            setDireccionValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.direccion)
            setTelefonoValor(direccionDivisiones.find((division) => division.division === unidadesSeparadas[0])?.telefono)
            setSupervisionValor("Dpto. de Violencia Familiar y Género")
        } else if (comisaria == undefined) {

            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);

            const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
                ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
                : null;

            setDireccionValor(municipioEncontrado?.direccion)
            setTelefonoValor(municipioEncontrado?.telefono)
            setSupervisionValor(municipioEncontrado?.supervision)
        } else {
            const unidadEncontrada = unidades.find((unidad: any) => unidad.nombre === unidadViolencia);
            const municipioEncontrado = unidadEncontrada && Array.isArray(unidadEncontrada.subdivisiones)
                ? unidadEncontrada.subdivisiones.find((subdivision: any) => subdivision?.nombre === municipio)
                : null;

            const comisariaEncontrada = municipioEncontrado && Array.isArray(municipioEncontrado.subdivisiones)
                ? municipioEncontrado.subdivisiones.find((subdivision: any) => subdivision?.value === comisaria)
                : null;

            setDireccionValor(comisariaEncontrada?.direccion)
            setTelefonoValor(comisariaEncontrada?.telefono)
            setSupervisionValor(comisariaEncontrada?.supervision)
        }

        const stringSeparar = data.autoridades.split(",")

        setStringSeparado(stringSeparar)

    }, [])


    const autoridadesOpciones = [
        { id: 1, nombre: "Jefe Policía", valor: "Jefe Policía" },
        { id: 2, nombre: "Subjefe", valor: "Subjefe" },
        { id: 3, nombre: "S.U.E.D.", valor: "S.U.E.D." },
        { id: 4, nombre: "Dirección General Investigaciones Complejas", valor: "Dirección General Investigaciones Complejas" },
        { id: 5, nombre: "Dirección Policía de Investigaciones", valor: "Dirección Policía de Investigaciones" },
        { id: 6, nombre: "Jefe Dpto Investigaciones Complejas", valor: "Jefe Dpto Investigaciones Complejas" },
        { id: 7, nombre: "Dirección Gral. Seguridad Metropolitana", valor: "Dirección Gral. Seguridad Metropolitana" },
        { id: 8, nombre: "Director de Operación Metropolitana", valor: "Director de Operación Metropolitana" },
        { id: 9, nombre: "Director del C.E.A.C.", valor: "Director del C.E.A.C." },
        { id: 10, nombre: "Fiscalía Investigación Penal en Turno", valor: "Fiscalía Investigación Penal en Turno" },
        { id: 11, nombre: "Fiscalía Investigación Penal Nro 1", valor: "Fiscalía Investigación Penal Nro 1" },
        { id: 12, nombre: "Fiscalía Investigación Penal Nro 2", valor: "Fiscalía Investigación Penal Nro 2" },
        { id: 13, nombre: "Fiscalía Investigación Penal Nro 3", valor: "Fiscalía Investigación Penal Nro 3" },
        { id: 14, nombre: "Fiscalía Investigación Penal Nro 4", valor: "Fiscalía Investigación Penal Nro 4" },
        { id: 15, nombre: "Fiscalía Investigación Penal Nro 5", valor: "Fiscalía Investigación Penal Nro 5" },
        { id: 16, nombre: "Fiscalía Investigación Penal Nro 6", valor: "Fiscalía Investigación Penal Nro 6" },
        { id: 17, nombre: "Fiscalía Investigación Penal Nro 7", valor: "Fiscalía Investigación Penal Nro 7" },
        { id: 18, nombre: "Fiscalía Investigación Penal Nro 8", valor: "Fiscalía Investigación Penal Nro 8" },
        { id: 19, nombre: "Fiscalía Investigación Penal Nro 9", valor: "Fiscalía Investigación Penal Nro 9" },
        { id: 20, nombre: "Fiscalía Investigación Penal Nro 10", valor: "Fiscalía Investigación Penal Nro 10" },
        { id: 21, nombre: "Fiscalía Investigación Penal Nro 11", valor: "Fiscalía Investigación Penal Nro 11" },
        { id: 22, nombre: "Fiscalía Investigación Penal Nro 12", valor: "Fiscalía Investigación Penal Nro 12" },
        { id: 23, nombre: "Fiscalía Investigación Penal Nro 13", valor: "Fiscalía Investigación Penal Nro 13" },
        { id: 24, nombre: "Fiscalía Investigación Penal Nro 14", valor: "Fiscalía Investigación Penal Nro 14" },
        { id: 25, nombre: "Fiscalía Investigación Penal Nro 15", valor: "Fiscalía Investigación Penal Nro 15" },
        { id: 26, nombre: "Juzgado del Menor de Edad y la Familia Nro 1", valor: "Juzgado del Menor de Edad y la Familia Nro 1" },
        { id: 27, nombre: "Juzgado del Menor de Edad y la Familia Nro 2", valor: "Juzgado del Menor de Edad y la Familia Nro 2" },
        { id: 28, nombre: "Juzgado del Menor de Edad y la Familia Nro 3", valor: "Juzgado del Menor de Edad y la Familia Nro 3" },
        { id: 29, nombre: "Juzgado del Menor de Edad y la Familia Nro 4", valor: "Juzgado del Menor de Edad y la Familia Nro 4" },
        { id: 30, nombre: "Juzgado del Menor de Edad y la Familia Nro 5", valor: "Juzgado del Menor de Edad y la Familia Nro 5" },
        { id: 31, nombre: "Juzgado del Menor de Edad y la Familia Nro 6", valor: "Juzgado del Menor de Edad y la Familia Nro 6" },
        { id: 32, nombre: "Supervisión Zona I Metropolitana", valor: "Supervisión Zona I Metropolitana" },
        { id: 33, nombre: "Supervisión Zona II Metropolitana", valor: "Supervisión Zona II Metropolitana" },
        { id: 34, nombre: "Supervisión Zona III Metropolitana", valor: "Supervisión Zona III Metropolitana" },
        { id: 35, nombre: "Supervisión Zona IV Metropolitana", valor: "Supervisión Zona IV Metropolitana" },
        { id: 36, nombre: "Supervisión Zona V Metropolitana", valor: "Supervisión Zona V Metropolitana" },
        { id: 37, nombre: "Supervisión Zona VI Metropolitana", valor: "Supervisión Zona VI Metropolitana" },
        { id: 38, nombre: "Supervisión Zona XXII Metropolitana", valor: "Supervisión Zona XXII Metropolitana" },
        { id: 39, nombre: "Expte. y Archivo Dependencia", valor: "Expte. y Archivo Dependencia" }
    ];

    const handlePrint = async () => {
        const values = getValues()
        const nuevosValores = {
            ...data, // esto sobrescribe claves duplicadas con las de `data`
            ...values,
            numero_nota_anterior: data.numero_nota,
            objeto_anterior: data.objeto,
            autoridades: stringAcumulador
        };
        let blob;
        // console.log(data.numero_nota)
        console.log(values.numero_nota)
        if (modoExpandir || data.tipo_preventivo == "Ampliación de preventivo") {
            // Preguntar y continuar luego
            blob = await pdf(<PDF datos={nuevosValores} user={user} ampliacion />).toBlob();
        } else {
            blob = await pdf(<PDF datos={data} user={user} />).toBlob();
        }
        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);
    }


    const editarPreventivo = (values) => {
        Swal.fire({
            title: '¿Está seguro de que desea editar el preventivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, editar preventivo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Preventivo editado!',
                    text: 'El preventivo ha sido editado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#0C4A6E',
                    cancelButtonColor: '#FF554C',
                    confirmButtonText: 'Aceptar'
                }
                )

                const instructor = {
                    nombre_completo_instructor: data.instructor.nombre_completo_instructor,
                    jerarquia_instructor: data.instructor.jerarquia_instructor
                }
                const secretario = {
                    nombre_completo_secretario: data.secretario.nombre_completo_secretario,
                    jerarquia_secretario: data.secretario.jerarquia_secretario,
                    plaza_secretario: data.secretario.plaza_secretario
                }

                const nuevosValores = {
                    ...data,
                    ...instructor,
                    ...secretario,
                    ...values,
                    autoridades: stringAcumulador
                };
                
                await editPreventivo(data._id, nuevosValores)

            }
        })
    }

    const expandirPreventivo = (values) => {
        Swal.fire({
            title: '¿Está seguro de que desea expandir el preventivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C4A6E',
            cancelButtonColor: '#FF554C',
            confirmButtonText: 'Sí, ampliar preventivo!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Preventivo ampliado!",
                    text:  "El preventivo ha sido ampliado correctamente." ,
                    icon: 'success',
                    confirmButtonColor: '#0C4A6E',
                    cancelButtonColor: '#FF554C',
                    confirmButtonText: 'Aceptar'
                }
                )
                const nuevosValores = {
                    ...data,
                    ...values,
                    numero_nota_anterior: data.numero_nota,
                    objeto_anterior: data.objeto,
                    con_denuncia_ampliada: true,
                    tipo_preventivo: "Ampliación de preventivo",
                    autoridades: stringAcumulador
                };
                await ampliarPreventivo(nuevosValores)
            }
        })
    }


    return (
        <>
            <h1 className='text-3xl my-5 font-sans'> Preventivo</h1>
            <form
                className='flex flex-col w-full'
                onSubmit={
                    handleSubmit(async (values) => {
                        if (modoExpandir) {
                            expandirPreventivo(values)
                        } else {
                            editarPreventivo(values)
                        }
                    })
                }>
                <div className='flex flex-col items-center justify-center'>
                    <InputRegister notMidMD campo="Supervisión" nombre="supervision" register={register} type="text" error={errors.supervision} require placeholder="Supervisión" setValue={setValue} valor={supervisionValor} />
                    <InputDate campo="Fecha" nombre="fecha_preventivo" register={register} error={errors.fecha} type="date" valor={new Date(data.fecha).toISOString().slice(0, 10)} />
                    <div className='flex flex-row w-full  xl:w-5/10'>
                        <InputRegister valor={direccionValor} campo="Dirección" nombre="direccion" register={register} setValue={setValue} error={errors.direccion} type="text" />
                        <InputRegister valor={telefonoValor} campo="Teléfono" nombre="telefono" register={register} setValue={setValue} error={errors.telefono} type="text" />
                    </div>

                    <InputRegister notMidMD campo="Número de nota" nombre="numero_nota" register={register} type="text" error={errors.numero_nota} require placeholder="Número de nota" valor={`N°-CSPJ/${new Date().getFullYear()}`} setValue={setValue} />
                    <InputRegister valor={data.objeto} notMidMD campo="Objeto" nombre="objeto" register={register} type="text" error={errors.objeto} require placeholder="Objeto" setValue={setValue} />
                    <InputRegister valor={data.consultado} notMidMD campo="Consultado a" nombre="consulta" register={register} type="text" error={errors.consulta} require placeholder="Consultado a" setValue={setValue} />
                    {modoExpandir && 
                    <InputTextArea valor={data.observaciones} campo="Observaciones" nombre="observaciones" register={register} type="text" required placeholder="Observaciones" setValue={setValue} /> 
                    }
                    <InputTextArea valor={data.resolucion} campo="Resolución" nombre="resolucion" register={register} type="text" required placeholder="Descripción" setValue={setValue} />
                </div>
                <h1 className='text-2xl'>Autoridades</h1>
                <div className='flex flex-col items-center justify-center'>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full md:w-5/10 '>
                        <InputCheckboxAcumulador defaultSelected={stringSeparado} opciones={autoridadesOpciones} stringAcumulador={stringAcumulador} setStringAcumulador={setStringAcumulador} />
                    </div>
                </div>
                {modoExpandir &&
                    <div className='flex flex-col'>
                        <CargarInstructorYSecretario register={register} setValue={setValue} errors={errors} />
                    </div>
                }

                <div className='flex flex-row items-center justify-center'>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10'>
                        {modoExpandir ? "Crear preventivo" : "Editar preventivo"}
                    </button>
                    {modoExpandir &&
                        <div className="bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-8/10 sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0" onClick={() => handlePrint()}>
                            Imprimir
                        </div>
                    }
                </div>

            </form >
        </>

    )
}

export default EditPrevencion