
export async function getUsers(){
    const response=await fetch('http://localhost:8080/api/v1/users')
    const data=await response.json();
    return data.data;
}
