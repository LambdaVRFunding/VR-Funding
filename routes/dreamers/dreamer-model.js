const db = require('../../data/dbConfig.js');

module.exports = {
    createProject,
    updateProject,
    deleteProject
}

function createProject(data) {
  return db('projects').insert(data);
}

function updateProject(proj_id, data) {
  return db('projects')
    .where('id', proj_id)
    .update(data);
}

function deleteProject(proj_id) {
  return db('projects')
    .where('id', proj_id)
    .del();
}