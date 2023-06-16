const mongoose = require('mongoose');
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
}

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});


module.exports = mongoose.model('user', UserSchema);