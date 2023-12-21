import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});

//-----------------------PLANTILLA DE METODOS PARA EL BACKEND-----------------------
// Registro de usuario
/*export const registro = async (formData) => {
    console.log([...formData.entries()]);
    const response = await instance.post('/registrar', formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}*/

// Registro de usuario
export const registro = async (data) => {
    console.log("desde Service: ", data);
    const response = await instance.post('/auth/sign/up', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("desde Service: ", response);
    return response;
}

// Inicio de sesión
export const login = async (data) => {
    const response = await instance.post('/auth/sign/in', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Obtener los libros
export const getBooks = async () => {
    const response = await instance.get('/book/getBooks');
    return response;
}

// Obtener todos los libros
export const getAllBooks = async () => {
    const response = await instance.get('/book/getAllBooks');
    return response;
}

// Obtener un libro
export const getBook = async (id) => {
    const response = await instance.get(`/book/${id}`);
    return response;
}

// Crear un libro
export const createBook = async (data) => {
    const response = await instance.post('/book/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Actualizar un libro
export const updateBook = async (id, data) => {
    const response = await instance.patch(`/book/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Eliminar un libro
export const deleteBook = async (id) => {
    const response = await instance.delete(`/book/delete/${id}`);
    return response;
}

// Obtener los usuarios
export const getUsers = async () => {
    const response = await instance.get('/user/users');
    return response;
}

// Obtener un usuario
export const getUser = async (id) => {
    const response = await instance.get(`/user/${id}`);
    return response;
}

// Eliminar un usuario
export const deleteUser = async (id) => {
    const response = await instance.delete(`/user/delete/${id}`);
    return response;
}

// Editar un usuario
export const updateUser = async (id, data) => {
    const response = await instance.patch(`/user/update/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Obtener los libros de un usuario
export const getBooksByUser = async (id) => {
    const response = await instance.get(`/user/Books/${id}`);
    return response;
}

// Obtener Comentarios 
export const getComments = async (id) => {
    const response = await instance.get(`/comment/${id}`);
    return response;
}

// Crear un comentario
export const createComment = async (data) => {
    const response = await instance.post('/comment/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Eliminar un comentario
export const deleteComment = async (id) => {
    const response = await instance.delete(`/comment/delete/${id}`);
    return response;
}

// Comprar un libro
export const buyBook = async (data) => {
    const response = await instance.post(`/book/buyBook`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Alquilar un libro
export const rentBook = async (data) => {
    const response = await instance.post(`/book/rentBook`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Devolver un libro
export const returnBook = async (data) => {
    const response = await instance.post(`/book/returnBook`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

//Agregar al historial
export const addHistory = async (data) => {
    const response = await instance.post('/history/set', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

// Obtener el historial de un usuario
export const getHistory = async (id) => {
    const response = await instance.get(`/history/${id}`);
    return response;
}
