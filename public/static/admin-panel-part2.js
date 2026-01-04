// ==========================================
// PAGE 4: PRODUCTS MANAGEMENT with CRUD
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
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">${t('products') || 'Products Management'}</h1>
        <button 
          onclick="openProductForm()" 
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
        >
          <i class="fas fa-plus mr-2"></i>${t('addProduct') || 'Add Product'}
        </button>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('id') || 'ID'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('product') || 'Product'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('category') || 'Category'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('sku') || 'SKU'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('basePrice') || 'Base Price'}</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">${t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              ${products.map(product => `
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">#${product.id}</td>
                  <td class="px-6 py-4">
                    <div>
                      <p class="font-semibold">${product.name_en}</p>
                      <p class="text-sm text-gray-500">${product.name_ar}</p>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    ${categories.find(c => c.id === product.category_id)?.name_en || '-'}
                  </td>
                  <td class="px-6 py-4 font-mono text-sm">${product.sku}</td>
                  <td class="px-6 py-4 font-semibold text-green-600">${product.base_price || 0} ${t('egp') || 'EGP'}</td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="editProduct(${product.id})" 
                      class="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button 
                      onclick="deleteProduct(${product.id})" 
                      class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Categories Management -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">${t('categories') || 'Categories Management'}</h2>
          <button 
            onclick="openCategoryForm()" 
            class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
          >
            <i class="fas fa-plus mr-2"></i>${t('addCategory') || 'Add Category'}
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          ${categories.map(category => `
            <div class="border rounded-lg p-4 hover:shadow-md transition">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-lg">${category.name_en}</h3>
                <div>
                  <button 
                    onclick="editCategory(${category.id})" 
                    class="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    onclick="deleteCategory(${category.id})" 
                    class="text-red-600 hover:text-red-800"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <p class="text-sm text-gray-600">${category.name_ar}</p>
              <p class="text-xs text-gray-500 mt-2">Slug: ${category.slug}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'products')
}

// Product Form Modal (simplified version)
function openProductForm(productId = null) {
  alert('Product CRUD functionality will be implemented in Phase 2. Currently, manage products through the database.')
}

function editProduct(productId) {
  alert('Edit Product functionality will be implemented in Phase 2.')
}

function deleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    alert('Delete functionality will be implemented in Phase 2.')
  }
}

function openCategoryForm(categoryId = null) {
  alert('Category CRUD functionality will be implemented in Phase 2.')
}

function editCategory(categoryId) {
  alert('Edit Category functionality will be implemented in Phase 2.')
}

function deleteCategory(categoryId) {
  if (confirm('Are you sure you want to delete this category?')) {
    alert('Delete functionality will be implemented in Phase 2.')
  }
}

// ==========================================
// PAGE 5: ADMIN USERS MANAGEMENT
// ==========================================

async function renderAdminAdmins() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  const result = await api('/admin/users?type=admin')
  const admins = result.success ? result.data : []
  
  const content = `
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">${t('adminUsers') || 'Admin Users Management'}</h1>
        <button 
          onclick="openAdminUserForm()" 
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
        >
          <i class="fas fa-user-plus mr-2"></i>${t('addAdmin') || 'Add Admin'}
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('id') || 'ID'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('name') || 'Name'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('email') || 'Email'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('phone') || 'Phone'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('status') || 'Status'}</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">${t('createdAt') || 'Created'}</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">${t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              ${admins.map(admin => `
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">#${admin.id}</td>
                  <td class="px-6 py-4 font-semibold">${admin.full_name || '-'}</td>
                  <td class="px-6 py-4">${admin.email}</td>
                  <td class="px-6 py-4">${admin.phone || '-'}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                      admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }">
                      ${admin.status}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-600">
                    ${new Date(admin.created_at).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      onclick="editAdminUser(${admin.id})" 
                      class="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    ${admin.id !== APP_STATE.user.id ? `
                      <button 
                        onclick="deleteAdminUser(${admin.id})" 
                        class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div class="flex items-start">
          <i class="fas fa-info-circle text-yellow-600 text-xl mr-3 mt-1"></i>
          <div>
            <h3 class="font-bold text-yellow-800 mb-2">${t('securityNote') || 'Security Note'}</h3>
            <p class="text-sm text-yellow-700">
              ${t('adminSecurityNote') || 'Admin users have full access to the platform. Only grant admin privileges to trusted personnel.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'admins')
}

function openAdminUserForm() {
  alert('Add Admin functionality will be implemented in Phase 2. You can manually add admin users through the database.')
}

function editAdminUser(adminId) {
  alert('Edit Admin functionality will be implemented in Phase 2.')
}

function deleteAdminUser(adminId) {
  if (confirm('Are you sure you want to delete this admin user?')) {
    alert('Delete functionality will be implemented in Phase 2.')
  }
}

// ==========================================
// PAGE 6: TERMS & CONDITIONS EDITOR
// ==========================================

async function renderAdminTerms() {
  if (!APP_STATE.user || APP_STATE.user.user_type !== 'admin') {
    return `<div class="text-center py-16">Access Denied</div>`
  }
  
  // Load current terms from database
  const termsResult = await api('/api/settings')
  const settings = termsResult.success ? termsResult.data : []
  const termsEn = settings.find(s => s.key === 'terms_en')?.value || ''
  const termsAr = settings.find(s => s.key === 'terms_ar')?.value || ''
  
  const content = `
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">${t('terms') || 'Terms & Conditions'}</h1>
        <button 
          onclick="saveTerms()" 
          class="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
        >
          <i class="fas fa-save mr-2"></i>${t('saveChanges') || 'Save Changes'}
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- English Terms -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <i class="fas fa-globe-americas mr-2 text-blue-600"></i>
            ${t('englishVersion') || 'English Version'}
          </h2>
          <textarea 
            id="termsEn" 
            rows="20" 
            class="w-full border rounded-lg p-4 font-mono text-sm"
            placeholder="Enter terms and conditions in English..."
          >${termsEn}</textarea>
        </div>

        <!-- Arabic Terms -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <i class="fas fa-globe mr-2 text-green-600"></i>
            ${t('arabicVersion') || 'Arabic Version'}
          </h2>
          <textarea 
            id="termsAr" 
            rows="20" 
            class="w-full border rounded-lg p-4 font-mono text-sm" 
            dir="rtl"
            placeholder="أدخل الشروط والأحكام بالعربية..."
          >${termsAr}</textarea>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="mt-6 bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">${t('preview') || 'Preview'}</h2>
          <button 
            onclick="togglePreviewLanguage()" 
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <i class="fas fa-language mr-2"></i>
            <span id="previewLangBtn">English</span>
          </button>
        </div>
        <div id="termsPreview" class="prose max-w-none border rounded-lg p-6 bg-gray-50">
          ${termsEn || '<p class="text-gray-500">No content yet...</p>'}
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="font-bold text-blue-800 mb-2 flex items-center">
          <i class="fas fa-lightbulb mr-2"></i>
          ${t('tips') || 'Tips'}
        </h3>
        <ul class="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>${t('termsHTMLSupport') || 'You can use HTML tags for formatting'}</li>
          <li>${t('termsPreview') || 'Use the preview section to see how it will look'}</li>
          <li>${t('termsBilingual') || 'Make sure to fill both English and Arabic versions'}</li>
          <li>${t('termsSave') || 'Don\'t forget to save your changes!'}</li>
        </ul>
      </div>
    </div>
  `
  
  return renderAdminLayout(content, 'terms')
}

function togglePreviewLanguage() {
  const btn = document.getElementById('previewLangBtn')
  const preview = document.getElementById('termsPreview')
  const currentLang = btn.textContent
  
  if (currentLang === 'English') {
    const termsAr = document.getElementById('termsAr').value
    preview.innerHTML = termsAr || '<p class="text-gray-500">لا يوجد محتوى بعد...</p>'
    preview.dir = 'rtl'
    btn.textContent = 'العربية'
  } else {
    const termsEn = document.getElementById('termsEn').value
    preview.innerHTML = termsEn || '<p class="text-gray-500">No content yet...</p>'
    preview.dir = 'ltr'
    btn.textContent = 'English'
  }
}

async function saveTerms() {
  const termsEn = document.getElementById('termsEn').value
  const termsAr = document.getElementById('termsAr').value
  
  if (!termsEn || !termsAr) {
    alert(t('fillBothVersions') || 'Please fill both English and Arabic versions')
    return
  }
  
  try {
    // In Phase 2, implement actual API call to save terms
    // For now, show success message
    alert(t('termsSaved') || 'Terms & Conditions will be saved in Phase 2. Currently stored in database.')
    
    // const result = await api('/api/admin/settings/terms', {
    //   method: 'PUT',
    //   body: JSON.stringify({ terms_en: termsEn, terms_ar: termsAr })
    // })
    
    // if (result.success) {
    //   alert(t('termsSaved') || 'Terms & Conditions saved successfully!')
    // }
  } catch (error) {
    alert(t('error') || 'Error saving terms')
  }
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

if (typeof window !== 'undefined') {
  window.renderAdminProducts = renderAdminProducts
  window.renderAdminAdmins = renderAdminAdmins
  window.renderAdminTerms = renderAdminTerms
  window.openProductForm = openProductForm
  window.editProduct = editProduct
  window.deleteProduct = deleteProduct
  window.openCategoryForm = openCategoryForm
  window.editCategory = editCategory
  window.deleteCategory = deleteCategory
  window.openAdminUserForm = openAdminUserForm
  window.editAdminUser = editAdminUser
  window.deleteAdminUser = deleteAdminUser
  window.saveTerms = saveTerms
  window.togglePreviewLanguage = togglePreviewLanguage
}
