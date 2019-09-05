const db = require('../../data/dbConfig.js');

module.exports = {
    addUser,
    findUser,
    getProjects,
    getProjById
}

function addUser(user) {
  return db('users').insert(user);
}

function findUser(filter) {
  return db('users').where(filter);
}

function getProjects() {
  return db('projects');
}

function getProjById(user_id) {
  return db('projects').where('dreamer_id', user_id);
}
