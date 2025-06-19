// Hooks
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
// API
import { obtenerCampo } from '../api/CRUD/campos.crud';
import { obtenerUnidades } from '../api/CRUD/unidades.crud';

type CamposType = {
    juzgadoIntervinente: any;
    ocupaciones: any;
    vinculo: any;
    tiposDeArmas: any;
    tiposDeLugar: any;
    isLoading: boolean;
    unidades: any;
};
type CamposProviderProps = {
    children: ReactNode;
};

// Crea el contexto de Campos
export const CamposContext = createContext<CamposType | undefined>(undefined);

// Se definen el uso de childrens dentro de CamposProvider
export const useCampos = () => {
    // Se obtiene el contexto de Campos
    const context = useContext(CamposContext);
    // Si el contexto no existe, se lanza un error
    if (!context) {
        throw new Error('useCampos tiene que ser utilizado con un CamposProvider');
    }
    return context;
}

// Se exporta CamposProvider para poder ser utilizado en el resto de la aplicación
export const CamposProvider = ({ children }: CamposProviderProps) => {
    // Estados con lista de campos
    const [juzgadoIntervinente, setJuzgadoIntervinente] = useState<any>([]); 
    const [ocupaciones, setOcupaciones] = useState<any>([]);
    const [vinculo, setVinculo] = useState<any>([]);
    const [tiposDeArmas, setTiposDeArmas] = useState<any>([]);
    const [tiposDeLugar, setTiposDeLugar] = useState<any>([]);
    const [unidades, setUnidades] = useState<any>([]); 
    const [isLoading, setIsLoading] = useState<boolean>(true);
   
    const obtenerDatos = async () => {
        setIsLoading(true);  // Activa el estado de carga al iniciar las llamadas.
        try {
            // Ejecuta todas las llamadas al mismo tiempo
            const [
                juzgadosRes,
                ocupacionesRes,
                vinculosRes,
                tiposDeArmasRes,
                tiposDeLugarRes,
                unidadesRes
            ] = await Promise.all([
                obtenerCampo("juzgadosIntervinientes"),
                obtenerCampo("ocupaciones"),
                obtenerCampo("vinculos"),
                obtenerCampo("tiposDeArmas"),
                obtenerCampo("tipoDeLugar"),
                obtenerUnidades()
            ]);
    
            // Asigna los resultados a sus respectivos estados
            setJuzgadoIntervinente(juzgadosRes);
            setOcupaciones(ocupacionesRes);
            setVinculo(vinculosRes);
            setTiposDeArmas(tiposDeArmasRes);
            setTiposDeLugar(tiposDeLugarRes);
            setUnidades(unidadesRes);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Asegura que isLoading se actualice incluso si ocurre un error.
        }
    };
    
    useEffect(() => {
        obtenerDatos();  // Ejecuta todas las llamadas cuando se monta el componente
    }, []);
    

    return (
        <CamposContext.Provider value={{ 
            juzgadoIntervinente, 
            ocupaciones,
            vinculo,
            tiposDeArmas,
            tiposDeLugar,
            unidades,
            isLoading 
        }}>
            {children}
        </CamposContext.Provider>
    );
};