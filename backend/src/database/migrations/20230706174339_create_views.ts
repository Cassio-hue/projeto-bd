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

  CREATE VIEW vw_ratings_with_report AS
  SELECT
    R.id AS rating_id,
    COUNT(DISTINCT RP.id) AS report_count,
    MAX(RP.id) AS report_id,
    T.name AS teacher_name,
    S.name AS student_name,
    R.score,
    R.comment
  FROM
    rating R
  LEFT JOIN
    report RP ON RP.rating_id = R.id
  LEFT JOIN
    student S ON S.id = R.student_id
  LEFT JOIN
    class C ON C.id = R.class_id
  LEFT JOIN
    teacher T ON T.id = C.teacher_id
  GROUP BY
    R.id,
    T.name,
    S.name,
    R.score,
    R.comment;
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
  DROP VIEW IF EXISTS vw_class_details CASCADE;
  `);
}
