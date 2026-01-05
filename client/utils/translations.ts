export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    cart: 'السلة',
    myOrders: 'طلباتي',
    adminPanel: 'لوحة التحكم',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    
    // Common
    search: 'بحث',
    filter: 'تصفية',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    close: 'إغلاق',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    
    // Product
    addToCart: 'إضافة للسلة',
    quantity: 'الكمية',
    price: 'السعر',
    egp: 'ج.م',
    minOrder: 'الحد الأدنى للطلب',
    specifications: 'المواصفات',
    description: 'الوصف',
    
    // Cart
    cartTotal: 'إجمالي السلة',
    checkout: 'إتمام الطلب',
    emptyCart: 'السلة فارغة',
    
    // Orders
    orders: 'الطلبات',
    orderNumber: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    orderStatus: 'حالة الطلب',
    orderTotal: 'إجمالي الطلب',
    
    // Status
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    processing: 'قيد المعالجة',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
    active: 'نشط',
    inactive: 'غير نشط',
    suspended: 'معلق',
    
    // Admin
    overview: 'نظرة عامة',
    users: 'المستخدمين',
    transactions: 'المعاملات',
    categories: 'الفئات',
    adminUsers: 'مستخدمي الإدارة',
    terms: 'الشروط والأحكام',
    totalOrders: 'إجمالي الطلبات',
    totalRevenue: 'إجمالي الإيرادات',
    totalUsers: 'إجمالي المستخدمين',
    pendingOrders: 'الطلبات المعلقة',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    companyName: 'اسم الشركة',
    taxId: 'الرقم الضريبي',
    address: 'العنوان',
    individual: 'فرد',
    company: 'شركة',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    myOrders: 'My Orders',
    adminPanel: 'Admin Panel',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Product
    addToCart: 'Add to Cart',
    quantity: 'Quantity',
    price: 'Price',
    egp: 'EGP',
    minOrder: 'Minimum Order',
    specifications: 'Specifications',
    description: 'Description',
    
    // Cart
    cartTotal: 'Cart Total',
    checkout: 'Checkout',
    emptyCart: 'Cart is Empty',
    
    // Orders
    orders: 'Orders',
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    orderTotal: 'Order Total',
    
    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    
    // Admin
    overview: 'Overview',
    users: 'Users',
    transactions: 'Transactions',
    categories: 'Categories',
    adminUsers: 'Admin Users',
    terms: 'Terms & Conditions',
    totalOrders: 'Total Orders',
    totalRevenue: 'Total Revenue',
    totalUsers: 'Total Users',
    pendingOrders: 'Pending Orders',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phone: 'Phone',
    companyName: 'Company Name',
    taxId: 'Tax ID',
    address: 'Address',
    individual: 'Individual',
    company: 'Company',
  },
};

export const t = (key: string, lang: 'ar' | 'en' = 'ar'): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
