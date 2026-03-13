import express from "express";
import * as planPurchaseController from "../../../controllers/PlanPurchase.Controller";
import validateRequest from "@/middleware/validate-request";
import {
  planPurchaseCreateSchema,
  planPurchaseUpdateSchema,
} from "@/data/request-schemas";
import { verifyUser } from "@/middleware/verifyToken";

const planPurchaseRouter = express.Router();

planPurchaseRouter.use(verifyUser);

planPurchaseRouter.post(
  "/",
  validateRequest(planPurchaseCreateSchema),
  planPurchaseController.createPlanPurchase,
);

// console.log("route is being hit")
planPurchaseRouter.get(
  "/my-purchases",
  planPurchaseController.getPurchasesByUser,
);

planPurchaseRouter.get(
  "/details/:id",
  planPurchaseController.getPlanPurchaseById,
);

export default planPurchaseRouter;
