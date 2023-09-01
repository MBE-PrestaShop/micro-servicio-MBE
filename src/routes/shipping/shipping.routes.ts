import { Router } from 'express'

const router = Router();

import { shipping } from '../../controllers/shipping/shipping.controller'



router.post("/",shipping)


export default router;