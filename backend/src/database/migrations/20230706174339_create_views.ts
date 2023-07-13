import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE VIEW vw_class_details AS 
  SELECT 
    C.id as id,
    C.turma as turma,
    C.period as period,
    C.schedule as schedule,
    C.local as local,
    D.discipline_name as discipline_name,
    T.name as teacher_name 
  FROM 
    class C 
  LEFT JOIN 
    discipline D ON D.id = C.discipline_id 
  LEFT JOIN 
    teacher T ON T.id = C.teacher_id;

  CREATE VIEW vw_rating_details AS
  SELECT 
    R.id as id, 
    R.score as score,
    R.comment as comment, 
    S.name as student_name,
    R.class_id as class_id,
    D.discipline_name as discipline_name 
  FROM 
    rating R
  LEFT JOIN 
    student S ON R.student_id = S.id
  LEFT JOIN class C ON R.class_id = C.id
  LEFT JOIN discipline D ON C.discipline_id = D.id;
    
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
  DROP VIEW IF EXISTS vw_class_details CASCADE;
  `);
}
