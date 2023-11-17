const { getUsers, getUserByPhoneNumber, createUser, updateUser } = require("../services/user.service")

// Get all the users
exports.getUsersList = async (req, res) => {
    try{
        const users = await getUsers();

        let totalUsers=users?.length || 0;
        return res.json({message: `Found total ${totalUsers} users`, data: users, status: 200 });
    }
    catch{
        return res.status(500).json({message: "Failed to get all the users list"});
    }
}

// Get user by phone number
exports.getUserListByPhoneNumber = async (req, res) => {
    const users = await getUserByPhoneNumber(req.params.phoneNumber);
    return res.status(200).json({message: `Found total ${users?.length || 0} users`, data: users });
}


exports.updateUser = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await updateUser(id, req.body);
        return res.status(200).json({ user: user});
    }
    catch (error){
        return res.status(500).json({error: error.message});
    }
}
