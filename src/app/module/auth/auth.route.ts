import { Router } from "express";
import { authController } from "./auth.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { CustomerRegisterZodSchema } from "./auth.validation";



const route = Router()

route.post('/register',
  zodValidation(CustomerRegisterZodSchema),
  authController.registerOTP  
)


route.post(
  '/email-verify',
  authController.verifyEmail
)

export const authRouter = route