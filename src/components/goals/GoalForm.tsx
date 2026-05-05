import { useState } from 'react'

interface GoalFormData {
  name: string
  targetAmount: number
}

interface FormErrors {
  name?: string
  targetAmount?: string
}

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => Promise<void>
}

function validate(fields: { name: string; targetAmount: string }): FormErrors {
  const errors: FormErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'El nombre de la meta es obligatorio.'
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Mínimo 2 caracteres.'
  }

  if (!fields.targetAmount) {
    errors.targetAmount = 'El monto objetivo es obligatorio.'
  } else if (isNaN(Number(fields.targetAmount)) || Number(fields.targetAmount) <= 0) {
    errors.targetAmount = 'Debe ser un número mayor que 0.'
  } else if (Number(fields.targetAmount) > 1000000) {
    errors.targetAmount = 'No puede superar 1.000.000 €.'
  }

  return errors
}

export default function GoalForm({ onSubmit }: GoalFormProps) {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    const validationErrors = validate({ name, targetAmount })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)
    try {
      await onSubmit({ name: name.trim(), targetAmount: Number(targetAmount) })
      setName('')
      setTargetAmount('')
      setSuccess(true)
    } catch {
      setErrors({ name: 'Error al crear la meta. Inténtalo de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (hasError?: string) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-400 focus:ring-red-300'
        : 'border-gray-200 focus:ring-green-300'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          ✅ Meta creada correctamente.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la meta <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value)
            if (errors.name) setErrors(p => ({ ...p, name: undefined }))
          }}
          placeholder="Ej: Bicicleta, Vacaciones..."
          className={fieldClass(errors.name)}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto objetivo (€) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          step="0.01"
          min="1"
          value={targetAmount}
          onChange={e => {
            setTargetAmount(e.target.value)
            if (errors.targetAmount) setErrors(p => ({ ...p, targetAmount: undefined }))
          }}
          placeholder="600"
          className={fieldClass(errors.targetAmount)}
        />
        {errors.targetAmount && (
          <p className="text-red-500 text-xs mt-1">{errors.targetAmount}</p>
        )}
        {targetAmount && Number(targetAmount) > 0 && (
          <p className="text-gray-400 text-xs mt-1">
            Ahorrando 100 €/mes lo conseguirías en ~{Math.ceil(Number(targetAmount) / 100)} meses
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Creando...' : 'Crear meta'}
      </button>
    </form>
  )
}