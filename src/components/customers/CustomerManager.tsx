
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "João Silva",
      cpf: "123.456.789-00",
      phone: "(11) 99999-9999",
      email: "joao@email.com",
      address: {
        cep: "01234-567",
        street: "Rua das Flores, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        complement: "Apto 101"
      },
      birthDate: "1985-06-15",
      registerDate: "2024-01-15",
      status: "active",
      notes: "Cliente preferencial, sempre compra produtos Apple",
      purchases: [
        { id: 1, date: "2024-01-20", total: 4200.00, items: "iPhone 13 Pro Max" },
        { id: 2, date: "2024-01-25", total: 150.00, items: "Cabo USB-C, Capinha" }
      ]
    },
    {
      id: 2,
      name: "Maria Santos",
      cpf: "987.654.321-00",
      phone: "(11) 88888-8888",
      email: "maria@email.com",
      address: {
        cep: "04567-890",
        street: "Av. Paulista, 1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        complement: ""
      },
      birthDate: "1990-03-22",
      registerDate: "2024-01-10",
      status: "active",
      notes: "",
      purchases: [
        { id: 3, date: "2024-01-18", total: 3800.00, items: "Samsung Galaxy S23" }
      ]
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: {
      cep: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: ''
    },
    birthDate: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cpf.includes(searchTerm) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.cpf) {
      const customer = {
        id: customers.length + 1,
        ...newCustomer,
        registerDate: new Date().toISOString().split('T')[0],
        status: 'active',
        purchases: []
      };
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        cpf: '',
        phone: '',
        email: '',
        address: {
          cep: '',
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          complement: ''
        },
        birthDate: '',
        notes: ''
      });
      setShowAddCustomer(false);
    }
  };

  const getTotalPurchases = (customer) => {
    return customer.purchases.reduce((sum, purchase) => sum + purchase.total, 0);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="text-xs md:text-sm">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="add" className="text-xs md:text-sm">Cadastrar Cliente</TabsTrigger>
        </TabsList>

        {/* Lista de Clientes */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span>Gerenciamento de Clientes</span>
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome, CPF ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-sm"
                  />
                </div>
                <Button onClick={() => setShowAddCustomer(true)} className="text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-sm truncate">{customer.name}</h3>
                          <Badge variant={customer.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <span>📱</span>
                            <span>{customer.cpf}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-xs p-2"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs p-2">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs p-2 text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">
                        Cliente desde {new Date(customer.registerDate).toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                          {customer.purchases.length} compras
                        </span>
                        <span className="font-semibold text-green-600">
                          Total: R$ {getTotalPurchases(customer).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cadastrar Cliente */}
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                <span>Cadastrar Novo Cliente</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Preencha os dados do cliente para cadastro completo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="font-medium text-base">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="João Silva"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-sm">CPF/CNPJ *</Label>
                    <Input
                      id="cpf"
                      value={newCustomer.cpf}
                      onChange={(e) => setNewCustomer({ ...newCustomer, cpf: e.target.value })}
                      placeholder="123.456.789-00"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">Telefone</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="joao@email.com"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-sm">Data de Nascimento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={newCustomer.birthDate}
                      onChange={(e) => setNewCustomer({ ...newCustomer, birthDate: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="font-medium text-base">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep" className="text-sm">CEP</Label>
                    <Input
                      id="cep"
                      value={newCustomer.address.cep}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, cep: e.target.value }
                      })}
                      placeholder="01234-567"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street" className="text-sm">Rua e Número</Label>
                    <Input
                      id="street"
                      value={newCustomer.address.street}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, street: e.target.value }
                      })}
                      placeholder="Rua das Flores, 123"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="text-sm">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={newCustomer.address.neighborhood}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, neighborhood: e.target.value }
                      })}
                      placeholder="Centro"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm">Cidade</Label>
                    <Input
                      id="city"
                      value={newCustomer.address.city}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, city: e.target.value }
                      })}
                      placeholder="São Paulo"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm">Estado</Label>
                    <Input
                      id="state"
                      value={newCustomer.address.state}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, state: e.target.value }
                      })}
                      placeholder="SP"
                      className="text-sm"
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="complement" className="text-sm">Complemento</Label>
                    <Input
                      id="complement"
                      value={newCustomer.address.complement}
                      onChange={(e) => setNewCustomer({ 
                        ...newCustomer, 
                        address: { ...newCustomer.address, complement: e.target.value }
                      })}
                      placeholder="Apto 101, Bloco A"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm">Observações</Label>
                <Textarea
                  id="notes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                  placeholder="Preferências, anotações especiais..."
                  className="text-sm"
                  rows={3}
                />
              </div>

              <Button onClick={handleAddCustomer} className="w-full text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Cliente
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalhes do Cliente */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{selectedCustomer.name}</span>
              </DialogTitle>
              <DialogDescription>
                Informações detalhadas do cliente
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Dados Pessoais</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>CPF:</strong> {selectedCustomer.cpf}</p>
                    <p><strong>Telefone:</strong> {selectedCustomer.phone}</p>
                    <p><strong>E-mail:</strong> {selectedCustomer.email}</p>
                    {selectedCustomer.birthDate && (
                      <p><strong>Nascimento:</strong> {new Date(selectedCustomer.birthDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Endereço</h4>
                  <div className="text-sm">
                    <p>{selectedCustomer.address.street}</p>
                    {selectedCustomer.address.complement && (
                      <p>{selectedCustomer.address.complement}</p>
                    )}
                    <p>{selectedCustomer.address.neighborhood}</p>
                    <p>{selectedCustomer.address.city} - {selectedCustomer.address.state}</p>
                    <p>CEP: {selectedCustomer.address.cep}</p>
                  </div>
                </div>
              </div>

              {/* Histórico de Compras */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Histórico de Compras</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {selectedCustomer.purchases.map((purchase) => (
                    <div key={purchase.id} className="flex justify-between items-center p-2 border rounded text-sm">
                      <div>
                        <p className="font-medium">{purchase.items}</p>
                        <p className="text-xs text-gray-600">{new Date(purchase.date).toLocaleDateString()}</p>
                      </div>
                      <span className="font-semibold text-green-600">
                        R$ {purchase.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span><strong>Total de Compras:</strong></span>
                    <span className="font-bold text-green-600">
                      R$ {getTotalPurchases(selectedCustomer).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span><strong>Número de Compras:</strong></span>
                    <span>{selectedCustomer.purchases.length}</span>
                  </div>
                </div>
              </div>

              {/* Observações */}
              {selectedCustomer.notes && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Observações</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded border">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerManager;
