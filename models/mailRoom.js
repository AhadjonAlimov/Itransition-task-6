const { Schema, model } = require('mongoose');


const MailRoomSchema = new Schema(
    {
        members: Array,
        title: "string",
    },
    {
        timestamps: true,
    }
);

module.exports = model("MailRoom", MailRoomSchema);