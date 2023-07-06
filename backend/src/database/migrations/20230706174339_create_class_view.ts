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
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
  DROP VIEW IF EXISTS vw_class_details CASCADE;
  `);
}
