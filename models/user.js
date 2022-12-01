const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    regTime: {
        type: Date,
        required: true
    },
});

module.exports = model("User", userSchema);