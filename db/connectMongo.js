const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/TestDB_Thiet", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Database successfully");
    } catch (error) {
        console.log("Connected to MongoDB Database Failure");
        console.log(error);
    }
}

module.exports = { connect };
