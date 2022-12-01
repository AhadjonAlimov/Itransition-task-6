const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const { username } = req.headers;
    if (!username) {
        res.status(401).json({ error: "You must be logged in" });
    }
    User.find({username})
        .then(userData => {
            if (!userData) {
                res.status(401).json({ error: "You must be logged in" });
            }
            req.user = userData;
            next();
        })
        .catch(err => {
            res.status(401).json({ error: err.message });
        })
}