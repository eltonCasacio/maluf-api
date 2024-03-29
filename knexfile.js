// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    database: "maluf",
    user: "postgres",
    password: "postgres",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: __dirname,
  },
};
