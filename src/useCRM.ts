import { useState, useEffect } from 'react';
import { Customer, Agent } from './types';

export function useCRM() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const savedCustomers = localStorage.getItem('crm_customers');
    const savedAgents = localStorage.getItem('crm_agents');
    
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    if (savedAgents) setAgents(JSON.parse(savedAgents));
    else {
      // Default agents if none exist
      const defaultAgents = [
        { id: '1', name: 'أحمد محمد', phone: '0123456789', email: 'ahmed@example.com' },
        { id: '2', name: 'سارة علي', phone: '0112233445', email: 'sara@example.com' }
      ];
      setAgents(defaultAgents);
      localStorage.setItem('crm_agents', JSON.stringify(defaultAgents));
    }
  }, []);

  const saveCustomers = (newCustomers: Customer[]) => {
    setCustomers(newCustomers);
    localStorage.setItem('crm_customers', JSON.stringify(newCustomers));
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    saveCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    const newCustomers = customers.map(c => c.id === id ? { ...c, ...updatedData } : c);
    saveCustomers(newCustomers);
  };

  const deleteCustomer = (id: string) => {
    saveCustomers(customers.filter(c => c.id !== id));
  };

  return {
    customers,
    agents,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
