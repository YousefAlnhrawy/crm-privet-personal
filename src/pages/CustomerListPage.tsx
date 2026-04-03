import { useState } from 'react';
import { useCRM } from '../useCRM';
import CustomerCard from '../components/CustomerCard';
import AddCustomerModal from '../components/AddCustomerModal';
import { Customer } from '../types';
import { Search, Filter, Plus } from 'lucide-react';

interface CustomerListPageProps {
  title: string;
  statusFilter?: string;
}

export default function CustomerListPage({ title, statusFilter }: CustomerListPageProps) {
  const { customers, deleteCustomer } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  const filteredCustomers = customers.filter(c => {
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(undefined);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">إدارة ومتابعة قائمة {title} في النظام.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة عميل جديد</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو المجال..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-all">
          <Filter className="h-5 w-5" />
          <span>تصفية متقدمة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onEdit={handleEdit}
            onDelete={deleteCustomer}
          />
        ))}
        {filteredCustomers.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">لا يوجد نتائج</h3>
            <p className="text-gray-500">لم نجد أي عملاء يطابقون بحثك حالياً.</p>
          </div>
        )}
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingCustomer}
      />
    </div>
  );
}
