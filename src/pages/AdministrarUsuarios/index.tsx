// Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Contexto
import { useAuth } from '../../context/auth';
import { useCampos } from '../../context/campos';
// Librerías React
import { Navigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
// Componentes
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer/Footer';
import LoadingScreen from '../../components/LoadingScreen';
import InputRegister from '../../components/InputComponents/InputRegister';
import SelectRegisterSingle from '../../components/Select/SelectRegisterSingle';
import ModalAddUser from '../../components/Modal/ModalAddUser';
// Backend
import { buscarUsuario } from '../../api/CRUD/usuarios.crud';
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

// Dependencias de la misma carpeta
import { columns } from './columnsDataTable'
import expandedComponents from './expandedComponents'
import { customStyles } from '../../GlobalConst/customStyles'

function index() {
    const { user, isAuthenticated, isLoading } = useAuth();
    // Formulario
     
    const [modalShow, setModalShow] = useState(false)

    const { isLoading: loadingCampos } = useCampos()

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()
    const [listaDeUsuarios, setListaDeUsuarios] = useState([])

    const opcionesRoles = [
        { value: "admin", nombre: "Admin" },
        { value: "agente", nombre: "Agente" },
        { value: "carga", nombre: "Carga" },
        { value: "sin_definir", nombre: "Sin definir" }
    ]

    const handleAddUser = () => {
        setModalShow(true)
    }

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    if (isLoading && loadingCampos) return <LoadingScreen/>
    // Si no esta autenticado, redirige a login
    if ((!isLoading) && (!isAuthenticated)) return <Navigate to="/login" replace />
    // Si el usuario no tiene rol, redirige a login
    if (user?.rol !== "admin") return <Navigate to="/login" replace />

    return (
        <div className='h-full flex flex-grow flex-col'>
            <NavBar user={user} />
            { modalShow && 
                 <ModalAddUser setOpenModal={setModalShow}/>
            
            }
            <div className='min-h-screen flex flex-grow flex-col'>
                <div className='p-2 sm:p-10'>
                    <div className='flex flex-row items-center'>
                    <h1 className='text-3xl my-5'>Administrar usuarios</h1> <PlusCircleIcon className='h-6 w-6 ml-2 cursor-pointer' onClick={() => handleAddUser()}/>
                    </div>
                    <form className="w-full flex flex-col items-center"
                        onSubmit={
                            handleSubmit(async (values) => {
                                // Busca los usuarios
                                const usuarios = await buscarUsuario(values)
                                // Setea los usuarios en el estado
                                setListaDeUsuarios(usuarios)
                            }
                            )}>
                        <InputRegister busqueda require={false} nombre="nombre_de_usuario" type="text" campo="Nombre de usuario" error={errors.nombre_de_usuario} register={register} setValue={setValue} />
                        <InputRegister busqueda require={false} nombre="nombre" type="text" campo="Nombre" error={errors.nombre} register={register} setValue={setValue} />
                        <InputRegister busqueda require={false} nombre="apellido" type="text" campo="Apellido" error={errors.apellido} register={register} setValue={setValue} />
                        <SelectRegisterSingle isRequired={false} nombre="rol" campo="Rol" opciones={opcionesRoles} setValue={setValue} error={errors.rol} />
                        <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
                    </form>
                    {listaDeUsuarios?.length > 0 &&
                        <div className="flex flex-col w-full">
                            <h2 className='text-2xl my-5'>Usuarios</h2>
                            <DataTable
                                columns={columns}
                                data={listaDeUsuarios}
                                pagination
                                expandableRows
                                expandableRowsComponent={expandedComponents}
                                customStyles={customStyles}
                                responsive={true}
                                striped={true}
                                highlightOnHover={true}
                                noDataComponent="No hay denuncias para mostrar"
                                defaultSortFieldId={"Fecha"}
                                defaultSortAsc={false}
                                expandableIcon={expandableIcon}
                            />
                        </div>}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default index