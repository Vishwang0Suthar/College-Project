const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect("mongodb+srv://dripydacoder:NeigaHeiga@cluster0.kzpss9d.mongodb.net/screen-diary?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        minlength: 8, // Changed to minlength instead of minLength
        required: [true, "User password required"],
    },
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Define the Review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    spoiler: {
        type: Boolean,
        default: false
    }
});

// Create the Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = { User, Review }; // Export both models
