import { useCRM } from '../useCRM';
import { Users, UserCheck, UserPlus, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { customers, agents } = useCRM();

  const stats = [
    { 
      label: 'إجمالي العملاء', 
      value: customers.length, 
      icon: Users, 
      color: 'blue',
      trend: '+12% من الشهر الماضي'
    },
    { 
      label: 'عملاء متعاقدين', 
      value: customers.filter(c => c.status === 'تم التعاقد').length, 
      icon: UserCheck, 
      color: 'green',
      trend: '+5% من الشهر الماضي'
    },
    { 
      label: 'عملاء محتملين', 
      value: customers.filter(c => c.status === 'مهتم').length, 
      icon: TrendingUp, 
      color: 'orange',
      trend: '+8% من الشهر الماضي'
    },
    { 
      label: 'المناديب النشطين', 
      value: agents.length, 
      icon: Briefcase, 
      color: 'purple',
      trend: 'مستقر'
    },
  ];

  const recentCustomers = [...customers].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-gray-900">نظرة عامة</h1>
        <p className="text-gray-500 mt-1">مرحباً بك في لوحة التحكم الخاصة بنظام إدارة العملاء.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                تحديث الآن
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-bold">{stat.label}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
              <span className="text-xs font-bold text-green-500">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">أحدث العملاء المضافين</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-gray-400 text-sm border-b">
                  <th className="pb-4 font-bold">العميل</th>
                  <th className="pb-4 font-bold">المجال</th>
                  <th className="pb-4 font-bold">الحالة</th>
                  <th className="pb-4 font-bold">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentCustomers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {customer.image ? (
                            <img src={customer.image} className="h-full w-full object-cover" />
                          ) : (
                            <UserPlus className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <span className="font-bold text-gray-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{customer.industry}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        customer.status === 'تم التعاقد' ? 'bg-green-100 text-green-700' :
                        customer.status === 'مهتم' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
                {recentCustomers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">لا يوجد عملاء مضافين حالياً</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">توزيع العملاء</h2>
          <div className="space-y-6">
            {['مهتم', 'تم التعاقد', 'غير مهتم'].map((status) => {
              const count = customers.filter(c => c.status === status).length;
              const percentage = customers.length > 0 ? (count / customers.length) * 100 : 0;
              return (
                <div key={status} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-700">{status}</span>
                    <span className="text-gray-400">{count} عميل</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className={`h-full ${
                        status === 'تم التعاقد' ? 'bg-green-500' :
                        status === 'مهتم' ? 'bg-blue-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
