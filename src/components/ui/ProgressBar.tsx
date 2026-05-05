interface ProgressBarProps {
  value: number       // valor actual
  max: number         // valor máximo
  color?: 'blue' | 'amber' | 'green' | 'red'
  showLabel?: boolean
}

const colorMap = {
  blue:  'bg-blue-500',
  amber: 'bg-amber-400',
  green: 'bg-green-500',
  red:   'bg-red-500',
}

export default function ProgressBar({
  value,
  max,
  color = 'blue',
  showLabel = false,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0
  const barColor = percentage >= 100 ? 'bg-red-500' : colorMap[color]

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value.toLocaleString('es-ES')} €</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}