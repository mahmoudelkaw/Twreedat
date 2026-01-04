    }
  } catch (error) {
    console.error('Price calculation error:', error)
  }
}

function adjustQuantity(delta) {
  const input = document.getElementById('quantity-input')
  const minOrder = APP_STATE.selectedProduct.min_order_quantity
  let newValue = parseInt(input.value) + delta
  if (newValue < minOrder) newValue = minOrder
  input.value = newValue
  updatePriceCalculation()
}

async function handleAddToCart() {
  const quantity = parseInt(document.getElementById('quantity-input').value)
  const productId = APP_STATE.selectedProduct.id
  
  try {
    await addToCart(productId, quantity)
    alert(`${t('addToCart')} ✓`)
  } catch (error) {
    alert(error.message)
  }
}

async function handleBuyNow() {
  await handleAddToCart()
  navigateTo('cart')
}

// ==========================================
// PAGE: CART
// ==========================================

function renderCart() {
  if (!APP_STATE.user) {
    return `
      <div class="container mx-auto px-4 py-16 text-center">
        <i class="fas fa-lock text-6xl text-gray-300 mb-4"></i>
        <h2 class="text-2xl font-bold mb-4">${t('loginHere')}</h2>
        <button onclick="navigateTo('login')" class="bg-blue-600 text-white px-6 py-3 rounded">
          ${t('login')}
        </button>
      </div>
    `
  }
  
  if (APP_STATE.cart.length === 0) {
    return `
      <div class="container mx-auto px-4 py-16 text-center">
        <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
        <h2 class="text-2xl font-bold mb-4">${t('emptyCart')}</h2>
        <button onclick="navigateTo('products')" class="bg-blue-600 text-white px-6 py-3 rounded">
          ${t('continueShopping')}
        </button>
      </div>
    `
  }
  
  const total = APP_STATE.cart.reduce((sum, item) => sum + (item.priceInfo?.subtotal || 0), 0)
  const totalDiscount = APP_STATE.cart.reduce((sum, item) => {
    const discount = (item.priceInfo?.subtotal || 0) * (item.priceInfo?.discount || 0) / 100
    return sum + discount
  }, 0)
  const finalTotal = total - totalDiscount
  
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">${t('cart')}</h1>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="md:col-span-2">
          ${APP_STATE.cart.map(item => {
            const name = APP_STATE.language === 'ar' ? item.name_ar : item.name_en
            const unitPrice = item.priceInfo?.unitPrice || 0
            const subtotal = item.priceInfo?.subtotal || 0
            const discount = item.priceInfo?.discount || 0
            
            return `
              <div class="bg-white rounded-lg shadow p-6 mb-4">
                <div class="flex gap-4">
                  <div class="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-box text-3xl text-gray-400"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold mb-2">${name}</h3>
                    <p class="text-sm text-gray-600 mb-2">SKU: ${item.sku}</p>
                    <p class="text-lg font-bold text-blue-600">${unitPrice} ${t('egp')} / ${t('carton')}</p>
                    ${discount > 0 ? `<p class="text-sm text-green-600">${t('discount')}: ${discount}%</p>` : ''}
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-600 mb-2">${t('quantity')}: ${item.quantity} ${t('cartons')}</p>
                    <p class="text-xl font-bold">${subtotal.toFixed(2)} ${t('egp')}</p>
                    <button onclick="removeFromCart(${item.id})" class="text-red-600 hover:text-red-700 mt-2">
                      <i class="fas fa-trash mr-1"></i> ${t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            `
          }).join('')}
        </div>
        
        <!-- Order Summary -->
        <div>
          <div class="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 class="text-xl font-bold mb-6">${t('orderSummary')}</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span>${t('total')}:</span>
                <span class="font-semibold">${total.toFixed(2)} ${t('egp')}</span>
              </div>
              <div class="flex justify-between text-green-600">
                <span>${t('discount')}:</span>
                <span class="font-semibold">-${totalDiscount.toFixed(2)} ${t('egp')}</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-xl">
                <span class="font-bold">${t('finalPrice')}:</span>
                <span class="font-bold text-blue-600">${finalTotal.toFixed(2)} ${t('egp')}</span>
              </div>
            </div>
            
            <!-- Delivery Info Form -->
            <div class="border-t pt-6">
              <h3 class="font-semibold mb-4">${t('deliveryInfo')}</h3>
              <input type="text" id="delivery-address" placeholder="${t('address')}" class="w-full border rounded px-3 py-2 mb-3" required />
              <input type="text" id="delivery-city" placeholder="${t('city')}" class="w-full border rounded px-3 py-2 mb-3" required />
              <textarea id="delivery-notes" placeholder="${t('notes')}" class="w-full border rounded px-3 py-2 mb-4" rows="3"></textarea>
            </div>
            
            <button onclick="handleCheckout()" class="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
              <i class="fas fa-check-circle mr-2"></i> ${t('placeOrder')}
            </button>
            
            <button onclick="navigateTo('products')" class="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50">
              ${t('continueShopping')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

async function handleCheckout() {
  const address = document.getElementById('delivery-address').value
  const city = document.getElementById('delivery-city').value
  const notes = document.getElementById('delivery-notes').value
  
  if (!address || !city) {
    alert('Please fill in delivery address and city')
    return
  }
  
  try {
    await placeOrder({
      delivery_address: address,
      delivery_city: city,
      delivery_notes: notes
    })
  } catch (error) {
    alert(error.message)
  }
}

// ==========================================
// PAGE: LOGIN
// ==========================================

function renderLogin() {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-8">${t('signIn')}</h2>
        
        <form onsubmit="handleLogin(event)">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">${t('email')}</label>
            <input type="email" id="login-email" class="w-full border rounded px-3 py-2" required />
          </div>
          
          <div class="mb-6">
            <label class="block text-gray-700 mb-2">${t('password')}</label>
            <input type="password" id="login-password" class="w-full border rounded px-3 py-2" required />
          </div>
          
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            ${t('signIn')}
          </button>
        </form>
        
        <p class="text-center mt-6 text-gray-600">
          ${t('noAccount')}
          <button onclick="navigateTo('register')" class="text-blue-600 hover:underline">${t('registerHere')}</button>
        </p>
      </div>
    </div>
  `
}

async function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value
  
  try {
    await login(email, password)
  } catch (error) {
    alert(error.message)
  }
}

// ==========================================
// PAGE: REGISTER
// ==========================================

function renderRegister() {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-8">${t('signUp')}</h2>
        
        <form onsubmit="handleRegister(event)">
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-gray-700 mb-2">${t('fullName')}</label>
              <input type="text" id="reg-fullname" class="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label class="block text-gray-700 mb-2">${t('phone')}</label>
              <input type="tel" id="reg-phone" class="w-full border rounded px-3 py-2" required />
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">${t('email')}</label>
            <input type="email" id="reg-email" class="w-full border rounded px-3 py-2" required />
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">${t('password')}</label>
            <input type="password" id="reg-password" class="w-full border rounded px-3 py-2" required />
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">${t('userType')}</label>
            <select id="reg-usertype" class="w-full border rounded px-3 py-2" onchange="toggleCompanyFields(this.value)">
              <option value="individual">${t('individual')}</option>
              <option value="company">${t('company')}</option>
            </select>
          </div>
          
          <div id="company-fields" class="hidden">
            <div class="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-700 mb-2">${t('companyName')}</label>
                <input type="text" id="reg-company" class="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">${t('commercialReg')}</label>
                <input type="text" id="reg-commercial" class="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">${t('taxId')}</label>
              <input type="text" id="reg-taxid" class="w-full border rounded px-3 py-2" />
            </div>
          </div>
          
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            ${t('signUp')}
          </button>
        </form>
        
        <p class="text-center mt-6 text-gray-600">
          ${t('haveAccount')}
          <button onclick="navigateTo('login')" class="text-blue-600 hover:underline">${t('loginHere')}</button>
        </p>
      </div>
    </div>
  `
}

function toggleCompanyFields(userType) {
  const companyFields = document.getElementById('company-fields')
  if (userType === 'company') {
    companyFields.classList.remove('hidden')
  } else {
    companyFields.classList.add('hidden')
  }
}

async function handleRegister(event) {
  event.preventDefault()
  
  const data = {
    full_name: document.getElementById('reg-fullname').value,
    phone: document.getElementById('reg-phone').value,
    email: document.getElementById('reg-email').value,
    password: document.getElementById('reg-password').value,
    user_type: document.getElementById('reg-usertype').value
  }
  
  if (data.user_type === 'company') {
    data.company_name = document.getElementById('reg-company').value
    data.commercial_registration = document.getElementById('reg-commercial').value
    data.tax_id = document.getElementById('reg-taxid').value
  }
  
  try {
    await register(data)
  } catch (error) {
    alert(error.message)
  }
}

// ==========================================
// PAGE: ORDERS (Customer)
// ==========================================

async function renderOrders() {
  if (!APP_STATE.user) {
    navigateTo('login')
    return ''
  }
  
  const result = await api(`/orders/${APP_STATE.user.id}`)
  const orders = result.success ? result.data : []
  
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">${t('myOrders')}</h1>
      
      ${orders.length === 0 ? `
        <div class="text-center py-16">
          <i class="fas fa-receipt text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">${t('noOrders')}</p>
          <button onclick="navigateTo('products')" class="mt-4 bg-blue-600 text-white px-6 py-3 rounded">
            ${t('browseProducts')}
          </button>
        </div>
      ` : `
        <div class="space-y-4">
          ${orders.map(order => `
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-bold">${t('orderNumber')}: ${order.order_number}</h3>
                  <p class="text-gray-600">${new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span class="px-4 py-2 rounded-full text-sm font-semibold ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }">
                  ${t(order.status)}
                </span>
              </div>
              <div class="border-t pt-4">
                <p class="text-2xl font-bold text-blue-600">${order.final_amount.toFixed(2)} ${t('egp')}</p>
                ${order.total_discount > 0 ? `<p class="text-green-600">${t('discount')}: ${order.total_discount.toFixed(2)} ${t('egp')}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `
}

// ==========================================
// PAGE: ADMIN DASHBOARD
// ==========================================

async function renderAdmin() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const analyticsResult = await api('/admin/analytics')
  const analytics = analyticsResult.success ? analyticsResult.data : {}
  
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">${t('adminPanel')}</h1>
      
      <!-- Analytics Cards -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 mb-1">${t('totalOrders')}</p>
              <p class="text-3xl font-bold">${analytics.total_orders || 0}</p>
            </div>
            <i class="fas fa-shopping-cart text-4xl text-blue-500"></i>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 mb-1">${t('totalRevenue')}</p>
              <p class="text-3xl font-bold">${(analytics.total_revenue || 0).toFixed(0)}</p>
              <p class="text-sm text-gray-500">${t('egp')}</p>
            </div>
            <i class="fas fa-dollar-sign text-4xl text-green-500"></i>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 mb-1">${t('totalUsers')}</p>
              <p class="text-3xl font-bold">${analytics.total_users || 0}</p>
            </div>
            <i class="fas fa-users text-4xl text-purple-500"></i>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 mb-1">${t('pendingOrders')}</p>
              <p class="text-3xl font-bold">${analytics.pending_orders || 0}</p>
            </div>
            <i class="fas fa-clock text-4xl text-yellow-500"></i>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid md:grid-cols-3 gap-6">
        <button onclick="navigateTo('admin-orders')" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
          <i class="fas fa-list text-4xl text-blue-600 mb-4"></i>
          <h3 class="text-xl font-semibold">${t('orders')}</h3>
        </button>
        
        <button onclick="navigateTo('admin-users')" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
          <i class="fas fa-users text-4xl text-green-600 mb-4"></i>
          <h3 class="text-xl font-semibold">${t('users')}</h3>
        </button>
        
        <button onclick="navigateTo('admin-products')" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center">
          <i class="fas fa-box text-4xl text-purple-600 mb-4"></i>
          <h3 class="text-xl font-semibold">${t('products')}</h3>
        </button>
      </div>
    </div>
  `
}

// ==========================================
// SEARCH & FILTER HANDLERS
// ==========================================

let searchTimeout
function handleSearch(value) {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    await loadProducts(null, value)
    render()
  }, 500)
}

async function handleCategoryFilter(categoryId) {
  await loadProducts(categoryId || null)
  render()
}

// ==========================================
// MAIN RENDER FUNCTION
// ==========================================

async function render() {
  const app = document.getElementById('app')
  
  let content = ''
  
  switch (APP_STATE.currentPage) {
    case 'home':
      content = renderHome()
      break
    case 'products':
      content = renderProducts()
      break
    case 'product':
      if (APP_STATE.pageParams?.id) {
        await loadProduct(APP_STATE.pageParams.id)
      }
      content = renderProductDetail()
      break
    case 'cart':
      content = renderCart()
      break
    case 'login':
      content = renderLogin()
      break
    case 'register':
      content = renderRegister()
      break
    case 'orders':
      content = await renderOrders()
      break
    case 'admin':
      content = await renderAdmin()
      break
    default:
      content = renderHome()
  }
  
  app.innerHTML = renderNavbar() + content
}

// ==========================================
// INITIALIZATION
// ==========================================

async function init() {
  // Set initial language
  document.documentElement.lang = APP_STATE.language
  document.documentElement.dir = APP_STATE.language === 'ar' ? 'rtl' : 'ltr'
  
  // Load initial data
  await loadCategories()
  await loadProducts()
  
  if (APP_STATE.user) {
    await loadCart()
  }
  
  // Initial render
  render()
}

// Start the app
init()
