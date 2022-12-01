const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mail = mongoose.model("Mail");
const User = mongoose.model("User");
const MailRoom = mongoose.model("MailRoom");
const login = require("../middleware/login");


router.post("/getmails", (req, res) => {
    const { mailRoomId, from, to } = req.body;
    Mail.find({ mailRoomId })
        .sort({ updatedAt: 1 })
        .then((mails) => {
            if (!mails) {
                return res.status(422).json({ error: "You don't have any mails" });
            }
            const separateMails = mails?.map((mail) => {
                return {
                    fromSelf: mail.users[0] === from,
                    mail: mail.mailInfo.text,
                    updatedAt: mail.updatedAt,
                };
            });
            res.json(separateMails);
        })
});

router.post("/addmails", (req, res) => {
    const { from, to, sender, mail, title, mailRoomId } = req.body;
    if (!mailRoomId) {
        const mailRoom = new MailRoom({
            members: [from, to],
            title,
        });
        mailRoom.save()
            .then((room) => {
                const msgData = new Mail({
                    mailInfo: {
                        title,
                        text: mail,
                    },
                    mailRoomId: room._id,
                    users: [from, to],
                    sender,
                })
                msgData.save()
                    .then(msgData => {
                        res.json({ msg: "ok" });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    } else {
        const msgData = new Mail({
            mailInfo: {
                title,
                text: mail,
            },
            mailRoomId,
            users: [from, to],
            sender,
        })
        msgData.save()
            .then(msgData => {
                MailRoom.findByIdAndUpdate(mongoose.Types.ObjectId(mailRoomId), { updatedAt: Date.now() }, (err, data) => {
                    if (err) console.log(err);
                    else console.log("Successfully updated the lastLogin", data);
                });
                res.json({ msg: "ok" });
            })
            .catch(err => {
                console.log(err);
            })
    }

});

// First method - it shows the users you've sent messages to, whether they exist in the database or not.
router.get('/contacts/:id', (req, res) => {
    const { username } = req.headers;
    MailRoom.find({ members: { $in: username } })
        .then((contacts) => {
            if (!contacts) {
                return res.status(422).json({ error: "You don't have any contacts" });
            }
            res.json(contacts);
        })
        .catch(err => {
            console.log(err);
        })
});

// // Second method - it shows only you mailed contacts with has database
// router.get('/contacts/:id', (req, res) => {
//     const { username } = req.headers;
//     Mail.find({ users: { $in: username } }).select(["users",])
//         .then((mails) => {
//             if (!mails) {
//                 return res.status(422).json({ error: "You don't have any contacts" });
//             }
//             // // // let usersArr = mails.map((arr) => arr.users[1]); // First try fail - other may not get contacts 
//             let mailedUsers = []; 
//             mails.map((arr) =>
//                 arr.users.map((val) => {
//                     console.log(val);
//                     if (val !== username) mailedUsers.push(val);
//                 }));
//             User.find({
//                 "username": { $in: mailedUsers }
//             }, function (err, users) {
//                 if (err) console.log(err);
//                 res.json(users);
//             })
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });

module.exports = router;