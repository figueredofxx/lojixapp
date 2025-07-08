
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  QrCode,
  Smartphone,
  BarChart3,
  UserCheck,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Warehouse,
  DollarSign,
  FileText,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CatalogManager from "@/components/catalog/CatalogManager";
import { SerializedInventory } from "@/components/inventory/SerializedInventory";
import { POSSystem } from "@/components/pos/POSSystem";
import { CRMSystem } from "@/components/crm/CRMSystem";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileTabContent from "@/components/mobile/MobileTabContent";
import ProductManager from "@/components/products/ProductManager";
import StockManager from "@/components/stock/StockManager";
import POSSystemNew from "@/components/pos/POSSystemNew";
import FinancialManager from "@/components/financial/FinancialManager";
import ReportsManager from "@/components/reports/ReportsManager";
import CustomerManager from "@/components/customers/CustomerManager";
import SettingsManager from "@/components/settings/SettingsManager";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Produtos em Estoque",
      value: "1,247",
      change: "+12% vs mês anterior",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Vendas Hoje",
      value: "R$ 3,420",
      change: "+8% vs ontem",
      icon: ShoppingCart,
      color: "text-green-600"
    },
    {
      title: "Previsão de Demanda",
      value: "89%",
      change: "Precisão do modelo",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Clientes Ativos",
      value: "324",
      change: "+15 novos esta semana",
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      type: "sale",
      description: "Venda realizada - iPhone 13 Pro",
      time: "há 5 minutos",
      value: "R$ 4.200,00"
    },
    {
      type: "stock",
      description: "Estoque baixo - Samsung Galaxy A54",
      time: "há 15 minutos",
      alert: true
    },
    {
      type: "customer",
      description: "Novo cliente cadastrado - Maria Silva",
      time: "há 30 minutos"
    },
    {
      type: "forecast",
      description: "Previsão atualizada para categoria Smartphones",
      time: "há 1 hora"
    }
  ];

  const quickActions = [
    {
      title: "Nova Venda",
      description: "Iniciar ponto de venda",
      icon: ShoppingCart,
      action: () => setActiveTab("pos"),
      color: "bg-green-500"
    },
    {
      title: "Cadastrar Produto",
      description: "Adicionar ao catálogo",
      icon: Plus,
      action: () => setActiveTab("products"),
      color: "bg-blue-500"
    },
    {
      title: "Controle Estoque",
      description: "Gerenciar inventário",
      icon: Warehouse,
      action: () => setActiveTab("stock"),
      color: "bg-purple-500"
    },
    {
      title: "Novo Cliente",
      description: "Cadastrar cliente",
      icon: UserCheck,
      action: () => setActiveTab("customers"),
      color: "bg-orange-500"
    }
  ];

  const lowStockAlerts = [
    { product: "iPhone 13 Pro 128GB", current: 2, minimum: 5 },
    { product: "Samsung Galaxy S23", current: 1, minimum: 3 },
    { product: "AirPods Pro", current: 0, minimum: 2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:min-h-auto">
      {/* Mobile Header */}
      <MobileHeader title="LojixApp" />

      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LojixApp</h1>
                <p className="text-sm text-gray-600">Sistema de Gestão Inteligente para Varejo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/subscription')}>
                Minha Assinatura
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Adjusted for mobile viewport */}
      <main className="h-screen md:h-auto md:max-w-7xl md:mx-auto md:px-4 md:sm:px-6 md:lg:px-8 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full md:h-auto md:space-y-6">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-9">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="stock">Estoque</TabsTrigger>
            <TabsTrigger value="pos">PDV</TabsTrigger>
            <TabsTrigger value="catalog">Catálogo</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <MobileTabContent isActive={activeTab === "overview"}>
            <TabsContent value="overview" className="flex-1 m-0 space-y-4 md:space-y-6">
              {/* Stats Cards - Optimized for mobile */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-3 md:p-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-6 md:pb-2">
                      <CardTitle className="text-xs md:text-sm font-medium text-gray-600 leading-tight">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color} flex-shrink-0`} />
                    </CardHeader>
                    <CardContent className="p-0 md:p-6 md:pt-0">
                      <div className="text-base md:text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-gray-600 mt-1 leading-tight">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions - Mobile optimized */}
              <Card className="flex-shrink-0">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="text-base md:text-xl">Ações Rápidas</CardTitle>
                  <CardDescription className="text-sm">
                    Acesse rapidamente as principais funcionalidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-3 md:p-4 flex flex-col items-center space-y-2 min-h-[70px] md:min-h-[100px]"
                        onClick={action.action}
                      >
                        <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full ${action.color} flex items-center justify-center flex-shrink-0`}>
                          <action.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-xs md:text-sm font-semibold leading-tight">{action.title}</div>
                          <div className="text-xs text-gray-500 hidden md:block">{action.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mobile optimized content sections */}
              <div className="space-y-4 md:space-y-6 flex-1 min-h-0">
                {/* Alertas de Estoque Baixo */}
                <Card className="flex-shrink-0">
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                      <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0" />
                      <span>Alertas de Estoque</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Produtos que precisam de reposição
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lowStockAlerts.slice(0, 2).map((alert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-red-800 text-sm truncate">{alert.product}</p>
                            <p className="text-xs text-red-600">
                              Atual: {alert.current} | Mín: {alert.minimum}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="border-red-300 text-red-700 text-xs ml-2 flex-shrink-0">
                            Repor
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities - Mobile optimized */}
                <Card className="flex-1 min-h-0">
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-base md:text-xl">Atividades Recentes</CardTitle>
                    <CardDescription className="text-sm">
                      Últimas movimentações do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 min-h-0">
                    <div className="space-y-3 max-h-[200px] md:max-h-none overflow-y-auto">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              activity.alert ? 'bg-red-500' : 'bg-green-500'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{activity.description}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                          {activity.value && (
                            <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">{activity.value}</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </MobileTabContent>

          {/* Products Tab */}
          <MobileTabContent isActive={activeTab === "products"}>
            <TabsContent value="products" className="flex-1 m-0">
              <ProductManager />
            </TabsContent>
          </MobileTabContent>

          {/* Stock Tab */}
          <MobileTabContent isActive={activeTab === "stock"}>
            <TabsContent value="stock" className="flex-1 m-0">
              <StockManager />
            </TabsContent>
          </MobileTabContent>

          {/* POS Tab */}
          <MobileTabContent isActive={activeTab === "pos"}>
            <TabsContent value="pos" className="flex-1 m-0">
              <POSSystemNew />
            </TabsContent>
          </MobileTabContent>

          {/* Catalog Tab */}
          <MobileTabContent isActive={activeTab === "catalog"}>
            <TabsContent value="catalog" className="flex-1 m-0">
              <CatalogManager />
            </TabsContent>
          </MobileTabContent>

          {/* Financial Tab */}
          <MobileTabContent isActive={activeTab === "financial"}>
            <TabsContent value="financial" className="flex-1 m-0">
              <FinancialManager />
            </TabsContent>
          </MobileTabContent>

          {/* Reports Tab */}
          <MobileTabContent isActive={activeTab === "reports"}>
            <TabsContent value="reports" className="flex-1 m-0">
              <ReportsManager />
            </TabsContent>
          </MobileTabContent>

          {/* Customers Tab */}
          <MobileTabContent isActive={activeTab === "customers"}>
            <TabsContent value="customers" className="flex-1 m-0">
              <CustomerManager />
            </TabsContent>
          </MobileTabContent>

          {/* Settings Tab */}
          <MobileTabContent isActive={activeTab === "settings"}>
            <TabsContent value="settings" className="flex-1 m-0">
              <SettingsManager />
            </TabsContent>
          </MobileTabContent>
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Dashboard;
