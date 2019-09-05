
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {
          investor_id: 2,
          project_id: 1,
          amount_funded: 10
        },
        {
          investor_id: 2,
          project_id: 2,
          amount_funded: 3000
        }
      ]);
    });
};
