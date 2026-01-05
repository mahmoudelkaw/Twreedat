import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';
import { api } from '@/utils/api';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { Product, Category } from '@/types';

export const Products: React.FC = () => {
  const { language } = useApp();
  const [searchParams] = useSearchParams();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      setSelectedCategory(parseInt(categoryId));
    }
    loadData();
  }, [searchParams]);

  const loadData = async () => {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([
      api.get<Product[]>('/products'),
      api.get<Category[]>('/categories'),
    ]);

    if (productsRes.success && productsRes.data) {
      setProducts(productsRes.data);
    }

    if (categoriesRes.success && categoriesRes.data) {
      setCategories(categoriesRes.data);
    }

    setLoading(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? (language === 'ar' ? product.name_ar : product.name_en)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesCategory = selectedCategory
      ? product.category_id === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">{t('products')}</h1>

        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {language === 'ar' ? 'الكل' : 'All'}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.icon} {language === 'ar' ? category.name_ar : category.name_en}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">
              {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card hover className="h-full flex flex-col">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={language === 'ar' ? product.name_ar : product.name_en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className="fas fa-box text-6xl text-gray-400"></i>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg flex-1">
                      {language === 'ar' ? product.name_ar : product.name_en}
                    </h3>
                    {product.status === 'out_of_stock' && (
                      <Badge variant="danger">{language === 'ar' ? 'نفذ' : 'Out of Stock'}</Badge>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {language === 'ar' ? product.description_ar : product.description_en}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-600 font-bold text-xl">
                        {product.base_price} {t('egp')}
                      </span>
                      <span className="text-xs text-gray-600">{product.sku}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="info">
                        {t('minOrder')}: {product.min_order_quantity}
                      </Badge>
                      {product.category_name_ar && (
                        <span className="text-gray-600">
                          {language === 'ar' ? product.category_name_ar : product.category_name_en}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
