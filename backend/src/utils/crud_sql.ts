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

    const query = `INSERT INTO ${this.table_name} (${columns}) VALUES (${values});`;

    await this.knex.raw(query);
  }

  async update(id: number, data: { [key: string]: any }) {
    const columnValue = Object.entries(data)
      .map(
        ([chave, valor]) =>
          `${chave} = ${typeof valor === 'string' ? `'${valor}'` : valor}`,
      )
      .join(', ');

    const query = `UPDATE ${this.table_name} SET ${columnValue} WHERE id = ${id}`;

    await this.knex.raw(query);
  }

  async findOne(where: Record<any, any>) {
    const whereString = Object.entries(where)
      .filter(([, value]) => value !== undefined)
      .reduce(
        (acumulador, [key, value]) => `${key} = ${value}, ${acumulador}`,
        '',
      )
      .slice(0, -2);

    const query = `SELECT * FROM ${this.table_name} WHERE ${whereString}`;

    return await this.knex.raw(query).then((res) => res.rows);
  }

  async findAll(table_view_name?: string) {
    const query = `SELECT * FROM ${
      table_view_name ? table_view_name : this.table_name
    };`;

    return await this.knex.raw(query).then((res) => res.rows);
  }

  async delete(id) {
    const query = `DELETE FROM ${this.table_name} WHERE id = ${id}`;

    return await this.knex.raw(query);
  }
}
