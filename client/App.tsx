import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/admin/AdminLayout';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Products } from './pages/shop/Products';
import { Overview as AdminOverview } from './pages/admin/Overview';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useApp();
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout>
            <Products />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold">Register Page</h1>
              <p className="text-gray-600 mt-4">Coming soon...</p>
            </div>
          </Layout>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Cart Page</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Orders Page</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminOverview />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Users Management</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/transactions"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Products Management</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Categories Management</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/admin-users"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Admin Users</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/terms"
        element={
          <AdminRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h1 className="text-3xl font-bold">Terms & Conditions</h1>
                <p className="text-gray-600 mt-4">Coming soon...</p>
              </div>
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <div className="text-center py-12">
              <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
              <p className="text-gray-600 text-xl">Page not found</p>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
