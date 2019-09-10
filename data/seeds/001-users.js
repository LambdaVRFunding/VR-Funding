
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'John Doe',
          password: '$2a$10$wIzKGBzxZdLla5hm4/9PLOo/SBKyz/r/8XLAWLhQjwcGoCtTF21eu',
          email: 'test@test.com',
          location: 'Testing Facility',
          "type_id": 1
        },
        {
          name: 'Fon Doo',
          password: '$2a$10$wIzKGBzxZdLla5hm4/9PLOo/SBKyz/r/8XLAWLhQjwcGoCtTF21eu',
          email: 'fondont@food.com',
          location: 'Testing Facility',
          "type_id": 2
        }
      ]);
    });
}
