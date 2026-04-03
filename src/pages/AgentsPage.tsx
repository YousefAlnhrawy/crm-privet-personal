import { useCRM } from '../context/CRMContext';
import { Phone, Mail, User, ShieldCheck } from 'lucide-react';

export default function AgentsPage() {
  const { agents, customers } = useCRM();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-gray-900">فريق المناديب</h1>
        <p className="text-gray-500 mt-1">قائمة المناديب المسؤولين عن متابعة العملاء.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const agentCustomers = customers.filter(c => c.agentId === agent.id);
          const contractedCount = agentCustomers.filter(c => c.status === 'تم التعاقد').length;

          return (
            <div key={agent.id} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-600 mt-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>مندوب معتمد</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{agent.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="text-center">
                  <span className="block text-2xl font-black text-gray-900">{agentCustomers.length}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">إجمالي العملاء</span>
                </div>
                <div className="text-center border-r">
                  <span className="block text-2xl font-black text-green-600">{contractedCount}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">تعاقدات ناجحة</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
