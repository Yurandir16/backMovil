// import path from 'path';
// import dotenv from 'dotenv';
// import {fileURLToPath} from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const data = dotenv.config({
//     path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
// })
import {dataEnv} from "./envData.js";

export const db = {
    user: dataEnv.parsed.USER,
    host: dataEnv.parsed.HOST,
    database: dataEnv.parsed.DATABASE,
    password: dataEnv.parsed.PASSWORD,
};

export const api = {
    port: dataEnv.parsed.PORT,
};
