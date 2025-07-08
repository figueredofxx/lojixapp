
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Bot,
  Upload,
  Tag,
  Building
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 13 Pro Max 256GB",
      warranty: 12,
      controlType: "unique",
      price: 4200.00,
      description: "Smartphone Apple com câmera profissional",
      condition: "new",
      brand: "Apple",
      category: "Smartphone",
      image: null,
      status: "active"
    }
  ]);

  const [brands, setBrands] = useState([
    { id: 1, name: "Apple", description: "Produtos Apple Inc." },
    { id: 2, name: "Samsung", description: "Samsung Electronics" }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Smartphone", description: "Telefones celulares" },
    { id: 2, name: "Tablet", description: "Tablets e iPads" }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    warranty: '',
    controlType: '',
    price: '',
    description: '',
    condition: '',
    brand: '',
    category: '',
    image: null
  });

  const [newBrand, setNewBrand] = useState({ name: '', description: '' });
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.controlType) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: parseFloat(newProduct.price),
        warranty: parseInt(newProduct.warranty) || 0,
        status: 'active'
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        warranty: '',
        controlType: '',
        price: '',
        description: '',
        condition: '',
        brand: '',
        category: '',
        image: null
      });
    }
  };

  const handleAddBrand = () => {
    if (newBrand.name) {
      setBrands([...brands, { id: brands.length + 1, ...newBrand }]);
      setNewBrand({ name: '', description: '' });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, { id: categories.length + 1, ...newCategory }]);
      setNewCategory({ name: '', description: '' });
    }
  };

  const generateDescription = () => {
    if (newProduct.name) {
      // Simular geração de descrição via IA
      const generated = `${newProduct.name} - Produto de alta qualidade com excelente custo-benefício. Ideal para uso profissional e pessoal. Garantia de ${newProduct.warranty || 12} meses.`;
      setNewProduct({ ...newProduct, description: generated });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="text-xs md:text-sm">Produtos</TabsTrigger>
          <TabsTrigger value="brands" className="text-xs md:text-sm">Marcas</TabsTrigger>
          <TabsTrigger value="categories" className="text-xs md:text-sm">Categorias</TabsTrigger>
        </TabsList>

        {/* Produtos */}
        <TabsContent value="products" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Formulário de Cadastro */}
            <Card className="flex-1">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Package className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Cadastrar Produto</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Adicione novos produtos ao seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">Nome do Produto</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ex: iPhone 13 Pro Max 256GB"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warranty" className="text-sm">Garantia (meses)</Label>
                    <Input
                      id="warranty"
                      type="number"
                      value={newProduct.warranty}
                      onChange={(e) => setNewProduct({ ...newProduct, warranty: e.target.value })}
                      placeholder="12"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="controlType" className="text-sm">Tipo de Controle</Label>
                    <Select value={newProduct.controlType} onValueChange={(value) => setNewProduct({ ...newProduct, controlType: value })}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unique">Controlado por Identificador Único</SelectItem>
                        <SelectItem value="quantity">Controlado por Quantidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm">Preço de Venda (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0,00"
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition" className="text-sm">Estado do Produto</Label>
                    <Select value={newProduct.condition} onValueChange={(value) => setNewProduct({ ...newProduct, condition: value })}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Novo</SelectItem>
                        <SelectItem value="used">Seminovo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-sm">Marca</Label>
                    <Select value={newProduct.brand} onValueChange={(value) => setNewProduct({ ...newProduct, brand: value })}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione a marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm">Categoria</Label>
                    <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description" className="text-sm">Descrição do Produto</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={generateDescription}
                      className="text-xs"
                    >
                      <Bot className="w-3 h-3 mr-1" />
                      Gerar com IA
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Descrição detalhada do produto..."
                    className="text-sm"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm">Imagem do Produto (Opcional)</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Carregar Imagem
                    </Button>
                    <span className="text-xs text-gray-500">JPG, PNG até 5MB</span>
                  </div>
                </div>

                <Button onClick={handleAddProduct} className="w-full text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Produto
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Produtos */}
            <Card className="flex-1">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-base md:text-xl">Produtos Cadastrados</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Buscar produtos..." className="pl-8 text-sm" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{product.name}</h4>
                          <p className="text-xs text-gray-600">{product.brand} • {product.category}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <Badge variant={product.condition === 'new' ? 'default' : 'secondary'} className="text-xs">
                            {product.condition === 'new' ? 'Novo' : 'Seminovo'}
                          </Badge>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 text-red-500">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-600">
                          {product.controlType === 'unique' ? 'ID Único' : 'Quantidade'} • {product.warranty}m garantia
                        </span>
                        <span className="font-bold text-green-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Marcas */}
        <TabsContent value="brands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Tag className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Cadastrar Marca</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandName" className="text-sm">Nome da Marca</Label>
                  <Input
                    id="brandName"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                    placeholder="Ex: Apple"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandDescription" className="text-sm">Descrição (Opcional)</Label>
                  <Textarea
                    id="brandDescription"
                    value={newBrand.description}
                    onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                    placeholder="Descrição da marca..."
                    className="text-sm"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddBrand} className="w-full text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Marca
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Marcas Cadastradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex justify-between items-center p-2 border rounded">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{brand.name}</p>
                        {brand.description && (
                          <p className="text-xs text-gray-600 truncate">{brand.description}</p>
                        )}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Categorias */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                  <Building className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Cadastrar Categoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName" className="text-sm">Nome da Categoria</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Ex: Smartphone"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoryDescription" className="text-sm">Descrição (Opcional)</Label>
                  <Textarea
                    id="categoryDescription"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Descrição da categoria..."
                    className="text-sm"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddCategory} className="w-full text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Categoria
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-xl">Categorias Cadastradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-2 border rounded">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{category.name}</p>
                        {category.description && (
                          <p className="text-xs text-gray-600 truncate">{category.description}</p>
                        )}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 text-red-500">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductManager;
