const dispenserRoutes = require('./dispenser_routes');
const loginRoutes = require('./login_routes');
const userRoutes = require('./user_routes');

module.exports = (app, db) => {
  dispenserRoutes(app, db);
  loginRoutes(app, db);
  userRoutes(app, db);
};