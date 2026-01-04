// ==========================================
// GLOBAL STATE MANAGEMENT
// ==========================================

const APP_STATE = {
  language: localStorage.getItem('language') || 'ar',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  cart: [],
  currentPage: 'home',
  products: [],
  categories: [],
  selectedProduct: null,
  selectedCategory: null
}

// ==========================================
// TRANSLATIONS
// ==========================================

const TRANSLATIONS = {
  ar: {
    siteName: 'توريدات',
    siteTagline: 'منصة الجملة للشركات',
    home: 'الرئيسية',
    products: 'المنتجات',
    categories: 'الأقسام',
    cart: 'السلة',
    login: 'تسجيل الدخول',
    register: 'تسجيل جديد',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    myOrders: 'طلباتي',
    welcome: 'مرحباً',
    search: 'بحث...',
    allCategories: 'جميع الأقسام',
    viewDetails: 'عرض التفاصيل',
    addToCart: 'أضف للسلة',
    buyNow: 'اشتري الآن',
    minOrder: 'الحد الأدنى للطلب',
    cartons: 'كرتونة',
    carton: 'كرتونة',
    pricePerCarton: 'السعر لكل كرتونة',
    quantity: 'الكمية',
    total: 'الإجمالي',
    discount: 'الخصم',
    finalPrice: 'السعر النهائي',
    specifications: 'المواصفات',
    pricingTiers: 'أسعار الجملة',
    quantityRange: 'نطاق الكمية',
    unitPrice: 'سعر الوحدة',
    saveAmount: 'وفر',
    emptyCart: 'السلة فارغة',
    checkout: 'إتمام الطلب',
    remove: 'حذف',
    continueShopping: 'متابعة التسوق',
    orderSummary: 'ملخص الطلب',
    deliveryInfo: 'معلومات التوصيل',
    address: 'العنوان',
    city: 'المدينة',
    notes: 'ملاحظات',
    placeOrder: 'تأكيد الطلب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    userType: 'نوع الحساب',
    individual: 'فردي',
    company: 'شركة',
    companyName: 'اسم الشركة',
    commercialReg: 'السجل التجاري',
    taxId: 'الرقم الضريبي',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب؟',
    registerHere: 'سجل هنا',
    loginHere: 'سجل الدخول',
    orderNumber: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    orderStatus: 'حالة الطلب',
    orderTotal: 'المبلغ الإجمالي',
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    processing: 'قيد المعالجة',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
    noOrders: 'لا توجد طلبات',
    adminPanel: 'لوحة الإدارة',
    users: 'المستخدمين',
    orders: 'الطلبات',
    analytics: 'التحليلات',
    totalOrders: 'إجمالي الطلبات',
    totalRevenue: 'إجمالي الإيرادات',
    totalUsers: 'إجمالي المستخدمين',
    pendingOrders: 'الطلبات المعلقة',
    topProducts: 'أكثر المنتجات مبيعاً',
    status: 'الحالة',
    actions: 'الإجراءات',
    approve: 'قبول',
    reject: 'رفض',
    suspend: 'تعليق',
    active: 'نشط',
    egp: 'ج.م',
    featured: 'مميز',
    brand: 'الماركة',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    productDetails: 'تفاصيل المنتج',
    b2bPlatform: 'منصة توريدات الجملة للشركات والمؤسسات',
    browseProducts: 'تصفح المنتجات',
    whyChooseUs: 'لماذا توريدات؟',
    bulkPricing: 'أسعار جملة تنافسية',
    fastDelivery: 'توصيل سريع',
    qualityProducts: 'منتجات عالية الجودة',
    b2bSupport: 'دعم مخصص للشركات',
    trustedPartners: 'شركاؤنا الموثوقون',
    partnersDesc: 'نفخر بالعمل مع أفضل العلامات التجارية العالمية',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    ourServices: 'خدماتنا',
    testimonials: 'آراء العملاء',
    contactUs: 'اتصل بنا',
    happyClients: 'عميل سعيد',
    productsDelivered: 'طلب تم توصيله',
    yearsExperience: 'سنوات خبرة',
    customerSatisfaction: 'رضا العملاء'
  },
  en: {
    siteName: 'Twreedat',
    siteTagline: 'B2B Wholesale Platform',
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    cart: 'Cart',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    myOrders: 'My Orders',
    welcome: 'Welcome',
    search: 'Search...',
    allCategories: 'All Categories',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    minOrder: 'Minimum Order',
    cartons: 'Cartons',
    carton: 'Carton',
    pricePerCarton: 'Price per Carton',
    quantity: 'Quantity',
    total: 'Total',
    discount: 'Discount',
    finalPrice: 'Final Price',
    specifications: 'Specifications',
    pricingTiers: 'Bulk Pricing',
    quantityRange: 'Quantity Range',
    unitPrice: 'Unit Price',
    saveAmount: 'Save',
    emptyCart: 'Your cart is empty',
    checkout: 'Checkout',
    remove: 'Remove',
    continueShopping: 'Continue Shopping',
    orderSummary: 'Order Summary',
    deliveryInfo: 'Delivery Information',
    address: 'Address',
    city: 'City',
    notes: 'Notes',
    placeOrder: 'Place Order',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phone: 'Phone Number',
    userType: 'Account Type',
    individual: 'Individual',
    company: 'Company',
    companyName: 'Company Name',
    commercialReg: 'Commercial Registration',
    taxId: 'Tax ID',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    registerHere: 'Register here',
    loginHere: 'Login here',
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    orderTotal: 'Order Total',
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    noOrders: 'No orders found',
    adminPanel: 'Admin Panel',
    users: 'Users',
    orders: 'Orders',
    analytics: 'Analytics',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    totalUsers: 'Total Users',
    pendingOrders: 'Pending Orders',
    topProducts: 'Top Selling Products',
    status: 'Status',
    actions: 'Actions',
    approve: 'Approve',
    reject: 'Reject',
    suspend: 'Suspend',
    active: 'Active',
    egp: 'EGP',
    featured: 'Featured',
    brand: 'Brand',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    productDetails: 'Product Details',
    b2bPlatform: 'B2B Wholesale Platform for Companies and Institutions',
    browseProducts: 'Browse Products',
    whyChooseUs: 'Why Choose Twreedat?',
    bulkPricing: 'Competitive Bulk Pricing',
    fastDelivery: 'Fast Delivery',
    qualityProducts: 'High Quality Products',
    b2bSupport: 'Dedicated B2B Support',
    trustedPartners: 'Our Trusted Partners',
    partnersDesc: 'We proudly work with the world\'s best brands',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    ourServices: 'Our Services',
    testimonials: 'Testimonials',
    contactUs: 'Contact Us',
    happyClients: 'Happy Clients',
    productsDelivered: 'Orders Delivered',
    yearsExperience: 'Years Experience',
    customerSatisfaction: 'Customer Satisfaction'
  }
}

function t(key) {
  return TRANSLATIONS[APP_STATE.language][key] || key
}

function setLanguage(lang) {
  APP_STATE.language = lang
  localStorage.setItem('language', lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  render()
}

// ==========================================
// API HELPER FUNCTIONS
// ==========================================

async function api(endpoint, options = {}) {
  try {
    const response = await axios({
      url: `/api${endpoint}`,
      method: options.method || 'GET',
      data: options.data,
      params: options.params
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    if (error.response) {
      throw new Error(error.response.data.error || 'API request failed')
    }
    throw error
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================

async function login(email, password) {
  const result = await api('/auth/login', {
    method: 'POST',
    data: { email, password }
  })
  
  if (result.success) {
    APP_STATE.user = result.data
    localStorage.setItem('user', JSON.stringify(result.data))
    await loadCart()
    navigateTo('home')
  }
  
  return result
}

async function register(data) {
  const result = await api('/auth/register', {
    method: 'POST',
    data
  })
  
  if (result.success) {
    alert(result.message)
    navigateTo('login')
  }
  
  return result
}

function logout() {
  APP_STATE.user = null
  APP_STATE.cart = []
  localStorage.removeItem('user')
  navigateTo('home')
}

// ==========================================
// CART FUNCTIONS
// ==========================================

async function loadCart() {
  if (!APP_STATE.user) {
    APP_STATE.cart = []
    return
  }
  
  const result = await api(`/cart/${APP_STATE.user.id}`)
  if (result.success) {
    APP_STATE.cart = result.data.items
  }
}

async function addToCart(productId, quantity) {
  if (!APP_STATE.user) {
    alert(t('loginHere'))
    navigateTo('login')
    return
  }
  
  const result = await api(`/cart/${APP_STATE.user.id}/add`, {
    method: 'POST',
    data: { product_id: productId, quantity }
  })
  
  if (result.success) {
    await loadCart()
    render()
  }
  
  return result
}

async function removeFromCart(itemId) {
  const result = await api(`/cart/${APP_STATE.user.id}/remove/${itemId}`, {
    method: 'DELETE'
  })
  
  if (result.success) {
    await loadCart()
    render()
  }
}

async function placeOrder(deliveryInfo) {
  const result = await api('/orders', {
    method: 'POST',
    data: {
      user_id: APP_STATE.user.id,
      ...deliveryInfo
    }
  })
  
  if (result.success) {
    APP_STATE.cart = []
    alert(`${t('orderNumber')}: ${result.data.order_number}`)
    navigateTo('orders')
  }
  
  return result
}

// ==========================================
// DATA LOADING
// ==========================================

async function loadProducts(categoryId = null, search = null) {
  const params = {}
  if (categoryId) params.category = categoryId
  if (search) params.search = search
  
  const result = await api('/products', { params })
  if (result.success) {
    APP_STATE.products = result.data
  }
}

async function loadCategories() {
  const result = await api('/categories')
  if (result.success) {
    APP_STATE.categories = result.data
  }
}

async function loadProduct(id) {
  const result = await api(`/products/${id}`)
  if (result.success) {
    APP_STATE.selectedProduct = result.data
  }
}

// ==========================================
// NAVIGATION
// ==========================================

function navigateTo(page, params = {}) {
  APP_STATE.currentPage = page
  APP_STATE.pageParams = params
  render()
}

// ==========================================
// COMPONENT: NAVBAR
// ==========================================

function renderNavbar() {
  const isRTL = APP_STATE.language === 'ar'
  
  return `
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
            <button onclick="navigateTo('home')" class="text-2xl font-bold hover:text-blue-200">
              <i class="fas fa-boxes mr-2"></i>
              ${t('siteName')}
            </button>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}">
            <button onclick="navigateTo('home')" class="hover:text-blue-200">
              <i class="fas fa-home mr-1"></i> ${t('home')}
            </button>
            <button onclick="navigateTo('products')" class="hover:text-blue-200">
              <i class="fas fa-box mr-1"></i> ${t('products')}
            </button>
            ${APP_STATE.user ? `
              <button onclick="navigateTo('orders')" class="hover:text-blue-200">
                <i class="fas fa-receipt mr-1"></i> ${t('myOrders')}
              </button>
              ${APP_STATE.user.user_type === 'admin' ? `
                <button onclick="navigateTo('admin')" class="hover:text-blue-200">
                  <i class="fas fa-cog mr-1"></i> ${t('adminPanel')}
                </button>
              ` : ''}
            ` : ''}
          </div>
          
          <!-- Right Side -->
          <div class="flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}">
            <!-- Language Toggle -->
            <button onclick="setLanguage('${APP_STATE.language === 'ar' ? 'en' : 'ar'}')" class="hover:text-blue-200">
              <i class="fas fa-language"></i> ${APP_STATE.language === 'ar' ? 'EN' : 'ع'}
            </button>
            
            <!-- Cart -->
            ${APP_STATE.user ? `
              <button onclick="navigateTo('cart')" class="relative hover:text-blue-200">
                <i class="fas fa-shopping-cart text-xl"></i>
                ${APP_STATE.cart.length > 0 ? `
                  <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    ${APP_STATE.cart.length}
                  </span>
                ` : ''}
              </button>
            ` : ''}
            
            <!-- User Menu -->
            ${APP_STATE.user ? `
              <div class="flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}">
                <span class="text-sm">${t('welcome')}, ${APP_STATE.user.full_name}</span>
                <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                  <i class="fas fa-sign-out-alt mr-1"></i> ${t('logout')}
                </button>
              </div>
            ` : `
              <button onclick="navigateTo('login')" class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                ${t('login')}
              </button>
              <button onclick="navigateTo('register')" class="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
                ${t('register')}
              </button>
            `}
          </div>
        </div>
      </div>
    </nav>
  `
}

// ==========================================
// PAGE: HOME
// ==========================================

function renderHome() {
  const isRTL = APP_STATE.language === 'ar'
  
  return `
    <div class="min-h-screen">
      <!-- Hero Section with Gradient Animation -->
      <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-32 overflow-hidden gradient-animate">
        <!-- Floating Shapes Background -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 ${isRTL ? 'right-20' : 'left-20'} w-64 h-64 bg-white rounded-full animate-float"></div>
          <div class="absolute bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-96 h-96 bg-white rounded-full animate-float delay-2"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center max-w-4xl mx-auto">
            <div class="animate-fade-in-up">
              <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                ${t('siteName')}
              </h1>
              <p class="text-2xl md:text-3xl mb-8 opacity-90">${t('b2bPlatform')}</p>
              <p class="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto">
                ${APP_STATE.language === 'ar' ? 
                  'وجهتك الأولى للحصول على أفضل أسعار الجملة في ورق الطباعة، المناديل، ومستلزمات التنظيف' : 
                  'Your premier destination for the best wholesale prices on copy paper, tissues, and cleaning supplies'}
              </p>
              <div class="flex gap-4 justify-center flex-wrap">
                <button onclick="navigateTo('products')" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 hover-lift shadow-elegant-lg">
                  <i class="fas fa-shopping-bag ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                  ${t('browseProducts')}
                </button>
                <button onclick="navigateTo('register')" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition">
                  <i class="fas fa-user-plus ${isRTL ? 'ml-2' : 'mr-2'}"></i>
                  ${t('getStarted')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Wave Bottom -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="bg-white py-16 -mt-1">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div class="animate-fade-in-up delay-1">
              <div class="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div class="text-gray-600">${t('happyClients')}</div>
            </div>
            <div class="animate-fade-in-up delay-2">
              <div class="text-5xl font-bold text-green-600 mb-2">5000+</div>
              <div class="text-gray-600">${t('productsDelivered')}</div>
            </div>
            <div class="animate-fade-in-up delay-3">
              <div class="text-5xl font-bold text-purple-600 mb-2">10+</div>
              <div class="text-gray-600">${t('yearsExperience')}</div>
            </div>
            <div class="animate-fade-in-up delay-4">
              <div class="text-5xl font-bold text-yellow-600 mb-2">98%</div>
              <div class="text-gray-600">${t('customerSatisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Features Section with Icons -->
      <div class="bg-gray-50 py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">${t('whyChooseUs')}</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              ${APP_STATE.language === 'ar' ? 
                'نقدم أفضل الخدمات والأسعار لشركائنا' : 
                'We provide the best services and prices for our partners'}
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="bg-white p-8 rounded-2xl hover-lift shadow-elegant text-center">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="fas fa-tags text-4xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">${t('bulkPricing')}</h3>
              <p class="text-gray-600">
                ${APP_STATE.language === 'ar' ? 
                  'أسعار تنافسية مع خصومات على الكميات الكبيرة' : 
                  'Competitive prices with discounts on large quantities'}
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-2xl hover-lift shadow-elegant text-center">
              <div class="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="fas fa-shipping-fast text-4xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">${t('fastDelivery')}</h3>
              <p class="text-gray-600">
                ${APP_STATE.language === 'ar' ? 
                  'توصيل سريع إلى جميع أنحاء الدولة' : 
                  'Fast delivery to all regions'}
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-2xl hover-lift shadow-elegant text-center">
              <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="fas fa-award text-4xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">${t('qualityProducts')}</h3>
              <p class="text-gray-600">
                ${APP_STATE.language === 'ar' ? 
                  'منتجات أصلية من أفضل الماركات العالمية' : 
                  'Original products from the best global brands'}
              </p>
            </div>
            
            <div class="bg-white p-8 rounded-2xl hover-lift shadow-elegant text-center">
              <div class="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="fas fa-headset text-4xl text-white"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">${t('b2bSupport')}</h3>
              <p class="text-gray-600">
                ${APP_STATE.language === 'ar' ? 
                  'فريق دعم متخصص متاح 24/7' : 
                  'Dedicated support team available 24/7'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Partnerships Section -->
      <div class="bg-white py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">${t('trustedPartners')}</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">${t('partnersDesc')}</p>
          </div>
          
          <!-- Partner Logos Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <!-- Double A -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">Double A</div>
                <div class="text-xs text-gray-500 mt-1">Premium Paper</div>
              </div>
            </div>
            
            <!-- PaperOne -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">PaperOne</div>
                <div class="text-xs text-gray-500 mt-1">Quality Paper</div>
              </div>
            </div>
            
            <!-- Fine -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">Fine</div>
                <div class="text-xs text-gray-500 mt-1">Tissues</div>
              </div>
            </div>
            
            <!-- Fino -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">Fino</div>
                <div class="text-xs text-gray-500 mt-1">Premium Tissues</div>
              </div>
            </div>
            
            <!-- CleanPro -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">CleanPro</div>
                <div class="text-xs text-gray-500 mt-1">Cleaning</div>
              </div>
            </div>
            
            <!-- Fairy -->
            <div class="partner-logo bg-gray-50 p-6 rounded-xl hover-lift flex items-center justify-center h-32">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-700">Fairy</div>
                <div class="text-xs text-gray-500 mt-1">Dish Soap</div>
              </div>
            </div>
          </div>
          
          <!-- Partnership Benefits -->
          <div class="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <i class="fas fa-handshake text-5xl text-blue-600 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">
                  ${APP_STATE.language === 'ar' ? 'شراكات استراتيجية' : 'Strategic Partnerships'}
                </h3>
                <p class="text-gray-600">
                  ${APP_STATE.language === 'ar' ? 
                    'نعمل مباشرة مع الموزعين المعتمدين' : 
                    'Working directly with authorized distributors'}
                </p>
              </div>
              <div>
                <i class="fas fa-certificate text-5xl text-green-600 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">
                  ${APP_STATE.language === 'ar' ? 'منتجات أصلية' : 'Original Products'}
                </h3>
                <p class="text-gray-600">
                  ${APP_STATE.language === 'ar' ? 
                    'ضمان 100% على جميع المنتجات' : 
                    '100% guarantee on all products'}
                </p>
              </div>
              <div>
                <i class="fas fa-globe text-5xl text-purple-600 mb-4"></i>
                <h3 class="text-xl font-bold mb-2">
                  ${APP_STATE.language === 'ar' ? 'وصول عالمي' : 'Global Reach'}
                </h3>
                <p class="text-gray-600">
                  ${APP_STATE.language === 'ar' ? 
                    'علامات تجارية عالمية موثوقة' : 
                    'Trusted global brands'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Featured Categories with Better Design -->
      <div class="bg-gradient-to-b from-gray-50 to-white py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">${t('categories')}</h2>
            <p class="text-xl text-gray-600">
              ${APP_STATE.language === 'ar' ? 
                'تصفح منتجاتنا حسب الفئة' : 
                'Browse our products by category'}
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            ${APP_STATE.categories.map((cat, index) => `
              <button onclick="navigateTo('products', { category: ${cat.id} })" class="group bg-white p-8 rounded-2xl hover-lift shadow-elegant text-center animate-fade-in-up delay-${index + 1}">
                <div class="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i class="fas fa-box text-5xl text-white"></i>
                </div>
                <h3 class="text-2xl font-bold mb-3">${APP_STATE.language === 'ar' ? cat.name_ar : cat.name_en}</h3>
                <p class="text-gray-600 mb-4">${APP_STATE.language === 'ar' ? cat.description_ar : cat.description_en}</p>
                <span class="text-blue-600 font-semibold group-hover:underline">
                  ${APP_STATE.language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
                  <i class="fas fa-arrow-${isRTL ? 'left' : 'right'} ${isRTL ? 'mr-2' : 'ml-2'}"></i>
                </span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            ${APP_STATE.language === 'ar' ? 
              'جاهز لبدء التوفير على طلباتك؟' : 
              'Ready to Start Saving on Your Orders?'}
          </h2>
          <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            ${APP_STATE.language === 'ar' ? 
              'انضم إلى مئات الشركات التي توفر آلاف الجنيهات شهرياً' : 
              'Join hundreds of companies saving thousands every month'}
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button onclick="navigateTo('register')" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-50 hover-lift shadow-elegant-lg">
              <i class="fas fa-rocket ${isRTL ? 'ml-2' : 'mr-2'}"></i>
              ${t('getStarted')}
            </button>
            <button onclick="navigateTo('products')" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-600 transition">
              <i class="fas fa-eye ${isRTL ? 'ml-2' : 'mr-2'}"></i>
              ${t('browseProducts')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

// ==========================================
// PAGE: PRODUCTS LIST
// ==========================================

function renderProducts() {
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">${t('products')}</h1>
      
      <!-- Filters -->
      <div class="mb-8 flex flex-wrap gap-4">
        <select id="category-filter" class="border rounded px-4 py-2" onchange="handleCategoryFilter(this.value)">
          <option value="">${t('allCategories')}</option>
          ${APP_STATE.categories.map(cat => `
            <option value="${cat.id}">${APP_STATE.language === 'ar' ? cat.name_ar : cat.name_en}</option>
          `).join('')}
        </select>
        
        <input type="text" id="search-input" placeholder="${t('search')}" class="border rounded px-4 py-2 flex-1" onkeyup="handleSearch(this.value)" />
      </div>
      
      <!-- Products Grid -->
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${APP_STATE.products.map(product => {
          const name = APP_STATE.language === 'ar' ? product.name_ar : product.name_en
          const minPrice = product.base_price
          
          return `
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition">
              <div class="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                <i class="fas fa-box text-6xl text-gray-400"></i>
              </div>
              <div class="p-4">
                ${product.is_featured ? `<span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded">${t('featured')}</span>` : ''}
                <h3 class="text-lg font-semibold mb-2 mt-2">${name}</h3>
                <p class="text-gray-600 text-sm mb-2">${t('brand')}: ${product.brand || 'N/A'}</p>
                <p class="text-2xl font-bold text-blue-600 mb-2">${minPrice} ${t('egp')}</p>
                <p class="text-sm text-gray-500 mb-4">${t('minOrder')}: ${product.min_order_quantity} ${t('cartons')}</p>
                <button onclick="navigateTo('product', { id: ${product.id} })" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  ${t('viewDetails')}
                </button>
              </div>
            </div>
          `
        }).join('')}
      </div>
      
      ${APP_STATE.products.length === 0 ? `
        <div class="text-center py-16">
          <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">No products found</p>
        </div>
      ` : ''}
    </div>
  `
}

// ==========================================
// PAGE: PRODUCT DETAIL (Alibaba-style)
// ==========================================

function renderProductDetail() {
  if (!APP_STATE.selectedProduct) return '<div class="text-center py-16">Loading...</div>'
  
  const p = APP_STATE.selectedProduct
  const name = APP_STATE.language === 'ar' ? p.name_ar : p.name_en
  const desc = APP_STATE.language === 'ar' ? p.description_ar : p.description_en
  const specs = APP_STATE.language === 'ar' ? p.specifications_ar : p.specifications_en
  
  return `
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <div class="mb-6 text-sm text-gray-600">
        <button onclick="navigateTo('home')" class="hover:text-blue-600">${t('home')}</button>
        <i class="fas fa-chevron-${APP_STATE.language === 'ar' ? 'left' : 'right'} mx-2"></i>
        <button onclick="navigateTo('products')" class="hover:text-blue-600">${t('products')}</button>
        <i class="fas fa-chevron-${APP_STATE.language === 'ar' ? 'left' : 'right'} mx-2"></i>
        <span>${name}</span>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div>
          <div class="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <i class="fas fa-box text-9xl text-gray-400"></i>
          </div>
        </div>
        
        <!-- Product Info -->
        <div>
          <h1 class="text-3xl font-bold mb-4">${name}</h1>
          <div class="mb-6">
            <span class="text-sm text-gray-600">${t('brand')}: </span>
            <span class="font-semibold">${p.brand || 'N/A'}</span>
            <span class="mx-4">|</span>
            <span class="text-sm text-gray-600">SKU: </span>
            <span class="font-semibold">${p.sku}</span>
          </div>
          
          <!-- Price Tiers Table (Alibaba-style) -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold mb-4">${t('pricingTiers')}</h3>
            <table class="w-full">
              <thead>
                <tr class="border-b border-blue-200">
                  <th class="text-${APP_STATE.language === 'ar' ? 'right' : 'left'} py-2">${t('quantityRange')}</th>
                  <th class="text-${APP_STATE.language === 'ar' ? 'right' : 'left'} py-2">${t('pricePerCarton')}</th>
                  <th class="text-${APP_STATE.language === 'ar' ? 'right' : 'left'} py-2">${t('saveAmount')}</th>
                </tr>
              </thead>
              <tbody>
                ${p.price_tiers.map((tier, index) => {
                  const tierName = APP_STATE.language === 'ar' ? tier.tier_name_ar : tier.tier_name_en
                  return `
                    <tr class="border-b border-blue-100">
                      <td class="py-3">${tierName || `${tier.min_quantity}+ ${t('cartons')}`}</td>
                      <td class="py-3 font-bold text-blue-600">${tier.price_per_unit} ${t('egp')}</td>
                      <td class="py-3 text-green-600">${tier.discount_percentage > 0 ? `${tier.discount_percentage.toFixed(1)}%` : '-'}</td>
                    </tr>
                  `
                }).join('')}
              </tbody>
            </table>
          </div>
          
          <!-- Quantity Selector -->
          <div class="bg-white border rounded-lg p-6 mb-6">
            <label class="block text-lg font-semibold mb-3">${t('quantity')}</label>
            <div class="flex items-center gap-4 mb-4">
              <button onclick="adjustQuantity(-10)" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">-10</button>
              <button onclick="adjustQuantity(-1)" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">-1</button>
              <input type="number" id="quantity-input" value="${p.min_order_quantity}" min="${p.min_order_quantity}" class="border rounded px-4 py-2 w-32 text-center text-lg font-bold" onchange="updatePriceCalculation()" />
              <button onclick="adjustQuantity(1)" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">+1</button>
              <button onclick="adjustQuantity(10)" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">+10</button>
            </div>
            <p class="text-sm text-gray-600 mb-4">${t('minOrder')}: ${p.min_order_quantity} ${t('cartons')}</p>
            
            <!-- Price Calculation -->
            <div id="price-calculation" class="bg-gray-50 p-4 rounded mb-4">
              <div class="flex justify-between mb-2">
                <span>${t('unitPrice')}:</span>
                <span class="font-bold" id="calc-unit-price">-</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>${t('quantity')}:</span>
                <span class="font-bold" id="calc-quantity">-</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>${t('total')}:</span>
                <span class="font-bold" id="calc-total">-</span>
              </div>
              <div class="flex justify-between mb-2 text-green-600">
                <span>${t('discount')}:</span>
                <span class="font-bold" id="calc-discount">-</span>
              </div>
              <div class="flex justify-between text-xl border-t pt-2">
                <span class="font-bold">${t('finalPrice')}:</span>
                <span class="font-bold text-blue-600" id="calc-final">-</span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-4">
              <button onclick="handleAddToCart()" class="flex-1 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
                <i class="fas fa-cart-plus mr-2"></i> ${t('addToCart')}
              </button>
              <button onclick="handleBuyNow()" class="flex-1 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
                <i class="fas fa-bolt mr-2"></i> ${t('buyNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Product Details Tabs -->
      <div class="mt-12">
        <div class="border-b mb-6">
          <button class="px-6 py-3 border-b-2 border-blue-600 font-semibold text-blue-600">
            ${t('productDetails')}
          </button>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">${t('specifications')}</h3>
            <div class="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
              ${specs || desc || 'No specifications available'}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Initialize price calculation on page load
      setTimeout(() => {
        updatePriceCalculation()
      }, 100)
    </script>
  `
}

// Product detail helper functions
async function updatePriceCalculation() {
  const quantity = parseInt(document.getElementById('quantity-input').value)
  const productId = APP_STATE.selectedProduct.id
  
  try {
    const result = await api(`/products/${productId}/calculate-price`, {
      method: 'POST',
      data: { quantity }
    })
    
    if (result.success) {
      const data = result.data
      document.getElementById('calc-unit-price').textContent = `${data.unitPrice} ${t('egp')}`
      document.getElementById('calc-quantity').textContent = `${data.quantity} ${t('cartons')}`
      document.getElementById('calc-total').textContent = `${data.subtotal.toFixed(2)} ${t('egp')}`
      
      const discountAmount = (data.subtotal * data.discount / 100)
      const egpText = t('egp')
      document.getElementById('calc-discount').textContent = data.discount > 0 ? `${discountAmount.toFixed(2)} ${egpText} (${data.discount}%)` : `0 ${egpText}`
      document.getElementById('calc-final').textContent = `${(data.subtotal - discountAmount).toFixed(2)} ${t('egp')}`
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
