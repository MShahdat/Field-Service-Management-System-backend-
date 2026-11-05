import cron from "node-cron"
import { prisma } from "./prisma";


//& REMOVE REJECTED MANAGER FROM DB 1 MONTH INTERVAL
export const deleteRejectedManager = async () => {
  cron.schedule("0 0 1 * * ", async () => {
    try {
      const oneMonthAgo = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000);
      const deleteManager = await prisma.user.deleteMany({
        where: {
          role: "MANAGER",
          createdAt: { lt: oneMonthAgo },
          manager: {
            verificationStatus: "REJECTED",
          },
        },
      });

      if (deleteManager.count > 0) {
        console.log(
          `Cron: Deleted ${deleteManager.count} rejected managers older then 1 month`,
        );
      }
    } catch (error) {
      console.log(`Cron: Failed to delete rejected manager applications`, error);
    }

    console.log("Rejected Manager Delete cron schedule trigger");
  });
};



//& REMOVE REJECTED SERVICES FROM DB 1 MONTH INTERVAL
export const deleteRejectedServices = async () => {
  cron.schedule("0 0 1 * * ", async () => {
    try {
      const oneMonthAgo = new Date(Date.now() - 60 * 60 * 24 * 30 * 1000);
      const deleteServices = await prisma.service.deleteMany({
        where: {
          status: "REJECTED",
          createdAt: { lt: oneMonthAgo }
        },
      });

      if (deleteServices.count > 0) {
        console.log(
          `Cron: Deleted ${deleteServices.count} rejected services older then 1 month`,
        );
      }
    } catch (error) {
      console.log(`Cron: Failed to delete rejected service applications`, error);
    }

    console.log("Rejected Service Delete cron schedule trigger");
  });
};


//& REMOVE CANCELLED SERVICES FROM DB 1 MONTH INTERVAL
export const deleteCancelledServices = async () => {
  cron.schedule("0 0 * * 0 ", async () => {
    try {
      const oneWeekAgo = new Date(Date.now() - 60 * 60 * 24 * 7 * 1000);
      const deleteServices = await prisma.service.deleteMany({
        where: {
          status: "CANCELLED",
          createdAt: { lt: oneWeekAgo }
        },
      });

      if (deleteServices.count > 0) {
        console.log(
          `Cron: Deleted ${deleteServices.count} cancelled services older then 1 week`,
        );
      }
    } catch (error) {
      console.log(`Cron: Failed to delete cancelled service applications`, error);
    }

    console.log("Cancelled Service Delete cron schedule trigger");
  });
};