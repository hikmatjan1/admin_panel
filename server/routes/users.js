const mongoose = require('mongoose');
const { User } = require('../models/user');
const Auths = require("../middleware/auths");

const router = require('express').Router();

router.get("/get_all_users", Auths, async (req, res) => {
    try {
        const users = await User.find();
        let result = [];
        users.forEach(user => {
            const { password, isAdmin, updatedAt, __v, ...others } = user._doc;
            result.push(others);
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete("/:userId/:currentUserId", Auths, async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        const currentUser = await User.findOne({ _id: req.params.currentUserId });
        if (currentUser) {
            if (!currentUser.isBlock) {
                const user = await User.findByIdAndRemove({ _id: req.params.userId });
                res.status(200).json(user);
            } else {
                res.status(200).json(false);
            }
        } else {
            res.status(200).json("noData");
        }
    } else {
        res.status(500).json("Server error.");
    }
})

// update user
router.patch("/:userId/:currentUserId", async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.userId) && mongoose.Types.ObjectId.isValid(req.params.currentUserId)) {
        const currentUser = await User.findOne({ _id: req.params.currentUserId });
        if (!currentUser.isBlock) {
            await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: req.body });
            const user = await User.findOne({ _id: req.params.userId });
            const { password, isAdmin, __v, ...others } = user._doc;
            res.status(200).json(others);
        } else {
            res.status(200).json(false);
        }
    } else {
        res.status(500).json("Server error.");
    }
})

module.exports = router;