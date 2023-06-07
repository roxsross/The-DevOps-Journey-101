const express = require("express");
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const cors = require("cors");
const notFoundMiddleware = require("../middlewares/not-found.middleware");
const router = express.Router()
const apiRoutes = express.Router();
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH_DEV } = require('./../config');

apiRoutes
    .use(cors())
    .use(express.json());

apiRoutes.use("/tasks", taskRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use('/auth', authRoutes);

router.use("/v1/api", apiRoutes);

router.use("/v1/api/api-docs",swaggerUI.serve,swaggerUI.setup(SWAGGER_PATH_DEV));

router.use(notFoundMiddleware);

module.exports = router