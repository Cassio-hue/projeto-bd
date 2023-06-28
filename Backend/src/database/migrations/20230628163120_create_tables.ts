import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE TABLE IF NOT EXISTS Student (
    id SERIAL PRIMARY KEY,
    studentID CHAR(9) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    UNIQUE (id),
    UNIQUE (email),
    UNIQUE (studentID)
  );

  CREATE TABLE IF NOT EXISTS Department (
    id SERIAL PRIMARY KEY,
    code INT NOT NULL,
    departamentName VARCHAR(200) NOT NULL,
    UNIQUE (id),
    UNIQUE (code)
  );
  
  CREATE TABLE IF NOT EXISTS Teacher (
    id SERIAL PRIMARY KEY,
    teacherID CHAR(9) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(45) NOT NULL,
    UNIQUE (id),
    UNIQUE (email),
    UNIQUE (teacherID),
    departament_id INT,
    CONSTRAINT departament
      FOREIGN KEY (departament_id)
      REFERENCES Department (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS Discipline (
    id SERIAL PRIMARY KEY,
    code VARCHAR(8) NOT NULL,
    disciplineName VARCHAR(45) NOT NULL,
    departament_id INT,
    CONSTRAINT departamentCode
      FOREIGN KEY (departament_id)
      REFERENCES Department (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS Rating (
    id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    student_id INT,
    CONSTRAINT student
      FOREIGN KEY (student_id)
      REFERENCES Student (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
  );
  
  CREATE TABLE IF NOT EXISTS Class (
    id SERIAL PRIMARY KEY,
    className VARCHAR(100),
    schedule VARCHAR(45) NOT NULL,
    period VARCHAR(45) NOT NULL,
    classCode VARCHAR(45) NOT NULL,
    local VARCHAR(45) NOT NULL,
    discipline_id INT,
    rating_id INT,
    teacher_id INT,
    CONSTRAINT discipline
      FOREIGN KEY (discipline_id)
      REFERENCES Discipline (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT rating
      FOREIGN KEY (rating_id)
      REFERENCES Rating (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT teacher
      FOREIGN KEY (teacher_id)
      REFERENCES Teacher (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
  DROP TABLE IF EXISTS Student CASCADE;
  DROP TABLE IF EXISTS Department CASCADE;
  DROP TABLE IF EXISTS Teacher CASCADE;
  DROP TABLE IF EXISTS Discipline CASCADE;
  DROP TABLE IF EXISTS Rating CASCADE;
  DROP TABLE IF EXISTS Class CASCADE;
  `);
}
