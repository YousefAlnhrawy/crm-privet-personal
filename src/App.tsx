import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CustomerListPage from './pages/CustomerListPage';
import AgentsPage from './pages/AgentsPage';
import { CRMProvider } from './context/CRMContext';
import AddCustomerModal from './components/AddCustomerModal';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <CRMProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          
          <main className="flex-1 mr-64 p-8 min-h-screen overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-24 w-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-200 mb-6">
                    <Plus className="h-12 w-12" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 mb-4">إضافة عميل جديد</h1>
                  <p className="text-gray-500 max-w-md mb-8">
                    قم بإدخال بيانات العميل الجديد وتصنيفه للبدء في متابعة حالته وتعيين مندوب مسؤول عنه.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="rounded-2xl bg-blue-600 px-10 py-4 font-bold text-white shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    فتح نموذج الإضافة
                  </button>
                  
                  <AddCustomerModal 
                    isOpen={isAddModalOpen} 
                    onClose={() => setIsAddModalOpen(false)} 
                  />
                </div>
              } />
              <Route path="/leads" element={<CustomerListPage title="العملاء المحتملين" statusFilter="مهتم" />} />
              <Route path="/contracted" element={<CustomerListPage title="العملاء المتعاقدين" statusFilter="تم التعاقد" />} />
              <Route path="/agents" element={<AgentsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CRMProvider>
  );
}
