/*
    Este archivo contiene las funciones para obtener las coordenadas de una dirección a través de la API de Geocoding.
*/
// Importamos axios
import axios from './axios'

export const getCoords = async (direccion: string) => {
    try {
        const response = await axios.get(`/coordenadas/${direccion}` )
        return response.data
    }catch(error){
        console.log(error)
    }
}