import {
  addHouseController,
  bulkEditVisitStatusController,
  checkAdmin,
  checkAuth,
  connectDB,
  getHouseListController,
  ncErrorHandlers
} from "@/be";
import { createRouter } from "next-connect";

const router = createRouter();

router
  .use(connectDB)
  .use(checkAuth)
  .get(getHouseListController)
  .post(addHouseController)
  .use(checkAdmin)
  .put(bulkEditVisitStatusController);

export default router.handler(ncErrorHandlers);
