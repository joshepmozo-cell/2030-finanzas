// Tipos compartidos del dominio
export type Category = 'essentials' | 'personal' | 'savings'

export interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
  createdAt: string
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
  createdAt: string
}

export interface Salary {
  id: string
  amount: number
  month: string // formato: "2025-05"
  createdAt: string
}

// Base de datos en memoria (simula persistencia sin necesitar una DB real)
export const db = {
  transactions: [] as Transaction[],
  goals: [] as Goal[],
  salaries: [] as Salary[],
}