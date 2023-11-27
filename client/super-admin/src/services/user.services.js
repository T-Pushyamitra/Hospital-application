export async function getUsers(){
    const response=await fetch('http://localhost:8080/api/v1/users')
    const data=await response.json();
    return data.data;
}

export async function login(credentials){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions);
    if (!res.ok){
        const errorRespopnse = await res.json();
        throw new Error(errorRespopnse.error);
      }
    const response = await res.json()
    return response;
}

export async function register(req){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/register', requestOptions);
    if (!res.ok){
        const errorRespopnse = await res.json();
        throw new Error(errorRespopnse.error);
      }
    const response = await res.json()
    return response;
}