// ==========================================
// COMPLETE ADMIN PANEL SYSTEM
// This will replace the old admin functions in app.js
// ==========================================

// ==========================================
// ADMIN LAYOUT WITH SIDEBAR
// ==========================================

function renderAdminLayout(content, activePage) {
  const isRTL = APP_STATE.language === 'ar'
  
  const menuItems = [
    { id: 'admin-overview', icon: 'fa-chart-line', label: t('overview') },
    { id: 'admin-users', icon: 'fa-users', label: t('users') },
    { id: 'admin-transactions', icon: 'fa-receipt', label: t('transactions') },
    { id: 'admin-products', icon: 'fa-box', label: t('products') },
    { id: 'admin-admins', icon: 'fa-user-shield', label: t('adminUsers') },
    { id: 'admin-terms', icon: 'fa-file-contract', label: t('termsConditions') }
  ]
  
  return `
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <div class="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-2xl flex-shrink-0">
        <div class="p-6 border-b border-blue-700">
          <h2 class="text-2xl font-bold mb-1">${t('adminPanel')}</h2>
          <p class="text-blue-200 text-sm">${APP_STATE.user?.full_name || 'Admin'}</p>
          <p class="text-blue-300 text-xs">${APP_STATE.user?.email || ''}</p>
        </div>
        
        <nav class="p-3">
          ${menuItems.map(item => `
            <button 
              onclick="navigateTo('${item.id}')" 
              class="w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 mb-2 rounded-lg transition flex items-center gap-3 ${
                activePage === item.id 
                  ? 'bg-white text-blue-600 shadow-lg font-bold' 
                  : 'text-white hover:bg-blue-700'
              }"
            >
              <i class="fas ${item.icon} w-5"></i>
              <span>${item.label}</span>
            </button>
          `).join('')}
          
          <div class="border-t border-blue-700 mt-6 pt-6">
            <button 
              onclick="navigateTo('home')" 
              class="w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg transition flex items-center gap-3 text-white hover:bg-blue-700"
            >
              <i class="fas fa-home w-5"></i>
              <span>${t('home')}</span>
            </button>
          </div>
        </nav>
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 overflow-auto">
        ${content}
      </div>
    </div>
  `
}

// ==========================================
// PAGE 1: ADMIN OVERVIEW (DASHBOARD)
// ==========================================

async function renderAdminOverview() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const analyticsResult = await api('/admin/analytics')
  const analytics = analyticsResult.success ? analyticsResult.data : {}
  
  const content = `
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">${t('overview')}</h1>
        <p class="text-gray-600">${APP_STATE.language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to your admin dashboard'}</p>
      </div>
      
      <!-- Analytics Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover-lift">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalOrders')}</p>
              <p class="text-4xl font-bold text-gray-800">${analytics.total_orders || 0}</p>
            </div>
            <div class="bg-blue-100 p-4 rounded-full">
              <i class="fas fa-shopping-cart text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover-lift">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalRevenue')}</p>
              <p class="text-4xl font-bold text-gray-800">${(analytics.total_revenue || 0).toFixed(0)}</p>
              <p class="text-sm text-gray-500 mt-1">${t('egp')}</p>
            </div>
            <div class="bg-green-100 p-4 rounded-full">
              <i class="fas fa-dollar-sign text-3xl text-green-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover-lift">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalUsers')}</p>
              <p class="text-4xl font-bold text-gray-800">${analytics.total_users || 0}</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-full">
              <i class="fas fa-users text-3xl text-purple-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover-lift">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('pendingOrders')}</p>
              <p class="text-4xl font-bold text-gray-800">${analytics.pending_orders || 0}</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-full">
              <i class="fas fa-clock text-3xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <i class="fas fa-trophy text-yellow-500"></i>
          ${t('topProducts')}
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">${t('productName')}</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">${t('quantity')}</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">${t('totalRevenue')}</th>
              </tr>
            </thead>
            <tbody>
              ${(analytics.top_products || []).length > 0 ? (analytics.top_products || []).map((product, index) => `
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <span class="bg-blue-100 text-blue-600 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">${index + 1}</span>
                      <span class="font-medium">${APP_STATE.language === 'ar' ? product.product_name_ar : product.product_name_en}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-600">${product.total_quantity}</td>
                  <td class="px-6 py-4">
                    <span class="font-bold text-green-600">${Number(product.total_revenue).toFixed(2)} ${t('egp')}</span>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="3" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-box-open text-5xl mb-3 text-gray-300"></i>
                    <p>${APP_STATE.language === 'ar' ? 'لا توجد بيانات' : 'No data available'}</p>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6">
        <button onclick="navigateTo('admin-users')" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <i class="fas fa-users text-5xl mb-4"></i>
          <h3 class="text-xl font-bold mb-2">${t('users')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'إدارة المستخدمين' : 'Manage users'}</p>
        </button>
        
        <button onclick="navigateTo('admin-transactions')" class="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <i class="fas fa-receipt text-5xl mb-4"></i>
          <h3 class="text-xl font-bold mb-2">${t('transactions')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'عرض الطلبات' : 'View orders'}</p>
        </button>
        
        <button onclick="navigateTo('admin-products')" class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
          <i class="fas fa-box text-5xl mb-4"></i>
          <h3 class="text-xl font-bold mb-2">${t('products')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'إدارة المنتجات' : 'Manage products'}</p>
        </button>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'admin-overview')
}

// File continues in next part due to size...
// This is just part 1 of the complete admin system
