import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";

sequelize;

const app: Express = express();
const port: string = `${process.env.PORT}`;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/tours", (req: Request, res: Response) => {
    res.render("client/pages/tours/index.pug");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
