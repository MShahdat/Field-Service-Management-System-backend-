import { prisma } from "../../lib/prisma"



//& workorder status index
const checkWorkOrderStatusIndex = async () => {
  const result = await prisma.$queryRawUnsafe(
    `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM "workOrders" WHERE "status" = 'COMPLETED'`
  )
  return result
}



export const debugService = {
  checkWorkOrderStatusIndex,

}