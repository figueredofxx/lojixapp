import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Settings,
  Smartphone,
  Share2,
  QrCode,
  Palette,
  Layout,
  Eye,
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { ProductGrid } from "./ProductGrid";
import { CatalogCustomization } from "./CatalogCustomization";

const CatalogManager = () => {
  const [activeView, setActiveView] = useState("products");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos os Produtos", count: 127 },
    { id: "smartphones", name: "Smartphones", count: 45 },
    { id: "tablets", name: "Tablets", count: 23 },
    { id: "acessorios", name: "Acessórios", count: 59 }
  ];

  const catalogStats = [
    { label: "Produtos Ativos", value: "127", change: "+12", color: "text-green-600" },
    { label: "Visualizações", value: "2.3k", change: "+18%", color: "text-blue-600" },
    { label: "Conversões", value: "8.5%", change: "+2.1%", color: "text-purple-600" },
    { label: "Compartilhamentos", value: "156", change: "+23", color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {catalogStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-2 rounded-full bg-muted ${stat.color}`}>
                  <ShoppingCart className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navegação principal */}
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger value="customization" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Personalização
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Gestão de Produtos */}
        <TabsContent value="products" className="space-y-6">
          {/* Controles e filtros */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Catálogo de Produtos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gerencie produtos e visualize como aparecem no catálogo móvel
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => window.open('/catalogo/demo', '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Vitrine Simples
                    </Button>
                    <Button 
                      onClick={() => window.open('/loja/moderna', '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Loja Moderna
                    </Button>
                  </div>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Busca e filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>

              {/* Categorias */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>

              {/* Grid de produtos */}
              <ProductGrid viewMode={viewMode as "grid" | "list"} searchTerm={searchTerm} category={selectedCategory} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalização */}
        <TabsContent value="customization">
          <CatalogCustomization />
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics do Catálogo</CardTitle>
              <p className="text-sm text-muted-foreground">
                Métricas de performance e engajamento
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Eye className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics em Desenvolvimento</h3>
                <p className="mb-4">Métricas detalhadas serão implementadas em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CatalogManager;