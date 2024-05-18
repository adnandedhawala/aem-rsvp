import { connectDB, ncErrorHandlers, validateAuthTokenController } from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).post(validateAuthTokenController);

export default router.handler(ncErrorHandlers);
