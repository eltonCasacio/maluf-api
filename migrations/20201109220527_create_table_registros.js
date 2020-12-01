
exports.up = function (knex) {
    return knex.schema.createTable('registros', table => {
        table.increments('id').primary()
        table.float('temperatura1')
        table.float('temperatura2')
        table.float('velocidade')
        table.float('carga')
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('registros')
};
