import {
  bulkInviteeUploadController,
  checkAdmin,
  checkAuth,
  connectDB,
  ncErrorHandlers
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .use(checkAdmin)
  .post(bulkInviteeUploadController);

export default router.handler(ncErrorHandlers);
