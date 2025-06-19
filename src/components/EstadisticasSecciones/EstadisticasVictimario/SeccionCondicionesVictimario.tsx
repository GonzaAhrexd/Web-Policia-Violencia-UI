// Hooks
import { useEffect, useState } from "react";
// Componentes
import EstadisticasTiposDeViolenciaTabla from "../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla"
import DenunciasMedidasCautelaresGrafico from '../../Graficos/DenunciasMedidasCautelaresGrafico'
type SeccionCondicionesVictimarioProps = {
    victimarios: any
    denunciasAMostrar: any
}

function SeccionCondicionesVictimario({ victimarios, denunciasAMostrar }: SeccionCondicionesVictimarioProps) {

    const [condicionesRiesgo, setCondicionesRiesgo] = useState({})
    const [antecedentesVictimarios, setAntecedentesVictimarios] = useState({})

    useEffect(() => {
        const contarCondiciones = (victimarios: any[]) => {
            let contador = {
                reincidente: 0,
                abuso_de_alcohol: 0
            };
            victimarios.forEach(victimario => {
                if (victimario.abuso_de_alcohol) {
                    contador.abuso_de_alcohol++;
                }
                if (victimario.denuncias_en_contra?.length >= 2) {
                    contador.reincidente++;
                }
            });
            return contador;
        }
        const contarAntecedentes = (victimarios: any[]) => {
            // Ahora haz lo mismo pero con los campos antecedentes_toxicologicos, antecedentes_psicologicos, antecedentes_penales, antecedents_contravencionales, entrenamiento_en_combate
            let contador = {
                antecedentes_toxicologicos: 0,
                antecedentes_psicologicos: 0,
                antecedentes_penales: 0,
                antecedentes_contravencionales: 0,
                entrenamiento_en_combate: 0,
                empleo_de_armas: 0,
            };


            victimarios.forEach(victimario => {
                if (victimario.antecedentes_toxicologicos) {
                    contador.antecedentes_toxicologicos++;
                }
                if (victimario.antecedentes_psicologicos) {
                    contador.antecedentes_psicologicos++;
                }
                if (victimario.antecedentes_penales) {
                    contador.antecedentes_penales++;
                }
                if (victimario.antecedentes_contravencionales) {
                    contador.antecedentes_contravencionales++;
                }
                if (victimario.entrenamiento_en_combate) {
                    contador.entrenamiento_en_combate++;
                }
            });

            // @ts-ignore
            denunciasAMostrar.forEach(denuncia => {
                if (denuncia.empleo_de_armas) {
                    contador.empleo_de_armas++;
                }
            }
                
        );
            return contador;
        }


        
        setCondicionesRiesgo(contarCondiciones(victimarios))
        setAntecedentesVictimarios(contarAntecedentes(victimarios))

    }, [victimarios])

    const format = (key: string) => {
        switch (key) {
            case 'abuso_de_alcohol':
                return 'Abuso de alcohol'
            case 'reincidente':
                return 'Reincidente'
            default:
                return key
        }
    }

    const formatAntecedentes = (key: string) => {
        switch (key) {
            case 'antecedentes_toxicologicos':
                return 'Antecedentes toxicológicos'
            case 'antecedentes_psicologicos':
                return 'Antecedentes psicológicos'
            case 'antecedentes_penales':
                return 'Antecedentes penales'
            case 'antecedents_contravencionales':
                return 'Antecedentes contravencionales'
            case 'entrenamiento_en_combate':
                return 'Entrenamiento en combate'
            case 'empleo_de_armas':
                return 'Empleo de armas'
            case 'antecedentes_contravencionales':
                return 'Antecedentes contravencionales'
            default:
                return key
        }
    }
    return (
        <>
            <h1 className="text-2xl">Condiciones del victimario registrados en la Provincia del Chaco en el periodo seleccionado {"(Total de " + victimarios?.length + " víctimas)"}</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <EstadisticasTiposDeViolenciaTabla texto="Condiciones de Riesgo" tipos_de_violencia={condicionesRiesgo} format={format} />      
                    <DenunciasMedidasCautelaresGrafico estadistica={condicionesRiesgo} aspect={2}/>
                </div>
                <div className='w-full md:w-5/10'>
                <EstadisticasTiposDeViolenciaTabla texto="Condiciones de Riesgo" tipos_de_violencia={antecedentesVictimarios} format={formatAntecedentes} />      
                <DenunciasMedidasCautelaresGrafico estadistica={antecedentesVictimarios} aspect={2}/>
                </div>
            </div>
        </>
    )
}

export default SeccionCondicionesVictimario