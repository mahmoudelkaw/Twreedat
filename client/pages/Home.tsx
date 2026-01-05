import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';
import { api } from '@/utils/api';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import type { Category, Product } from '@/types';

export const Home: React.FC = () => {
  const { language } = useApp();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [categoriesRes, productsRes] = await Promise.all([
      api.get<Category[]>('/categories'),
      api.get<Product[]>('/products?limit=6'),
    ]);

    if (categoriesRes.success && categoriesRes.data) {
      setCategories(categoriesRes.data);
    }

    if (productsRes.success && productsRes.data) {
      setFeaturedProducts(productsRes.data);
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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {language === 'ar' ? 'مرحباً بك في توريدات' : 'Welcome to Twreedat'}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar'
              ? 'منصة الجملة الرائدة للشركات والمؤسسات - أفضل الأسعار وأعلى جودة'
              : 'Leading B2B Wholesale Platform - Best Prices, Highest Quality'}
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <i className="fas fa-shopping-bag"></i>
              {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {language === 'ar' ? 'الفئات' : 'Categories'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <Card hover className="text-center cursor-pointer">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {language === 'ar' ? category.name_ar : category.name_en}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {language === 'ar' ? category.description_ar : category.description_en}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'منتجات مميزة' : 'Featured Products'}
          </h2>
          <Link to="/products">
            <Button variant="secondary">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
              <i className="fas fa-arrow-right"></i>
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card hover>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={language === 'ar' ? product.name_ar : product.name_en}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <i className="fas fa-box text-6xl text-gray-400"></i>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'ar' ? product.name_ar : product.name_en}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {product.base_price} {t('egp')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {t('minOrder')}: {product.min_order_quantity}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-truck text-blue-600 text-2xl"></i>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'توصيل سريع وآمن لجميع الطلبات'
                : 'Fast and secure delivery for all orders'}
            </p>
          </div>
          <div>
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-green-600 text-2xl"></i>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'منتجات عالية الجودة من أفضل الموردين'
                : 'High quality products from the best suppliers'}
            </p>
          </div>
          <div>
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-headset text-purple-600 text-2xl"></i>
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar'
                ? 'فريق دعم متاح على مدار الساعة'
                : 'Support team available around the clock'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
