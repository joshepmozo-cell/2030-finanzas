import Badge from '../ui/Badge'

type Category = 'essentials' | 'personal' | 'savings'

interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
}

interface TransactionItemProps {
  transaction: Transaction
  onDelete?: (id: string) => void
}

export default function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const { id, description, amount, category, date } = transaction
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short',
  })

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{description}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400">{formattedDate}</span>
            <Badge category={category} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-red-600">
          -{amount.toLocaleString('es-ES')} €
        </span>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-300 hover:text-red-400 text-xs transition-colors"
            aria-label="Eliminar movimiento"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}