// ==========================================
// PAGE 4: PRODUCTS & CATEGORIES MANAGEMENT
// ==========================================

async function renderAdminProducts() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const productsResult = await api('/api/products')
  const categoriesResult = await api('/api/categories')
  const products = productsResult.success ? productsResult.data : []
  const categories = categoriesResult.success ? categoriesResult.data : []
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('products') || 'Products Management'}</h1>
          <p class="text-gray-600">${products.length} products, ${categories.length} categories</p>
        </div>
        <button 
          onclick="showNotification('Add Product feature coming soon in Phase 2!', 'info')" 
          class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold"
        >
          <i class="fas fa-plus mr-2"></i>${t('addProduct') || 'Add Product'}
        </button>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-box-open mr-3 text-blue-600"></i>
            ${t('allProducts') || 'All Products'}
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">ID</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Product</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Category</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">SKU</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Base Price</th>
                <th class="px-6 py-5 text-center text-sm font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${products.map(product => {
                const category = categories.find(c => c.id === product.category_id)
                return `
                  <tr class="hover:bg-blue-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="font-mono text-sm font-semibold text-gray-600">#${product.id}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div>
                        <p class="font-bold text-gray-900">${product.name_en}</p>
                        <p class="text-sm text-gray-500">${product.name_ar}</p>
                        <p class="text-xs text-gray-400 mt-1">${product.brand || ''}</p>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                        ${category?.name_en || 'N/A'}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="font-mono text-sm text-gray-700">${product.sku}</span>
                    </td>
                    <td class="px-6 py-4">
                      <span class="font-bold text-green-600 text-lg">${product.base_price || 0} ${t('egp') || 'EGP'}</span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span class="px-4 py-2 rounded-full text-xs font-bold ${
                        product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }">
                        <i class="fas fa-circle mr-1 text-xs"></i>
                        ${product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                `
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-tags mr-3 text-green-600"></i>
            ${t('categories') || 'Categories Management'}
          </h2>
          <button 
            onclick="showNotification('Add Category feature coming soon in Phase 2!', 'info')" 
            class="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <i class="fas fa-plus mr-2"></i>${t('addCategory') || 'Add Category'}
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          ${categories.map(category => `
            <div class="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    ${category.name_en.charAt(0)}
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900">${category.name_en}</h3>
                    <p class="text-sm text-gray-500">${category.name_ar}</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-300">
                <p class="text-xs text-gray-500 mb-2">
                  <span class="font-semibold">Slug:</span> ${category.slug}
                </p>
                <p class="text-xs text-gray-500">
                  <span class="font-semibold">Order:</span> #${category.display_order}
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Info Banner -->
      <div class="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div class="flex items-start gap-4">
          <i class="fas fa-info-circle text-3xl"></i>
          <div>
            <h3 class="font-bold text-xl mb-2">Phase 2 Features</h3>
            <p class="text-blue-100">Full CRUD operations for products and categories, including image uploads, price tier management, and inventory tracking, will be available in Phase 2.</p>
          </div>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'products')
}

// ==========================================
// PAGE 5: ADMIN USERS MANAGEMENT
// ==========================================

async function renderAdminAdmins() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/api/admin/users?type=admin')
  let admins = result.success ? result.data : []
  
  // Filter to get only admin users
  admins = admins.filter(u => u.user_type === 'admin')
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('adminUsers') || 'Admin Users'}</h1>
          <p class="text-gray-600">${admins.length} admin accounts</p>
        </div>
        <button 
          onclick="showNotification('Add Admin feature coming soon in Phase 2!', 'info')" 
          class="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold"
        >
          <i class="fas fa-user-plus mr-2"></i>${t('addAdmin') || 'Add Admin'}
        </button>
      </div>

      <!-- Admin Users Table -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-red-600 to-pink-600 text-white">
              <tr>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">ID</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Name</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Email</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Phone</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                <th class="px-6 py-5 text-left text-sm font-bold uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${admins.map(admin => `
                <tr class="hover:bg-red-50 transition-colors">
                  <td class="px-6 py-4">
                    <span class="font-mono text-sm font-semibold text-gray-600">#${admin.id}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        ${(admin.full_name || admin.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p class="font-bold text-gray-900">${admin.full_name || '-'}</p>
                        ${admin.id === APP_STATE.user.id ? `
                          <span class="text-xs text-blue-600 font-semibold">(You)</span>
                        ` : ''}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-700">${admin.email}</td>
                  <td class="px-6 py-4 text-gray-700">${admin.phone || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                      admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                      <i class="fas fa-shield-alt mr-1"></i>
                      ${admin.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    ${new Date(admin.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Security Warning -->
      <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6">
        <div class="flex items-start gap-4">
          <i class="fas fa-exclamation-triangle text-3xl text-yellow-600"></i>
          <div>
            <h3 class="font-bold text-xl text-yellow-800 mb-2">${t('securityNote') || 'Security Note'}</h3>
            <p class="text-yellow-700">Admin users have full access to the entire platform. Only grant admin privileges to trusted personnel. In Phase 2, you'll be able to add, edit, and manage admin accounts with advanced security features.</p>
            <div class="mt-4 bg-yellow-100 rounded-lg p-4">
              <p class="text-sm font-semibold text-yellow-900 mb-2">⚠️ Current Demo Password</p>
              <p class="text-sm text-yellow-800">All test accounts use password: <code class="bg-yellow-200 px-2 py-1 rounded font-mono">admin123</code></p>
              <p class="text-sm text-yellow-800 mt-2 font-bold">⚠️ CHANGE BEFORE PRODUCTION!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'admins')
}

// ==========================================
// PAGE 6: TERMS & CONDITIONS EDITOR
// ==========================================

async function renderAdminTerms() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const content = `
    <div>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 mb-2">${t('terms') || 'Terms & Conditions'}</h1>
          <p class="text-gray-600">Manage platform legal documents</p>
        </div>
        <button 
          onclick="saveTerms()" 
          class="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-bold"
        >
          <i class="fas fa-save mr-2"></i>${t('saveChanges') || 'Save Changes'}
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- English Terms -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold mb-6 flex items-center text-blue-900">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
              <i class="fas fa-globe-americas text-blue-600"></i>
            </div>
            ${t('englishVersion') || 'English Version'}
          </h2>
          <textarea 
            id="termsEn" 
            rows="18" 
            class="w-full border-2 border-gray-200 rounded-xl p-4 font-mono text-sm focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter terms and conditions in English..."
          ># Terms and Conditions

## 1. Introduction
Welcome to Twreedat B2B Wholesale Platform...

## 2. User Accounts
All company accounts require admin approval...

## 3. Pricing and Orders
- Minimum order quantities apply
- Prices shown are for wholesale only
- VAT (14%) is added to all orders

## 4. Payment Terms
Payment terms will be specified...</textarea>
        </div>

        <!-- Arabic Terms -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h2 class="text-2xl font-bold mb-6 flex items-center text-green-900">
            <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
              <i class="fas fa-globe text-green-600"></i>
            </div>
            ${t('arabicVersion') || 'Arabic Version'}
          </h2>
          <textarea 
            id="termsAr" 
            rows="18" 
            class="w-full border-2 border-gray-200 rounded-xl p-4 font-mono text-sm focus:border-green-500 focus:outline-none transition-colors" 
            dir="rtl"
            placeholder="أدخل الشروط والأحكام بالعربية..."
          ># الشروط والأحكام

## 1. المقدمة
مرحباً بكم في منصة توريدات للبيع بالجملة...

## 2. حسابات المستخدمين
تتطلب جميع حسابات الشركات موافقة المسؤول...

## 3. التسعير والطلبات
- تطبق الحد الأدنى لكميات الطلب
- الأسعار المعروضة للجملة فقط
- يضاف ضريبة القيمة المضافة (14٪) على جميع الطلبات

## 4. شروط الدفع
سيتم تحديد شروط الدفع...</textarea>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center">
            <i class="fas fa-eye mr-3 text-purple-600"></i>
            ${t('preview') || 'Preview'}
          </h2>
          <button 
            onclick="togglePreviewLanguage()" 
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            <i class="fas fa-language mr-2"></i>
            <span id="previewLangBtn">English</span>
          </button>
        </div>
        <div id="termsPreview" class="prose max-w-none bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-200 min-h-[300px]">
          <p class="text-gray-500 italic">Type your terms above to see the preview...</p>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 class="font-bold text-xl text-blue-800 mb-4 flex items-center">
          <i class="fas fa-lightbulb mr-3 text-yellow-500"></i>
          ${t('tips') || 'Tips & Features'}
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white rounded-lg p-4">
            <p class="text-sm text-blue-900"><i class="fas fa-check-circle text-green-500 mr-2"></i> Markdown formatting supported</p>
          </div>
          <div class="bg-white rounded-lg p-4">
            <p class="text-sm text-blue-900"><i class="fas fa-check-circle text-green-500 mr-2"></i> Real-time preview available</p>
          </div>
          <div class="bg-white rounded-lg p-4">
            <p class="text-sm text-blue-900"><i class="fas fa-check-circle text-green-500 mr-2"></i> Bilingual content required</p>
          </div>
          <div class="bg-white rounded-lg p-4">
            <p class="text-sm text-blue-900"><i class="fas fa-check-circle text-green-500 mr-2"></i> Auto-save in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'terms')
}

function togglePreviewLanguage() {
  const btn = document.getElementById('previewLangBtn')
  const preview = document.getElementById('termsPreview')
  const currentLang = btn.textContent.trim()
  
  if (currentLang === 'English') {
    const termsAr = document.getElementById('termsAr').value
    preview.innerHTML = termsAr.replace(/\n/g, '<br>') || '<p class="text-gray-500 italic">لا يوجد محتوى بعد...</p>'
    preview.dir = 'rtl'
    btn.textContent = 'العربية'
  } else {
    const termsEn = document.getElementById('termsEn').value
    preview.innerHTML = termsEn.replace(/\n/g, '<br>') || '<p class="text-gray-500 italic">No content yet...</p>'
    preview.dir = 'ltr'
    btn.textContent = 'English'
  }
}

async function saveTerms() {
  const termsEn = document.getElementById('termsEn').value
  const termsAr = document.getElementById('termsAr').value
  
  if (!termsEn || !termsAr) {
    showNotification('Please fill both English and Arabic versions', 'warning')
    return
  }
  
  showNotification('Terms save functionality will be implemented in Phase 2. Your content is ready!', 'info')
}

// Export all functions
if (typeof window !== 'undefined') {
  window.renderAdminProducts = renderAdminProducts
  window.renderAdminAdmins = renderAdminAdmins
  window.renderAdminTerms = renderAdminTerms
  window.togglePreviewLanguage = togglePreviewLanguage
  window.saveTerms = saveTerms
}
