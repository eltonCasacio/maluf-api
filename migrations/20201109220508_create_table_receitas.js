exports.up = function (knex) {
  return knex.schema.createTable("receitas", (table) => {
    table.increments("id").primary();
    table.string("nome").notNull();

    table.float("temperatura1");
    table.float("temperatura1Max");
    table.float("temperatura1Min");

    table.float("temperatura2");
    table.float("temperatura2Max");
    table.float("temperatura2Min");

    table.float("velocidade");
    table.float("velocidadeMax");
    table.float("velocidadeMin");

    table.float("carga");
    table.float("cargaMax");
    table.float("cargaMin");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("receitas");
};
