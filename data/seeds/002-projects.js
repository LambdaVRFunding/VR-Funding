
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'VR Gun Game',
          description: 'Battle against your friends...',
          dreamer_id: 1,
          fund_target: 23000,
          fund_current: 10
        },
        {
          name: 'Dominate VR',
          description: 'Don\'t just win, dominate the competition',
          dreamer_id: 2,
          fund_target: 12000,
          fund_current: 3000
        }
      ]);
    });
};
