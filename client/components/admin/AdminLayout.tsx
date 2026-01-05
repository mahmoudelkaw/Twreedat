import React, { ReactNode } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAdmin, language } = useApp();
  const location = useLocation();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { path: '/admin', icon: 'fas fa-chart-line', label: t('overview') },
    { path: '/admin/users', icon: 'fas fa-users', label: t('users') },
    { path: '/admin/transactions', icon: 'fas fa-receipt', label: t('transactions') },
    { path: '/admin/products', icon: 'fas fa-box', label: t('products') },
    { path: '/admin/categories', icon: 'fas fa-tags', label: t('categories') },
    { path: '/admin/admin-users', icon: 'fas fa-user-shield', label: t('adminUsers') },
    { path: '/admin/terms', icon: 'fas fa-file-contract', label: t('terms') },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-xl fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <i className="fas fa-cog"></i>
            {t('adminPanel')}
          </h2>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'hover:bg-blue-700 text-white'
                }`}
              >
                <i className={item.icon}></i>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
};
