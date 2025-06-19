/*
   [ /mis-denuncias ] 
   Descripción: Página de mis denuncias para que el usuario pueda ver las denuncias que ha realizado
*/

// Autenticación
import { useAuth } from '../../context/auth';
// Hooks
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
// APIs del BackEnd
import { misDenuncias } from '../../api/CRUD/denuncias.crud';
// Librerías react
import DataTable from 'react-data-table-component';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Componentes
import NavBar from '../../components/NavBar';
import InputCheckbox from '../../components/InputComponents/InputCheckbox';
import InputRegister from '../../components/InputComponents/InputRegister';
import InputDateRange from '../../components/InputComponents/InputDateRange';
import LoadingScreen from '../../components/LoadingScreen';
import Footer from '../../components/Footer/Footer';
// DataTable
import { columnsDenuncia } from './columnsDataTable'
import expandedComponents from '../../components/Busqueda/BuscarDenuncias/expandedComponents' // Busca de otro lado para mantener consistencia
import { customStyles } from '../../GlobalConst/customStyles'
// Página alternativa para el rol agente
import MisDenunciasAgente from '../MisDenunciasAgente'
import Modal from '../../components/Modal';
// ZUD
import { useStore } from './store'
// import expandedComponents from '../MisDenunciasAgente/expandedComponents';


function MisDenuncias() {
    // Estados
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Se realiza la búsqueda de las denuncias con los datos ingresados
    const handleBusqueda = async (values: any) => {
        // Se obtienen las denuncias con una función asíncrona
        const fetchDenuncias = async () => {
            const result = await misDenuncias(values);
            setDenunciasAMostrar(result)
        }
        // Se ejecuta la función asíncrona
        fetchDenuncias();
    }

    const { openModal, setOpenModal, title, text } = useStore()


    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }
    // const [ isModalOpen, setIsModalOpen ] = useState(false);
    // const [texto, setTexto] = useState(['']);
    
    // const handleOpenModal = (text: string[]) => {
    //     setIsModalOpen(true);
    //     setTexto(text);
    //   };
    
      // Cerrar el modal
      const handleCloseModal = () => {
        setOpenModal(false);
      }
    // Se obtiene el usuario y se verifica si está autenticado
    const { user, isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <LoadingScreen />
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    if (user?.rol === "sin_definir") return <Navigate to="/login" replace />

    
    return (
        <div>
            <NavBar user={user} />
            <div>
                {openModal && <Modal titulo={title} texto={text} onClose={handleCloseModal} />}
            </div>
            <div className='min-h-screen sm:h-full p-2 sm:p-10'>
                <h1 className='text-3xl my-5'>Mis denuncias</h1>
                <h2 className='text-2xl my-5'>Buscar</h2>
                {user.rol === 'agente' ? <MisDenunciasAgente /> :
                    <>
                        <form className="w-full flex flex-col items-center"
                            onSubmit={
                                handleSubmit(async (values) => {
                                    handleBusqueda(values)
                                })}>
                            <InputDateRange register={register} setValue={setValue} isRequired={false} />
                            <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                            <InputCheckbox campo="Falta rellenar el expediente" nombre="is_expediente_completo" register={register} error={errors.is_expediente_completo} id="is_expediente_completo"  setValue={setValue}></InputCheckbox>
                            <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-3/10"> Buscar</button>
                        </form>
                        <div className="flex flex-col w-full ">
                            <h2 className='text-2xl my-5'>Denuncias</h2>
                            <DataTable
                                className='scale-up-ver-top' // Animación de entrada
                                columns={columnsDenuncia} // Columnas de la tabla
                                data={denunciasAMostrar} // Datos de la tabla
                                pagination // Paginación
                                expandableRows // Filas expandibles
                                expandableRowsComponent={expandedComponents}  // Componente de filas expandibles
                                customStyles={customStyles} // Estilos personalizados
                                responsive={true} // Diseño responsivo
                                striped={true} // Filas alternadas
                                highlightOnHover={true} // Resaltar al pasar el mouse
                                noDataComponent="No hay denuncias para mostrar" // Mensaje si no hay datos
                                defaultSortFieldId={"Fecha"} // Campo por defecto para ordenar
                                defaultSortAsc={false} // Orden ascendente
                                expandableIcon={expandableIcon} // Iconos de expandir y colapsar
                            />
                        </div>
                    </>
                }
            </div>
            <Footer />
        </div>
    )
}

export default MisDenuncias