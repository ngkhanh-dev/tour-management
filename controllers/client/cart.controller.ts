import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import { info } from "console";

// [GET] /cart/
export const index = async (req: Request, res: Response) => {
    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
    });
};

// [POST] /cart/list-json
export const listJson = async (req: Request, res: Response) => {
    const tours = req.body;

    const cartDetail = [];
    let total = 0;

    for (const tour of tours) {
        const infoTour = await Tour.findOne({
            where: {
                id: tour.tourId,
                deleted: false,
                status: "active",
            },
            raw: true,
        });

        if (infoTour["images"]) {
            infoTour["images"] = JSON.parse(infoTour["images"]);
            infoTour["image"] = infoTour["images"][0];
        }

        infoTour["price_special"] =
            infoTour["price"] * (1 - infoTour["discount"] / 100);
        infoTour["total"] = infoTour["price_special"] * tour.quantity;
        total += infoTour["total"];

        cartDetail.push({
            id: tour.tourId,
            quantity: tour.quantity,
            infoTour: infoTour,
        });
    }

    res.json({
        code: 200,
        message: "Thành công",
        cart: cartDetail,
        total: total,
    });
};
