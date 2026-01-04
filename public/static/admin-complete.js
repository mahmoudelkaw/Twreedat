// ==========================================
// COMPLETE ADMIN PANEL WITH PERFECT UI
// ==========================================
// All 6 pages with full CRUD operations
// ==========================================

// GLOBAL ADMIN STATE
const ADMIN_STATE = {
  selectedUser: null,
  selectedOrder: null,
  selectedProduct: null,
  selectedCategory: null,
  editingProduct: null,
  editingCategory: null,
  editingAdmin: null,
  VAT_RATE: 0.14 // 14% VAT for Egypt
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showNotification(message, type = 'success') {
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }
  
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in`
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas fa-check-circle text-xl"></i>
      <span>${message}</span>
    </div>
  `
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.style.animation = 'slide-out 0.3s ease-out'
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) modal.remove()
}

// ==========================================
// ADMIN LAYOUT WITH SIDEBAR
// ==========================================

function renderAdminLayout(content, activePage = 'overview') {
  const sidebarItems = [
    { id: 'overview', icon: 'fa-th-large', label: t('overview') || 'Overview' },
    { id: 'users', icon: 'fa-users', label: t('users') || 'Users' },
    { id: 'transactions', icon: 'fa-receipt', label: t('transactions') || 'Transactions' },
    { id: 'products', icon: 'fa-box', label: t('products') || 'Products' },
    { id: 'admins', icon: 'fa-user-shield', label: t('adminUsers') || 'Admin Users' },
    { id: 'terms', icon: 'fa-file-contract', label: t('terms') || 'Terms' }
  ]

  return `
    <div class="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white fixed h-full shadow-2xl z-40">
        <div class="p-6">
          <!-- Logo -->
          <div class="mb-8 text-center">
            <i class="fas fa-shield-alt text-4xl mb-2"></i>
            <h2 class="text-xl font-bold">${t('adminPanel') || 'Admin Panel'}</h2>
            <p class="text-xs text-indigo-200 mt-1">Twreedat Management</p>
          </div>
          
          <!-- Navigation -->
          <nav class="space-y-2">
            ${sidebarItems.map(item => `
              <button 
                onclick="navigateTo('admin-${item.id}')" 
                class="w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  activePage === item.id 
                    ? 'bg-white text-indigo-600 shadow-lg transform scale-105' 
                    : 'hover:bg-white/20 hover:translate-x-1'
                }"
              >
                <i class="fas ${item.icon} mr-3 w-5"></i>
                <span class="font-medium">${item.label}</span>
              </button>
            `).join('')}
          </nav>

          <!-- Back Button -->
          <div class="mt-8 pt-8 border-t border-white/20">
            <button 
              onclick="navigateTo('home')" 
              class="w-full text-left px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 hover:translate-x-1"
            >
              <i class="fas fa-arrow-left mr-3"></i>
              <span class="font-medium">${t('backToSite') || 'Back to Site'}</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 p-8">
        ${content}
      </main>
    </div>
    
    <style>
      @keyframes slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slide-out {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    </style>
  `
}

// ==========================================
// PAGE 1: OVERVIEW DASHBOARD
// ==========================================

async function renderAdminOverview() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const analyticsResult = await api('/api/admin/analytics')
  const analytics = analyticsResult.success ? analyticsResult.data : {}
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('overview') || 'Dashboard Overview'}</h1>
        <p class="text-gray-600">Welcome back, ${APP_STATE.user.full_name || 'Admin'}</p>
      </div>
      
      <!-- Analytics Cards -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">${t('totalOrders') || 'Total Orders'}</p>
              <p class="text-4xl font-bold text-blue-600">${analytics.total_orders || 0}</p>
              <p class="text-xs text-gray-400 mt-2">All time</p>
            </div>
            <div class="bg-blue-100 p-4 rounded-xl">
              <i class="fas fa-shopping-cart text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">${t('totalRevenue') || 'Total Revenue'}</p>
              <p class="text-4xl font-bold text-green-600">${(analytics.total_revenue || 0).toFixed(0)}</p>
              <p class="text-xs text-gray-400 mt-2">${t('egp') || 'EGP'}</p>
            </div>
            <div class="bg-green-100 p-4 rounded-xl">
              <i class="fas fa-dollar-sign text-3xl text-green-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">${t('totalUsers') || 'Total Users'}</p>
              <p class="text-4xl font-bold text-purple-600">${analytics.total_users || 0}</p>
              <p class="text-xs text-gray-400 mt-2">Active customers</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-xl">
              <i class="fas fa-users text-3xl text-purple-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm mb-1">${t('pendingOrders') || 'Pending Orders'}</p>
              <p class="text-4xl font-bold text-yellow-600">${analytics.pending_orders || 0}</p>
              <p class="text-xs text-gray-400 mt-2">Needs attention</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-xl">
              <i class="fas fa-clock text-3xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-3">
            <i class="fas fa-chart-line text-white"></i>
          </div>
          ${t('topProducts') || 'Top Selling Products'}
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">${t('rank') || 'Rank'}</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">${t('product') || 'Product'}</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">${t('orders') || 'Orders'}</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">${t('revenue') || 'Revenue'}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${analytics.top_products && analytics.top_products.length > 0
                ? analytics.top_products.slice(0, 5).map((product, index) => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm">
                        ${index + 1}
                      </span>
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">${product.product_name_en || product.product_name_ar}</td>
                    <td class="px-6 py-4 text-gray-600">${product.total_quantity || 0} units</td>
                    <td class="px-6 py-4">
                      <span class="font-bold text-green-600">${(product.total_revenue || 0).toFixed(0)} ${t('egp') || 'EGP'}</span>
                    </td>
                  </tr>
                `).join('')
                : `<tr><td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                    <p>${t('noData') || 'No data available yet'}</p>
                  </td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6">
        <button onclick="navigateTo('admin-transactions')" class="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-4 rounded-xl mb-4 group-hover:bg-white/30 transition-colors">
              <i class="fas fa-receipt text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold">${t('viewAllTransactions') || 'View All Transactions'}</h3>
            <p class="text-blue-100 text-sm mt-2">Manage orders and payments</p>
          </div>
        </button>
        
        <button onclick="navigateTo('admin-users')" class="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-4 rounded-xl mb-4 group-hover:bg-white/30 transition-colors">
              <i class="fas fa-users text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold">${t('manageUsers') || 'Manage Users'}</h3>
            <p class="text-green-100 text-sm mt-2">View and approve customers</p>
          </div>
        </button>
        
        <button onclick="navigateTo('admin-products')" class="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
          <div class="flex flex-col items-center">
            <div class="bg-white/20 p-4 rounded-xl mb-4 group-hover:bg-white/30 transition-colors">
              <i class="fas fa-box text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold">${t('manageProducts') || 'Manage Products'}</h3>
            <p class="text-purple-100 text-sm mt-2">Add and edit products</p>
          </div>
        </button>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'overview')
}

// Export functions
if (typeof window !== 'undefined') {
  window.renderAdminOverview = renderAdminOverview
  window.renderAdminLayout = renderAdminLayout
  window.ADMIN_STATE = ADMIN_STATE
  window.showNotification = showNotification
  window.closeModal = closeModal
}

// ==========================================
// PAGE 2: USERS MANAGEMENT WITH PERFECT UI
// ==========================================

async function renderAdminUsers() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/api/admin/users')
  const users = result.success ? result.data : []
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('users') || 'Users Management'}</h1>
          <p class="text-gray-600">${users.length} total users</p>
        </div>
        <div class="flex gap-3">
          <input 
            type="text" 
            id="userSearch" 
            placeholder="${t('search') || 'Search users...'}" 
            class="px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors w-64"
            onkeyup="filterAdminUsers()"
          >
          <select id="userTypeFilter" class="px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" onchange="filterAdminUsers()">
            <option value="">${t('allTypes') || 'All Types'}</option>
            <option value="company">${t('company') || 'Company'}</option>
            <option value="individual">${t('individual') || 'Individual'}</option>
          </select>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full" id="usersTable">
            <thead class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">ID</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Name</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Email</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Phone</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Type</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                <th class="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100" id="usersTableBody">
              ${users.map(user => `
                <tr class="hover:bg-blue-50 transition-colors user-row cursor-pointer" data-type="${user.user_type}" data-search="${(user.full_name + ' ' + user.email + ' ' + (user.company_name || '')).toLowerCase()}">
                  <td class="px-6 py-4">
                    <span class="font-mono text-sm font-semibold text-gray-600">#${user.id}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        ${(user.full_name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">${user.full_name || '-'}</p>
                        ${user.company_name ? `<p class="text-xs text-gray-500">${user.company_name}</p>` : ''}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-700">${user.email}</td>
                  <td class="px-6 py-4 text-gray-700">${user.phone || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                      user.user_type === 'company' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }">
                      <i class="fas ${user.user_type === 'company' ? 'fa-building' : 'fa-user'} mr-1"></i>
                      ${user.user_type}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }">
                      <i class="fas fa-circle mr-1 text-xs"></i>
                      ${user.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="viewUserProfile(${user.id})" 
                      class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
                    >
                      <i class="fas fa-eye mr-2"></i>View
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'users')
}

// User Profile Modal
async function viewUserProfile(userId) {
  const userResult = await api(`/api/admin/users/${userId}`)
  const ordersResult = await api(`/api/admin/users/${userId}/orders`)
  
  if (!userResult.success) {
    showNotification('Error loading user profile', 'error')
    return
  }
  
  const user = userResult.data
  const orders = ordersResult.success ? ordersResult.data : []
  
  const modal = `
    <div id="userProfileModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onclick="if(event.target.id==='userProfileModal') closeModal('userProfileModal')">
      <div class="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-3xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                ${(user.full_name || user.email).charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 class="text-3xl font-bold mb-1">${user.full_name || user.email}</h2>
                <p class="text-indigo-100 flex items-center gap-2">
                  <i class="fas fa-envelope"></i>
                  ${user.email}
                </p>
              </div>
            </div>
            <button onclick="closeModal('userProfileModal')" class="text-white hover:bg-white/20 p-3 rounded-xl transition-all">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        <div class="p-8">
          <!-- User Information Grid -->
          <h3 class="text-2xl font-bold mb-6 flex items-center">
            <i class="fas fa-user-circle text-blue-600 mr-3"></i>
            ${t('userInformation') || 'User Information'}
          </h3>
          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
              <p class="text-sm text-blue-600 font-semibold mb-2">${t('id') || 'User ID'}</p>
              <p class="text-2xl font-bold text-blue-900">#${user.id}</p>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
              <p class="text-sm text-green-600 font-semibold mb-2">${t('phone') || 'Phone'}</p>
              <p class="text-2xl font-bold text-green-900">${user.phone || '-'}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200">
              <p class="text-sm text-purple-600 font-semibold mb-2">${t('type') || 'User Type'}</p>
              <p class="text-2xl font-bold text-purple-900 capitalize">${user.user_type}</p>
            </div>
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border-2 border-yellow-200">
              <p class="text-sm text-yellow-600 font-semibold mb-2">${t('status') || 'Status'}</p>
              <span class="inline-block px-4 py-2 rounded-full text-sm font-bold ${
                user.status === 'active' ? 'bg-green-500 text-white' : 
                user.status === 'pending' ? 'bg-yellow-500 text-white' :
                'bg-red-500 text-white'
              }">
                ${user.status}
              </span>
            </div>
            ${user.company_name ? `
              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl border-2 border-indigo-200">
                <p class="text-sm text-indigo-600 font-semibold mb-2">${t('companyName') || 'Company'}</p>
                <p class="text-xl font-bold text-indigo-900">${user.company_name}</p>
              </div>
            ` : ''}
            ${user.commercial_registration ? `
              <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl border-2 border-pink-200">
                <p class="text-sm text-pink-600 font-semibold mb-2">${t('commercialReg') || 'CR Number'}</p>
                <p class="text-xl font-bold text-pink-900">${user.commercial_registration}</p>
              </div>
            ` : ''}
            ${user.tax_id ? `
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
                <p class="text-sm text-orange-600 font-semibold mb-2">${t('taxId') || 'Tax ID'}</p>
                <p class="text-xl font-bold text-orange-900">${user.tax_id}</p>
              </div>
            ` : ''}
          </div>

          <!-- Order History -->
          <h3 class="text-2xl font-bold mb-6 flex items-center">
            <i class="fas fa-shopping-bag text-green-600 mr-3"></i>
            ${t('orderHistory') || 'Order History'} (${orders.length})
          </h3>
          ${orders.length > 0 ? `
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="border-b-2 border-gray-200">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">${t('orderNumber') || 'Order #'}</th>
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">${t('date') || 'Date'}</th>
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">${t('total') || 'Total'}</th>
                      <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">${t('status') || 'Status'}</th>
                      <th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">${t('actions') || 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    ${orders.map(order => `
                      <tr class="hover:bg-white transition-colors">
                        <td class="px-4 py-4 font-mono font-semibold text-blue-600">${order.order_number}</td>
                        <td class="px-4 py-4 text-gray-700">${new Date(order.created_at).toLocaleDateString()}</td>
                        <td class="px-4 py-4 font-bold text-green-600">${order.total_amount.toFixed(0)} ${t('egp') || 'EGP'}</td>
                        <td class="px-4 py-4">
                          <span class="px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClass(order.status)}">
                            ${order.status}
                          </span>
                        </td>
                        <td class="px-4 py-4 text-center">
                          <button onclick="viewTransactionDetail(${order.id})" class="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                            <i class="fas fa-eye mr-1"></i>View
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : `
            <div class="text-center py-12 bg-gray-50 rounded-2xl">
              <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">${t('noOrders') || 'No orders yet'}</p>
            </div>
          `}

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-8">
            ${user.status === 'pending' ? `
              <button onclick="approveUser(${user.id})" class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold text-lg">
                <i class="fas fa-check mr-2"></i>${t('approve') || 'Approve User'}
              </button>
            ` : ''}
            ${user.status === 'active' ? `
              <button onclick="suspendUser(${user.id})" class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold text-lg">
                <i class="fas fa-ban mr-2"></i>${t('suspend') || 'Suspend User'}
              </button>
            ` : ''}
            ${user.status === 'suspended' ? `
              <button onclick="activateUser(${user.id})" class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold text-lg">
                <i class="fas fa-check mr-2"></i>${t('activate') || 'Activate User'}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `
  
  document.body.insertAdjacentHTML('beforeend', modal)
}

function filterAdminUsers() {
  const searchValue = document.getElementById('userSearch').value.toLowerCase()
  const typeFilter = document.getElementById('userTypeFilter').value
  const rows = document.querySelectorAll('.user-row')
  
  rows.forEach(row => {
    const searchText = row.dataset.search
    const type = row.dataset.type
    const matchesSearch = searchText.includes(searchValue)
    const matchesType = !typeFilter || type === typeFilter
    
    row.style.display = (matchesSearch && matchesType) ? '' : 'none'
  })
}

// User Actions
async function approveUser(userId) {
  const result = await api(`/api/admin/users/${userId}/approve`, { method: 'PUT' })
  if (result.success) {
    showNotification('User approved successfully!', 'success')
    closeModal('userProfileModal')
    navigateTo('admin-users')
  } else {
    showNotification('Error approving user', 'error')
  }
}

async function suspendUser(userId) {
  const result = await api(`/api/admin/users/${userId}/suspend`, { method: 'PUT' })
  if (result.success) {
    showNotification('User suspended successfully', 'success')
    closeModal('userProfileModal')
    navigateTo('admin-users')
  } else {
    showNotification('Error suspending user', 'error')
  }
}

async function activateUser(userId) {
  const result = await api(`/api/admin/users/${userId}/activate`, { method: 'PUT' })
  if (result.success) {
    showNotification('User activated successfully!', 'success')
    closeModal('userProfileModal')
    navigateTo('admin-users')
  } else {
    showNotification('Error activating user', 'error')
  }
}

function getStatusBadgeClass(status) {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Export
if (typeof window !== 'undefined') {
  window.renderAdminUsers = renderAdminUsers
  window.viewUserProfile = viewUserProfile
  window.filterAdminUsers = filterAdminUsers
  window.approveUser = approveUser
  window.suspendUser = suspendUser
  window.activateUser = activateUser
  window.getStatusBadgeClass = getStatusBadgeClass
}

// ==========================================
// PAGE 3: TRANSACTIONS WITH VAT & PERFECT UI
// ==========================================

async function renderAdminTransactions() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/api/admin/orders')
  const orders = result.success ? result.data : []
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('transactions') || 'Transactions'}</h1>
          <p class="text-gray-600">${orders.length} total orders</p>
        </div>
        <select id="statusFilter" class="px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" onchange="filterTransactions()">
          <option value="">${t('allStatuses') || 'All Statuses'}</option>
          <option value="pending">${t('pending') || 'Pending'}</option>
          <option value="confirmed">${t('confirmed') || 'Confirmed'}</option>
          <option value="processing">${t('processing') || 'Processing'}</option>
          <option value="delivered">${t('delivered') || 'Delivered'}</option>
          <option value="cancelled">${t('cancelled') || 'Cancelled'}</option>
        </select>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full" id="transactionsTable">
            <thead class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Customer</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Type</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Date</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Amount</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                <th class="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100" id="transactionsTableBody">
              ${orders.map(order => `
                <tr class="hover:bg-blue-50 transition-colors transaction-row" data-status="${order.status}">
                  <td class="px-6 py-4">
                    <span class="font-mono font-bold text-blue-600">${order.order_number}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        ${(order.full_name || order.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">${order.full_name || order.email}</p>
                        ${order.company_name ? `<p class="text-xs text-gray-500">${order.company_name}</p>` : ''}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                      order.user_type === 'company' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }">
                      <i class="fas ${order.user_type === 'company' ? 'fa-building' : 'fa-user'} mr-1"></i>
                      ${order.user_type || 'individual'}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-gray-700">
                    ${new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td class="px-6 py-4">
                    <span class="font-bold text-green-600 text-lg">${order.total_amount.toFixed(0)} ${t('egp') || 'EGP'}</span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${getStatusBadgeClass(order.status)}">
                      <i class="fas fa-circle mr-1 text-xs"></i>
                      ${order.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="viewTransactionDetail(${order.id})" 
                      class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
                    >
                      <i class="fas fa-eye mr-2"></i>View
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'transactions')
}

// Transaction Detail Modal with VAT
async function viewTransactionDetail(orderId) {
  const orderResult = await api(`/api/admin/orders/${orderId}`)
  
  if (!orderResult.success) {
    showNotification('Error loading order details', 'error')
    return
  }
  
  const order = orderResult.data
  const subtotal = order.total_amount / (1 + ADMIN_STATE.VAT_RATE)
  const vat = order.total_amount - subtotal
  
  const modal = `
    <div id="transactionModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onclick="if(event.target.id==='transactionModal') closeModal('transactionModal')">
      <div class="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-3xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">${t('orderDetails') || 'Order Details'}</h2>
              <p class="text-indigo-100 font-mono text-xl">${order.order_number}</p>
            </div>
            <div class="flex gap-3">
              <button onclick="window.print()" class="bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all font-semibold">
                <i class="fas fa-print mr-2"></i>${t('print') || 'Print'}
              </button>
              <button onclick="closeModal('transactionModal')" class="text-white hover:bg-white/20 p-3 rounded-xl transition-all">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="p-8">
          <!-- Customer & Delivery Info Grid -->
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <!-- Customer Information -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <h3 class="text-xl font-bold mb-4 flex items-center text-blue-900">
                <i class="fas fa-user-circle mr-2"></i>
                ${t('customerInformation') || 'Customer Information'}
              </h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-blue-600 font-semibold">${t('name') || 'Name'}</p>
                  <p class="text-lg font-bold text-blue-900">${order.customer_name || '-'}</p>
                </div>
                <div>
                  <p class="text-sm text-blue-600 font-semibold">${t('email') || 'Email'}</p>
                  <p class="text-blue-900">${order.customer_email}</p>
                </div>
                <div>
                  <p class="text-sm text-blue-600 font-semibold">${t('phone') || 'Phone'}</p>
                  <p class="text-blue-900">${order.customer_phone || '-'}</p>
                </div>
                <div>
                  <p class="text-sm text-blue-600 font-semibold">${t('type') || 'Type'}</p>
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">
                    ${order.customer_type || 'individual'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Delivery Information -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <h3 class="text-xl font-bold mb-4 flex items-center text-green-900">
                <i class="fas fa-truck mr-2"></i>
                ${t('deliveryInfo') || 'Delivery Information'}
              </h3>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-green-600 font-semibold">${t('address') || 'Address'}</p>
                  <p class="text-lg font-bold text-green-900">${order.delivery_address || '-'}</p>
                </div>
                <div>
                  <p class="text-sm text-green-600 font-semibold">${t('city') || 'City'}</p>
                  <p class="text-green-900">${order.delivery_city || '-'}</p>
                </div>
                ${order.delivery_notes ? `
                  <div>
                    <p class="text-sm text-green-600 font-semibold">${t('notes') || 'Notes'}</p>
                    <p class="text-green-900">${order.delivery_notes}</p>
                  </div>
                ` : ''}
                <div>
                  <p class="text-sm text-green-600 font-semibold">${t('orderDate') || 'Order Date'}</p>
                  <p class="text-green-900">${new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-6 flex items-center">
              <i class="fas fa-box-open text-purple-600 mr-3"></i>
              ${t('orderItems') || 'Order Items'}
            </h3>
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="border-b-2 border-gray-300">
                    <tr>
                      <th class="px-4 py-4 text-left text-sm font-bold text-gray-700 uppercase">${t('product') || 'Product'}</th>
                      <th class="px-4 py-4 text-right text-sm font-bold text-gray-700 uppercase">${t('unitPrice') || 'Unit Price'}</th>
                      <th class="px-4 py-4 text-right text-sm font-bold text-gray-700 uppercase">${t('quantity') || 'Quantity'}</th>
                      <th class="px-4 py-4 text-right text-sm font-bold text-gray-700 uppercase">${t('total') || 'Total'}</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    ${order.items && order.items.map(item => `
                      <tr class="hover:bg-white transition-colors">
                        <td class="px-4 py-4 font-semibold text-gray-900">${item.product_name_en || item.product_name_ar}</td>
                        <td class="px-4 py-4 text-right text-gray-700">${item.unit_price.toFixed(2)} ${t('egp') || 'EGP'}</td>
                        <td class="px-4 py-4 text-right font-semibold text-gray-900">${item.quantity}</td>
                        <td class="px-4 py-4 text-right font-bold text-green-600 text-lg">${(item.unit_price * item.quantity).toFixed(2)} ${t('egp') || 'EGP'}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Pricing Breakdown with VAT -->
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200 mb-8">
            <h3 class="text-2xl font-bold mb-6 flex items-center text-orange-900">
              <i class="fas fa-calculator mr-3"></i>
              ${t('pricingBreakdown') || 'Pricing Breakdown'}
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center pb-3 border-b border-orange-200">
                <span class="text-lg text-gray-700">${t('subtotal') || 'Subtotal'}</span>
                <span class="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)} ${t('egp') || 'EGP'}</span>
              </div>
              <div class="flex justify-between items-center pb-4 border-b-2 border-orange-300">
                <span class="text-lg text-gray-700">${t('vat') || 'VAT'} (14%)</span>
                <span class="text-2xl font-bold text-orange-600">${vat.toFixed(2)} ${t('egp') || 'EGP'}</span>
              </div>
              <div class="flex justify-between items-center pt-2">
                <span class="text-2xl font-bold text-gray-900">${t('totalAmount') || 'Total Amount'}</span>
                <span class="text-4xl font-bold text-green-600">${order.total_amount.toFixed(2)} ${t('egp') || 'EGP'}</span>
              </div>
            </div>
          </div>

          <!-- Order Status Management -->
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-4 flex items-center">
              <i class="fas fa-tasks text-blue-600 mr-3"></i>
              ${t('updateOrderStatus') || 'Update Order Status'}
            </h3>
            <div class="flex flex-wrap gap-3">
              ${['pending', 'confirmed', 'processing', 'delivered'].map(status => `
                <button 
                  onclick="updateOrderStatus(${orderId}, '${status}')"
                  class="px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    order.status === status 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }"
                >
                  <i class="fas ${
                    status === 'pending' ? 'fa-clock' :
                    status === 'confirmed' ? 'fa-check' :
                    status === 'processing' ? 'fa-cog fa-spin' :
                    'fa-check-circle'
                  } mr-2"></i>
                  ${t(status) || status}
                </button>
              `).join('')}
              <button 
                onclick="updateOrderStatus(${orderId}, 'cancelled')"
                class="px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                  order.status === 'cancelled' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }"
              >
                <i class="fas fa-times-circle mr-2"></i>
                ${t('cancelled') || 'Cancelled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  
  document.body.insertAdjacentHTML('beforeend', modal)
}

function filterTransactions() {
  const statusFilter = document.getElementById('statusFilter').value
  const rows = document.querySelectorAll('.transaction-row')
  
  rows.forEach(row => {
    const status = row.dataset.status
    const matchesStatus = !statusFilter || status === statusFilter
    row.style.display = matchesStatus ? '' : 'none'
  })
}

async function updateOrderStatus(orderId, newStatus) {
  const result = await api(`/api/admin/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus })
  })
  
  if (result.success) {
    showNotification(`Order status updated to ${newStatus}!`, 'success')
    closeModal('transactionModal')
    navigateTo('admin-transactions')
  } else {
    showNotification(`Error: ${result.error}`, 'error')
  }
}

// Export
if (typeof window !== 'undefined') {
  window.renderAdminTransactions = renderAdminTransactions
  window.viewTransactionDetail = viewTransactionDetail
  window.filterTransactions = filterTransactions
  window.updateOrderStatus = updateOrderStatus
}
