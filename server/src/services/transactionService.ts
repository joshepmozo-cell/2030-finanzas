import { v4 as uuidv4 } from 'uuid'
import { db, Transaction, Category } from '../config/db'

// Capa de servicios: lógica de negocio pura, sin conocimiento de HTTP

export function getAllTransactions(category?: Category): Transaction[] {
  if (category) {
    return db.transactions.filter(tx => tx.category === category)
  }
  return [...db.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getTransactionById(id: string): Transaction | undefined {
  return db.transactions.find(tx => tx.id === id)
}

export function createTransaction(data: {
  description: string
  amount: number
  category: Category
  date: string
}): Transaction {
  const newTransaction: Transaction = {
    id: uuidv4(),
    description: data.description,
    amount: data.amount,
    category: data.category,
    date: data.date,
    createdAt: new Date().toISOString(),
  }
  db.transactions.push(newTransaction)
  return newTransaction
}

export function updateTransaction(
  id: string,
  data: Partial<Omit<Transaction, 'id' | 'createdAt'>>
): Transaction | null {
  const index = db.transactions.findIndex(tx => tx.id === id)
  if (index === -1) return null

  db.transactions[index] = { ...db.transactions[index], ...data }
  return db.transactions[index]
}

export function deleteTransaction(id: string): boolean {
  const index = db.transactions.findIndex(tx => tx.id === id)
  if (index === -1) return false

  db.transactions.splice(index, 1)
  return true
}