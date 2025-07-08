import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download, 
  Calendar,
  DollarSign,
  Package,
  Printer,
  Eye
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportsManager = () => {
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });

  const salesData = [
    { name: 'Jan', vendas: 4000, lucro: 2400 },
    { name: 'Fev', vendas: 3000, lucro: 1398 },
    { name: 'Mar', vendas: 2000, lucro: 9800 },
    { name: 'Abr', vendas: 2780, lucro: 3908 },
    { name: 'Mai', vendas: 1890, lucro: 4800 },
    { name: 'Jun', vendas: 2390, lucro: 3800 }
  ];

  const topProducts = [
    { name: 'iPhone 13 Pro', vendas: 45, receita: 189000 },
    { name: 'Samsung S23', vendas: 32, receita: 121600 },
    { name: 'Cabo USB-C', vendas: 120, receita: 3000 },
    { name: 'Fone Bluetooth', vendas: 68, receita: 13600 }
  ];

  const cashFlowData = [
    { name: 'Sem 1', entradas: 12000, saidas: 8000 },
    { name: 'Sem 2', entradas: 15000, saidas: 9500 },
    { name: 'Sem 3', entradas: 11000, saidas: 7800 },
    { name: 'Sem 4', entradas: 18000, saidas: 12000 }
  ];

  const categoryData = [
    { name: 'Smartphones', value: 60, color: '#8884d8' },
    { name: 'Acessórios', value: 25, color: '#82ca9d' },
    { name: 'Tablets', value: 10, color: '#ffc658' },
    { name: 'Outros', value: 5, color: '#ff7300' }
  ];

  const generateReport = (type) => {
    console.log(`Gerando relatório: ${type}`);
    // Lógica para gerar relatório
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="text-xs md:text-sm">Vendas</TabsTrigger>
          <TabsTrigger value="products" className="text-xs md:text-sm">Produtos</TabsTrigger>
          <TabsTrigger value="financial" className="text-xs md:text-sm">Financeiro</TabsTrigger>
          <TabsTrigger value="custom" className="text-xs md:text-sm">Personalizado</TabsTrigger>
        </TabsList>

        {/* Relatórios de Vendas */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                <span>Total de Vendas por Período</span>
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Data Início</Label>
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Data Fim</Label>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Período</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Diário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" className="mt-auto">
                  <Download className="w-4 h-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vendas" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="lucro" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Vendas Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 1.420,00</div>
                <p className="text-xs text-gray-600">+12% vs ontem</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Vendas do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">R$ 28.500,00</div>
                <p className="text-xs text-gray-600">+8% vs mês anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">R$ 420,00</div>
                <p className="text-xs text-gray-600">+5% vs média</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Relatórios de Produtos */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Package className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Produtos Mais Vendidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.vendas} vendas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          R$ {product.receita.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Lista Completa
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Vendas por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Relatórios Financeiros */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span>Fluxo de Caixa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="entradas" fill="#82ca9d" name="Entradas" />
                    <Bar dataKey="saidas" fill="#ff7300" name="Saídas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Lucro Líquido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 12.800,00</div>
                <p className="text-xs text-gray-600">Margem de 24%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Custos Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ 8.200,00</div>
                <p className="text-xs text-gray-600">Fixos + Variáveis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ROI do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">32%</div>
                <p className="text-xs text-gray-600">Retorno sobre investimento</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Relatórios Personalizados */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Printer className="w-4 h-4 md:w-5 md:h-5" />
                <span>Relatórios Personalizados</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Configure e gere relatórios customizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Tipo de Relatório</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Vendas Detalhadas</SelectItem>
                      <SelectItem value="inventory">Inventário Completo</SelectItem>
                      <SelectItem value="customers">Base de Clientes</SelectItem>
                      <SelectItem value="financial">Análise Financeira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Período</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Esta Semana</SelectItem>
                      <SelectItem value="month">Este Mês</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Ano</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Formato</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="PDF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Modelo de Impressão</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Padrão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Padrão</SelectItem>
                      <SelectItem value="detailed">Detalhado</SelectItem>
                      <SelectItem value="summary">Resumido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={() => generateReport('preview')} variant="outline" className="flex-1 text-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
                <Button onClick={() => generateReport('generate')} className="flex-1 text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Gerar Relatório
                </Button>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Dica:</strong> Os relatórios incluem automaticamente o logo da sua loja e podem ser personalizados nas configurações do sistema.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsManager;
