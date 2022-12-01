const {Schema, model} = require('mongoose');


const mailSchema = new Schema(
    {
        mailInfo: {
            title: {
                type: 'string',
                required: true
            },
            text: {
                type: 'string',
                required: true
            },
        },
        mailRoomId: {
            type: 'string',
            required: true,
        },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Mail", mailSchema);