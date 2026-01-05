import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/utils/translations';
import { Button } from '@/components/common/Button';

export const Navbar: React.FC = () => {
  const { user, language, setLanguage, cart, logout, isAdmin } = useApp();
  const navigate = useNavigate();
  const t = (key: string) => translations[language][key as keyof typeof translations['ar']] || key;
  const isRTL = language === 'ar';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo & Links */}
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link
              to="/"
              className="text-white font-bold text-xl flex items-center gap-2"
            >
              <i className="fas fa-box"></i>
              {language === 'ar' ? 'توريدات' : 'Twreedat'}
            </Link>

            <Link
              to="/products"
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              {t('products')}
            </Link>

            {user && (
              <Link
                to="/orders"
                className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-receipt mr-2"></i>
                {t('myOrders')}
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-cog mr-2"></i>
                {t('adminPanel')}
              </Link>
            )}
          </div>

          {/* Right side - Actions */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors"
            >
              <i className="fas fa-language text-xl"></i>
            </button>

            {user ? (
              <>
                <Link
                  to="/cart"
                  className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors relative"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {cart.item_count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.item_count}
                    </span>
                  )}
                </Link>

                <div className="flex items-center gap-2 text-white">
                  <span className="text-sm">{user.full_name}</span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleLogout}
                    icon="fas fa-sign-out-alt"
                  >
                    {t('logout')}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="secondary">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                    {t('register')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
