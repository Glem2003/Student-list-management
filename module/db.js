const knexConfig = require('../knexfile.js');
const db = require('knex')(knexConfig.development);

module.exports = db