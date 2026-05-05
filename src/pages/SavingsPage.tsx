import { useState } from 'react'
import { useBudgetContext } from '../context/BudgetContext'
import { useTransactions } from '../hooks/useTransactions'
import ProgressBar from '../components/ui/ProgressBar'
import TransactionList from '../components/transactions/TransactionList'
import Modal from '../components/ui/Modal'
import TransactionForm from '../components/transactions/TransactionForm'

export default function SavingsPage() {
  const { allocation } = useBudgetContext()
  const { transactions, addTransaction, removeTransaction } = useTransactions('savings')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  const handleAddTransaction = async (data: any) => {
    await addTransaction(data)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ahorros</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Saldo actual</p>
          <p className="text-2xl font-bold text-green-600">{total.toLocaleString('es-ES')} €</p>
          <p className="text-xs text-gray-400 mt-2">cuenta de ahorros</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Objetivo mensual</p>
          <p className="text-2xl font-bold text-green-600">{allocation.savings.toLocaleString('es-ES')} €</p>
          <p className="text-xs text-gray-400 mt-2">según regla {allocation.savings === allocation.savings * 0.2 ? '50/30/20' : 'personalizada'}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Progreso</p>
          <p className="text-2xl font-bold text-green-600">
            {allocation.savings > 0 ? Math.round((total / allocation.savings) * 100) : 0}%
          </p>
          <p className="text-xs text-gray-400 mt-2">del objetivo mensual</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <p className="text-sm text-gray-500 mb-3">Progreso hacia el objetivo</p>
        <ProgressBar value={total} max={allocation.savings} color="green" showLabel />
      </div>

      {/* Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Historial de ahorros</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Registrar
          </button>
        </div>
        <TransactionList
          transactions={transactions}
          onDelete={removeTransaction}
          onAdd={() => setIsModalOpen(true)}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar ahorro">
        <TransactionForm onSubmit={handleAddTransaction} defaultCategory="savings" />
      </Modal>
    </div>
  )
}