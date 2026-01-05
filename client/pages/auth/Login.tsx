import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';
import { api } from '@/utils/api';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import type { User } from '@/types';

export const Login: React.FC = () => {
  const { language, setUser } = useApp();
  const navigate = useNavigate();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await api.post<User>('/auth/login', formData);

    if (result.success && result.data) {
      setUser(result.data);
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <Card>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {t('login')}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {t('password')}
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="********"
            />
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            {t('login')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              {t('register')}
            </Link>
          </p>
        </div>
      </Card>

      {/* Test Accounts Info */}
      <Card className="mt-4 bg-blue-50">
        <h3 className="font-semibold mb-2">
          {language === 'ar' ? 'حسابات تجريبية' : 'Test Accounts'}
        </h3>
        <div className="text-sm space-y-1 text-gray-700">
          <p>
            <strong>Admin:</strong> admin@twreedat.com / admin123
          </p>
          <p>
            <strong>Company:</strong> company@test.com / password123
          </p>
          <p>
            <strong>Individual:</strong> individual@test.com / password123
          </p>
        </div>
      </Card>
    </div>
  );
};
