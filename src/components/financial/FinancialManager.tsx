
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  Receipt, 
  PlusCircle,
  MinusCircle,
  FileText
} from 'lucide-react';

const FinancialManager = () => {
  const [dailyCash, setDailyCash] = useState({
    opening: 100.00,
    sales: 850.00,
    expenses: 120.00,
    closing: 830.00
  });

  const [fixedCosts, setFixedCosts] = useState([
    { id: 1, name: "Aluguel", amount: 2500.00, dueDate: "2024-01-05" },
    { id: 2, name: "Energia", amount: 180.00, dueDate: "2024-01-10" }
  ]);

  const [variableCosts, setVariableCosts] = useState([
    { id: 1, name: "Mercadorias", amount: 1500.00, date: "2024-01-03" },
    { id: 2, name: "Combustível", amount: 200.00, date: "2024-01-02" }
  ]);

  const [profitCalculator, setProfitCalculator] = useState({
    costPrice: '',
    sellPrice: '',
    expenses: '',
    margin: 0,
    profit: 0
  });

  const calculateProfit = () => {
    const { costPrice, sellPrice, expenses } = profitCalculator;
    if (costPrice && sellPrice) {
      const cost = parseFloat(costPrice);
      const sell = parseFloat(sellPrice);
      const exp = parseFloat(expenses) || 0;
      
      const profit = sell - cost - exp;
      const margin = ((profit / sell) * 100);
      
      setProfitCalculator({
        ...profitCalculator,
        profit,
        margin
      });
    }
  };

  const closeDailyCash = () => {
    console.log('Fechamento de caixa realizado');
    // Lógica para fechamento de caixa
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="cash" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cash" className="text-xs md:text-sm">Caixa</TabsTrigger>
          <TabsTrigger value="costs" className="text-xs md:text-sm">Custos</TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs md:text-sm">Despesas</TabsTrigger>
          <TabsTrigger value="calculator" className="text-xs md:text-sm">Calculadora</TabsTrigger>
        </TabsList>

        {/* Caixa do Dia */}
        <TabsContent value="cash" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Caixa do Dia</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Controle de movimentação diária
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-medium text-blue-800">Abertura</p>
                    <p className="text-lg font-bold text-blue-600">
                      R$ {dailyCash.opening.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs font-medium text-green-800">Vendas</p>
                    <p className="text-lg font-bold text-green-600">
                      R$ {dailyCash.sales.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs font-medium text-red-800">Saídas</p>
                    <p className="text-lg font-bold text-red-600">
                      R$ {dailyCash.expenses.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs font-medium text-gray-800">Fechamento</p>
                    <p className="text-lg font-bold text-gray-600">
                      R$ {dailyCash.closing.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <PlusCircle className="w-3 h-3 mr-1" />
                      Suprimento
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <MinusCircle className="w-3 h-3 mr-1" />
                      Sangria
                    </Button>
                  </div>
                  <Button onClick={closeDailyCash} className="w-full text-sm">
                    <Receipt className="w-4 h-4 mr-2" />
                    Fechar Caixa do Dia
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Movimentações Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {[
                    { type: 'sale', description: 'Venda #001 - João Silva', amount: 420.00, time: '14:30' },
                    { type: 'expense', description: 'Combustível', amount: -50.00, time: '12:00' },
                    { type: 'sale', description: 'Venda #002 - Maria Santos', amount: 380.00, time: '11:15' }
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{transaction.description}</p>
                        <p className="text-xs text-gray-600">{transaction.time}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={transaction.type === 'sale' ? 'default' : 'destructive'} className="text-xs">
                          {transaction.type === 'sale' ? 'Venda' : 'Despesa'}
                        </Badge>
                        <span className={`text-sm font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custos Fixos */}
        <TabsContent value="costs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Custos Fixos</CardTitle>
                <CardDescription className="text-sm">
                  Despesas mensais recorrentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {fixedCosts.map((cost) => (
                    <div key={cost.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{cost.name}</p>
                        <p className="text-xs text-gray-600">Vence em {cost.dueDate}</p>
                      </div>
                      <span className="text-sm font-semibold text-red-600">
                        R$ {cost.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full text-sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Custo Fixo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Custos Variáveis</CardTitle>
                <CardDescription className="text-sm">
                  Despesas eventuais e compras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {variableCosts.map((cost) => (
                    <div key={cost.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">{cost.name}</p>
                        <p className="text-xs text-gray-600">{cost.date}</p>
                      </div>
                      <span className="text-sm font-semibold text-orange-600">
                        R$ {cost.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full text-sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Custo Variável
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Despesas */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span>Registro de Despesas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Descrição da despesa" className="text-sm" />
                <Input type="number" step="0.01" placeholder="Valor (R$)" className="text-sm" />
                <Button className="text-sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Registrar
                </Button>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                <h3 className="font-medium text-sm">Despesas Recentes</h3>
                {[
                  { description: "Material de limpeza", amount: 35.00, date: "01/01/2024" },
                  { description: "Manutenção equipamento", amount: 150.00, date: "31/12/2023" }
                ].map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{expense.description}</p>
                      <p className="text-xs text-gray-600">{expense.date}</p>
                    </div>
                    <span className="text-sm font-semibold text-red-600">
                      R$ {expense.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculadora de Margem */}
        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                <span>Calculadora de Margem de Lucro</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Calcule a margem e lucro de seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Preço de Custo (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={profitCalculator.costPrice}
                    onChange={(e) => setProfitCalculator({ ...profitCalculator, costPrice: e.target.value })}
                    placeholder="0,00"
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Preço de Venda (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={profitCalculator.sellPrice}
                    onChange={(e) => setProfitCalculator({ ...profitCalculator, sellPrice: e.target.value })}
                    placeholder="0,00"
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Despesas Extras (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={profitCalculator.expenses}
                    onChange={(e) => setProfitCalculator({ ...profitCalculator, expenses: e.target.value })}
                    placeholder="0,00"
                    className="text-sm"
                  />
                </div>
              </div>

              <Button onClick={calculateProfit} className="w-full text-sm">
                <Calculator className="w-4 h-4 mr-2" />
                Calcular Margem
              </Button>

              {profitCalculator.profit !== 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Lucro</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {profitCalculator.profit.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Margem</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {profitCalculator.margin.toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialManager;
