
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Package, 
  Warehouse,
  ShoppingCart, 
  Smartphone,
  DollarSign,
  BarChart3,
  Users,
  Settings
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'overview', label: 'Início', icon: Home },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'stock', label: 'Estoque', icon: Warehouse },
    { id: 'pos', label: 'PDV', icon: ShoppingCart },
    { id: 'catalog', label: 'Catálogo', icon: Smartphone },
    { id: 'financial', label: 'Financeiro', icon: DollarSign },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'settings', label: 'Config', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="grid grid-cols-5 h-20">
        {navItems.slice(0, 9).map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center justify-center h-full rounded-none border-0 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
