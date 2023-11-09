require('dotenv').config();
export const database = process.env.database;
export const password = process.env.password;
export const username = 'root'; //no lee la env variable :/
export const port = Number(process.env.port);
export const host = process.env.host;