import express, { Request, Response, Router } from "express";
import Tour from "../../models/tour.model";
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    // SELECT * FROM tours WHERE deleted = false AND status = "active";
    const tours = await Tour.findAll({
        where: {
            deleted: false,
            status: "active",
        },
        raw: true,
    });

    res.render("client/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours,
    });
});

export const tourRoutes: Router = router;
