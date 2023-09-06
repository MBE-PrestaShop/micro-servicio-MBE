import { Router } from 'express'

const router = Router();

import { shipping } from '../../controllers/shipping/shipping.controller'
import { orderStatus } from '../../controllers/shipping/orderStatus.controller'



router.post("/",shipping)
router.post("/orders",orderStatus)


export default router;