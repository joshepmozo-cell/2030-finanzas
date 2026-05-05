import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BudgetProvider } from './context/BudgetContext'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import EssentialsPage from './pages/EssentialsPage'
import PersonalPage from './pages/PersonalPage'
import SavingsPage from './pages/SavingsPage'
import GoalsPage from './pages/GoalsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BudgetProvider initialSalary={2500}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/essentials" element={<EssentialsPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </BudgetProvider>
  )
}

export default App