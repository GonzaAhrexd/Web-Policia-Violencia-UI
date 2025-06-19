import axios from '../axios'

// Listar actividades recientes
export const listarActividadesRecientes = async (values: any) => {
    try {
        const response = await axios.get(`/actividad-reciente/buscar-actividad-reciente/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.seccion ? values.seccion : "no_ingresado"}/${values.usuario ? values.usuario : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Obtener actividad reciente por userId
export const obtenerMiActividad = async (id: string) => {
    try {
        const response = await axios.get(`/actividad-reciente/mi-actividad/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
