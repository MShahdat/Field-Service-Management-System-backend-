import app from "./app";
import config from "./app/config/env";

import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import {
	seedSuperAdmin,
	seedTesterAdmin,
	seedTesterManager,
} from "./app/utils/seed";

const PORT = config.port;

const main = async () => {
	try {
		await prisma.$connect();
		console.log("Connected to the database successfully.");
		app.listen(PORT, () => {
			console.log(`server is running port ${PORT}`);
		});
		await redisClient.connect();
		console.log("redis client connected successfully");
		await seedSuperAdmin();
		await seedTesterAdmin();
		await seedTesterManager();
	} catch (error) {
		console.error("Error statring the server", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
