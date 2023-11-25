

exports.validateLogin = ({phoneNumber, password}) => {
    
    if (!(phoneNumber && password)) {
        return ["Required all the inputs"]
    }

    if (!phoneNumber) {
        return ["Required Phone number"]
    }

    if(!password){
        return ["Required password"]
    }

}