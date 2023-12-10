import {
  bulkInviteeUploadController,
  checkAdmin,
  checkAuth,
  connectDB,
  getInviteeListController,
  ncErrorHandlers,
  resetInviteeController
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .use(checkAdmin)
  .get(getInviteeListController)
  .post(bulkInviteeUploadController)
  .put(resetInviteeController);

export default router.handler(ncErrorHandlers);
