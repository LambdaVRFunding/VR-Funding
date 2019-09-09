
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'John Doe',
          password: 'test',
          email: 'test@test.com',
          location: 'Testing Facility',
          "type_id": 1
        },
        {
          name: 'Fon Doo',
          password: 'test',
          email: 'fondont@food.com',
          location: 'Testing Facility',
          "type_id": 2
        }
      ]);
    });
}
