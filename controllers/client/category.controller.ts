import { Request, Response } from "express";

// [GET] /categories
export const index = async (req: Request, res: Response) => {
    res.render("client/pages/categories/index.pug", {
        pageTitle: "Danh mục tour",
    });
};
