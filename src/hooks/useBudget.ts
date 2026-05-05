import { useState, useMemo, useCallback } from 'react';

type Rule = '50/30/20' | '70/20/10' | 'custom';

interface CustomPercentages {
  essentials: number;
  personal: number;
  savings: number;
}

interface BudgetAllocation {
  essentials: number;
  personal: number;
  savings: number;
}

const RULES: Record<Exclude<Rule, 'custom'>, BudgetAllocation> = {
  '50/30/20': { essentials: 50, personal: 30, savings: 20 },
  '70/20/10': { essentials: 70, personal: 20, savings: 10 },
};

export function useBudget(initialSalary = 0) {
  const [salary, setSalary] = useState<number>(initialSalary);
  const [rule, setRule] = useState<Rule>('50/30/20');
  const [customPercentages, setCustomPercentages] = useState<CustomPercentages>({
    essentials: 50,
    personal: 30,
    savings: 20,
  });

  const allocation = useMemo<BudgetAllocation>(() => {
    const percentages = rule === 'custom' ? customPercentages : RULES[rule];
    return {
      essentials: (salary * percentages.essentials) / 100,
      personal: (salary * percentages.personal) / 100,
      savings: (salary * percentages.savings) / 100,
    };
  }, [salary, rule, customPercentages]);

  const percentages = useMemo<BudgetAllocation>(() => {
    return rule === 'custom' ? customPercentages : RULES[rule];
  }, [rule, customPercentages]);

  const updateSalary = useCallback((amount: number) => {
    setSalary(amount);
  }, []);

  const updateRule = useCallback((newRule: Rule) => {
    setRule(newRule);
  }, []);

  const updateCustomPercentages = useCallback((values: CustomPercentages) => {
    setCustomPercentages(values);
  }, []);

  return {
    salary,
    rule,
    allocation,
    percentages,
    updateSalary,
    updateRule,
    updateCustomPercentages,
  };
}

// Exportación por defecto para asegurar compatibilidad
export default useBudget;