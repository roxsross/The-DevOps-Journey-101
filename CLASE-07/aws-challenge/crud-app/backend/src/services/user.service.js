const userRepository = require('../repositories/user.repository');

const service = {

    createUser: async (user) => {
        await userExistByEmail(user.email);
        const userCreated = await userRepository.createUser(user);
        delete userCreated.password;
        return userCreated;
    },

    getOneUserByEmail: async (email) => {
        let user = await userRepository.getOneUserByEmail(email);
        delete user.password;
        return user;
    }

}

const userExistByEmail = async (email) => {
    let user = await service.getOneUserByEmail(email);
    if (user) throw new Error('Email is already in use.');
}



module.exports = service;