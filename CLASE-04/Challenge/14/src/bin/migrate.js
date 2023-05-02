// bin/migrate.js

var db = require('../database.js');
db.sequelize.sync();