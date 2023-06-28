import { Knex } from 'nestjs-knex';

export class CRUD {
  constructor(private readonly knex: Knex) {}

  async create(table_name, data: { [key: string]: any }) {
    const columns = Object.keys(data)
      .map((value) => value)
      .join(',');
    const values = Object.values(data)
      .map((value) => `'${value}'`)
      .join(',');

    await this.knex.raw(
      `
      INSERT INTO ${table_name} (${columns})
      VALUES (${values});
      `,
    );
  }
}
