/**
 * Login authentication
 * 
 * @param {string} _phoneNumber 
 * @param {string} _password 
 * @returns user
 */
export async function login(_phoneNumber, _password){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ phoneNumber: _phoneNumber, password: _password })
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions);
    const response = await res.json()
    return response;
}

/**
 * 
 * Sign-up new user
 * 
 * @param {string} _firstName 
 * @param {string} _lastName 
 * @param {string} _email 
 * @param {string} _phoneNumber 
 * @param {string} _password 
 * @param {string} _sex 
 * @param {string} _dataOfBirth 
 * @param {string} _role 
 * @returns user
 */
export async function signup(_firstName, _lastName, _email, _phoneNumber, _password, _sex, _dataOfBirth, _role){
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ firstName:_firstName, lastName:_lastName, email:_email, phoneNumber:_phoneNumber, password:_password, sex:_sex, dataOfBirth:_dataOfBirth, role:_role })
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions);
    const response = await res.json()
    return response;
}

/**
 * 
 * Sign-up new user
 * 
 * @param {string} _firstName 
 * @param {string} _lastName 
 * @param {string} _email 
 * @param {string} _phoneNumber 
 * @param {string} _password 
 * @param {string} _sex 
 * @param {string} _dataOfBirth 
 * @param {string} _role 
 * @returns user
 */
export async function updateUser(_firstName, _lastName, _email, _phoneNumber, _password, _sex, _dataOfBirth, _role){
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ firstName:_firstName, lastName:_lastName, email:_email, phoneNumber:_phoneNumber, password:_password, sex:_sex, dataOfBirth:_dataOfBirth, role:_role })
    };
    const res = await fetch('http://localhost:8080/api/v1/auth/login', requestOptions);
    const response = await res.json()
    return response;
}



/**
 * Gets all the user
 * 
 * @returns list of users
 */
export async function getAllUsers(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    };
    
    const response=await fetch('http://localhost:8080/api/v1/users', requestOptions)
    const data= await response.json();
    return data.data;
}
