import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY UNIQUE,
    student_id CHAR(9) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    picture BYTEA NOT NULL
  );

  CREATE TABLE IF NOT EXISTS department (
    id INT PRIMARY KEY UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS teacher (
    id SERIAL PRIMARY KEY UNIQUE,
    name VARCHAR(100) NOT NULL,
    department_code INT,
    CONSTRAINT fk_department_code
      FOREIGN KEY (department_code)
      REFERENCES department (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS discipline (
    id VARCHAR(8) NOT NULL UNIQUE PRIMARY KEY,
    discipline_name VARCHAR(100) NOT NULL,
    department_code INT NOT NULL,
    CONSTRAINT fk_department_code
      FOREIGN KEY (department_code)
      REFERENCES department (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );  
  
  
  CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY UNIQUE,
    turma INT NOT NULL,
    period VARCHAR(45) NOT NULL,
    schedule VARCHAR(45) NOT NULL,
    local VARCHAR(45) NOT NULL,
    discipline_id VARCHAR(8) NOT NULL,
    CONSTRAINT fk_discipline_id
    FOREIGN KEY (discipline_id)
      REFERENCES discipline (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    teacher_id INT,
    CONSTRAINT fk_teacher_id
    FOREIGN KEY (teacher_id)
      REFERENCES teacher (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );

  CREATE TABLE IF NOT EXISTS rating (
    id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    comment VARCHAR(250),
    student_id INT NOT NULL,
    CONSTRAINT fk_student_id
      FOREIGN KEY (student_id)
      REFERENCES student (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    class_id INT NOT NULL,
    CONSTRAINT fk_class_id
      FOREIGN KEY (class_id)
      REFERENCES class (id),
    CONSTRAINT unique_rating_student_class
      UNIQUE (student_id, class_id)
  );
  
  CREATE TABLE IF NOT EXISTS report (
    id SERIAL PRIMARY KEY UNIQUE,
    student_id INT NOT NULL,
    CONSTRAINT fk_student_id
      FOREIGN KEY (student_id)
      REFERENCES student (id)
      ON DELETE CASCADE,
    rating_id INT NOT NULL,
    CONSTRAINT fk_rating_id
      FOREIGN KEY (rating_id)
      REFERENCES rating (id)
      ON DELETE CASCADE,
    CONSTRAINT unique_report_student_rating
    UNIQUE (student_id, rating_id)
  );
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
  DROP TABLE IF EXISTS student CASCADE;
  DROP TABLE IF EXISTS department CASCADE;
  DROP TABLE IF EXISTS teacher CASCADE;
  DROP TABLE IF EXISTS discipline CASCADE;
  DROP TABLE IF EXISTS rating CASCADE;
  DROP TABLE IF EXISTS class CASCADE;
  `);
}
