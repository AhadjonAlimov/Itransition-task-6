const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const login = require("../middleware/login");


router.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        res.status(422).json({ error: "Please add username" });
    }
    User.findOne({ username })
        .then(savedUser => {
            if (!savedUser) {
                const user = new User({
                    username,
                    regTime: Date.now(),
                });
                user.save()
                    .then(user => {
                        const { _id, username } = user;
                        res.json({ status: "signup", user: { _id, username } });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                const { _id, username } = savedUser;
                res.json({ status: "login", user: { _id, username } });
            }
        })
});

module.exports = router;