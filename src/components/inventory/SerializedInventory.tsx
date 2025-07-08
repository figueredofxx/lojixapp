
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Product {
  id: string;
  serialNumber: string;
  model: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  status: 'available' | 'sold' | 'reserved';
  entryDate: Date;
  saleDate?: Date;
  supplier: string;
  notes?: string;
}

export const SerializedInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      serialNumber: 'IP13P001',
      model: 'iPhone 13 Pro 128GB',
      category: 'Smartphones',
      purchasePrice: 3500,
      salePrice: 4200,
      status: 'available',
      entryDate: new Date('2024-01-15'),
      supplier: 'Tech Import'
    },
    {
      id: '2',
      serialNumber: 'IP13P002',
      model: 'iPhone 13 Pro 128GB',
      category: 'Smartphones',
      purchasePrice: 3600,
      salePrice: 4200,
      status: 'sold',
      entryDate: new Date('2024-01-20'),
      saleDate: new Date('2024-02-01'),
      supplier: 'Tech Import'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Disponível</Badge>;
      case 'sold':
        return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" />Vendido</Badge>;
      case 'reserved':
        return <Badge variant="outline"><AlertTriangle className="w-3 h-3 mr-1" />Reservado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const calculateMargin = (purchasePrice: number, salePrice: number) => {
    return ((salePrice - purchasePrice) / purchasePrice * 100).toFixed(1);
  };

  const stats = {
    total: products.length,
    available: products.filter(p => p.status === 'available').length,
    sold: products.filter(p => p.status === 'sold').length,
    totalValue: products.filter(p => p.status === 'available').reduce((sum, p) => sum + p.salePrice, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Disponíveis</p>
                <p className="text-2xl font-bold">{stats.available}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Vendidos</p>
                <p className="text-2xl font-bold">{stats.sold}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Valor em Estoque</p>
                <p className="text-2xl font-bold">R$ {stats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Inventário Serializado</span>
              </CardTitle>
              <CardDescription>
                Controle individual de produtos com preços de compra variáveis
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Buscar por modelo ou número de série..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Todas as Categorias</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Tablets">Tablets</option>
              <option value="Acessórios">Acessórios</option>
            </select>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Todos os Status</option>
              <option value="available">Disponível</option>
              <option value="sold">Vendido</option>
              <option value="reserved">Reservado</option>
            </select>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Produto</th>
                  <th className="text-left p-3">Número de Série</th>
                  <th className="text-left p-3">Preço Compra</th>
                  <th className="text-left p-3">Preço Venda</th>
                  <th className="text-left p-3">Margem</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Data Entrada</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{product.model}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-sm">{product.serialNumber}</td>
                    <td className="p-3">R$ {product.purchasePrice.toLocaleString()}</td>
                    <td className="p-3">R$ {product.salePrice.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="text-green-600 font-medium">
                        {calculateMargin(product.purchasePrice, product.salePrice)}%
                      </span>
                    </td>
                    <td className="p-3">{getStatusBadge(product.status)}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">
                          {product.entryDate.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="mb-4">Tente ajustar os filtros ou adicione novos produtos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
