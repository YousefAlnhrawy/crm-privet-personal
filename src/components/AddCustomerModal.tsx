import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { CustomerStatus, CustomerSize } from '../types';
import { X, Upload, UserPlus } from 'lucide-react';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function AddCustomerModal({ isOpen, onClose, initialData }: AddCustomerModalProps) {
  const { addCustomer, updateCustomer, agents } = useCRM();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    whatsapp: initialData?.whatsapp || '',
    email: initialData?.email || '',
    status: (initialData?.status as CustomerStatus) || 'مهتم',
    industry: initialData?.industry || '',
    size: (initialData?.size as CustomerSize) || 'صغير',
    agentId: initialData?.agentId || agents[0]?.id || '',
    notes: initialData?.notes || '',
    image: initialData?.image || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData?.id) {
      updateCustomer(initialData.id, formData);
    } else {
      addCustomer(formData);
    }
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors group cursor-pointer relative">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <span className="mt-2 text-sm text-gray-500">ارفع صورة العميل</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            {/* Basic Info */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">اسم العميل</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="أدخل اسم العميل بالكامل"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="01xxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">واتساب</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="رقم الواتساب"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="example@mail.com"
              />
            </div>

            {/* Classification */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">حالة العميل</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomerStatus })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="مهتم">مهتم</option>
                <option value="غير مهتم">غير مهتم</option>
                <option value="تم التعاقد">تم التعاقد</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">المجال</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="مثال: عقارات، تكنولوجيا..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">حجم العميل</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value as CustomerSize })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                <option value="صغير">صغير</option>
                <option value="متوسط">متوسط</option>
                <option value="كبير">كبير</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">المندوب المسؤول</label>
              <select
                value={formData.agentId}
                onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              >
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">ملاحظات إضافية</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px]"
                placeholder="أي تفاصيل أخرى عن العميل..."
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              {initialData ? 'تحديث البيانات' : 'حفظ العميل'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 py-3 font-bold text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
