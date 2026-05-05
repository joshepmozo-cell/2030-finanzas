import ProgressBar from '../ui/ProgressBar'

interface Goal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}

interface GoalCardProps {
  goal: Goal
  onDelete?: (id: string) => void
}

export default function GoalCard({ goal, onDelete }: GoalCardProps) {
  const { id, name, targetAmount, savedAmount } = goal
  const remaining = targetAmount - savedAmount
  const monthsLeft = remaining > 0 ? Math.ceil(remaining / 100) : 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-300 hover:text-red-400 text-xs transition-colors"
            aria-label="Eliminar meta"
          >
            ✕
          </button>
        )}
      </div>

      <ProgressBar value={savedAmount} max={targetAmount} color="green" showLabel />

      <div className="mt-3 flex justify-between text-sm text-gray-500">
        <span>Meta: <strong>{targetAmount.toLocaleString('es-ES')} €</strong></span>
        {remaining > 0
          ? <span>~{monthsLeft} meses más</span>
          : <span className="text-green-600 font-medium">¡Meta alcanzada!</span>
        }
      </div>
    </div>
  )
}