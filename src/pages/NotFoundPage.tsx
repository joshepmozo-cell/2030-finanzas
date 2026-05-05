import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Página no encontrada. La ruta que buscas no existe.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}