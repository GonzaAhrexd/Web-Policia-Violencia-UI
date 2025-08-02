/* 
    [ Estadisticas.tsx ]
    Descripción: Página principal para mostrar estadísticas de denuncias.
    Permite al usuario buscar denuncias por fecha y muestra diferentes secciones de estadísticas.


*/


// Hooks
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Contexto
import { useAuth } from '../../context/auth';
// Iconos
import { PlusCircleIcon } from '@heroicons/react/24/outline';
// Componentes
import NavBar from '../../components/NavBar';
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

// Objeto para mapear IDs a componentes de estadísticas
const sectionComponents = {
    localidades: EstadisticasMunicipiosSeccion,
    divisiones: EstadisticasDivisionesSeccion,
    modoActuacion: EstadisticasModoActuacionSeccion,
    aprehensiones: EstadisticasAprehensiones,
    tipoDeViolencia: EstadisticasTiposDeViolencia,
    modalidades: EstadisticasModalidades,
    medidasCautelares: EstadisticasMedidasCautelares,
    victimas: EstadisticasVictimasSeccion,
    victimarios: EstadisticasVictimarioSeccion,
    generarInforme: EstadisticaGenerarInformeSeccion,
};

function Index() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { register, setValue, handleSubmit } = useForm();

    const [fecha, setFecha] = useState({ desde: '', hasta: '' });
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const [activeSection, setActiveSection] = useState(null); 
    const [showAllSections, setShowAllSections] = useState(false); 
    const [sinResultados, setSinResultados] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', text: [''] });

    // Redirección y carga inicial
    if (isLoading) return <LoadingScreen />;
    if (!isAuthenticated || user?.rol === "sin_definir") return <Navigate to="/login" replace />;

    // Manejador de clic para cambiar la sección activa
    const handleSectionClick = (sectionId) => {
        if (showAllSections && activeSection === sectionId) {
            setShowAllSections(false);
        } else if (activeSection === sectionId) {
            setShowAllSections(true);
        } else {
            setActiveSection(sectionId);
            setShowAllSections(false);
        }
    };

    // Manejador para mostrar/ocultar todas las secciones
    const handleToggleAllSections = () => {
        setShowAllSections(prev => !prev);
        setActiveSection(null); // Reiniciar la sección activa cuando se muestra todo
    };

    // Búsqueda de denuncias
    const handleBusqueda = async (values) => {
        setIsSearching(true);
        setSearchError(null);
        setActiveSection('localidades'); // Mostrar localidades por defecto después de la búsqueda
        try {
            const result = await buscarDenuncias(values, false);
            setDenunciasAMostrar(result);
            setFecha(values);
            setSinResultados(result.length === 0);
        } catch (error) {
            console.error("Error buscando denuncias:", error);
            setSearchError("Hubo un error al buscar las denuncias. Por favor, inténtalo de nuevo.");
            setDenunciasAMostrar([]);
            setSinResultados(true);
        } finally {
            setIsSearching(false);
        }
    };

    // Cerrar modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Abrir modal
    const handleOpenModal = (title, text) => {
        setIsModalOpen(true);
        setModalContent({ title, text });
    };

    // Array de configuración para los botones y componentes de estadísticas
    const sectionsConfig = [
        { id: 'localidades', name: 'Localidades' },
        { id: 'divisiones', name: 'Divisiones' },
        { id: 'modoActuacion', name: 'Modo de Actuación' },
        { id: 'aprehensiones', name: 'Aprehensiones' },
        { id: 'tipoDeViolencia', name: 'Tipo de Violencia', props: { handleOpenModal } },
        { id: 'modalidades', name: 'Modalidades', props: { handleOpenModal } },
        { id: 'medidasCautelares', name: 'Medidas Cautelares' },
        { id: 'victimas', name: 'Victimas' },
        { id: 'victimarios', name: 'Victimarios' },
        { id: 'generarInforme', name: 'Generar informe', props: { fecha } },
    ];

    return (
        <div className='h-full flex flex-grow flex-col'>
            {isModalOpen && <Modal titulo={modalContent.title} texto={modalContent.text} onClose={handleCloseModal} />}
            <NavBar user={user} />
            <div className='min-h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Estadísticas</h1>

                {/* Gráfico de denuncias del mes si no hay denuncias buscadas */}
                {denunciasAMostrar?.length === 0 && (
                    <>
                        <div className='hidden md:flex flex-col justify-center items-center w-full'>
                            <DenunciasMes aspect={5} />
                        </div>
                        <div className='flex md:hidden flex-col justify-center items-center w-full'>
                            <DenunciasMes aspect={2} />
                        </div>
                    </>
                )}

                {/* Formulario de búsqueda */}
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(handleBusqueda)}>
                    <InputDateRange register={register} setValue={setValue} isRequired={true} />
                    <button
                        className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"
                        type="submit"
                        disabled={isSearching}
                    >
                        {isSearching ? 'Buscando...' : 'Buscar'}
                    </button>
                </form>

                {/* Mensajes de estado de búsqueda */}
                {searchError && <p className="text-red-500 text-center mt-3">{searchError}</p>}
                {sinResultados && denunciasAMostrar?.length === 0 && !isSearching && (
                    <h1 className='text-2xl mt-5 text-center'>No se encontraron denuncias</h1>
                )}

                {/* Contenido de estadísticas */}
                {denunciasAMostrar?.length > 0 && (
                    <>
                        <div className='mt-5 flex flex-col items-center justify-center'>
                            <div className={`flex flex-col ${showAllSections && 'transition-all duration-500 ease-in-out border-blue-800 border-2 rounded-lg bg-blue-50 '} p-5 w-full items-center justify-center md:w-3/10`}>
                                <div className={`w-full flex ${!showAllSections ? 'flex-row' : "flex-col"} justify-center items-center `}>
                                    {sectionsConfig.map((section) => (
                                        (showAllSections || activeSection === section.id) && (
                                            <button
                                                key={section.id}
                                                className={`my-2 ${activeSection === section.id ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full`}
                                                onClick={() => handleSectionClick(section.id)}
                                            >
                                                {section.name}
                                            </button>
                                        )
                                    ))}
                                    {(showAllSections || activeSection === 'mostrarTodo') && (
                                        <button
                                            className={`my-2 ${activeSection === 'mostrarTodo' ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full`}
                                            onClick={handleToggleAllSections}
                                        >
                                            {showAllSections ? 'Ocultar todo' : 'Mostrar todo'}
                                        </button>
                                    )}

                                    {!showAllSections && activeSection === null && (
                                        <PlusCircleIcon className='w-8 h-8 cursor-pointer' onClick={() => setShowAllSections(true)} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Renderizado condicional de los componentes de estadísticas */}
                        {sectionsConfig.map((section) => {
                            const Component = sectionComponents[section.id];
                            if (Component && (showAllSections || activeSection === section.id)) {
                                return (
                                    <Component
                                        key={section.id}
                                        denunciasAMostrar={denunciasAMostrar}
                                        {...section.props}
                                    />
                                );
                            }
                            return null;
                        })}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Index;