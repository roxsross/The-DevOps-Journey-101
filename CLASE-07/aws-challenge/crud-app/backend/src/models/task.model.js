const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('task', UserSchema);