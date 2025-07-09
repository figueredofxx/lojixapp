import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  ShoppingCart,
  Plus,
  Minus,
  X,
  ArrowLeft,
  Menu,
  MapPin,
  Clock,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheckoutComponent } from "@/components/checkout/CheckoutComponent";
import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

interface ModernStorefrontProps {
  storeName?: string;
  storeDescription?: string;
  whatsappNumber?: string;
  primaryColor?: string;
}

const ModernStorefront = ({ 
  storeName = "LojixApp Store",
  storeDescription = "Sua loja de tecnologia com os melhores preços",
  whatsappNumber = "5545999999999",
  primaryColor = "#3B82F6"
}: ModernStorefrontProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

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
      description: "O mais avançado iPhone com câmera profissional de 48MP, chip A17 Pro e design em titânio.",
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
      stock: 8,
      rating: 4.7,
      reviews: 89,
      tags: ["Bestseller"],
      description: "Smartphone premium com S Pen integrada, zoom 100x e tela Dynamic AMOLED 2X.",
      icon: Smartphone,
      available: true
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
      description: "Fones com cancelamento ativo de ruído, áudio espacial e case MagSafe.",
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
      description: "Smartwatch com recursos avançados de saúde, GPS e tela Always-On.",
      icon: Watch,
      available: true
    },
    {
      id: "5",
      name: "iPad Pro 12.9\" M2",
      category: "tablets",
      price: 8999.99,
      image: "/placeholder.svg",
      stock: 6,
      rating: 4.8,
      reviews: 145,
      tags: ["Pro"],
      description: "Tablet profissional com chip M2, tela Liquid Retina XDR e suporte ao Apple Pencil.",
      icon: Camera,
      available: true
    },
    {
      id: "6",
      name: "MacBook Air M3",
      category: "notebooks",
      price: 12999.99,
      image: "/placeholder.svg",
      stock: 4,
      rating: 4.9,
      reviews: 203,
      tags: ["Novo", "M3"],
      description: "Notebook ultrafino com chip M3, 16GB RAM e tela Liquid Retina de 13.6\".",
      icon: Camera,
      available: true
    }
  ];

  const categories = [
    { id: "all", name: "Todos", count: products.length },
    { id: "smartphones", name: "Smartphones", count: products.filter(p => p.category === "smartphones").length },
    { id: "tablets", name: "Tablets", count: products.filter(p => p.category === "tablets").length },
    { id: "acessorios", name: "Acessórios", count: products.filter(p => p.category === "acessorios").length },
    { id: "notebooks", name: "Notebooks", count: products.filter(p => p.category === "notebooks").length }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prev.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return prev;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          maxStock: product.stock
        }];
      }
    });
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxStock) } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const shareProduct = async (product: any) => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `${product.description} - ${formatPrice(product.price)}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${product.name} - ${formatPrice(product.price)} - ${window.location.href}`);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  if (showCheckout) {
    const mockUser = {
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(45) 99999-9999"
    };

    return (
      <CheckoutComponent
        user={mockUser}
        cartItems={cart}
        onBack={() => setShowCheckout(false)}
        onSuccess={() => {
          setCart([]);
          setShowCheckout(false);
          alert("Pedido finalizado! Você será redirecionado para o WhatsApp.");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header moderno */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="font-cantarell">{storeName}</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-cantarell font-semibold">Categorias</h3>
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsMenuOpen(false);
                          }}
                        >
                          {category.name} ({category.count})
                        </Button>
                      ))}
                    </div>
                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        Localização
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        Horário de funcionamento
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Política de troca
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div>
                <h1 className="font-cantarell text-lg font-bold text-foreground">{storeName}</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">{storeDescription}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="w-4 h-4" />
                    {cartItemsCount > 0 && (
                      <Badge 
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="font-cantarell">Seu Carrinho</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col h-full">
                    {cart.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="font-cantarell font-semibold mb-2">Carrinho vazio</h3>
                          <p className="text-muted-foreground">Adicione produtos para continuar</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 space-y-4 py-6">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg">
                              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                <Smartphone className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-cantarell font-semibold text-sm truncate">{item.name}</h4>
                                <p className="text-sm font-semibold text-primary">{formatPrice(item.price)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.maxStock}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-cantarell font-semibold">Total:</span>
                            <span className="font-cantarell text-xl font-bold" style={{ color: primaryColor }}>
                              {formatPrice(cartTotal)}
                            </span>
                          </div>
                          
                          <Button 
                            className="w-full h-12 font-cantarell font-semibold"
                            style={{ backgroundColor: primaryColor }}
                            onClick={handleCheckout}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Finalizar Compra
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center">
                            🔒 Compra segura • Finalização via WhatsApp
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Busca moderna */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Procurar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base rounded-xl border-border focus:border-primary"
          />
        </div>

        {/* Categorias horizontais */}
        <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(category.id)}
              style={selectedCategory === category.id ? { backgroundColor: primaryColor } : {}}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Grid de produtos moderno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                {/* Imagem do produto */}
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <product.icon className="w-20 h-20 text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant={tag === "Promoção" ? "destructive" : "secondary"} 
                        className="text-xs font-medium shadow-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Ações flutuantes */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-9 h-9 p-0 shadow-md"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="w-9 h-9 p-0 shadow-md"
                      onClick={() => shareProduct(product)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Indicador de estoque baixo */}
                  {product.stock <= 5 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="text-xs bg-background shadow-sm">
                        Últimas {product.stock} unidades
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Informações do produto */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-cantarell font-semibold text-base mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews} avaliações)</span>
                  </div>

                  {/* Preço */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold" style={{ color: primaryColor }}>
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.stock} disponíveis
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 h-11 font-cantarell font-semibold"
                      style={{ backgroundColor: primaryColor }}
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="h-11 px-3"
                      onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no produto *${product.name}* por ${formatPrice(product.price)}. Poderia me dar mais informações?`)}`, '_blank')}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-cantarell text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar por outro termo ou categoria
            </p>
          </div>
        )}
      </div>

      {/* Footer moderno */}
      <footer className="mt-16 py-8 px-4 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-cantarell font-semibold mb-3">Contato</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📱 WhatsApp: +55 (45) 99999-9999</p>
                <p>📧 Email: contato@lojixapp.com</p>
                <p>📍 Endereço: Centro, Cidade - PR</p>
              </div>
            </div>
            <div>
              <h3 className="font-cantarell font-semibold mb-3">Informações</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🕒 Seg-Sex: 8h às 18h</p>
                <p>🕒 Sáb: 8h às 12h</p>
                <p>🚚 Entrega rápida</p>
              </div>
            </div>
            <div>
              <h3 className="font-cantarell font-semibold mb-3">Powered by</h3>
              <div className="font-cantarell text-lg font-bold" style={{ color: primaryColor }}>
                LojixApp
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Plataforma completa para seu negócio
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating cart button para mobile */}
      {cartItemsCount > 0 && (
        <Button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-40 md:hidden"
          style={{ backgroundColor: primaryColor }}
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          <Badge 
            className="absolute -top-2 -right-2 w-6 h-6 p-0 flex items-center justify-center text-xs"
            variant="destructive"
          >
            {cartItemsCount}
          </Badge>
        </Button>
      )}
    </div>
  );
};

export default ModernStorefront;