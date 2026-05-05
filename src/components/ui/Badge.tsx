type Category = 'essentials' | 'personal' | 'savings'

interface BadgeProps {
  category: Category
}

const config: Record<Category, { label: string; className: string }> = {
  essentials: { label: 'Esenciales',  className: 'bg-blue-100 text-blue-800' },
  personal:   { label: 'Personal',    className: 'bg-amber-100 text-amber-800' },
  savings:    { label: 'Ahorros',     className: 'bg-green-100 text-green-800' },
}

export default function Badge({ category }: BadgeProps) {
  const { label, className } = config[category]
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}