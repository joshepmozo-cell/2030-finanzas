import { useState, useEffect, useMemo, useCallback } from 'react'
import { getTransactions, createTransaction, deleteTransaction } from '../api/client'

type Category = 'essentials' | 'personal' | 'savings'

export interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
}

export interface NewTransaction {
  description: string
  amount: number
  category: Category
  date: string
}

// useTransactions — gestiona la lista de movimientos.
// Se encarga de cargar los datos de la API, añadir y eliminar movimientos,
// y calcular los totales por categoría.
export function useTransactions(category?: Category) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // useEffect: carga los movimientos al montar el componente o al cambiar la categoría
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getTransactions(category)
        setTransactions(data)
      } catch (err) {
        setError('No se pudieron cargar los movimientos.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [category])

  // useMemo: suma total del array actual sin recalcular en cada render
  const total = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0)
  }, [transactions])

  // useMemo: totales agrupados por categoría (útil en el Dashboard)
  const totalsByCategory = useMemo(() => {
    return transactions.reduce<Record<Category, number>>(
      (acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount
        return acc
      },
      { essentials: 0, personal: 0, savings: 0 }
    )
  }, [transactions])

  // useCallback: añadir un movimiento sin recrear la función en cada render
  const addTransaction = useCallback(async (data: NewTransaction) => {
    setError(null)
    try {
      const created = await createTransaction(data)
      setTransactions(prev => [created, ...prev])
    } catch {
      setError('No se pudo crear el movimiento.')
    }
  }, [])

  // useCallback: eliminar un movimiento por id
  const removeTransaction = useCallback(async (id: string) => {
    setError(null)
    try {
      await deleteTransaction(id)
      setTransactions(prev => prev.filter(tx => tx.id !== id))
    } catch {
      setError('No se pudo eliminar el movimiento.')
    }
  }, [])

  return {
    transactions,
    loading,
    error,
    total,
    totalsByCategory,
    addTransaction,
    removeTransaction,
  }
}