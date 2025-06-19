// Hooks
import { useState, useContext } from 'react';
// Dependencias
import { Navigate } from 'react-router-dom';
// Componentes
import NavBar from '../../components/NavBar';
import TablaCampos from '../../components/Table/TablaCampos'; 4
import TablaUnidades from '../../components/Table/TablaUnidades';
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
// Contexto
import { useAuth } from '../../context/auth';
import { CamposContext } from '../../context/campos';
function EditarCampos() {
    // Autenticación 
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    // Estados
    const [showJuzgadoIntervinente, setShowJuzgadoIntervinentes] = useState<boolean>(false);
    const [showOcupaciones, setShowOcupaciones] = useState<boolean>(false);
    const [showVinculos, setShowVinculos] = useState<boolean>(false);
    const [showTiposDeArmas, setShowTiposDeArmas] = useState<boolean>(false);
    const [showTiposDeLugar, setShowTiposDeLugar] = useState<boolean>(false);
    const [showUnidades, setShowUnidades] = useState<boolean>(false);

    // @ts-ignore
    const { juzgadoIntervinente, ocupaciones, vinculo, tiposDeArmas, tiposDeLugar, isLoading: isCamposLoading } = useContext(CamposContext) ;


    // Reinicia los estados de los campos
    const handleReset = () => {
        setShowJuzgadoIntervinentes(false);
        setShowOcupaciones(false);
        setShowVinculos(false);
        setShowTiposDeArmas(false);
        setShowTiposDeLugar(false);
        setShowUnidades(false);
    }

    // Muestra los Juzgados Intervinientes
    const handleShowJuzgadoIntervinentes = () => {
        handleReset();
        setShowJuzgadoIntervinentes(true);
    }

    // Muestra las Ocupaciones
    const handleShowOcupaciones = () => {
        handleReset();
        setShowOcupaciones(true);
    }

    // Muestra los Vínculos
    const handleShowVinculos = () => {
        handleReset();
        setShowVinculos(true);
    }

    // Muestra los Tipos de Armas
    const handleShowTiposDeArmas = () => {
        handleReset();
        setShowTiposDeArmas(true);
    }

    // Muestra los Tipos de Lugar
    const handleShowTiposDeLugar = () => {
        handleReset();
        setShowTiposDeLugar(true);
    }

    // Muestra las Unidades
    const handleShowUnidades = () => {
        handleReset();
        setShowUnidades(true);
    }


    // Si está cargando la autenticación o los campos, muestra "Cargando..."
    if (isAuthLoading || isCamposLoading) return <LoadingScreen/>

    // Si la autenticación no está cargando pero no está autenticado, redirige a /login
    if (!isAuthLoading && !isAuthenticated) return <Navigate to="/login" replace />;

    // Si el usuario no es admin, redirige a /
    if (user?.rol !== 'admin') return <Navigate to="/" replace />;

    return (
        <div className='h-full flex flex-grow flex-col'>
            <NavBar user={user} />
            <div className='min-h-screen flex flex-grow flex-col p-4'>
                <h1 className='text-3xl my-5'>Editar campos</h1>
                <div className='mt-5 flex flex-col items-center justify-center '>
                    <div className={`flex flex-col p-5 w-full items-center justify-center xl:w-3/10 `}>
                        {/* <div className={`w-full flex flex-col justify-center items-center  `}> */}
                        <div className='w-full grid grid-cols-1 md:grid-cols-3 md:gap-2 '>
                            <button className={`my-2 md:my-0 ${showJuzgadoIntervinente ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full mr-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowJuzgadoIntervinentes}>Juzgado Intervinentes</button>
                            <button className={`my-2 md:my-0 ${showOcupaciones ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full mr-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowOcupaciones}>Ocupaciones</button>
                            <button className={`my-2 md:my-0 ${showVinculos ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowVinculos}>Vínculos</button>
                            <button className={`my-2 md:my-0 ${showTiposDeArmas ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowTiposDeArmas}>Tipos de Armas</button>
                            <button className={`my-2 md:my-0 ${showTiposDeLugar ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowTiposDeLugar}>Tipos de Lugar</button>
                            <button className={`my-2 md:my-0 ${showUnidades ? "bg-sky-700" : "bg-sky-950"} hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={handleShowUnidades}>Unidades</button>
                        </div>
                    </div>
                    {showJuzgadoIntervinente && <TablaCampos campos={juzgadoIntervinente} tipo="juzgadosIntervinientes" />}
                    {showOcupaciones && <TablaCampos campos={ocupaciones} tipo="ocupaciones" />}
                    {showVinculos && <TablaCampos campos={vinculo} tipo="vinculos" />}
                    {showTiposDeArmas && <TablaCampos campos={tiposDeArmas} tipo="tiposDeArmas" />}
                    {showTiposDeLugar && <TablaCampos campos={tiposDeLugar} tipo="tipoDeLugar" />}
                    {showUnidades && <TablaUnidades />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditarCampos;