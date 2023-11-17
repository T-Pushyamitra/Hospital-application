const { getUsers, getUserByPhoneNumber, createUser, updateUser } = require("../services/user.service")




// Get all the users
exports.getUsersList = async (req, res) => {
    try{
        const users = await getUsers();
        
        return res.json({message: `Found total ${users.lenght} user`, data: users, status: 200 });
    }
    catch{
        return res.status(500).json({message: "Failed to get all the users list"});
    }
}

// Get user by phone number
exports.getUserListByPhoneNumber = async (req, res) => {
    const users = await getUserByPhoneNumber(req.params.phoneNumber);
    return res.status(200).json({message: `Found total ${users.lenght} user`, data: users });
}

// Create a new user
exports.createNewUser = async(req, res) => {
    try{
        const user  = req.body;
        const newUser = await createUser(user);
        return res.status(200).json({ user: newUser });
    } catch (error){
        return res.status(500).json({error: error.message});
    }
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
