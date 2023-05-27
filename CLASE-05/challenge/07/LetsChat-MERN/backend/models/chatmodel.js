const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        ChatName: { type: String },
        isGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        latestmessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'messages'
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('chats', ChatSchema)