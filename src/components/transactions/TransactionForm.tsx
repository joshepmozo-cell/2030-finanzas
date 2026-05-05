import { useState } from 'react'

type Category = 'essentials' | 'personal' | 'savings'

interface TransactionFormData {
  description: string
  amount: number
  category: Category
  date: string
}

interface FormErrors {
  description?: string
  amount?: string
  date?: string
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => Promise<void>
  defaultCategory?: Category
}

function validate(fields: {
  description: string
  amount: string
  date: string
}): FormErrors {
  const errors: FormErrors = {}

  if (!fields.description.trim()) {
    errors.description = 'La descripción es obligatoria.'
  } else if (fields.description.trim().length < 2) {
    errors.description = 'Mínimo 2 caracteres.'
  }

  if (!fields.amount) {
    errors.amount = 'El importe es obligatorio.'
  } else if (isNaN(Number(fields.amount)) || Number(fields.amount) <= 0) {
    errors.amount = 'Debe ser un número mayor que 0.'
  } else if (Number(fields.amount) > 100000) {
    errors.amount = 'No puede superar 100.000 €.'
  }

  if (!fields.date) {
    errors.date = 'La fecha es obligatoria.'
  }

  return errors
}

export default function TransactionForm({
  onSubmit,
  defaultCategory = 'essentials',
}: TransactionFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(defaultCategory)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    const validationErrors = validate({ description, amount, date })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)
    try {
      await onSubmit({ description: description.trim(), amount: Number(amount), category, date })
      setDescription('')
      setAmount('')
      setCategory(defaultCategory)
      setDate(new Date().toISOString().split('T')[0])
      setSuccess(true)
    } catch {
      setErrors({ description: 'Error al guardar. Inténtalo de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (hasError?: string) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-400 focus:ring-red-300'
        : 'border-gray-200 focus:ring-blue-300'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          ✅ Movimiento guardado correctamente.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={description}
          onChange={e => {
            setDescription(e.target.value)
            if (errors.description) setErrors(p => ({ ...p, description: undefined }))
          }}
          placeholder="Ej: Supermercado"
          className={fieldClass(errors.description)}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Importe (€) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={e => {
            setAmount(e.target.value)
            if (errors.amount) setErrors(p => ({ ...p, amount: undefined }))
          }}
          placeholder="0.00"
          className={fieldClass(errors.amount)}
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
          className={fieldClass()}
        >
          <option value="essentials">Esenciales (50%)</option>
          <option value="personal">Personal (30%)</option>
          <option value="savings">Ahorros (20%)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={e => {
            setDate(e.target.value)
            if (errors.date) setErrors(p => ({ ...p, date: undefined }))
          }}
          className={fieldClass(errors.date)}
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Guardando...' : 'Guardar movimiento'}
      </button>
    </form>
  )
}