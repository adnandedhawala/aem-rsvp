import { connectDB, getInviteeCountController, ncErrorHandlers } from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(connectDB).get(getInviteeCountController);

export default router.handler(ncErrorHandlers);
