import { Router } from "express";

import * as goalController from "../controllers/goalController";

const router = Router();        

router.get("/", goalController.getGoals);
router.get("/:id", goalController.getGoalById);
router.post("/", goalController.createGoal);
router.patch("/:id", goalController.updateGoalProgress);
router.delete("/:id", goalController.deleteGoal);

export default router;      
