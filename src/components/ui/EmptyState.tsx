interface EmptyStateProps {
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({
  message = 'No hay datos todavía.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-gray-400 text-sm mb-4">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-blue-600 hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}