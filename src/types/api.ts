// Tipos compartidos entre frontend y backend

export type Category = 'essentials' | 'personal' | 'savings'

export interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
  createdAt: string
}

export interface NewTransaction {
  description: string
  amount: number
  category: Category
  date: string
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
  createdAt: string
}

export interface NewGoal {
  name: string
  targetAmount: number
}

export interface Salary {
  id: string
  amount: number
  month: string
  createdAt: string
}

export interface NewSalary {
  amount: number
  month: string
}

export interface ApiError {
  error: string
}