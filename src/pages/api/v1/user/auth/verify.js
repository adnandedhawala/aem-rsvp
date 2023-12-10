import { connectDB, ncErrorHandlers, verifyUserController } from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).post(verifyUserController);

export default router.handler(ncErrorHandlers);
