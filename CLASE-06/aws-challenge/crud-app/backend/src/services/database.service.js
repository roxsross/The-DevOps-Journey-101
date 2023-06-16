const mongoose = require('mongoose');
const { MONGO_URI } = require("./../config");


const initializeDatabase = async () => {
    const options = {
        "auth": { "authSource": "admin" },
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    };
    try {
        // await mongoose.connect(MONGO_URI, options);
        console.log("Database Mongo Connect");
    } catch (err) {
        console.log(err);
    }

}



module.exports = initializeDatabase; 