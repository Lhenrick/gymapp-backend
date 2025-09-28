import { Router } from "express";
import { listMuscles, listExercises } from "../controllers/catalog.js";

const router = Router();
router.get("/muscles", listMuscles);
router.get("/exercises", listExercises);

export default router;
