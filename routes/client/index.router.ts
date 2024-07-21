import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoryRoutes } from "./category.route";

const clientRoutes = (app: Express) => {
    app.use("/tours", tourRoutes);

    app.use("/categories", categoryRoutes);
};

export default clientRoutes;
