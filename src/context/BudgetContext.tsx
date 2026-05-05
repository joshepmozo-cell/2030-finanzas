import { type ReactNode, createContext, useContext } from 'react';
// Importamos sin llaves porque ahora usamos export default
import useBudget from '../hooks/useBudget';

type Rule = '50/30/20' | '70/20/10' | 'custom';

interface BudgetAllocation {
  essentials: number;
  personal: number;
  savings: number;
}

interface BudgetContextType {
  salary: number;
  rule: Rule;
  allocation: BudgetAllocation;
  percentages: BudgetAllocation;
  updateSalary: (amount: number) => void;
  updateRule: (newRule: Rule) => void;
  updateCustomPercentages: (values: BudgetAllocation) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

interface BudgetProviderProps {
  children: ReactNode;
  initialSalary?: number;
}

export function BudgetProvider({ children, initialSalary = 0 }: BudgetProviderProps) {
  const budget = useBudget(initialSalary);

  return (
    <BudgetContext.Provider value={budget}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgetContext(): BudgetContextType {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext debe usarse dentro de un BudgetProvider');
  }
  return context;
}