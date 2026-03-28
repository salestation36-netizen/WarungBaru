import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import DashboardScreen from './screens/DashboardScreen';
import ProductsScreen from './screens/ProductsScreen';
import AddEditProductScreen from './screens/AddEditProductScreen';
import ScannerScreen from './screens/ScannerScreen';
import CashierScreen from './screens/CashierScreen';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import AssistantScreen from './screens/AssistantScreen';
import TutorialScreen from './screens/TutorialScreen';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Main />
      </HashRouter>
    </AppProvider>
  );
};

const Main: React.FC = () => {
    const location = useLocation();
    const noNavRoutes = ['/receipt', '/assistant', '/tutorial']; // Hide bottom nav in these screens
    const showNav = !noNavRoutes.some(path => location.pathname.startsWith(path));

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
          <Header />
          <main className={`flex-grow ${showNav ? 'pb-20' : 'pb-0'} pt-16`}>
            <Routes>
              <Route path="/" element={<DashboardScreen />} />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/products/add" element={<AddEditProductScreen />} />
              <Route path="/products/edit/:id" element={<AddEditProductScreen />} />
              <Route path="/scanner" element={<ScannerScreen />} />
              <Route path="/cashier" element={<CashierScreen />} />
              <Route path="/reports" element={<ReportsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/receipt/:id" element={<ReceiptScreen />} />
              <Route path="/assistant" element={<AssistantScreen />} />
              <Route path="/tutorial" element={<TutorialScreen />} />
            </Routes>
          </main>
          {showNav && <BottomNav />}
        </div>
    );
}

export default App;