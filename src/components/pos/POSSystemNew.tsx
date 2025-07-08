
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Search, 
  Scan, 
  Plus, 
  Minus, 
  User, 
  CreditCard, 
  Banknote, 
  Smartphone,
  Check,
  Printer,
  Eye,
  X,
  ArrowLeft,
  Calculator
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const POSSystemNew = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Produtos, 2: Cliente, 3: Pagamento, 4: Finalização
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaleComplete, setShowSaleComplete] = useState(false);

  const products = [
    {
      id: 1,
      name: "iPhone 13 Pro Max 256GB",
      code: "IP13PM256",
      price: 4200.00,
      stock: 5,
      category: "Smartphone"
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      code: "SGS23U",
      price: 3800.00,
      stock: 3,
      category: "Smartphone"
    },
    {
      id: 3,
      name: "Cabo USB-C",
      code: "CABO001",
      price: 25.00,
      stock: 50,
      category: "Acessórios"
    }
  ];

  const customers = [
    { id: 1, name: "João Silva", cpf: "123.456.789-00", phone: "(11) 99999-9999" },
    { id: 2, name: "Maria Santos", cpf: "987.654.321-00", phone: "(11) 88888-8888" }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubtotal() - discount;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completeSale = () => {
    console.log('Venda finalizada:', {
      customer: selectedCustomer,
      items: cart,
      paymentMethod,
      discount,
      total: getTotal()
    });
    setShowSaleComplete(true);
  };

  const resetSale = () => {
    setCart([]);
    setSelectedCustomer(null);
    setPaymentMethod('');
    setDiscount(0);
    setCurrentStep(1);
    setShowSaleComplete(false);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header com Steps */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              <span>Ponto de Venda</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={resetSale}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === currentStep ? 'bg-blue-500 text-white' :
                  step < currentStep ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-1 mx-1 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Produtos</span>
            <span>Cliente</span>
            <span>Pagamento</span>
            <span>Finalizar</span>
          </div>
        </CardHeader>
      </Card>

      {/* Step 1: Seleção de Produtos */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Produtos</CardTitle>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome ou código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-sm"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Scan className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.code} • Estoque: {product.stock}</p>
                      <p className="text-sm font-semibold text-green-600">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg">Carrinho de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">Nenhum produto adicionado</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2 max-h-[250px] overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-600">R$ {item.price.toFixed(2)} cada</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 p-0 text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <div className="space-y-2">
                      <Label className="text-sm">Desconto (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        className="text-sm"
                      />
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>R$ {getSubtotal().toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Desconto:</span>
                          <span>- R$ {discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>R$ {getTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={nextStep} 
                      className="w-full" 
                      disabled={cart.length === 0}
                    >
                      Continuar para Cliente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Seleção de Cliente */}
      {currentStep === 2 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
              <User className="w-4 h-4 md:w-5 md:h-5" />
              <span>Selecionar Cliente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Clientes Cadastrados</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {customers.map((customer) => (
                    <div 
                      key={customer.id} 
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedCustomer?.id === customer.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.cpf}</p>
                      <p className="text-xs text-gray-600">{customer.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm">Cadastrar Novo Cliente</h3>
                <div className="space-y-3">
                  <Input placeholder="Nome completo" className="text-sm" />
                  <Input placeholder="CPF/CNPJ" className="text-sm" />
                  <Input placeholder="Telefone" className="text-sm" />
                  <Button variant="outline" className="w-full text-sm">
                    Cadastrar Cliente
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={nextStep} disabled={!selectedCustomer}>
                Continuar para Pagamento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Forma de Pagamento */}
      {currentStep === 3 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
              <span>Forma de Pagamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'pix', name: 'PIX', icon: Smartphone },
                { id: 'card', name: 'Cartão', icon: CreditCard },
                { id: 'cash', name: 'Dinheiro', icon: Banknote },
                { id: 'trade', name: 'Troca', icon: Calculator }
              ].map((method) => (
                <Button
                  key={method.id}
                  variant={paymentMethod === method.id ? 'default' : 'outline'}
                  className="h-20 flex flex-col items-center space-y-2"
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <method.icon className="w-6 h-6" />
                  <span className="text-xs">{method.name}</span>
                </Button>
              ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-sm mb-2">Resumo da Venda</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span>{selectedCustomer?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Itens:</span>
                  <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={nextStep} disabled={!paymentMethod}>
                Finalizar Venda
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Finalização */}
      {currentStep === 4 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
              <Check className="w-4 h-4 md:w-5 md:h-5" />
              <span>Confirmar Venda</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Resumo Final</h3>
              <div className="space-y-1 text-sm text-green-700">
                <p><strong>Cliente:</strong> {selectedCustomer?.name}</p>
                <p><strong>Forma de Pagamento:</strong> {
                  paymentMethod === 'pix' ? 'PIX' :
                  paymentMethod === 'card' ? 'Cartão' :
                  paymentMethod === 'cash' ? 'Dinheiro' : 'Troca'
                }</p>
                <p><strong>Total:</strong> R$ {getTotal().toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
              <Button onClick={completeSale} className="bg-green-600 hover:bg-green-700">
                Confirmar Venda
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Venda Concluída */}
      <Dialog open={showSaleComplete} onOpenChange={setShowSaleComplete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-green-600">
              <Check className="w-6 h-6" />
              <span>Venda Concluída!</span>
            </DialogTitle>
            <DialogDescription>
              A venda foi processada com sucesso.
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Pedido
            </Button>
            <Button variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar Venda
            </Button>
          </div>
          <Button onClick={resetSale} className="w-full mt-2">
            Nova Venda
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POSSystemNew;
