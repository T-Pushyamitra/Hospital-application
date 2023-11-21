/**
 * Returns all the roles
 * 
 * @returns List of roles
 */
export async function getAllRoles(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    };
    
    const response=await fetch('http://localhost:8080/api/v1/roles/', requestOptions)
    const data= await response.json();
    return data.data;
}

/**
 * Add permissions to the selected role.
 * 
 * @param {string} roleId 
 * @param {string} permissionId 
 * @returns 
 */
export async function addPermissionsToRole(roleId, permissionId){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({_roleId: roleId, _permissionId: permissionId}) 
    };
    const response=await fetch('http://localhost:8080/api/v1/roles/role_permission', requestOptions)
    const data= await response.json();
    return data.data;
}
