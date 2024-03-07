import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import express from "express"
// const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;
const uri = "mongodb+srv://dripydacoder:NeigaHeiga@cluster0.kzpss9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// const uri = "mongodb+srv://jaydeep_khandla:jdmongo11@cluster0.vcbyovw.mongodb.net/Screen-diary?retryWrites=true&w=majority"



// console.log('bruh')
export async function connectToDatabase() {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.once("open", () => {
        console.log("Connected to MongoDb!");
        app.listen(PORT, () => {
            console.log("app is running on:", PORT);
        });
        // socketConnection(socket)
    });
}
connectToDatabase();
export default connectToDatabase;

// export async function connectToDatabase() {
//     const client = new MongoClient(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//         return client.db();
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//         throw new Error('Could not connect to MongoDB');
//     }
// }

// connectToDatabase();

// export default connectToDatabase;
