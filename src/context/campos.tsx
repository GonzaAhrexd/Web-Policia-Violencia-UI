// Hooks
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
// API
import { obtenerCampo } from '../api/CRUD/campos.crud';
import { obtenerUnidades } from '../api/CRUD/unidades.crud';

type Campos = {
    nombre: string;
    value: string;
    tipo: string
}

type CamposType = {
    juzgadoIntervinente: Campos[];
    ocupaciones: Campos[];
    vinculo: Campos[];
    tiposDeArmas: Campos[];
    tiposDeLugar: Campos[];
    etnias: Campos[];
    isLoading: boolean;
    unidades: Unidades[];
};


type Unidades = {
    nombre: string;
    value: string;
    subdivisiones: Unidades[];
    prefijo?: string;
    cuadriculas?: Unidades[];
    direccion?: string;
    telefono?: string;
    supervision?: string;
}


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
    const [juzgadoIntervinente, setJuzgadoIntervinente] = useState<Campos[]>([]); 
    const [ocupaciones, setOcupaciones] = useState<Campos[]>([]);
    const [vinculo, setVinculo] = useState<Campos[]>([]);
    const [tiposDeArmas, setTiposDeArmas] = useState<Campos[]>([]);
    const [tiposDeLugar, setTiposDeLugar] = useState<Campos[]>([]);
    const [etnias, setEtnias] = useState<Campos[]>([]);
    const [unidades, setUnidades] = useState<Unidades[]>([]); 
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
                etniasRes,
                unidadesRes
            ] = await Promise.all([
                obtenerCampo("juzgadosIntervinientes"),
                obtenerCampo("ocupaciones"),
                obtenerCampo("vinculos"),
                obtenerCampo("tiposDeArmas"),
                obtenerCampo("tipoDeLugar"),
                obtenerCampo("etniasVictimas"),
                obtenerUnidades()
            ]);
    
            // Asigna los resultados a sus respectivos estados
            setJuzgadoIntervinente(juzgadosRes);
            setOcupaciones(ocupacionesRes);
            setVinculo(vinculosRes);
            setTiposDeArmas(tiposDeArmasRes);
            setTiposDeLugar(tiposDeLugarRes);
            setEtnias(etniasRes);
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
            etnias,
            isLoading 
        }}>
            {children}
        </CamposContext.Provider>
    );
};