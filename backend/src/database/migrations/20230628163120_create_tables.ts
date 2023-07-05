import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY UNIQUE,
    student_id CHAR(9) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL
  );

  CREATE TABLE IF NOT EXISTS department (
    id SERIAL PRIMARY KEY UNIQUE,
    code INT NOT NULL UNIQUE,
    departament_name VARCHAR(100) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS teacher (
    id SERIAL PRIMARY KEY UNIQUE,
    teacher_id CHAR(9) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    departament_id INT,
    CONSTRAINT fk_departament_id
      FOREIGN KEY (departament_id)
      REFERENCES department (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS discipline (
    id SERIAL PRIMARY KEY UNIQUE,
    code VARCHAR(8) NOT NULL UNIQUE,
    discipline_name VARCHAR(45) NOT NULL,
    departament_id INT,
    CONSTRAINT fk_departament_id
      FOREIGN KEY (departament_id)
      REFERENCES department (id)
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
    reports INT,
    student_id INT,
    CONSTRAINT fk_student_id
      FOREIGN KEY (student_id)
      REFERENCES student (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS class (
    id SERIAL PRIMARY KEY UNIQUE,
    turma INT NOT NULL,
    period VARCHAR(45) NOT NULL,
    schedule VARCHAR(45) NOT NULL,
    local VARCHAR(45) NOT NULL,
    discipline_id INT,
    CONSTRAINT fk_discipline_id
      FOREIGN KEY (discipline_id)
      REFERENCES discipline (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    rating_id INT,
    CONSTRAINT fk_rating_id
      FOREIGN KEY (rating_id)
      REFERENCES rating (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    teacher_id INT,
    CONSTRAINT fk_teacher_id
      FOREIGN KEY (teacher_id)
      REFERENCES teacher (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
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
