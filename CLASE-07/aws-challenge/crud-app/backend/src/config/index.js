if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    SWAGGER_PATH_DEV: require(`./../../docs/swagger/swaggerDEV`)
}