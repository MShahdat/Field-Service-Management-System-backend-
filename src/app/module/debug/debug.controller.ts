import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { debugService } from "./debug.service";
import httpStatus from "http-status";


const checkWorkOrderSttatusIndex = async (req: Request, res: Response) => {
  const result = await debugService.checkWorkOrderStatusIndex();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "EXPLAIN ANALYZE for workOrders status index",
    data: result,
  });
}



export const debugController = {
  checkWorkOrderSttatusIndex,

}