import express from "express"
import { debugController } from "./debug.controller"

const router = express.Router()

router.get('/workorder/status', debugController.checkWorkOrderSttatusIndex)



export const debugRouter = router