import { Router } from 'express'
import { authorizeMiddleware} from "../../middleware/authorize.middleware"
const router = Router();

import { shipping } from '../../controllers/shipping/shipping.controller'
import { orderStatus } from '../../controllers/shipping/orderStatus.controller'



router.post("/",[authorizeMiddleware],shipping)
router.post("/orders",[authorizeMiddleware],orderStatus)


export default router;