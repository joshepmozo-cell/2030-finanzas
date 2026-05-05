import type {
  Transaction,
  NewTransaction,
  Goal,
  NewGoal,
  Salary,
  NewSalary,
  Category,
} 
from '../types/api'

const BASE_URL = 'http://localhost:3000/api'

// Función base para todas las peticiones
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error en la petición')
  }

  return response.json() as Promise<T>
}

// ─── Transactions ───────────────────────────────────────────────

export function getTransactions(category?: Category): Promise<Transaction[]> {
  const query = category ? `?category=${category}` : ''
  return request<Transaction[]>(`/transactions${query}`)
}

export function getTransactionById(id: string): Promise<Transaction> {
  return request<Transaction>(`/transactions/${id}`)
}

export function createTransaction(data: NewTransaction): Promise<Transaction> {
  return request<Transaction>('/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateTransaction(
  id: string,
  data: Partial<NewTransaction>
): Promise<Transaction> {
  return request<Transaction>(`/transactions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function deleteTransaction(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/transactions/${id}`, {
    method: 'DELETE',
  })
}

// ─── Goals ──────────────────────────────────────────────────────

export function getGoals(): Promise<Goal[]> {
  return request<Goal[]>('/goals')
}

export function getGoalById(id: string): Promise<Goal> {
  return request<Goal>(`/goals/${id}`)
}

export function createGoal(data: NewGoal): Promise<Goal> {
  return request<Goal>('/goals', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateGoalProgress(
  id: string,
  savedAmount: number
): Promise<Goal> {
  return request<Goal>(`/goals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ savedAmount }),
  })
}

export function deleteGoal(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/goals/${id}`, {
    method: 'DELETE',
  })
}

// ─── Salary ─────────────────────────────────────────────────────

export function getCurrentSalary(): Promise<Salary> {
  return request<Salary>('/salary')
}

export function upsertSalary(data: NewSalary): Promise<Salary> {
  return request<Salary>('/salary', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}