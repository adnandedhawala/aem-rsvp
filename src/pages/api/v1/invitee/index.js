import {
  connectDB,
  getInviteeListByFileController,
  ncErrorHandlers,
  updateInviteeController
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .get(getInviteeListByFileController)
  .put(updateInviteeController);

export default router.handler(ncErrorHandlers);
