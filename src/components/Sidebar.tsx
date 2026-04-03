import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, UserPlus, Briefcase, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/' },
    { icon: UserPlus, label: 'إضافة عميل', path: '/add' },
    { icon: Users, label: 'العملاء المحتملين', path: '/leads' },
    { icon: UserCheck, label: 'العملاء المتعاقدين', path: '/contracted' },
    { icon: Briefcase, label: 'المناديب', path: '/agents' },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 border-l bg-white p-4 shadow-sm z-40">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <Settings className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-black text-gray-900">نظام CRM</h1>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
