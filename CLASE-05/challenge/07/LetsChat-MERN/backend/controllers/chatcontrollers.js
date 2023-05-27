const asynchandler = require('express-async-handler');
const CHAT = require('../models/chatmodel');
const USER = require('../models/usermodel');

exports.accesschat = asynchandler(async (req, res) => {
    const { user_id } = req.body;

    let ischat = await CHAT.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: user_id } } }
        ]
    }).populate("users", "-password").populate("latestmessage");

    ischat = await USER.populate(ischat, {
        path: "latestmessage.sender",
        select: "name avatar email",
    });

    if (ischat.length > 0) {
        res.send(ischat[0]);
    } else {

        const chatdata = {
            ChatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, user_id]
        };

        try {
            const createdchat = await CHAT.create(chatdata);
            const fullchat = await CHAT.findOne({ _id: createdchat._id }).populate("users", "-password")
            res.status(200).json(fullchat);

        } catch (error) {
            res.status(400).json({ error })
        }
    }
})


exports.fetchchats = asynchandler(async (req, res) => {
    try {

        // await CHAT.find({ users: { $elemMatch: { $eq: req.user._id } } })
        //     .populate('users', '-password')
        //     .populate('groupAdmin', '-password')
        //     .populate('latestmessage')
        //     .sort({ updatedAt: -1 })
        //     .then(async (results) => {
        //         results = await USER.populate(results, {
        //             path: "latestmessage.sender",
        //             select: "name avatar email",
        //         })
        //         res.status(200).send(results);
        //     })
        let results = await CHAT.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestmessage')
            .sort({ updatedAt: -1 })

        results = await USER.populate(results, {
            path: "latestmessage.sender",
            select: "name avatar email"
        })
        res.status(200).send(results);

    } catch (err) {
        res.status(400).json({ err })
    }
})


exports.creategroupchat = asynchandler(async (req, res) => {
    if (!req.body.users && !req.body.groupname) {
        res.status(400).json({ message: "Invalid data! unable to create group" })
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).json({ message: "More than 2 users are required to form a group chat" });
    }

    users.push(req.user)

    try {
        const groupchat = await CHAT.create({
            ChatName: req.body.groupname,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        })

        const fullgroupchat = await CHAT.find({ _id: groupchat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        res.status(200).json(fullgroupchat);

    } catch (err) {
        res.status(400).json({ err })
    }
})

exports.renamegroupchat = asynchandler(async (req, res) => {
    const { chatid, UpdatedChatname } = req.body;
    const updatechat = await CHAT.findByIdAndUpdate(
        chatid,
        {
            ChatName: UpdatedChatname
        },
        {
            new: true
        }
    ).populate('users', '-password')
        .populate('groupAdmin', '-password');
    if (!updatechat) {
        res.status(400).json({ message: 'Unable to rename group.' })
    } else {
        res.status(200).send(updatechat)
    }
})

exports.addtogroup = asynchandler(async (req, res) => {
    const { chatid, userid } = req.body;
    const isadmin = await CHAT.find({ _id: chatid, groupAdmin: req.user });

    if (isadmin) {

        const added = await CHAT.findByIdAndUpdate(
            chatid,
            {
                $push: { users: userid },
            },
            {
                new: true
            }
        ).populate('users', '-password')
            .populate('groupAdmin', '-password');

        if (added) {
            res.status(200).json(added)
        } else {
            res.status(400).json({ message: "Chat not found" })
        }

    } else {
        res.status(400).json({ message: "Only Admin can Add People to group." })
    }

})

exports.removefromgroup = asynchandler(async (req, res) => {
    const { chatid, userid } = req.body;
    const isadmin = await CHAT.find({ _id: chatid, groupAdmin: req.user });

    if (isadmin) {

        const removed = await CHAT.findByIdAndUpdate(
            chatid,
            {
                $pull: { users: userid },
            },
            {
                new: true
            }
        ).populate('users', '-password')
            .populate('groupAdmin', '-password');

        if (removed) {
            res.status(200).json(removed)
        } else {
            res.status(400).json({ message: "Chat not found" })
        }

    } else {
        res.status(400).json({ message: "Only Admin can Add People to group." })
    }

})

exports.exitgroup = asynchandler(async (req, res) => {
    const { chatid, userid } = req.body;
    const removed = await CHAT.findByIdAndUpdate(
        chatid,
        {
            $pull: { users: userid },
        },
        {
            new: true
        }
    ).populate('users', '-password')
        .populate('groupAdmin', '-password');

    if (removed) {
        res.status(200).json({ message: "Group Chat left successfully." })
    } else {
        res.status(400).json({ message: "Chat not found" })
    }
})