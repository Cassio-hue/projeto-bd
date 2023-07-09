import { Knex } from 'knex';
import * as fs from 'fs';

const image = fs.readFileSync(
  __dirname + '/images/profilePicture.png',
  'base64',
);

const buffer = Buffer.from(image, 'base64');
const profilePicture = buffer.toString('hex');

export async function seed(knex: Knex): Promise<void> {
  //   Deletes ALL existing entries
  await knex.raw(`DELETE FROM student CASCADE;`);

  // Inserts seed entries
  await knex.raw(`
  -- Popula a tabela de turmas com dados relativos a Universidade de Brasília

  INSERT INTO student (student_id, name, email, password, is_admin, picture)
  VALUES
  ('824584468', 'José Coelho Carvalho', 'joaobunny@gmail.com', '123', false, decode('${profilePicture}', 'hex')),
  ('519692670', 'Leonardo Kimura Marques', 'leokim@hotmail.com', '123', false, decode('${profilePicture}', 'hex')),
  ('714418882', 'Admin', 'admin@gmail.com', '123', true, decode('${profilePicture}', 'hex'));
  `);
}
