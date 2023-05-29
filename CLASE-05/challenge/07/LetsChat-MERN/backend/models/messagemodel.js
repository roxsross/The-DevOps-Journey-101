const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        content: { type: String },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("messages", messageSchema);
module.exports = Message;