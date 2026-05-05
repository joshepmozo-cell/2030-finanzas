import { Request, Response } from 'express'
import * as salaryService from '../services/salaryService'

export function getCurrentSalary(_req: Request, res: Response): void {
  const salary = salaryService.getCurrentSalary()
  if (!salary) {
    res.status(404).json({ error: 'No hay sueldo registrado para el mes actual.' })
    return
  }
  res.status(200).json(salary)
}

export function upsertSalary(req: Request, res: Response): void {
  const { amount, month } = req.body

  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ error: 'El sueldo debe ser un número mayor que 0.' })
    return
  }

  const monthRegex = /^\d{4}-\d{2}$/
  if (!month || !monthRegex.test(month)) {
    res.status(400).json({ error: 'El mes debe tener el formato YYYY-MM (ej: 2025-05).' })
    return
  }

  const salary = salaryService.upsertSalary({ amount, month })
  res.status(201).json(salary)
}