import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DataTable from 'react-data-table-component';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';

// API y Contexto
import { buscarDenunciasSinVerificar } from '../../../api/CRUD/denunciasSinVerificar.crud';
import { useAuth } from '../../../context/auth';
import { useCampos } from '../../../context/campos';

// Componentes
import InputRegister from '../../InputComponents/InputRegister';
import SelectDivisionMunicipios from '../../Select/SelectDivisionMunicipios';
import InputDateRange from '../../InputComponents/InputDateRange';
import InputCheckbox from '../../InputComponents/InputCheckbox';

// Constantes
import { columnsDataTableVerificar } from './columnsDataTableVerificar';
import { customStyles } from '../../../GlobalConst/customStyles';
import expandedComponentDenunciasSinVerificar from '../../../pages/MisDenunciasAgente/expandedComponentsDenunciasSinVerificar';
// Define los íconos para expandir/contraer filas en la DataTable
const expandableIcon = {
    collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
    expanded: <ArrowUpCircleIcon className='h-6 w-6' />,
};

const BuscarDenunciasSinVerificar = () => {
    // Inicializa el formulario con react-hook-form para manejar los inputs
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    // Obtiene el usuario autenticado y los campos de unidades desde los contextos
    const { user } = useAuth();
    const { unidades: unidadCampos } = useCampos();

    // Estado para almacenar las denuncias obtenidas de la búsqueda
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);

    // Observa los valores de los campos numero_de_expediente e id_denuncia
    const expedienteValue = watch('numero_de_expediente');
    const idValue = watch('id_denuncia');

    // Determina si el rango de fechas es obligatorio (cuando no se ingresa expediente ni ID)
    const isDateRangeRequired = !expedienteValue && !idValue;

    // Función para manejar la búsqueda de denuncias
    const handleBusqueda = async (values) => {
        try {
            // Crea una copia de los valores del formulario para modificarlos
            let searchValues = { ...values };

            // Si el usuario no es agente y se seleccionó una unidad, descompone el valor en municipio y comisaría
            if (user.rol !== 'agente' && values.unidad) {
                const [_, municipio, comisaria] = values.unidad.split(',');
                searchValues = { ...searchValues, municipio, comisaria };
            } else if (user.rol === 'agente') {
                // Si es agente, asigna la división del usuario automáticamente
                searchValues.division = user.unidad;
            }

            // Realiza la búsqueda de denuncias usando la API
            const resultado = await buscarDenunciasSinVerificar(searchValues);

            // Actualiza el estado con las denuncias obtenidas
            setDenunciasAMostrar(resultado);
        } catch (error) {
            // Maneja errores durante la búsqueda y los registra en consola
            console.error('Error al buscar denuncias:', error);
        }
    };

    return (
        // Contenedor principal con diseño de columna centrada
        <div className="flex flex-col w-full items-center">
            {/* Formulario para buscar denuncias */}
            <form
                className="w-full flex flex-col items-center gap-4"
                onSubmit={handleSubmit(handleBusqueda)}
            >
                {/* Componente para seleccionar un rango de fechas */}
                <InputDateRange register={register} setValue={setValue} isRequired={isDateRangeRequired}
                />

                {/* Input para buscar por ID de denuncia */}
                <InputRegister busqueda campo="ID" nombre="id_denuncia" register={register} type="text" error={errors.id_denuncia} require={false}/>
                {/* Input para buscar por número de expediente */}
                <InputRegister campo="Número de expediente"nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}/>

                {/* Selector de división, municipio y comisaría, solo visible para no agentes */}
                {user.rol !== 'agente' && (
                    <div className="flex flex-col xl:flex-row w-full items-center justify-center">
                        <SelectDivisionMunicipios isRequired={false} campo="División, Municipio y Comisaría" nombre="division" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.division}
                        />
                    </div>
                )}

                {/* Checkbox para mostrar ampliaciones de denuncias */}
                <InputCheckbox campo="Mostrar ampliaciones" nombre="mostrar_ampliaciones" register={register} setValue={setValue} id="mostrar_ampliaciones"/>

                {/* Botón para enviar el formulario y realizar la búsqueda */}
                <button
                    type="submit"
                    className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar
                </button>
            </form>

            {/* Sección para mostrar la tabla de denuncias */}
            <div className="w-full mt-5">
                <h2 className="text-2xl mb-5">Denuncias</h2>
                <div className="overflow-x-auto">
                    {/* Tabla de datos para mostrar las denuncias */}
                    <DataTable
                        columns={columnsDataTableVerificar} // Columnas definidas para la tabla
                        data={denunciasAMostrar} // Datos de las denuncias obtenidas
                        pagination // Habilita la paginación
                        expandableRows // Permite expandir filas
                        expandableRowsComponent={expandedComponentDenunciasSinVerificar} // Componente para filas expandidas
                        customStyles={customStyles} // Estilos personalizados para la tabla
                        responsive // Hace la tabla adaptable a diferentes tamaños de pantalla
                        striped // Agrega rayas a las filas para mejor legibilidad
                        highlightOnHover // Resalta la fila al pasar el cursor
                        noDataComponent="No hay denuncias para mostrar" // Mensaje cuando no hay datos
                        defaultSortFieldId="Fecha" // Campo por defecto para ordenar
                        defaultSortAsc={false} // Orden descendente por defecto
                        expandableIcon={expandableIcon} // Iconos para expandir/contraer filas
                    />
                </div>
            </div>
        </div>
    );
};

export default BuscarDenunciasSinVerificar;