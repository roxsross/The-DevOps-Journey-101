const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.ComparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}

module.exports = mongoose.model('users', UserSchema);