export async function getUsers(){
    const response=await fetch('http://localhost:8080/api/v1/users', {mode: 'cors'})
    const data=await response.json();
    return data.data;
}

export async function login(_phoneNumber, _password){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({phoneNumber: _phoneNumber, password: _password })
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions);
    const response = await res.json()
    return response;
}