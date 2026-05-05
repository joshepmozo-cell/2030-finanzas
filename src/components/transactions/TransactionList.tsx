import TransactionItem from './TransactionItem'
import EmptyState from '../ui/EmptyState'

type Category = 'essentials' | 'personal' | 'savings'

interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
}

interface TransactionListProps {
  transactions: Transaction[]
  onDelete?: (id: string) => void
  onAdd?: () => void
}

export default function TransactionList({
  transactions,
  onDelete,
  onAdd,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        message="No hay movimientos registrados todavía."
        action={onAdd ? { label: '+ Añadir el primero', onClick: onAdd } : undefined}
      />
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      {transactions.map(tx => (
        <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
      ))}
    </div>
  )
}