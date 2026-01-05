import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';
import { api } from '@/utils/api';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import type { Analytics } from '@/types';

export const Overview: React.FC = () => {
  const { language } = useApp();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    const result = await api.get<Analytics>('/admin/analytics');
    if (result.success && result.data) {
      setAnalytics(result.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('overview')}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">{t('totalOrders')}</p>
              <p className="text-3xl font-bold">{analytics?.total_orders || 0}</p>
            </div>
            <i className="fas fa-shopping-cart text-4xl text-blue-200"></i>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">{t('totalRevenue')}</p>
              <p className="text-3xl font-bold">
                {analytics?.total_revenue?.toFixed(0) || 0} {t('egp')}
              </p>
            </div>
            <i className="fas fa-dollar-sign text-4xl text-green-200"></i>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">{t('totalUsers')}</p>
              <p className="text-3xl font-bold">{analytics?.total_users || 0}</p>
            </div>
            <i className="fas fa-users text-4xl text-purple-200"></i>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">{t('pendingOrders')}</p>
              <p className="text-3xl font-bold">{analytics?.pending_orders || 0}</p>
            </div>
            <i className="fas fa-clock text-4xl text-orange-200"></i>
          </div>
        </Card>
      </div>

      {/* Top Products */}
      {analytics?.top_products && analytics.top_products.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {language === 'ar' ? 'أفضل المنتجات مبيعاً' : 'Top Selling Products'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600">
                    {language === 'ar' ? 'المنتج' : 'Product'}
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">
                    {language === 'ar' ? 'الكمية' : 'Quantity'}
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600">
                    {language === 'ar' ? 'الإيرادات' : 'Revenue'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.top_products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {language === 'ar' ? product.product_name_ar : product.product_name_en}
                    </td>
                    <td className="py-3 px-4">{product.total_quantity}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      {product.total_revenue.toFixed(2)} {t('egp')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/transactions">
            <Button className="w-full" icon="fas fa-receipt">
              {t('transactions')}
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button className="w-full" icon="fas fa-users">
              {t('users')}
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button className="w-full" icon="fas fa-box">
              {t('products')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
