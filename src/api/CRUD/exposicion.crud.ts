import axios from '../axios'

// EXPOSICIÓN
// Crear exposición
export const crearExposicion = (denuncia: any) => {
    try {
        axios.post(`/exposicion/crear-exposicion/`, denuncia)
    } catch (error) {
        console.log(error)
    }
}

// Buscar exposición
export const buscarExposicion = async (values: any) => {
    try {
        const response = await axios.get(`/exposicion/buscar-exposicion/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_exposicion ? values.id_exposicion : "no_ingresado"}/${values.nombre_victima ? values.nombre_victima : "no_ingresado"}/${values.apellido_victima ? values.apellido_victima : "no_ingresado"}/${values.dni_victima ? values.dni_victima : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Eliminar exposición
export const eliminarExposicion = async (id: string) => {
    try {
        const response = await axios.delete(`/exposicion/eliminar-exposicion/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

// Editar exposición
export const editarExposicion = async (data: any) => {
    try {
        const response = await axios.put(`/exposicion/editar-exposicion/${data._id}`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}