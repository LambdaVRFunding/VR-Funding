
exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users.string('name', 128)
                .notNullable();
            users.string('password', 128)
                .notNullable();
            users.string('email', 128)
                .unique()
                .notNullable();
            users.string('location', 128);
            users.integer('type_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('user-types');
        })
        .createTable('projects', proj => {
          proj.increments('id');
          proj.string('name', 128)
            .unique()
            .notNullable();
          proj.text('description');
          proj.integer('dreamer_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
          proj.float('fund_target')
            .unsigned()
            .notNullable();
          proj.float('fund_current')
            .unsigned()
            .notNullable();
        })
        .createTable('user-types', types => {
            types.increments();
            types.string('type', 128)
                .notNullable()
                .unique();
        })
        .createTable('transactions', tran => {
            tran.increments();
            tran.integer('investor_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users');
            tran.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects');
            tran.float('amount_funded')
                .unsigned()
                .notNullable();
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('transactions')
    .dropTableIfExists('projects')
    .dropTableIfExists('users')
    .dropTableIfExists('user-types')
};
