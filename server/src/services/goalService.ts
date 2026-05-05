import { v4 as uuidv4 } from 'uuid'
import { db, Goal } from '../config/db'

export function getAllGoals(): Goal[] {
  return [...db.goals].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getGoalById(id: string): Goal | undefined {
  return db.goals.find(g => g.id === id)
}

export function createGoal(data: { name: string; targetAmount: number }): Goal {
  const newGoal: Goal = {
    id: uuidv4(),
    name: data.name,
    targetAmount: data.targetAmount,
    savedAmount: 0,
    createdAt: new Date().toISOString(),
  }
  db.goals.push(newGoal)
  return newGoal
}

export function updateGoalProgress(
  id: string,
  savedAmount: number
): Goal | null {
  const index = db.goals.findIndex(g => g.id === id)
  if (index === -1) return null

  db.goals[index] = { ...db.goals[index], savedAmount }
  return db.goals[index]
}

export function deleteGoal(id: string): boolean {
  const index = db.goals.findIndex(g => g.id === id)
  if (index === -1) return false

  db.goals.splice(index, 1)
  return true
}