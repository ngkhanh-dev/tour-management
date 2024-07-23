import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    const slugCategory = req.params.slugCategory;

    const tours = await sequelize.query(
        `
        SELECT tours.*, ROUND(price*(1 - discount/100)) AS price_special
        FROM tours
        JOIN  tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = "${slugCategory}"
            AND categories.deleted = false
            AND categories.status = "active"
            AND tours.deleted = false
            AND tours.status = "active";
        `,
        {
            type: QueryTypes.SELECT,
        }
    );

    tours.forEach((tour) => {
        if (tour["images"]) {
            const images = JSON.parse(tour["images"]);
            tour["image"] = images[0];
            tour["price_special"] = +tour["price_special"];
        }
    });

    res.render("client/pages/tours/index.pug", {
        pageTitle: "Danh sách tour",
        tours: tours,
    });
};

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
    const slugTour = req.params.slugTour;

    const tourDetail = await Tour.findOne({
        where: {
            deleted: false,
            status: "active",
            slug: slugTour,
        },
        raw: true,
    });

    if (tourDetail["images"]) {
        tourDetail["images"] = JSON.parse(tourDetail["images"]);
    }

    tourDetail["price_special"] =
        tourDetail["price"] * (1 - tourDetail["discount"] / 100);

    res.render("client/pages/tours/detail.pug", {
        pageTitle: "Danh sách tour",
        tourDetail: tourDetail,
    });
};
