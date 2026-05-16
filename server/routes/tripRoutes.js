import express from "express";
import { generateTrip, refineTrip } from "../controllers/tripController.js";

const router = express.Router();

// Маршрут для першої генерації
router.post("/plan-trip", generateTrip);

// Маршрут для редагування/коригування
router.post("/refine-trip", refineTrip);

export default router;
