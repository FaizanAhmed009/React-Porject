const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;


const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connection Sucessful");
    } catch(error) {
        console.error("Database Connection failed");
        process.exit(0);
    }

};

module.exports = connectDb;
