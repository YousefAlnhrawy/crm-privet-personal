import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Customer, Agent } from '../types';

interface CRMContextType {
  customers: Customer[];
  agents: Agent[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, updatedData: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const savedCustomers = localStorage.getItem('crm_customers');
    const savedAgents = localStorage.getItem('crm_agents');
    
    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (e) {
        console.error("Error parsing customers", e);
      }
    }
    
    if (savedAgents) {
      try {
        setAgents(JSON.parse(savedAgents));
      } catch (e) {
        console.error("Error parsing agents", e);
      }
    } else {
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

  return (
    <CRMContext.Provider value={{ customers, agents, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
}
