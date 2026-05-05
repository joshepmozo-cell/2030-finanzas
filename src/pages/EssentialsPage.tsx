import { useState } from 'react'
import { useBudgetContext } from '../context/BudgetContext'
import { useTransactions } from '../hooks/useTransactions'
import BudgetCard from '../components/budget/BudgetCard'
import TransactionList from '../components/transactions/TransactionList'
import Modal from '../components/ui/Modal'
import TransactionForm from '../components/transactions/TransactionForm'

export default function EssentialsPage() {
  const { allocation } = useBudgetContext()
  const { transactions, addTransaction, removeTransaction } = useTransactions('essentials')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  const handleAddTransaction = async (data: any) => {
    await addTransaction(data)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gastos Esenciales</h1>

      <BudgetCard
        category="essentials"
        assigned={allocation.essentials}
        spent={total}
      />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Movimientos</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Añadir
          </button>
        </div>
        <TransactionList
          transactions={transactions}
          onDelete={removeTransaction}
          onAdd={() => setIsModalOpen(true)}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo gasto esencial">
        <TransactionForm onSubmit={handleAddTransaction} defaultCategory="essentials" />
      </Modal>
    </div>
  )
}