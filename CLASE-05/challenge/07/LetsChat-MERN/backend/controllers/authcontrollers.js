const USER = require('../models/usermodel')
const generatetoken = require('../Jwt');
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, avatar } = req.body;
    if (!email || !password || !name) {
        res.status(400).json({
            message: 'username, password and email is required.'
        });
    }

    const OldUser = await USER.findOne({ email: email })
    if (OldUser) {
        res.status(400).json({
            message: `user with email ${req.body.email} already exists.`
        });
    }

    const user = await USER.create({
        name,
        email,
        password,
        avatar
    });

    res.status(200).json({
        success: true,
        user,
        token: generatetoken(user._id)
    })
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await USER.findOne({ email: email })
    if (!user) {
        res.status(400).json({
            message: `user with email ${req.body.email} doesn't exists.`
        });
    }

    const ispasswordmatched = await user.ComparePassword(password);

    if (!ispasswordmatched) {
        res.status(400).json({
            message: 'Invalid Password! Try again later.'
        });
    }

    res.status(200).json({
        success: true,
        user,
        token: generatetoken(user._id)
    })
})

exports.getallusers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        } :
        {}
    const users = await USER.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json({
        users
    })
})