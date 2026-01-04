// This file will be merged into app.js
// Contains all admin panel functions

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
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <div class="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white ${isRTL ? 'border-l' : 'border-r'} border-blue-900">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">${t('adminPanel')}</h2>
          <p class="text-blue-200 text-sm">${APP_STATE.user?.full_name || 'Admin'}</p>
        </div>
        
        <nav class="px-3">
          ${menuItems.map(item => `
            <button 
              onclick="navigateTo('${item.id}')" 
              class="w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 mb-2 rounded-lg transition flex items-center gap-3 ${
                activePage === item.id 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-blue-700'
              }"
            >
              <i class="fas ${item.icon} w-5"></i>
              <span>${item.label}</span>
            </button>
          `).join('')}
          
          <button 
            onclick="navigateTo('home')" 
            class="w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 mb-2 rounded-lg transition flex items-center gap-3 text-white hover:bg-blue-700 mt-6 border-t border-blue-700 pt-6"
          >
            <i class="fas fa-home w-5"></i>
            <span>${t('home')}</span>
          </button>
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
// PAGE: ADMIN OVERVIEW
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
        <h1 class="text-3xl font-bold text-gray-800">${t('overview')}</h1>
        <p class="text-gray-600 mt-2">${APP_STATE.language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to your dashboard'}</p>
      </div>
      
      <!-- Analytics Cards -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-elegant p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalOrders')}</p>
              <p class="text-3xl font-bold text-gray-800">${analytics.total_orders || 0}</p>
            </div>
            <div class="bg-blue-100 p-4 rounded-full">
              <i class="fas fa-shopping-cart text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-elegant p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalRevenue')}</p>
              <p class="text-3xl font-bold text-gray-800">${(analytics.total_revenue || 0).toFixed(0)}</p>
              <p class="text-sm text-gray-500">${t('egp')}</p>
            </div>
            <div class="bg-green-100 p-4 rounded-full">
              <i class="fas fa-dollar-sign text-2xl text-green-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-elegant p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('totalUsers')}</p>
              <p class="text-3xl font-bold text-gray-800">${analytics.total_users || 0}</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-full">
              <i class="fas fa-users text-2xl text-purple-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-elegant p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium uppercase mb-2">${t('pendingOrders')}</p>
              <p class="text-3xl font-bold text-gray-800">${analytics.pending_orders || 0}</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-full">
              <i class="fas fa-clock text-2xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-elegant p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">${t('topProducts')}</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b">
              <tr class="text-left text-sm text-gray-600">
                <th class="pb-3">${t('productName')}</th>
                <th class="pb-3">${t('quantity')}</th>
                <th class="pb-3">${t('totalRevenue')}</th>
              </tr>
            </thead>
            <tbody>
              ${(analytics.top_products || []).map(product => `
                <tr class="border-b last:border-0">
                  <td class="py-3">${APP_STATE.language === 'ar' ? product.product_name_ar : product.product_name_en}</td>
                  <td class="py-3">${product.total_quantity}</td>
                  <td class="py-3 font-bold">${Number(product.total_revenue).toFixed(2)} ${t('egp')}</td>
                </tr>
              `).join('') || `
                <tr>
                  <td colspan="3" class="py-8 text-center text-gray-500">
                    ${APP_STATE.language === 'ar' ? 'لا توجد بيانات' : 'No data available'}
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6">
        <button onclick="navigateTo('admin-users')" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <i class="fas fa-users text-3xl mb-3"></i>
          <h3 class="text-lg font-bold">${t('users')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'إدارة المستخدمين' : 'Manage users'}</p>
        </button>
        
        <button onclick="navigateTo('admin-transactions')" class="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <i class="fas fa-receipt text-3xl mb-3"></i>
          <h3 class="text-lg font-bold">${t('transactions')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'عرض الطلبات' : 'View orders'}</p>
        </button>
        
        <button onclick="navigateTo('admin-products')" class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <i class="fas fa-box text-3xl mb-3"></i>
          <h3 class="text-lg font-bold">${t('products')}</h3>
          <p class="text-sm opacity-90">${APP_STATE.language === 'ar' ? 'إدارة المنتجات' : 'Manage products'}</p>
        </button>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'admin-overview')
}

// This file continues in the next part...
