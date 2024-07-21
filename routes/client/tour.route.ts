import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/tour.controller";

router.get("/:slugCategory", controller.index);

export const tourRoutes: Router = router;
