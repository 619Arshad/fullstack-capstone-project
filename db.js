const { MongoClient } = require('mongodb');

// Yahan apna Atlas wala connection string daal dein (password ke sath)
const url = "mongodb+srv://Muhammad:AapkaAsliPassword@cluster0.4py0c17.mongodb.net/";

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

connectDB();

module.exports = client;
