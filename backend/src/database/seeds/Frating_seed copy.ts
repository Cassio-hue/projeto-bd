import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM rating CASCADE;`);

  // Inserts seed entries
  await knex.raw(`
  -- Popula a tabela de avaliações com dados

  INSERT INTO rating (score, comment, student_id, class_id)
  VALUES
  (4, 'Ótimo professor, explica muito bem', 1, 1),
  (2, 'A matéria é interessante, contudo o professor não explica bem e é muito rígido.', 2, 1),
  (5, 'A matéria é uma bosta, não vale a pena', 2, 3),
  (3, 'O professor é muito bom, mas a matéria é muito difícil', 3, 2),
  (4, 'O professor é muito bom, mas a matéria é muito difícil', 3, 3);
  `);
}
