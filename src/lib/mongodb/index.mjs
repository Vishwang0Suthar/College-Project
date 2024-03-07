import { MongoClient } from 'mongodb';

// const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/your_database_name'; // Change this to your MongoDB URI

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db(); // Database Name is already included in the connection URI

    // Now you can use 'db' to interact with your MongoDB database

    // For example, you can insert a document into a collection
    const collection = db.collection('your_collection_name'); // Change this to your collection name
    collection.insertOne({ key: 'value' }, (err, result) => {
        if (err) {
            console.error('Error inserting document:', err);
            return;
        }
        console.log('Document inserted successfully:', result.insertedId);
    });

    // Close the connection
    // client.close();
});
