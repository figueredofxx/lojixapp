import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import MobileHeader from "@/components/mobile/MobileHeader";
import { AuthComponent } from "@/components/auth/AuthComponent";
import { CheckoutComponent } from "@/components/checkout/CheckoutComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  User, 
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

// Componentes das abas existentes
import { POSSystem } from "@/components/pos/POSSystem";
import ProductManager from "@/components/products/ProductManager";
import CustomerManager from "@/components/customers/CustomerManager";
import StockManager from "@/components/stock/StockManager";
import { SerializedInventory } from "@/components/inventory/SerializedInventory";
import FinancialManager from "@/components/financial/FinancialManager";
import ReportsManager from "@/components/reports/ReportsManager";
import SettingsManager from "@/components/settings/SettingsManager";
import { CRMSystem } from "@/components/crm/CRMSystem";
import CatalogManager from "@/components/catalog/CatalogManager";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState(searchParams.get("tab") || "");
  const [user, setUser] = useState<any>(null);
  const [isInCheckout, setIsInCheckout] = useState(false);
  const [cartItems] = useState([
    { id: 1, name: "iPhone 15 Pro", price: 8999.99, quantity: 1 },
    { id: 2, name: "AirPods Pro", price: 1899.99, quantity: 1 }
  ]);

  useEffect(() => {
    // Simular usuário autenticado para desenvolvimento
    // Em produção, isso seria verificado via Supabase
    setUser({
      id: "dev_user",
      name: "Usuário Desenvolvedor",
      email: "dev@lojixapp.com",
      phone: "(11) 99999-9999"
    });
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab") || "";
    setCurrentTab(tab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    if (tab === "") {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleCheckoutSuccess = () => {
    setIsInCheckout(false);
    setCurrentTab("");
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!user) {
    return <AuthComponent onAuthSuccess={handleAuthSuccess} />;
  }

  // Se estiver no checkout, mostrar tela de checkout
  if (isInCheckout) {
    return (
      <CheckoutComponent
        user={user}
        cartItems={cartItems}
        onBack={() => setIsInCheckout(false)}
        onSuccess={handleCheckoutSuccess}
      />
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar para Desktop */}
        <AppSidebar />
        
        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col">
          {/* Header Desktop */}
          <header className="hidden lg:flex h-14 items-center gap-4 border-b px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </header>

          {/* Header Mobile */}

          {/* Conteúdo */}
          <main className="flex-1 p-4 lg:p-6">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );

  function renderTabContent() {
    switch (currentTab) {
      case "pos":
        return <POSSystem />;
      case "catalog":
        return <CatalogManager />;
      case "products":
        return <ProductManager />;
      case "stock":
        return <StockManager />;
      case "inventory":
        return <SerializedInventory />;
      case "customers":
        return <CustomerManager />;
      case "crm":
        return <CRMSystem />;
      case "financial":
        return <FinancialManager />;
      case "reports":
        return <ReportsManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <DashboardOverview onStartCheckout={() => setIsInCheckout(true)} />;
    }
  }
};

// Componente Dashboard Overview
const DashboardOverview = ({ onStartCheckout }: { onStartCheckout: () => void }) => {
  const stats = [
    { 
      title: "Vendas Hoje", 
      value: "R$ 12.450", 
      change: "+12%", 
      icon: DollarSign,
      positive: true 
    },
    { 
      title: "Produtos Vendidos", 
      value: "248", 
      change: "+8%", 
      icon: ShoppingCart,
      positive: true 
    },
    { 
      title: "Estoque Baixo", 
      value: "12", 
      change: "3 críticos", 
      icon: Package,
      positive: false 
    },
    { 
      title: "Novos Clientes", 
      value: "18", 
      change: "+25%", 
      icon: Users,
      positive: true 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está o resumo do seu negócio hoje.
          </p>
        </div>
        <Button 
          onClick={onStartCheckout}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-cantarell"
        >
          Testar Checkout PIX
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-cantarell">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold font-cantarell">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-cantarell ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell">Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span className="font-cantarell">Nova Venda</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="w-6 h-6" />
              <span className="font-cantarell">Adicionar Produto</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="font-cantarell">Novo Cliente</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="font-cantarell">Relatórios</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell">Alertas</CardTitle>
            <CardDescription>Itens que precisam da sua atenção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="font-cantarell font-medium text-red-800">3 produtos em estoque crítico</p>
                <p className="text-sm text-red-600">iPhone 13, Galaxy S22, iPad Air</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-cantarell font-medium text-green-800">Backup realizado com sucesso</p>
                <p className="text-sm text-green-600">Hoje às 03:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;