// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'mydb',
      user: 'seu_usuario',
      password: 'sua_senha',
    },
    migrations: {
      directory: '/src/database/migrations',
    },
    seeds: {
      directory: 'src/database/seeds',
    },
  },
};
