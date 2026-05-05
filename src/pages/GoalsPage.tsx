import { useState } from 'react'
import GoalCard from '../components/goals/GoalCard'
import Modal from '../components/ui/Modal'
import GoalForm from '../components/goals/GoalForm'

// Mock data - en un proyecto real vendría de la API
const mockGoals = [
  { id: '1', name: 'Bicicleta', targetAmount: 600, savedAmount: 360 },
  { id: '2', name: 'Vacaciones', targetAmount: 1500, savedAmount: 450 },
  { id: '3', name: 'Fondo de emergencia', targetAmount: 5000, savedAmount: 4010 },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(mockGoals)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddGoal = async (data: any) => {
    const newGoal = {
      id: String(goals.length + 1),
      name: data.name,
      targetAmount: data.targetAmount,
      savedAmount: 0,
    }
    setGoals([...goals, newGoal])
    setIsModalOpen(false)
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Metas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          + Nueva meta
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No tienes metas todavía.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Crea tu primera meta
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onDelete={handleDeleteGoal} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nueva meta de ahorro">
        <GoalForm onSubmit={handleAddGoal} />
      </Modal>
    </div>
  )
}