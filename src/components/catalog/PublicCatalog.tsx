import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Star, 
  MessageCircle,
  Heart,
  Share2,
  Filter,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  ExternalLink
} from "lucide-react";

interface PublicCatalogProps {
  storeName?: string;
  storeDescription?: string;
  whatsappNumber?: string;
  primaryColor?: string;
  showPrices?: boolean;
  showStock?: boolean;
  showRatings?: boolean;
}

const PublicCatalog = ({ 
  storeName = "LojixApp Store",
  storeDescription = "Sua loja de tecnologia com os melhores preços",
  whatsappNumber = "5545999999999",
  primaryColor = "#3B82F6",
  showPrices = true,
  showStock = true,
  showRatings = true
}: PublicCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
      icon: Smartphone,
      available: true
    },
    {
      id: "2", 
      name: "Samsung Galaxy S24 Ultra",
      category: "smartphones",
      price: 7499.99,
      originalPrice: 7999.99,
      image: "/placeholder.svg",
      stock: 0,
      rating: 4.7,
      reviews: 89,
      tags: ["Pré-venda"],
      description: "Smartphone premium com S Pen integrada",
      icon: Smartphone,
      available: false
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
      icon: Headphones,
      available: true
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
      icon: Watch,
      available: true
    },
    {
      id: "5",
      name: "iPad Pro 12.9",
      category: "tablets",
      price: 8999.99,
      image: "/placeholder.svg",
      stock: 0,
      rating: 4.8,
      reviews: 145,
      tags: ["Pré-venda"],
      description: "Tablet profissional com chip M2",
      icon: Camera,
      available: false
    }
  ];

  const categories = [
    { id: "all", name: "Todos", count: products.length },
    { id: "smartphones", name: "Smartphones", count: products.filter(p => p.category === "smartphones").length },
    { id: "tablets", name: "Tablets", count: products.filter(p => p.category === "tablets").length },
    { id: "acessorios", name: "Acessórios", count: products.filter(p => p.category === "acessorios").length }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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

  const generateWhatsAppLink = (product: any) => {
    const message = product.available 
      ? `Olá! Tenho interesse no produto *${product.name}* por ${formatPrice(product.price)}. Poderia me dar mais informações?`
      : `Olá! Gostaria de ser avisado quando o produto *${product.name}* estiver disponível.`;
    
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const shareProduct = async (product: any) => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `${product.description} - ${formatPrice(product.price)}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${product.name} - ${formatPrice(product.price)} - ${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-foreground">{storeName}</h1>
              <p className="text-sm text-muted-foreground">{storeDescription}</p>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Procurar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Imagem do produto */}
                <div className="relative aspect-square bg-muted flex items-center justify-center">
                  <product.icon className="w-16 h-16 text-muted-foreground" />
                  
                  {/* Tags */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant={tag === "Pré-venda" ? "destructive" : "secondary"} 
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Ações flutuantes */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="w-8 h-8 p-0"
                      onClick={() => shareProduct(product)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Indicador de estoque */}
                  {!product.available && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        Indisponível
                      </Badge>
                    </div>
                  )}
                  
                  {showStock && product.available && product.stock <= 5 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="text-xs bg-background">
                        Últimas {product.stock} unidades
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Informações do produto */}
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Rating */}
                  {showRatings && (
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  )}

                  {/* Preço */}
                  {showPrices && (
                    <div className="mb-4">
                      <div className="text-xl font-bold text-foreground">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Estoque */}
                  {showStock && product.available && (
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs">
                        {product.stock} disponíveis
                      </Badge>
                    </div>
                  )}

                  {/* Botão de ação */}
                  <Button 
                    className="w-full h-12 text-base"
                    style={{ 
                      backgroundColor: product.available ? primaryColor : undefined 
                    }}
                    variant={product.available ? "default" : "outline"}
                    onClick={() => window.open(generateWhatsAppLink(product), '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {product.available ? "Comprar via WhatsApp" : "Avisar quando disponível"}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar por outro termo ou categoria
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 px-4 border-t border-border bg-muted/30">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Powered by
          </p>
          <div className="text-base font-semibold" style={{ color: primaryColor }}>
            LojixApp
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicCatalog;