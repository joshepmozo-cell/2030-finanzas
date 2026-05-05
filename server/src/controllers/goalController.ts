import { Request, Response } from "express";
import * as goalService from "../services/goalService";

export function getGoals(_req: Request, res: Response): void {
  const goals = goalService.getAllGoals();
  res.status(200).json(goals);  
}

export function getGoalById(req: Request, res: Response): void {
    const goal = goalService.getGoalById(req.params.id);
    if (!goal) {
        res.status(404).json({ error: "Meta no encontrada." });
        return;
    }
    res.status(200).json(goal);
}

export function createGoal(req: Request, res: Response): void {
    const { name, targetAmount } = req.body;
    if (!name || typeof name !== "string" || name.trim().length < 2) {
        res.status(400).json({ error: "El nombre es obligatorio y debe tener al menos 2 caracteres." });
        return;
    }   
    if (targetAmount === undefined || typeof targetAmount !== "number" || targetAmount <= 0) {
        res.status(400).json({ error: "El monto debe ser un número mayor que 0." });
        return;
    }
    const goal = goalService.createGoal({ name: name.trim(), targetAmount });
    res.status(201).json(goal);
}   

export function updateGoalProgress(req: Request, res: Response): void {
    const { savedAmount } = req.body;
    if (savedAmount === undefined || typeof savedAmount !== "number" || savedAmount < 0) {
        res.status(400).json({ error: "El monto ahorrado debe ser mayor o igual a 0." });       
        return;
    }
    
    const updated = goalService.updateGoalProgress(req.params.id, savedAmount);
    if (!updated) {
        res.status(404).json({ error: "Meta no encontrada." });
        return;
    }   
    res.status(200).json(updated);
}

export function deleteGoal(req: Request, res: Response): void {
    const deleted = goalService.deleteGoal(req.params.id);
    if (!deleted) {
        res.status(404).json({ error: "Meta no encontrada." });
        return;
    }
    res.status(200).json({ message: "Meta eliminada correctamente." });
}   