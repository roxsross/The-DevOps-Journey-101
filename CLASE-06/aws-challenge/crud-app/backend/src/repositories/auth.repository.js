const User = require("./../models/user.model");

const repository = {

    getOneUserByEmail: async (email) => {
        let user = await User.findOne({ email });
        return user;
    }

}


module.exports = repository;