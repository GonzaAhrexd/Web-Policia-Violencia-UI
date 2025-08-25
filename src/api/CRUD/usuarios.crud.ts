import axios from '../axios'
//  USUARIOS
// GET: Buscar usuario
export const buscarUsuario = async (values: any) => {
    try {
        const response = await axios.get(`/usuarios/${values.nombre_de_usuario ? values.nombre_de_usuario : "no_ingresado"}/${values.nombre ? values.nombre : "no_ingresado"}/${values.apellido ? values.apellido : "no_ingresado"}/${values.rol ? values.rol : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// PUT: Modificar datos usuario
export const editUser = async (values: any) => {
    try {
        console.log(values)
        const response = await axios.put(`/usuarios/editar-usuario/${values._id}`, values)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
// PUT: Cambiar rol
export const cambiarRol = async (values: any) => {
    try {
        const response = await axios.put(`/usuarios/cambiar-rol/`, values)
        return response.data
    } catch (error) {
        console.log(error)  
    }
}
