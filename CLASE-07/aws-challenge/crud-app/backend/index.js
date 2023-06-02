const initializeServer = require('./src/services/server.service');
const initializeDatabase = require('./src/services/database.service');

const start = async () => {
    try {
        await initializeServer();
        await initializeDatabase();
    } catch (error) {
        console.log(`Something is wrong ${error}`);
    }
};

start();
