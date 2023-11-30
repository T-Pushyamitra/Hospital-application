import instance from "../utils/axiosBase"

export async function login(credentials){
    const response = await instance.post('/auth/login', credentials)
    return response.data;
}

export async function register(user){
    const res = await instance.post('/auth/register', user);
    if (!res.ok){
        const error = await res.json();
        throw new Error(error.erro);
    }

    const data = await res.json();
    return data;
}

export async function getLoggedInUser(){
    const response = await instance.get('/users');
    return response.data;
}