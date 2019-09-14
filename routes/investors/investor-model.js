const db = require('../../data/dbConfig');

module.exports = {
    getTransactions,
    getFundedProjects,
    addFundsToProj,
    updateProjectCurrentFunds
};

function getTransactions(investor_id) {
    return db('transactions')
        .where({ investor_id });
};

function getFundedProjects(investor_id) {
    return db('transactions as t')
        .join('projects as p', 't.project_id', 'p.id')
        .join('users as u', 'p.dreamer_id', 'u.id')
        .where({ investor_id })
        .distinct('p.project_name', 'p.description', 'u.name', 'p.fund_target', 'p.fund_current')
};

function addFundsToProj(investor_id, project_id, amount) {
    return db('transactions')
        .insert({ 
            investor_id: investor_id,
            project_id: project_id,
            amount_funded: amount
        })
}

function updateProjectCurrentFunds(id, amount) {
    return db('projects')
        .where({ id })
        .update('fund_current', amount)
}