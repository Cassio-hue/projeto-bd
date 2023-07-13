import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE OR REPLACE PROCEDURE create_rating(
    p_student_id INT,
    p_class_id INT,
    p_score INT,
    p_comment VARCHAR(250)
  )
  LANGUAGE plpgsql
  AS $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM rating
      WHERE student_id = p_student_id
        AND class_id = p_class_id
    ) THEN
      RAISE EXCEPTION 'O estudante já possui um rating para essa turma';
    ELSE
      INSERT INTO rating (student_id, class_id, score, comment)
      VALUES (p_student_id, p_class_id, p_score, p_comment);
    END IF;
  END;
  $$;
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(
    'DROP FUNCTION IF EXISTS create_rating(INT, INT, INT, VARCHAR(250));',
  );
}
