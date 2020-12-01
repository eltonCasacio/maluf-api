exports.up = (knex) =>
  knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("nome").unique().notNull();
    table.string("senha").notNull();
    table.boolean("receitas");
    table.boolean("manutencao");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("usuarios");
