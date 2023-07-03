import { Knex } from 'nestjs-knex';

export class CRUD {
  table_name: string;
  constructor(private readonly knex: Knex, table_name: string) {
    this.table_name = table_name;
  }

  async create(data: { [key: string]: any }) {
    const columns = Object.keys(data)
      .map((value) => value)
      .join(',');
    const values = Object.values(data)
      .map((value) => `'${value}'`)
      .join(',');

    await this.knex.raw(
      `
      INSERT INTO ${this.table_name} (${columns})
      VALUES (${values});
      `,
    );
  }

  async findOne(where: Record<any, any>) {
    const whereString = Object.entries(where)
      .filter(([, value]) => value !== undefined)
      .reduce(
        (acumulador, [key, value]) => `${key} = ${value}, ${acumulador}`,
        '',
      )
      .slice(0, -2);

    return await this.knex
      .raw(
        `
    SELECT * FROM ${this.table_name} WHERE ${whereString}
    `,
      )
      .then((res) => res.rows);
  }

  async findAll(table_name: string) {
    return await this.knex
      .raw(
        `
      SELECT * FROM ${table_name};
      `,
      )
      .then((res) => res.rows);
  }
}
