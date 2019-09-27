const routes = require('express').Router();
const apiRoutes = require('./apiroutes');
const htmlRoutes = require('./htmlroutes');

routes.use('/api', apiRoutes);
routes.use('/', htmlRoutes);

module.exports = routes;