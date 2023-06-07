const { PORT, APPLICATION_NAME } = require("./../config");
const router = require('./../routes');
const express = require('express');
const app = express();

const initializeServer = async () => {
    app.use(express.urlencoded({ extended: true }))
    app.use(router);
    app.listen(PORT, () => {
        console.log(`${APPLICATION_NAME} is running in ${PORT}`);
    });
}

module.exports = initializeServer; 