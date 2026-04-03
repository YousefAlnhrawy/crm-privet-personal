import React from 'react';
import { Customer } from '../types';
import { Phone, MessageCircle, Mail, Edit2, Trash2, Building2, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
  const statusColors = {
    'مهتم': 'bg-blue-100 text-blue-700 border-blue-200',
    'غير مهتم': 'bg-red-100 text-red-700 border-red-200',
    'تم التعاقد': 'bg-green-100 text-green-700 border-green-200',
  };

  const sizeColors = {
    'صغير': 'bg-gray-100 text-gray-600',
    'متوسط': 'bg-orange-100 text-orange-600',
    'كبير': 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-gray-50 shadow-sm">
            {customer.image ? (
              <img src={customer.image} alt={customer.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
            <div className="flex gap-2 mt-1">
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", statusColors[customer.status])}>
                {customer.status}
              </span>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", sizeColors[customer.size])}>
                {customer.size}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(customer)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(customer.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4 text-gray-400" />
          <span>المجال: {customer.industry || 'غير محدد'}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
          {customer.notes || 'لا توجد ملاحظات إضافية...'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${customer.phone}`}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-blue-50 p-3 text-blue-600 hover:bg-blue-100 transition-all active:scale-95"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] font-bold">اتصال</span>
        </a>
        <a
          href={`https://wa.me/${customer.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-green-50 p-3 text-green-600 hover:bg-green-100 transition-all active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[10px] font-bold">واتساب</span>
        </a>
        <a
          href={`mailto:${customer.email}`}
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-orange-50 p-3 text-orange-600 hover:bg-orange-100 transition-all active:scale-95"
        >
          <Mail className="h-5 w-5" />
          <span className="text-[10px] font-bold">إيميل</span>
        </a>
      </div>
    </div>
  );
};

export default CustomerCard;
