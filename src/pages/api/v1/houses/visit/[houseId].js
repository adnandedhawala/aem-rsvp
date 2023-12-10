import {
  checkAuth,
  connectDB,
  editVisitStatusController,
  ncErrorHandlers
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).use(checkAuth).patch(editVisitStatusController);

export default router.handler(ncErrorHandlers);
