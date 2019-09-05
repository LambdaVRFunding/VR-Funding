
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user-types').del()
    .then(function () {
      // Inserts seed entries
      return knex('user-types').insert([
        {type: 'dreamer'},
        {type: 'investor'}
      ]);
    });
};
