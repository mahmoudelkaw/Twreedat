// ==========================================
// COMPREHENSIVE ADMIN PANEL
// ==========================================
// 6 Main Pages:
// 1. Overview (Dashboard with analytics)
// 2. Users Management (Table + Profile Details)
// 3. Transactions (Orders Table + Order Details)
// 4. Products Management (CRUD + Categories)
// 5. Admin Users (Manage admin accounts)
// 6. Terms & Conditions (Content editor)
// ==========================================

// ADMIN STATE MANAGEMENT
const ADMIN_STATE = {
  selectedUser: null,
  selectedOrder: null,
  selectedProduct: null,
  editingProduct: false,
  editingCategory: false,
  showingOrderDetails: false,
  VAT_RATE: 0.14 // 14% VAT for Egypt
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
    { id: 'terms', icon: 'fa-file-contract', label: t('terms') || 'Terms & Conditions' }
  ]

  return `
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-br from-blue-600 to-purple-600 text-white fixed h-full shadow-2xl">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-8 flex items-center">
            <i class="fas fa-shield-alt mr-3"></i>
            ${t('adminPanel') || 'Admin Panel'}
          </h2>
          
          <nav class="space-y-2">
            ${sidebarItems.map(item => `
              <button 
                onclick="navigateTo('admin-${item.id}')" 
                class="w-full text-left px-4 py-3 rounded-lg transition ${
                  activePage === item.id 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'hover:bg-white/10'
                }"
              >
                <i class="fas ${item.icon} mr-3"></i>
                ${item.label}
              </button>
            `).join('')}
          </nav>

          <div class="mt-8 pt-8 border-t border-white/20">
            <button 
              onclick="navigateTo('home')" 
              class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
            >
              <i class="fas fa-arrow-left mr-3"></i>
              ${t('backToSite') || 'Back to Site'}
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64 p-8">
        ${content}
      </main>
    </div>
  `
}

// ==========================================
// PAGE 1: OVERVIEW / DASHBOARD
// ==========================================

async function renderAdminOverview() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const analyticsResult = await api('/admin/analytics')
  const analytics = analyticsResult.success ? analyticsResult.data : {}
  
  const content = `
    <div>
      <h1 class="text-3xl font-bold mb-8">${t('overview') || 'Dashboard Overview'}</h1>
      
      <!-- Analytics Cards -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">${t('totalOrders') || 'Total Orders'}</p>
              <p class="text-4xl font-bold text-blue-600">${analytics.total_orders || 0}</p>
            </div>
            <div class="bg-blue-100 p-4 rounded-full">
              <i class="fas fa-shopping-cart text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">${t('totalRevenue') || 'Total Revenue'}</p>
              <p class="text-4xl font-bold text-green-600">${(analytics.total_revenue || 0).toFixed(0)}</p>
              <p class="text-sm text-gray-500">${t('egp') || 'EGP'}</p>
            </div>
            <div class="bg-green-100 p-4 rounded-full">
              <i class="fas fa-dollar-sign text-3xl text-green-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">${t('totalUsers') || 'Total Users'}</p>
              <p class="text-4xl font-bold text-purple-600">${analytics.total_users || 0}</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-full">
              <i class="fas fa-users text-3xl text-purple-600"></i>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">${t('pendingOrders') || 'Pending Orders'}</p>
              <p class="text-4xl font-bold text-yellow-600">${analytics.pending_orders || 0}</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-full">
              <i class="fas fa-clock text-3xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-chart-line mr-2 text-blue-600"></i>
          ${t('topProducts') || 'Top Selling Products'}
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">${t('product') || 'Product'}</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">${t('orders') || 'Orders'}</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">${t('revenue') || 'Revenue'}</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              ${analytics.top_products && analytics.top_products.length > 0
                ? analytics.top_products.slice(0, 5).map(product => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3">${product.name_en || product.name_ar}</td>
                    <td class="px-4 py-3">${product.order_count || 0}</td>
                    <td class="px-4 py-3 font-semibold text-green-600">${(product.total_revenue || 0).toFixed(0)} ${t('egp') || 'EGP'}</td>
                  </tr>
                `).join('')
                : `<tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">${t('noData') || 'No data available'}</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6">
        <button onclick="navigateTo('admin-transactions')" class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
          <i class="fas fa-receipt text-4xl mb-4"></i>
          <h3 class="text-xl font-semibold">${t('viewAllTransactions') || 'View All Transactions'}</h3>
        </button>
        
        <button onclick="navigateTo('admin-users')" class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
          <i class="fas fa-users text-4xl mb-4"></i>
          <h3 class="text-xl font-semibold">${t('manageUsers') || 'Manage Users'}</h3>
        </button>
        
        <button onclick="navigateTo('admin-products')" class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
          <i class="fas fa-box text-4xl mb-4"></i>
          <h3 class="text-xl font-semibold">${t('manageProducts') || 'Manage Products'}</h3>
        </button>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'overview')
}

// ==========================================
// PAGE 2: USERS MANAGEMENT
// ==========================================

async function renderAdminUsers() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/admin/users')
  const users = result.success ? result.data : []
  
  const content = `
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">${t('users') || 'Users Management'}</h1>
        <div class="flex gap-2">
          <input 
            type="text" 
            id="userSearch" 
            placeholder="${t('search') || 'Search users...'}" 
            class="px-4 py-2 border rounded-lg"
            onkeyup="filterUsers()"
          >
          <select id="userTypeFilter" class="px-4 py-2 border rounded-lg" onchange="filterUsers()">
            <option value="">${t('allTypes') || 'All Types'}</option>
            <option value="company">${t('company') || 'Company'}</option>
            <option value="individual">${t('individual') || 'Individual'}</option>
          </select>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full" id="usersTable">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('id') || 'ID'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('email') || 'Email'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('phone') || 'Phone'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('type') || 'Type'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('status') || 'Status'}</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">${t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody class="divide-y" id="usersTableBody">
              ${users.map(user => `
                <tr class="hover:bg-gray-50 cursor-pointer user-row" data-type="${user.user_type}">
                  <td class="px-6 py-4">#${user.id}</td>
                  <td class="px-6 py-4">${user.email}</td>
                  <td class="px-6 py-4">${user.phone || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                      user.user_type === 'company' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }">
                      ${user.user_type}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                      ${user.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="viewUserProfile(${user.id})" 
                      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <i class="fas fa-eye mr-2"></i>${t('view') || 'View'}
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

// User Profile Detail View
async function viewUserProfile(userId) {
  const userResult = await api(`/admin/users/${userId}`)
  const ordersResult = await api(`/admin/users/${userId}/orders`)
  
  if (!userResult.success) {
    alert('Error loading user profile')
    return
  }
  
  const user = userResult.data
  const orders = ordersResult.success ? ordersResult.data : []
  
  const modal = `
    <div id="userProfileModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="closeUserProfile(event)">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">${user.full_name || user.email}</h2>
              <p class="text-blue-100">${user.email}</p>
            </div>
            <button onclick="closeUserProfile()" class="text-white hover:bg-white/20 p-2 rounded-lg">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>
        </div>

        <!-- User Information -->
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">${t('userInformation') || 'User Information'}</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">${t('id') || 'User ID'}</p>
              <p class="font-semibold">#${user.id}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">${t('phone') || 'Phone'}</p>
              <p class="font-semibold">${user.phone || '-'}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">${t('type') || 'User Type'}</p>
              <p class="font-semibold">${user.user_type}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600 mb-1">${t('status') || 'Status'}</p>
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }">
                ${user.status}
              </span>
            </div>
            ${user.company_name ? `
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('companyName') || 'Company Name'}</p>
                <p class="font-semibold">${user.company_name}</p>
              </div>
            ` : ''}
            ${user.commercial_registration ? `
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('commercialReg') || 'Commercial Registration'}</p>
                <p class="font-semibold">${user.commercial_registration}</p>
              </div>
            ` : ''}
          </div>

          <!-- User Orders -->
          <h3 class="text-xl font-bold mb-4">${t('orderHistory') || 'Order History'}</h3>
          ${orders.length > 0 ? `
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${t('orderNumber') || 'Order #'}</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${t('date') || 'Date'}</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${t('total') || 'Total'}</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${t('status') || 'Status'}</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  ${orders.map(order => `
                    <tr class="hover:bg-gray-50 cursor-pointer" onclick="viewTransactionDetail(${order.id})">
                      <td class="px-4 py-3 font-semibold">${order.order_number}</td>
                      <td class="px-4 py-3">${new Date(order.created_at).toLocaleDateString()}</td>
                      <td class="px-4 py-3 font-semibold text-green-600">${order.total_amount.toFixed(0)} ${t('egp') || 'EGP'}</td>
                      <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}">
                          ${order.status}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <div class="text-center py-8 text-gray-500">
              <i class="fas fa-shopping-cart text-4xl mb-2"></i>
              <p>${t('noOrders') || 'No orders yet'}</p>
            </div>
          `}

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-6">
            ${user.status === 'pending' ? `
              <button onclick="approveUser(${user.id})" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-check mr-2"></i>${t('approve') || 'Approve'}
              </button>
            ` : ''}
            ${user.status === 'active' ? `
              <button onclick="suspendUser(${user.id})" class="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                <i class="fas fa-ban mr-2"></i>${t('suspend') || 'Suspend'}
              </button>
            ` : ''}
            ${user.status === 'suspended' ? `
              <button onclick="activateUser(${user.id})" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-check mr-2"></i>${t('activate') || 'Activate'}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `
  
  document.body.insertAdjacentHTML('beforeend', modal)
}

function closeUserProfile(event) {
  if (!event || event.target.id === 'userProfileModal') {
    const modal = document.getElementById('userProfileModal')
    if (modal) modal.remove()
  }
}

function filterUsers() {
  const searchValue = document.getElementById('userSearch').value.toLowerCase()
  const typeFilter = document.getElementById('userTypeFilter').value
  const rows = document.querySelectorAll('.user-row')
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase()
    const type = row.dataset.type
    const matchesSearch = text.includes(searchValue)
    const matchesType = !typeFilter || type === typeFilter
    
    row.style.display = (matchesSearch && matchesType) ? '' : 'none'
  })
}

// ==========================================
// PAGE 3: TRANSACTIONS (ORDERS)
// ==========================================

async function renderAdminTransactions() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/admin/orders')
  const orders = result.success ? result.data : []
  
  const content = `
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">${t('transactions') || 'Transactions'}</h1>
        <select id="statusFilter" class="px-4 py-2 border rounded-lg" onchange="filterTransactions()">
          <option value="">${t('allStatuses') || 'All Statuses'}</option>
          <option value="pending">${t('pending') || 'Pending'}</option>
          <option value="confirmed">${t('confirmed') || 'Confirmed'}</option>
          <option value="processing">${t('processing') || 'Processing'}</option>
          <option value="delivered">${t('delivered') || 'Delivered'}</option>
          <option value="cancelled">${t('cancelled') || 'Cancelled'}</option>
        </select>
      </div>

      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full" id="transactionsTable">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('orderID') || 'Order ID'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('customer') || 'Customer'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('type') || 'Type'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('amount') || 'Amount'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('status') || 'Status'}</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">${t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody class="divide-y" id="transactionsTableBody">
              ${orders.map(order => `
                <tr class="hover:bg-gray-50 cursor-pointer transaction-row" data-status="${order.status}">
                  <td class="px-6 py-4 font-semibold">${order.order_number}</td>
                  <td class="px-6 py-4">${order.customer_name || order.customer_email}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                      order.customer_type === 'company' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }">
                      ${order.customer_type || 'individual'}
                    </span>
                  </td>
                  <td class="px-6 py-4 font-semibold text-green-600">${order.total_amount.toFixed(0)} ${t('egp') || 'EGP'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(order.status)}">
                      ${order.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="viewTransactionDetail(${order.id})" 
                      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <i class="fas fa-eye mr-2"></i>${t('view') || 'View'}
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

// Transaction Detail View with VAT and Packing Slip
async function viewTransactionDetail(orderId) {
  const orderResult = await api(`/admin/orders/${orderId}`)
  
  if (!orderResult.success) {
    alert('Error loading order details')
    return
  }
  
  const order = orderResult.data
  const subtotal = order.total_amount / (1 + ADMIN_STATE.VAT_RATE)
  const vat = order.total_amount - subtotal
  
  const modal = `
    <div id="transactionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onclick="closeTransactionDetail(event)">
      <div class="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">${t('orderDetails') || 'Order Details'}</h2>
              <p class="text-blue-100">${order.order_number}</p>
            </div>
            <div class="flex gap-2">
              <button onclick="printPackingSlip(${orderId})" class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                <i class="fas fa-print mr-2"></i>${t('print') || 'Print'}
              </button>
              <button onclick="closeTransactionDetail()" class="text-white hover:bg-white/20 p-2 rounded-lg">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <!-- Customer Information -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">${t('customerInformation') || 'Customer Information'}</h3>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('name') || 'Name'}</p>
                <p class="font-semibold">${order.customer_name || '-'}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('email') || 'Email'}</p>
                <p class="font-semibold">${order.customer_email}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('phone') || 'Phone'}</p>
                <p class="font-semibold">${order.customer_phone || '-'}</p>
              </div>
            </div>
          </div>

          <!-- Delivery Information -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">${t('deliveryInfo') || 'Delivery Information'}</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('address') || 'Address'}</p>
                <p class="font-semibold">${order.delivery_address || '-'}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 mb-1">${t('city') || 'City'}</p>
                <p class="font-semibold">${order.delivery_city || '-'}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">${t('orderItems') || 'Order Items'}</h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">${t('product') || 'Product'}</th>
                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">${t('unitPrice') || 'Unit Price'}</th>
                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">${t('quantity') || 'Quantity'}</th>
                    <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">${t('total') || 'Total'}</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  ${order.items && order.items.map(item => `
                    <tr>
                      <td class="px-4 py-3">${item.product_name}</td>
                      <td class="px-4 py-3 text-right">${item.unit_price.toFixed(2)} ${t('egp') || 'EGP'}</td>
                      <td class="px-4 py-3 text-right">${item.quantity}</td>
                      <td class="px-4 py-3 text-right font-semibold">${(item.unit_price * item.quantity).toFixed(2)} ${t('egp') || 'EGP'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pricing Breakdown -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl mb-6">
            <div class="flex justify-between items-center mb-3">
              <span class="text-gray-700">${t('subtotal') || 'Subtotal'}</span>
              <span class="text-xl font-semibold">${subtotal.toFixed(2)} ${t('egp') || 'EGP'}</span>
            </div>
            <div class="flex justify-between items-center mb-3 pb-3 border-b">
              <span class="text-gray-700">${t('vat') || 'VAT'} (14%)</span>
              <span class="text-xl font-semibold">${vat.toFixed(2)} ${t('egp') || 'EGP'}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold">${t('total') || 'Total'}</span>
              <span class="text-3xl font-bold text-green-600">${order.total_amount.toFixed(2)} ${t('egp') || 'EGP'}</span>
            </div>
          </div>

          <!-- Order Status Management -->
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4">${t('orderStatus') || 'Order Status'}</h3>
            <div class="flex gap-2">
              ${['pending', 'confirmed', 'processing', 'delivered'].map(status => `
                <button 
                  onclick="updateOrderStatus(${orderId}, '${status}')"
                  class="px-4 py-2 rounded-lg font-semibold transition ${
                    order.status === status 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }"
                >
                  ${t(status) || status}
                </button>
              `).join('')}
              <button 
                onclick="updateOrderStatus(${orderId}, 'cancelled')"
                class="px-4 py-2 rounded-lg font-semibold transition ${
                  order.status === 'cancelled' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }"
              >
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

function closeTransactionDetail(event) {
  if (!event || event.target.id === 'transactionModal') {
    const modal = document.getElementById('transactionModal')
    if (modal) modal.remove()
  }
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

async function updateOrderStatus(orderId, newStatus) {
  const result = await api(`/admin/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: newStatus })
  })
  
  if (result.success) {
    alert(`${t('orderStatusUpdated') || 'Order status updated successfully'}`)
    closeTransactionDetail()
    navigateTo('admin-transactions')
  } else {
    alert(`${t('error') || 'Error'}: ${result.error}`)
  }
}

// Print Packing Slip
function printPackingSlip(orderId) {
  // Open a print-friendly window
  window.open(`/api/admin/orders/${orderId}/packing-slip`, '_blank')
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function approveUser(userId) {
  const result = await api(`/admin/users/${userId}/approve`, { method: 'PUT' })
  if (result.success) {
    alert(t('userApproved') || 'User approved successfully')
    closeUserProfile()
    navigateTo('admin-users')
  } else {
    alert(t('error') || 'Error updating user')
  }
}

async function suspendUser(userId) {
  const result = await api(`/admin/users/${userId}/suspend`, { method: 'PUT' })
  if (result.success) {
    alert(t('userSuspended') || 'User suspended successfully')
    closeUserProfile()
    navigateTo('admin-users')
  } else {
    alert(t('error') || 'Error updating user')
  }
}

async function activateUser(userId) {
  const result = await api(`/admin/users/${userId}/activate`, { method: 'PUT' })
  if (result.success) {
    alert(t('userActivated') || 'User activated successfully')
    closeUserProfile()
    navigateTo('admin-users')
  } else {
    alert(t('error') || 'Error updating user')
  }
}

// Export for integration
if (typeof window !== 'undefined') {
  window.renderAdminOverview = renderAdminOverview
  window.renderAdminUsers = renderAdminUsers
  window.renderAdminTransactions = renderAdminTransactions
  window.viewUserProfile = viewUserProfile
  window.closeUserProfile = closeUserProfile
  window.viewTransactionDetail = viewTransactionDetail
  window.closeTransactionDetail = closeTransactionDetail
  window.filterUsers = filterUsers
  window.filterTransactions = filterTransactions
  window.updateOrderStatus = updateOrderStatus
  window.printPackingSlip = printPackingSlip
  window.approveUser = approveUser
  window.suspendUser = suspendUser
  window.activateUser = activateUser
  window.ADMIN_STATE = ADMIN_STATE
}
