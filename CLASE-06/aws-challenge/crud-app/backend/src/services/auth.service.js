const authRepository = require('../repositories/auth.repository');
const bcryptjs = require('bcryptjs');

const service = {

    getOneUserByEmail: async ({ email, password }) => {

        let user = await authRepository.getOneUserByEmail(email);
        if(user == null) throw new Error('User does not exist.');

        const passConfirm = await bcryptjs.compare(password, user.password);

        if (!passConfirm)  throw new Error("Wrong password.");

        delete user.password;

        return user;
    }

}




module.exports = service;