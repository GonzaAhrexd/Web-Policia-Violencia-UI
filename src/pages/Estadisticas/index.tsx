// Autenticación
import { useAuth } from '../../context/auth';

// Hooks
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// Componentes
import NavBar from '../../components/NavBar'
import InputDateRange from '../../components/InputComponents/InputDateRange';
import EstadisticasMunicipiosSeccion from '../../components/EstadisticasSecciones/EstadisticasMunicipiosSeccion';
import EstadisticasDivisionesSeccion from '../../components/EstadisticasSecciones/EstadisticasDivisionesSeccion';
import EstadisticasTiposDeViolencia from '../../components/EstadisticasSecciones/EstadisticasTiposDeViolencia';
import EstadisticasModalidades from '../../components/EstadisticasSecciones/EstadisticasModalidades';
import EstadisticasMedidasCautelares from '../../components/EstadisticasSecciones/EstadisticasMedidasCautelares';
import EstadisticasVictimasSeccion from '../../components/EstadisticasSecciones/EstadisticasVictimasSeccion';
import EstadisticasVictimarioSeccion from '../../components/EstadisticasSecciones/EstadisticasVictimarioSeccion';
import EstadisticaGenerarInformeSeccion from '../../components/EstadisticasSecciones/EstadisticasInforme/EstadisticasGenerarInformeSeccion';
import EstadisticasModoActuacionSeccion from '../../components/EstadisticasSecciones/EstadisticasModoActuacionSeccion';
import DenunciasMes from '../../components/Graficos/DenunciasMes';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import EstadisticasAprehensiones from '../../components/EstadisticasSecciones/EstadisticasAprehensiones';

// API
import { buscarDenuncias } from '../../api/CRUD/denuncias.crud';

// Iconos
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function index() {
    // Autenticación
    const { user, isAuthenticated, isLoading } = useAuth();
    // Formulario
    const { register, setValue, handleSubmit, formState: {
        
    } } = useForm()

    const [fecha, setFecha] = useState({ desde: '', hasta: '' });
    // Estado para mostrar las  estadísticas
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [showLocalidadesStats, setShowLocalidadesStats] = useState(false);
    const [showDivionesStats, setShowDivionesStats] = useState(false);
    const [showModoActuacion, setShowModoActuacion] = useState(false);
    const [showAprehensionesStats, setShowAprehensionesStats] = useState(false);
    const [showTipoDeViolencia, setShowTipoDeViolencia] = useState(false);
    const [showModalidades, setShowModalidades] = useState(false);
    const [showMedidasCautelares, setShowMedidasCautelares] = useState(false);
    const [showVictimas, setShowVictimas] = useState(false);
    const [showVictimarios, setShowVictimarios] = useState(false);
    const [showGenerarInforme, setShowGenerarInforme] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [sinResultados, setSinResultados] = useState(false);
    const [mostrarTodo, setMostrarTodo] = useState(false);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [texto, setTexto] = useState(['']);
    const [titulo, setTitulo] = useState('');

    // RESET
    const handleReset = () => {
        setShowLocalidadesStats(false)
        setShowDivionesStats(false)
        setShowAprehensionesStats(false)
        setShowModoActuacion(false)
        setShowTipoDeViolencia(false)
        setShowModalidades(false)
        setShowMedidasCautelares(false)
        setShowVictimas(false)
        setShowVictimarios(false)
        setShowGenerarInforme(false)
        setMostrarTodo(false)
    }

    // Localidades
    const handleLocalidadesStats = () => {
        if (showAll && showLocalidadesStats) return setShowAll(false)
        if (showLocalidadesStats) return setShowAll(true)
        handleReset()
        setShowLocalidadesStats(true)
        setShowAll(false)
    }

    // Modos de actuación
    const handleModoActuacion = () => {
        if (showAll && showModoActuacion) return setShowAll(false)
        if (showModoActuacion) return setShowAll(true)
        handleReset()
        setShowModoActuacion(true)
        setShowAll(false)
    }

    // Divisiones
    const handleDivisionesStats = () => {
        if (showAll && showDivionesStats) return setShowAll(false)
        if (showDivionesStats) return setShowAll(true)
        handleReset()
        setShowDivionesStats(true)
        setShowAll(false)
    }

    // Aprehensiones
    const handleAprehensiones = () => {
        if (showAll && showAprehensionesStats) return setShowAll(false)
        if (showAprehensionesStats) return setShowAll(true)
        handleReset()
        setShowAprehensionesStats(true)
        setShowAll(false)
    }

    // Tipo de violencia
    const handleTipoDeViolencia = () => {
        if (showAll && showTipoDeViolencia) return setShowAll(false)
        if (showTipoDeViolencia) return setShowAll(true)
        handleReset()
        setShowTipoDeViolencia(true)
        setShowAll(false)
    }

    // Modalidades
    const handleModalidades = () => {
        if (showAll && showModalidades) return setShowAll(false)
        if (showModalidades) return setShowAll(true)
        handleReset()
        setShowModalidades(true)
        setShowAll(false)
    }

    // Medidas Cautelares
    const handleMedidasCautelares = () => {
        if (showAll && showMedidasCautelares) return setShowAll(false)
        if (showMedidasCautelares) return setShowAll(true)
        handleReset()
        setShowMedidasCautelares(true)
        setShowAll(false)
    }

    // Victimas
    const handleVictimas = () => {
        if (showAll && showVictimas) return setShowAll(false)
        if (showVictimas) return setShowAll(true)
        handleReset()
        setShowVictimas(true)
        setShowAll(false)
    }

    // Victimarios
    const handleVictimarios = () => {
        if (showAll && showVictimarios) return setShowAll(false)
        if (showVictimarios) return setShowAll(true)
        handleReset()
        setShowVictimarios(true)
        setShowAll(false)
    }

    // Generar Informe
    const handleGenerarInforme = () => {
        if (showAll && showGenerarInforme) return setShowAll(false)
        if (showGenerarInforme) return setShowAll(true)
        handleReset()
        setShowGenerarInforme(true)
        setShowAll(false)
        
    }

    // Mostrar todo
    const handleTodo = () => {
        if (showAll && mostrarTodo) return setShowAll(false)
        if (mostrarTodo) return setShowAll(true)
        handleReset()
        setMostrarTodo(true)
        setShowAll(false)
    }

    // Búsqueda
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values, false);
            setDenunciasAMostrar(result)
            handleLocalidadesStats()
            setFecha(values)
        }
        fetchDenuncias();
    }

    // Cerrar modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    // Abrir modal
    const handleOpenModal = (text: string[]) => {
        setIsModalOpen(true);
        setTexto(text);
    }


    // Si esta cargando, muestra un mensaje de carga
    if (isLoading) return <LoadingScreen/>
    // Si no esta autenticado, redirige a login
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    // Si el usuario no tiene rol, redirige a login
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />
    return (
        <div className='h-full flex flex-grow flex-col'>
            {isModalOpen && <Modal titulo={titulo} texto={texto} onClose={handleCloseModal} />}
            <NavBar user={user} />
            <div className='min-h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Estadísticas</h1>
                {denunciasAMostrar?.length == 0 &&
                    <>
                        <div className='hidden md:flex flex-col justify-center items-center w-full ' >
                            <DenunciasMes aspect={5} />
                        </div>
                        <div className='flex md:hidden flex-col justify-center items-center w-full ' >
                            <DenunciasMes aspect={2} />
                        </div>
                    </>
                }
                <form className="w-full flex flex-col items-center"
                    onSubmit={
                        handleSubmit(async (values) => {
                            handleBusqueda(values)
                            setSinResultados(true)
                        }
                        )}>
                    <InputDateRange register={register} setValue={setValue} isRequired={true} />
                    <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                </form>
                {sinResultados && denunciasAMostrar?.length === 0 && <h1 className='text-2xl mt-5'>No se encontraron denuncias</h1>}
                {denunciasAMostrar?.length > 0 &&
                    <>
                        <div className='mt-5 flex flex-col items-center justify-center '>
                            <div className={`flex flex-col  ${showAll && 'transition-all duration-500 ease-in-out border-blue-800 border-2 rounded-lg bg-blue-50 '} p-5 w-full items-center justify-center md:w-3/10 `}>
                                <div className={`w-full flex  ${!showAll ? 'flex-row' : "flex-col"} justify-center items-center `}>
                                    {(showAll || showLocalidadesStats) && <button className={`my-2 ${showLocalidadesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleLocalidadesStats()}>Localidades</button>}
                                    {(showAll || showDivionesStats) && <button className={`my-2 ${showDivionesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleDivisionesStats()}>Divisiones</button>}
                                    {(showAll || showModoActuacion) && <button className={`my-2 ${showModoActuacion ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleModoActuacion()}>Modo de Actuación</button>}
                                    {(showAll || showAprehensionesStats) && <button className={`my-2 ${showAprehensionesStats ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleAprehensiones()}>Aprehensiones</button>}
                                    {(showAll || showTipoDeViolencia) && <button className={`my-2 ${showTipoDeViolencia ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleTipoDeViolencia()}>Tipo de Violencia</button>}
                                    {(showAll || showModalidades) && <button className={`my-2 ${showModalidades ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleModalidades()}>Modalidades</button>}
                                    {(showAll || showMedidasCautelares) && <button className={`my-2 ${showMedidasCautelares ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleMedidasCautelares()}>Medidas Cautelares</button>}
                                    {(showAll || showVictimas) && <button className={`my-2 ${showVictimas ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleVictimas()}>Victimas</button>}
                                    {(showAll || showVictimarios) && <button className={`my-2 ${showVictimarios ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleVictimarios()}>Victimarios</button>}
                                    {(showAll || showGenerarInforme) && <button className={`my-2 ${showGenerarInforme ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleGenerarInforme()}>Generar informe</button>}
                                    {(showAll || mostrarTodo) && <button className={`my-2 ${mostrarTodo ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full `} onClick={() => handleTodo()}>Mostrar todo</button>}

                                    {!showAll && <PlusCircleIcon className='w-8 h-8 cursor-pointer' onClick={() => setShowAll(true)} />}
                                </div>                            
                            </div>
                        </div>
                        {(showLocalidadesStats || mostrarTodo) && <EstadisticasMunicipiosSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showDivionesStats || mostrarTodo) && <EstadisticasDivisionesSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showModoActuacion || mostrarTodo) && <EstadisticasModoActuacionSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showAprehensionesStats || mostrarTodo) && <EstadisticasAprehensiones denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showTipoDeViolencia  || mostrarTodo) && <EstadisticasTiposDeViolencia handleOpenModal={handleOpenModal} setTitulo={setTitulo} denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showModalidades  || mostrarTodo) && <EstadisticasModalidades handleOpenModal={handleOpenModal} setTitulo={setTitulo} denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showMedidasCautelares || mostrarTodo)  && <EstadisticasMedidasCautelares denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showVictimas  || mostrarTodo) && <EstadisticasVictimasSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showVictimarios || mostrarTodo)  && <EstadisticasVictimarioSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} />}
                        {(showGenerarInforme || mostrarTodo) && <EstadisticaGenerarInformeSeccion denunciasAMostrar={denunciasAMostrar ? denunciasAMostrar : {}} fecha={fecha} />}
                    </>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default index