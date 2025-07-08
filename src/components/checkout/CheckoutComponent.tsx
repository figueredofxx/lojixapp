import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  QrCode, 
  Copy, 
  Check, 
  ArrowLeft,
  ShoppingCart,
  User,
  MapPin,
  Clock,
  Shield
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CheckoutProps {
  user: any;
  cartItems: any[];
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutComponent = ({ user, cartItems, onBack, onSuccess }: CheckoutProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [pixCode, setPixCode] = useState("");
  const [pixCopied, setPixCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: ""
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.90;
  const total = subtotal + shipping;

  useEffect(() => {
    if (paymentMethod === "pix") {
      // Simular geração de código PIX
      const generatePixCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
        return `00020126580014BR.GOV.BCB.PIX01360123e4567-e12b-12d1-a456-426614174000520400005303986540${total.toFixed(2)}5802BR5913Loja Exemplo6009SAO PAULO61080500000062070503***6304${randomCode.toUpperCase()}`;
      };
      
      setTimeout(() => {
        setPixCode(generatePixCode());
      }, 1000);
    }
  }, [paymentMethod, total]);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleFinalizePurchase = () => {
    setIsProcessing(true);
    // Simular processamento
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="font-cantarell text-2xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Checkout */}
          <div className="space-y-6">
            {/* Dados do Usuário */}
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome</Label>
                    <Input value={user.name} disabled />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={user.email} disabled />
                  </div>
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={user.phone} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>CEP</Label>
                    <Input 
                      placeholder="00000-000"
                      value={shippingData.cep}
                      onChange={(e) => setShippingData(prev => ({ ...prev, cep: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Input 
                      placeholder="SP"
                      value={shippingData.state}
                      onChange={(e) => setShippingData(prev => ({ ...prev, state: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Rua</Label>
                  <Input 
                    placeholder="Nome da rua"
                    value={shippingData.street}
                    onChange={(e) => setShippingData(prev => ({ ...prev, street: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número</Label>
                    <Input 
                      placeholder="123"
                      value={shippingData.number}
                      onChange={(e) => setShippingData(prev => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Complemento</Label>
                    <Input 
                      placeholder="Apto 456"
                      value={shippingData.complement}
                      onChange={(e) => setShippingData(prev => ({ ...prev, complement: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input 
                    placeholder="São Paulo"
                    value={shippingData.city}
                    onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Método de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell">Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={paymentMethod === "pix" ? "default" : "outline"}
                    className="h-16 flex-col gap-2"
                    onClick={() => setPaymentMethod("pix")}
                  >
                    <QrCode className="w-6 h-6" />
                    <span className="font-cantarell">PIX</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    className="h-16 flex-col gap-2"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="font-cantarell">Cartão</span>
                  </Button>
                </div>

                {/* PIX */}
                {paymentMethod === "pix" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <QrCode className="w-4 h-4" />
                        <span className="font-cantarell font-medium">Pague com PIX</span>
                      </div>
                      <p className="text-sm text-blue-600">
                        Pagamento instantâneo e seguro. Copie o código abaixo:
                      </p>
                    </div>
                    
                    {pixCode ? (
                      <div className="space-y-3">
                        <div className="relative">
                          <textarea
                            value={pixCode}
                            readOnly
                            className="w-full h-32 p-3 border rounded-lg text-xs font-mono resize-none"
                          />
                          <Button
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={handleCopyPix}
                          >
                            {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Código válido por 30 minutos
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Gerando código PIX...</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Cartão */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-700">
                        💳 Pagamento com cartão será implementado após integração com Supabase
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-cantarell font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span className="font-cantarell">Total</span>
                    <span className="font-cantarell">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-green-600 hover:bg-green-700 font-cantarell font-semibold"
                  onClick={handleFinalizePurchase}
                  disabled={isProcessing || (paymentMethod === "pix" && !pixCode)}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Finalizar Compra
                    </div>
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  🔒 Compra segura e protegida
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};