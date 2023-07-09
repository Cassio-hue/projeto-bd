import { Knex } from 'knex';
import * as fs from 'fs';

const image1 = fs.readFileSync(
  __dirname + '/images/profilePicture1.jpg',
  'base64',
);
const image2 = fs.readFileSync(
  __dirname + '/images/profilePicture2.jpg',
  'base64',
);
const image3 = fs.readFileSync(
  __dirname + '/images/profilePicture3.jpg',
  'base64',
);

let buffer = Buffer.from(image1, 'base64');
const profilePicture1 = buffer.toString('hex');
buffer = Buffer.from(image2, 'base64');
const profilePicture2 = buffer.toString('hex');
buffer = Buffer.from(image3, 'base64');
const profilePicture3 = buffer.toString('hex');

export async function seed(knex: Knex): Promise<void> {
  //   Deletes ALL existing entries
  await knex.raw(`DELETE FROM student CASCADE;`);

  // Inserts seed entries
  await knex.raw(`
  -- Popula a tabela de turmas com dados relativos a Universidade de Brasília

  INSERT INTO student (student_id, name, email, password, is_admin, picture)
  VALUES
  ('824584468', 'José Coelho Carvalho', 'joaobunny@gmail.com', '123', false, decode('${profilePicture1}', 'hex')),
  ('519692670', 'Leonardo Kimura Marques', 'leokim@hotmail.com', '123', false, decode('${profilePicture2}', 'hex')),
  ('714418882', 'Admin', 'admin@gmail.com', '123', true, decode('${profilePicture3}', 'hex'));
  `);
}
