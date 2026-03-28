
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, ScanLine, BarChart2, Settings, ShoppingCart } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/products', label: 'ProdukKu', icon: Package },
  { path: '/scanner', label: 'Scan', icon: ScanLine },
  { path: '/cashier', label: 'Kasir', icon: ShoppingCart },
  { path: '/reports', label: 'Laporan', icon: BarChart2 },
  { path: '/settings', label: 'Pengaturan', icon: Settings },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
