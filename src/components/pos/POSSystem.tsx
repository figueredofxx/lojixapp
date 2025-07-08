
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  CreditCard,
  Printer,
  Receipt,
  Search,
  Calculator
} from 'lucide-react';

interface SaleItem {
  id: string;
  serialNumber: string;
  model: string;
  price: number;
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
}

export const POSSystem: React.FC = () => {
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [discount, setDiscount] = useState(0);
  const [searchProduct, setSearchProduct] = useState('');

  const availableProducts = [
    { id: '1', serialNumber: 'IP13P001', model: 'iPhone 13 Pro 128GB', price: 4200 },
    { id: '2', serialNumber: 'SAM001', model: 'Samsung Galaxy S23', price: 3800 },
    { id: '3', serialNumber: 'XIA001', model: 'Xiaomi Mi 11', price: 2500 }
  ];

  const customers = [
    { id: '1', name: 'João Silva', whatsapp: '11999999999', email: 'joao@email.com' },
    { id: '2', name: 'Maria Santos', whatsapp: '11888888888' }
  ];

  const addToSale = (product: typeof availableProducts[0]) => {
    const existingItem = saleItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setSaleItems(saleItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSaleItems([...saleItems, {
        id: product.id,
        serialNumber: product.serialNumber,
        model: product.model,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const removeFromSale = (productId: string) => {
    setSaleItems(saleItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromSale(productId);
      return;
    }
    
    setSaleItems(saleItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const subtotal = saleItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const completeSale = () => {
    if (saleItems.length === 0) return;
    
    // Simular finalização da venda
    console.log('Venda finalizada:', {
      items: saleItems,
      customer: selectedCustomer,
      paymentMethod,
      subtotal,
      discount: discountAmount,
      total,
      timestamp: new Date()
    });

    // Limpar carrinho
    setSaleItems([]);
    setSelectedCustomer(null);
    setDiscount(0);
    
    alert('Venda finalizada com sucesso! Recibo gerado.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Produtos Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Produtos Disponíveis</span>
          </CardTitle>
          <CardDescription>
            Selecione os produtos para adicionar à venda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Buscar produto..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableProducts
                .filter(product => 
                  product.model.toLowerCase().includes(searchProduct.toLowerCase()) ||
                  product.serialNumber.toLowerCase().includes(searchProduct.toLowerCase())
                )
                .map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium">{product.model}</p>
                    <p className="text-sm text-gray-600">SN: {product.serialNumber}</p>
                    <p className="text-lg font-bold text-green-600">R$ {product.price.toLocaleString()}</p>
                  </div>
                  <Button
                    onClick={() => addToSale(product)}
                    size="sm"
                    className="ml-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carrinho e Finalização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Carrinho de Vendas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Itens do Carrinho */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {saleItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.model}</p>
                  <p className="text-sm text-gray-600">SN: {item.serialNumber}</p>
                  <p className="text-green-600">R$ {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFromSale(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            {saleItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Nenhum item no carrinho</p>
              </div>
            )}
          </div>

          {/* Cliente */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Cliente
            </h4>
            <select 
              value={selectedCustomer?.id || ''}
              onChange={(e) => {
                const customer = customers.find(c => c.id === e.target.value);
                setSelectedCustomer(customer || null);
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Selecionar cliente</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.whatsapp}
                </option>
              ))}
            </select>
          </div>

          {/* Método de Pagamento */}
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Método de Pagamento
            </h4>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="pix">PIX</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-debito">Cartão de Débito</option>
              <option value="cartao-credito">Cartão de Crédito</option>
            </select>
          </div>

          {/* Desconto */}
          <div>
            <h4 className="font-medium mb-2">Desconto (%)</h4>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="0"
              min="0"
              max="100"
            />
          </div>

          {/* Totais */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>R$ {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Desconto ({discount}%):</span>
                <span>- R$ {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>R$ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-2">
            <Button
              onClick={completeSale}
              disabled={saleItems.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Finalizar Venda
            </Button>
            <Button variant="outline" disabled={saleItems.length === 0}>
              <Receipt className="w-4 h-4 mr-2" />
              Recibo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
