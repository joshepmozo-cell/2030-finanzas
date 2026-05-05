import ProgressBar from '../ui/ProgressBar'

type Category = 'essentials' | 'personal' | 'savings'

interface BudgetCardProps {
  category: Category
  assigned: number
  spent: number
}

const config: Record<Category, {
  label: string
  description: string
  color: 'blue' | 'amber' | 'green'
  percentage: number
}> = {
  essentials: { label: 'Gastos esenciales', description: 'Alquiler, comida, transporte', color: 'blue',  percentage: 50 },
  personal:   { label: 'Gastos personales', description: 'Ocio, ropa, suscripciones',   color: 'amber', percentage: 30 },
  savings:    { label: 'Ahorros',           description: 'Fondo de emergencia y metas', color: 'green', percentage: 20 },
}

export default function BudgetCard({ category, assigned, spent }: BudgetCardProps) {
  const { label, description, color, percentage } = config[category]
  const remaining = assigned - spent
  const isOverBudget = remaining < 0

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-500">{description}</p>
          <h3 className="font-semibold text-gray-900">{label}</h3>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
          {percentage}%
        </span>
      </div>

      <ProgressBar value={spent} max={assigned} color={color} showLabel />

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-gray-500">
          Asignado: <strong>{assigned.toLocaleString('es-ES')} €</strong>
        </span>
        <span className={isOverBudget ? 'text-red-600 font-medium' : 'text-gray-700'}>
          {isOverBudget
            ? `Excedido ${Math.abs(remaining).toLocaleString('es-ES')} €`
            : `Restante ${remaining.toLocaleString('es-ES')} €`}
        </span>
      </div>
    </div>
  )
}