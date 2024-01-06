import {
  addInviteeController,
  connectDB,
  getInviteeController,
  ncErrorHandlers,
  updateInviteeController
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .get(getInviteeController)
  .put(updateInviteeController)
  .post(addInviteeController);

export default router.handler(ncErrorHandlers);
