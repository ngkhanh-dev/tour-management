import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
import clientRoutes from "./routes/client/index.router";
import bodyParser from "body-parser";

sequelize;

const app: Express = express();
const port: string = `${process.env.PORT}`;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(bodyParser.json());

clientRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
