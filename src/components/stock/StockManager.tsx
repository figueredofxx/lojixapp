
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  ArrowRightLeft, 
  Download,
  Scan,
  DollarSign,
  Calculator
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const StockManager = () => {
  const [stockItems, setStockItems] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro Max 256GB",
      code: "IP13PM256",
      quantity: 5,
      costPrice: 3800.00,
      sellPrice: 4200.00,
      category: "Smartphone",
      condition: "new",
      controlType: "unique",
      identifiers: ["IMEI001", "IMEI002", "IMEI003", "IMEI004", "IMEI005"]
    },
    {
      id: 2,
      name: "Cabo USB-C",
      code: "CABO001",
      quantity: 50,
      costPrice: 15.00,
      sellPrice: 25.00,
      category: "Acessórios",
      condition: "new",
      controlType: "quantity"
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [entryData, setEntryData] = useState({
    quantity: '',
    costPrice: '',
    identifiers: ''
  });

  const [priceCalculator, setPriceCalculator] = useState({
    dollarPrice: '',
    exchangeRate: '',
    profitMargin: '',
    finalPrice: 0
  });

  const calculatePrice = () => {
    const { dollarPrice, exchangeRate, profitMargin } = priceCalculator;
    if (dollarPrice && exchangeRate && profitMargin) {
      const basePrice = parseFloat(dollarPrice) * parseFloat(exchangeRate);
      const finalPrice = basePrice * (1 + parseFloat(profitMargin) / 100);
      setPriceCalculator({ ...priceCalculator, finalPrice });
    }
  };

  const handleStockEntry = () => {
    if (selectedProduct && entryData.costPrice) {
      console.log('Entrada de estoque:', {
        product: selectedProduct,
        data: entryData
      });
      // Lógica para processar entrada de estoque
      setEntryData({ quantity: '', costPrice: '', identifiers: '' });
      setSelectedProduct(null);
    }
  };

  const generatePriceList = () => {
    console.log('Gerando lista de preços...');
    // Lógica para gerar PDF
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="stock" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stock" className="text-xs md:text-sm">Estoque</TabsTrigger>
          <TabsTrigger value="entry" className="text-xs md:text-sm">Entrada</TabsTrigger>
          <TabsTrigger value="adjust" className="text-xs md:text-sm">Ajustes</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs md:text-sm">Relatórios</TabsTrigger>
        </TabsList>

        {/* Visualização de Estoque */}
        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Package className="w-4 h-4 md:w-5 md:h-5" />
                <span>Controle de Estoque</span>
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input placeholder="Buscar produtos..." className="pl-8 text-sm" />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48 text-sm">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="smartphone">Smartphone</SelectItem>
                    <SelectItem value="acessorios">Acessórios</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-32 text-sm">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="new">Novo</SelectItem>
                    <SelectItem value="used">Seminovo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm">Produto</TableHead>
                      <TableHead className="text-xs md:text-sm">Código</TableHead>
                      <TableHead className="text-xs md:text-sm">Qtd</TableHead>
                      <TableHead className="text-xs md:text-sm">Custo</TableHead>
                      <TableHead className="text-xs md:text-sm">Venda</TableHead>
                      <TableHead className="text-xs md:text-sm">Controle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-xs md:text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.category}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs md:text-sm">{item.code}</TableCell>
                        <TableCell>
                          <Badge variant={item.quantity < 5 ? 'destructive' : 'default'} className="text-xs">
                            {item.quantity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs md:text-sm">R$ {item.costPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-xs md:text-sm">R$ {item.sellPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {item.controlType === 'unique' ? 'ID Único' : 'Quantidade'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entrada de Estoque */}
        <TabsContent value="entry" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Entrada de Estoque</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Selecionar Produto</Label>
                  <Select onValueChange={(value) => setSelectedProduct(stockItems.find(item => item.id.toString() === value))}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Escolha um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {stockItems.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProduct && (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">{selectedProduct.name}</p>
                      <p className="text-xs text-gray-600">
                        Controle: {selectedProduct.controlType === 'unique' ? 'ID Único' : 'Quantidade'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Valor Unitário Pago (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={entryData.costPrice}
                        onChange={(e) => setEntryData({ ...entryData, costPrice: e.target.value })}
                        placeholder="0,00"
                        className="text-sm"
                      />
                    </div>

                    {selectedProduct.controlType === 'unique' ? (
                      <div className="space-y-2">
                        <Label className="text-sm">Identificadores (IMEI/Código de Barras)</Label>
                        <div className="flex space-x-2">
                          <Input
                            value={entryData.identifiers}
                            onChange={(e) => setEntryData({ ...entryData, identifiers: e.target.value })}
                            placeholder="Escaneie ou digite os códigos"
                            className="text-sm"
                          />
                          <Button variant="outline" size="sm">
                            <Scan className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Digite um código por linha ou escaneie com leitor
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label className="text-sm">Quantidade</Label>
                        <Input
                          type="number"
                          value={entryData.quantity}
                          onChange={(e) => setEntryData({ ...entryData, quantity: e.target.value })}
                          placeholder="0"
                          className="text-sm"
                        />
                      </div>
                    )}

                    <Button onClick={handleStockEntry} className="w-full text-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Confirmar Entrada
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Calculadora de Preços */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Calculadora de Preços</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Calcule preços em reais baseado no dólar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Preço em Dólar (US$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={priceCalculator.dollarPrice}
                    onChange={(e) => setPriceCalculator({ ...priceCalculator, dollarPrice: e.target.value })}
                    placeholder="100.00"
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Cotação do Dólar (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={priceCalculator.exchangeRate}
                    onChange={(e) => setPriceCalculator({ ...priceCalculator, exchangeRate: e.target.value })}
                    placeholder="5.20"
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Margem de Lucro (%)</Label>
                  <Input
                    type="number"
                    value={priceCalculator.profitMargin}
                    onChange={(e) => setPriceCalculator({ ...priceCalculator, profitMargin: e.target.value })}
                    placeholder="30"
                    className="text-sm"
                  />
                </div>

                <Button onClick={calculatePrice} className="w-full text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Calcular Preço Final
                </Button>

                {priceCalculator.finalPrice > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Preço Final:</p>
                    <p className="text-xl font-bold text-green-600">
                      R$ {priceCalculator.finalPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ajustes de Estoque */}
        <TabsContent value="adjust" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <ArrowRightLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span>Ajustes de Estoque</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Corrija quantidades e transfira produtos entre lojas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">Funcionalidade em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Download className="w-4 h-4 md:w-5 md:h-5" />
                <span>Lista de Preços</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Gere listas de preços personalizadas em PDF
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Filtrar por Categoria</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Ordenação</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Menor para maior preço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Menor para maior preço</SelectItem>
                      <SelectItem value="price-desc">Maior para menor preço</SelectItem>
                      <SelectItem value="name">Nome (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Status</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Apenas disponíveis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Apenas disponíveis</SelectItem>
                      <SelectItem value="all">Todos os produtos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generatePriceList} className="w-full text-sm">
                <Download className="w-4 h-4 mr-2" />
                Gerar Lista de Preços (PDF)
              </Button>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Informações incluídas no PDF:</strong>
                </p>
                <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
                  <li>Logo da loja no cabeçalho</li>
                  <li>Informações de contato</li>
                  <li>Lista de produtos com preços</li>
                  <li>Rodapé com endereço e observações</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockManager;
