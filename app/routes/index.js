const userRoutes = require('./user_routes');
const loginRoutes = require('./login_routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  loginRoutes(app, db);
};