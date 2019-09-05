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
    return db('projects as p')
        .join('transactions as t', 't.project_id', 'p.id')
        .join('users as u', 'p.dreamer_id', 'u.id')
        .select('p.id', 'p.name', 'p.description', 'u.name', 'p.fund_target', 'p.fund_current')
        .where({ investor_id });
};

function addFundsToProj(investor_id, proj_id, amount) {
    return db('transactions')
        .insert({ 
            investor_id: investor_id,
            project_id: proj_id,
            amount_funded: amount
        })
}

function updateProjectCurrentFunds(proj_id, amount) {
    return db('projects')
        .where({ proj_id })
        .update('fund_current', amount)
}