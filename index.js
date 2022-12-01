const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();


require("./models/user");
require("./models/mails");
require("./models/mailRoom");
app.use(express.json());
app.use(cors());
app.use(require('./routes/user'));
app.use(require('./routes/mails'));

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});