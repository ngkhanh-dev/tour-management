import { Request, Response } from "express";

// [POST] /order/
export const order = (req: Request, res: Response) => {
    const data = req.body;

    console.log(data);

    res.json({
        code: 200,
        message: "Đặt hàng thành công!",
    });
};
