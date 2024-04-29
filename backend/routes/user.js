const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../mongo/user"); // Import User model
const router = express.Router(); // Use express.Router()
const mongo = require("mongoose");

// Middleware to parse JSON bodies
router.use(express.json());

// User login request
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.json({ success: true, message: "Login Successful", user });
            } else {
                return res.status(401).json({ success: false, message: "Incorrect Password" });
            }
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// User register request
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashedPassword });
            await user.save();
            return res.json({ message: "User registered successfully" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Review submission request
router.post("/review", async (req, res) => {
    const { movie, user, movieAPI, text, rating, spoiler } = req.body;

    if (!user || !text || rating === undefined) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const Review = mongo.connection.collection("Review"); // Assuming MongoDB connection
        const review = { movie, user, movieAPI, text, rating, spoiler };
        await Review.insertOne(review);
        return res.json({ message: "Review saved successfully", review });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to save review" });
    }
});

// Get reviews request for a single movie
// router.get("/review", async (req, res) => {
//     const movieAPI = req.query.movie;
//     if (!movieAPI) {
//         return res.status(400).json({ message: "No reviewsavailable" });
//     }

//     try {
//         const Review = mongo.connection.collection("Review");
//         const reviews = await Review.find({ movieAPI }).toArray();
//         return res.json(reviews);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Failed to fetch reviews" });
//     }
// });

router.get("/review", async (req, res) => {
    try {
        const { movieAPI, username } = req.query;


        if (!movieAPI || !username) {
            return res.status(400).send("Movie API and username are required");
        }
        const Review = mongo.connection.collection("Review");

        // Define the filter based on provided parameters
        const filter = {};
        if (movieAPI) filter.movieAPI = movieAPI;
        // if (username) filter.user = username;

        const reviews = await Review.find(filter).toArray();
        return res.json(reviews);

    } catch (err) {
        console.error("Error fetching:", err);
        res.status(500).send("Internal Server Error");
    }
});

exports.router = router;
