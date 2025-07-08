import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Smartphone,
  Headphones,
  Watch,
  Camera
} from "lucide-react";

interface ProductGridProps {
  viewMode: "grid" | "list";
  searchTerm: string;
  category: string;
}

export const ProductGrid = ({ viewMode, searchTerm, category }: ProductGridProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      category: "smartphones",
      price: 8999.99,
      originalPrice: 9499.99,
      image: "/placeholder.svg",
      stock: 12,
      rating: 4.8,
      reviews: 124,
      tags: ["Novo", "Promoção"],
      description: "O mais avançado iPhone com câmera profissional",
      icon: Smartphone
    },
    {
      id: "2", 
      name: "Samsung Galaxy S24 Ultra",
      category: "smartphones",
      price: 7499.99,
      originalPrice: 7999.99,
      image: "/placeholder.svg",
      stock: 8,
      rating: 4.7,
      reviews: 89,
      tags: ["Destaque"],
      description: "Smartphone premium com S Pen integrada",
      icon: Smartphone
    },
    {
      id: "3",
      name: "AirPods Pro 2ª Gen",
      category: "acessorios",
      price: 1899.99,
      image: "/placeholder.svg",
      stock: 25,
      rating: 4.9,
      reviews: 256,
      tags: ["Bestseller"],
      description: "Fones com cancelamento ativo de ruído",
      icon: Headphones
    },
    {
      id: "4",
      name: "Apple Watch Series 9",
      category: "acessorios",
      price: 3299.99,
      image: "/placeholder.svg",
      stock: 15,
      rating: 4.6,
      reviews: 78,
      tags: ["Novo"],
      description: "Smartwatch com recursos avançados de saúde",
      icon: Watch
    },
    {
      id: "5",
      name: "iPad Pro 12.9",
      category: "tablets",
      price: 8999.99,
      image: "/placeholder.svg",
      stock: 6,
      rating: 4.8,
      reviews: 145,
      tags: ["Profissional"],
      description: "Tablet profissional com chip M2",
      icon: Camera
    },
    {
      id: "6",
      name: "MacBook Air M3",
      category: "tablets",
      price: 12499.99,
      image: "/placeholder.svg",
      stock: 4,
      rating: 4.9,
      reviews: 203,
      tags: ["Novo", "Destaque"],
      description: "Notebook ultraportátil com chip M3",
      icon: Smartphone
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <product.icon className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {product.stock} em estoque
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            {/* Imagem do produto */}
            <div className="relative aspect-square bg-muted flex items-center justify-center">
              <product.icon className="w-16 h-16 text-muted-foreground" />
              
              {/* Tags de produto */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Ações flutuantes */}
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Indicador de estoque baixo */}
              {product.stock <= 5 && (
                <div className="absolute bottom-2 left-2">
                  <Badge variant="destructive" className="text-xs">
                    Estoque baixo
                  </Badge>
                </div>
              )}
            </div>

            {/* Informações do produto */}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
              
              {/* Rating e reviews */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.stock} disponíveis
                </Badge>
              </div>

              {/* Preço */}
              <div className="mb-4">
                <div className="text-xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};