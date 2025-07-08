
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Users, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShoppingBag, 
  Calendar,
  Star,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  notes?: string;
  registrationDate: Date;
  lastPurchase?: Date;
  totalPurchases: number;
  totalSpent: number;
  purchases: Purchase[];
  preferences?: string;
}

interface Purchase {
  id: string;
  date: Date;
  items: string[];
  total: number;
  paymentMethod: string;
}

export const CRMSystem: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'João Silva',
      whatsapp: '11999999999',
      email: 'joao@email.com',
      notes: 'Cliente fiel, prefere iPhones',
      registrationDate: new Date('2024-01-15'),
      lastPurchase: new Date('2024-02-20'),
      totalPurchases: 3,
      totalSpent: 12600,
      purchases: [
        {
          id: '1',
          date: new Date('2024-02-20'),
          items: ['iPhone 13 Pro 128GB'],
          total: 4200,
          paymentMethod: 'PIX'
        },
        {
          id: '2',
          date: new Date('2024-01-20'),
          items: ['AirPods Pro'],
          total: 1200,
          paymentMethod: 'Cartão de Crédito'
        }
      ],
      preferences: 'Produtos Apple, contato via WhatsApp'
    },
    {
      id: '2',
      name: 'Maria Santos',
      whatsapp: '11888888888',
      email: 'maria@email.com',
      registrationDate: new Date('2024-02-01'),
      lastPurchase: new Date('2024-02-15'),
      totalPurchases: 1,
      totalSpent: 3800,
      purchases: [
        {
          id: '3',
          date: new Date('2024-02-15'),
          items: ['Samsung Galaxy S23'],
          total: 3800,
          paymentMethod: 'PIX'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.whatsapp.includes(searchTerm) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 10000) return { label: 'VIP', color: 'bg-purple-500' };
    if (totalSpent >= 5000) return { label: 'Premium', color: 'bg-gold-500' };
    if (totalSpent >= 2000) return { label: 'Fiel', color: 'bg-blue-500' };
    return { label: 'Novo', color: 'bg-gray-500' };
  };

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.lastPurchase && 
      (new Date().getTime() - c.lastPurchase.getTime()) / (1000 * 60 * 60 * 24) <= 30
    ).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgTicket: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Clientes</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold">{stats.activeCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold">R$ {stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Ticket Médio</p>
                <p className="text-2xl font-bold">R$ {Math.round(stats.avgTicket).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Clientes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Clientes</span>
                </CardTitle>
                <CardDescription>
                  Gerencie seus clientes e histórico de relacionamento
                </CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCustomers.map((customer) => {
                  const level = getCustomerLevel(customer.totalSpent);
                  return (
                    <div
                      key={customer.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        selectedCustomer?.id === customer.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{customer.name}</h3>
                            <Badge className={`${level.color} text-white text-xs`}>
                              {level.label}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.whatsapp}
                            </span>
                            {customer.email && (
                              <span className="flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {customer.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">
                            R$ {customer.totalSpent.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {customer.totalPurchases} compras
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{selectedCustomer.name}</h3>
                  <Badge className={`${getCustomerLevel(selectedCustomer.totalSpent).color} text-white mt-1`}>
                    {getCustomerLevel(selectedCustomer.totalSpent).label}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedCustomer.whatsapp}</span>
                  </div>
                  {selectedCustomer.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Cliente desde {selectedCustomer.registrationDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Estatísticas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total gasto:</span>
                      <span className="font-medium">R$ {selectedCustomer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compras realizadas:</span>
                      <span className="font-medium">{selectedCustomer.totalPurchases}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ticket médio:</span>
                      <span className="font-medium">
                        R$ {Math.round(selectedCustomer.totalSpent / selectedCustomer.totalPurchases).toLocaleString()}
                      </span>
                    </div>
                    {selectedCustomer.lastPurchase && (
                      <div className="flex justify-between">
                        <span>Última compra:</span>
                        <span className="font-medium">
                          {selectedCustomer.lastPurchase.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedCustomer.preferences && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Preferências</h4>
                    <p className="text-sm text-gray-600">{selectedCustomer.preferences}</p>
                  </div>
                )}

                {selectedCustomer.notes && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Notas</h4>
                    <p className="text-sm text-gray-600">{selectedCustomer.notes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Histórico de Compras</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedCustomer.purchases.map((purchase) => (
                      <div key={purchase.id} className="text-sm border-l-2 border-gray-200 pl-3">
                        <div className="flex justify-between">
                          <span className="font-medium">R$ {purchase.total.toLocaleString()}</span>
                          <span className="text-gray-500">
                            {purchase.date.toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-gray-600">{purchase.items.join(', ')}</p>
                        <p className="text-xs text-gray-500">{purchase.paymentMethod}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Selecione um cliente para ver os detalhes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
