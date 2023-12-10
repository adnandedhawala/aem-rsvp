import { connectDB, loginController, ncErrorHandlers } from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).post(loginController);

export default router.handler(ncErrorHandlers);
