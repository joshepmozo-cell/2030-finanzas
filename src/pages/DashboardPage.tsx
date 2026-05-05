import { useState } from 'react'
import { useBudgetContext } from '../context/BudgetContext'
import { useTransactions } from '../hooks/useTransactions'
import BudgetCard from '../components/budget/BudgetCard'
import TransactionList from '../components/transactions/TransactionList'
import Modal from '../components/ui/Modal'
import TransactionForm from '../components/transactions/TransactionForm'

export default function DashboardPage() {
  const { salary, allocation, rule, updateSalary, updateRule } = useBudgetContext()
  const { totalsByCategory, addTransaction } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTransaction = async (data: any) => {
    await addTransaction(data)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Salary input section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wide mb-4">Sueldo mensual</h2>
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            value={salary}
            onChange={e => updateSalary(Number(e.target.value))}
            placeholder="2500"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-lg font-semibold"
          />
          <select
            value={rule}
            onChange={e => updateRule(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="50/30/20">50/30/20</option>
            <option value="70/20/10">70/20/10</option>
            <option value="custom">Personalizada</option>
          </select>
        </div>
      </div>

      {/* Budget cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BudgetCard
          category="essentials"
          assigned={allocation.essentials}
          spent={totalsByCategory.essentials}
        />
        <BudgetCard
          category="personal"
          assigned={allocation.personal}
          spent={totalsByCategory.personal}
        />
        <BudgetCard
          category="savings"
          assigned={allocation.savings}
          spent={totalsByCategory.savings}
        />
      </div>

      {/* Recent transactions */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Últimos movimientos</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Añadir
          </button>
        </div>
        <TransactionList onAdd={() => setIsModalOpen(true)} transactions={[]} />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo movimiento">
        <TransactionForm onSubmit={handleAddTransaction} />
      </Modal>
    </div>
  )
}