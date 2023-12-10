import {
  checkAuth,
  connectDB,
  getMemberDetailsController,
  ncErrorHandlers
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).use(checkAuth).post(getMemberDetailsController);

export default router.handler(ncErrorHandlers);
