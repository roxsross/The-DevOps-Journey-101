const User = require("./../models/user.model");

const repository = {

    createUser: async (user) => {
        let createdUser = new User(user);
        await createdUser.save();
        return createdUser;
    },

    getOneUserByEmail: async (email) => {
        let user = await User.findOne({ email });
        return user;
    }

}


module.exports = repository;