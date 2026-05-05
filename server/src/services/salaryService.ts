import { v4 as uuidv4 } from 'uuid'
import { db, Salary } from '../config/db'

export function getSalaryByMonth(month: string): Salary | undefined {
  return db.salaries.find(s => s.month === month)
}

export function getCurrentSalary(): Salary | undefined {
  const currentMonth = new Date().toISOString().slice(0, 7)
  return getSalaryByMonth(currentMonth)
}

export function upsertSalary(data: { amount: number; month: string }): Salary {
  const existing = db.salaries.findIndex(s => s.month === data.month)

  if (existing !== -1) {
    db.salaries[existing] = { ...db.salaries[existing], amount: data.amount }
    return db.salaries[existing]
  }

  const newSalary: Salary = {
    id: uuidv4(),
    amount: data.amount,
    month: data.month,
    createdAt: new Date().toISOString(),
  }
  db.salaries.push(newSalary)
  return newSalary
}