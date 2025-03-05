import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { createFarm, getAllFarms, getNearbyFarms } from "../controllers/customer.controller.js";


const router = express.Router();


// router.post("/update",protectRoute,updateUser);
router.post("/createFarm", createFarm); // Create farm
router.get("/getallfarm", getAllFarms); // Get all farms
router.get("/nearby", getNearbyFarms); // Get nearby farms
export default router;