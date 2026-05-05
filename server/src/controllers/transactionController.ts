import { Request, Response } from 'express'
import * as transactionService from '../services/transactionService'
import { Category } from '../config/db'

// Capa de controladores: maneja HTTP, valida entrada, delega en servicios

export function getTransactions(req: Request, res: Response): void {
  const { category } = req.query
  const validCategories: Category[] = ['essentials', 'personal', 'savings']

  if (category && !validCategories.includes(category as Category)) {
    res.status(400).json({ error: 'Categoría no válida.' })
    return
  }

  const transactions = transactionService.getAllTransactions(category as Category | undefined)
  res.status(200).json(transactions)
}

export function getTransactionById(req: Request, res: Response): void {
  const { id } = req.params
  const transaction = transactionService.getTransactionById(id)

  if (!transaction) {
    res.status(404).json({ error: 'Movimiento no encontrado.' })
    return
  }

  res.status(200).json(transaction)
}

export function createTransaction(req: Request, res: Response): void {
  const { description, amount, category, date } = req.body
  const validCategories: Category[] = ['essentials', 'personal', 'savings']

  // Validación en la frontera de red
  if (!description || typeof description !== 'string' || description.trim().length < 2) {
    res.status(400).json({ error: 'La descripción es obligatoria y debe tener al menos 2 caracteres.' })
    return
  }
  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ error: 'El importe debe ser un número mayor que 0.' })
    return
  }
  if (!category || !validCategories.includes(category)) {
    res.status(400).json({ error: 'La categoría debe ser essentials, personal o savings.' })
    return
  }
  if (!date || typeof date !== 'string') {
    res.status(400).json({ error: 'La fecha es obligatoria.' })
    return
  }

  const transaction = transactionService.createTransaction({
    description: description.trim(),
    amount,
    category,
    date,
  })

  res.status(201).json(transaction)
}

export function updateTransaction(req: Request, res: Response): void {
  const { id } = req.params
  const updated = transactionService.updateTransaction(id, req.body)

  if (!updated) {
    res.status(404).json({ error: 'Movimiento no encontrado.' })
    return
  }

  res.status(200).json(updated)
}

export function deleteTransaction(req: Request, res: Response): void {
  const { id } = req.params
  const deleted = transactionService.deleteTransaction(id)

  if (!deleted) {
    res.status(404).json({ error: 'Movimiento no encontrado.' })
    return
  }

  res.status(200).json({ message: 'Movimiento eliminado correctamente.' })
}