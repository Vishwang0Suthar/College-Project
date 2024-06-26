const mongoose = require("mongoose");
const cors = require('cors')
mongoose.connect("mongodb+srv://dripydacoder:NeigaHeiga@cluster0.kzpss9d.mongodb.net/screen-diary?retryWrites=true&w=majority", {
    //mongodb+srv://omtrivedioo3:Coca7D6qaAtcbfuA@cluster0.3o9au8z.mongodb.net/NewsAppDatabase?retryWrites=true&w=majority    
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// console.log(process.env.DATABASE_PASS);

var db = mongoose.connection;
try {
    db.on("error", console.error.bind(console, "Connecton error"));
    db.once("open", function () {
        console.log("mongoDB connected");
    });
} catch (err) {
    console.log(err);
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        minLength: 8,
        required: [true, "User password required"],
    },
});
exports.User = new mongoose.model("User", userSchema);