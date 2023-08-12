import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from "./database/db.js";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = 27010;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/`, router); 

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);
