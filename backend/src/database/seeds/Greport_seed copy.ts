import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM report CASCADE;`);

  // Inserts seed entries
  await knex.raw(`
  -- Popula a tabela de denúncias

  INSERT INTO report (student_id, rating_id)
  VALUES
  (3, 3),
  (3, 1),
  (2, 4),
  (1, 3);
  `);
}
