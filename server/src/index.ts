import express from 'express'
import cors from 'cors'
import transactionRoutes from './routes/transactions'
import goalRoutes from './routes/goals'
import salaryRoutes from './routes/salary'

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/v1/transactions', transactionRoutes)
app.use('/api/v1/goals',        goalRoutes)
app.use('/api/v1/salary',       salaryRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 para rutas no existentes
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

export default app