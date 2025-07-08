
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Copy, QrCode, Clock, ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentStep, setPaymentStep] = useState<'summary' | 'payment' | 'success'>('summary');
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540510.005802BR5925LojixApp Gestao Comercial6009SAO PAULO62070503***6304";

  const plans = {
    basic: {
      name: 'Plano Básico',
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: 'Ideal para pequenos negócios'
    },
    professional: {
      name: 'Plano Profissional', 
      monthlyPrice: 59,
      yearlyPrice: 590,
      description: 'Para negócios em crescimento'
    },
    enterprise: {
      name: 'Plano Empresarial',
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: 'Para grandes operações'
    }
  };

  const selectedPlan = planId ? plans[planId as keyof typeof plans] : null;

  useEffect(() => {
    if (paymentStep === 'payment' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Pagamento expirado",
              description: "O QR Code expirou. Gere um novo código para continuar.",
              variant: "destructive"
            });
            setPaymentStep('summary');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStep, timeRemaining, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código copiado!",
      description: "Cole no seu app do banco para fazer o pagamento"
    });
  };

  const generatePayment = () => {
    setPaymentStep('payment');
    setTimeRemaining(900);
    
    // Simular confirmação de pagamento após 10 segundos para demo
    setTimeout(() => {
      setPaymentStep('success');
      toast({
        title: "Pagamento confirmado!",
        description: "Bem-vindo ao LojixApp! Redirecionando para sua conta..."
      });
      
      // Redirecionar para dashboard após 3 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 10000);
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Plano não encontrado</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Voltar para início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPrice = billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;
  const savings = billingCycle === 'yearly' ? (selectedPlan.monthlyPrice * 12) - selectedPlan.yearlyPrice : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => paymentStep === 'summary' ? navigate('/') : setPaymentStep('summary')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Finalizar Assinatura</h1>
              <p className="text-gray-600">Complete seu pagamento via Pix</p>
            </div>
          </div>

          {paymentStep === 'summary' && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedPlan.name}
                    <Badge variant="secondary">{selectedPlan.description}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Billing Cycle Toggle */}
                  <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <Button
                      variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                      onClick={() => setBillingCycle('monthly')}
                      size="sm"
                    >
                      Mensal
                    </Button>
                    <Button
                      variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                      onClick={() => setBillingCycle('yearly')}
                      size="sm"
                    >
                      Anual
                      {savings > 0 && (
                        <Badge className="ml-2 bg-green-100 text-green-700">
                          Economize R$ {savings}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Plano selecionado:</span>
                      <span className="font-semibold">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ciclo de cobrança:</span>
                      <span>{billingCycle === 'monthly' ? 'Mensal' : 'Anual'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>R$ {currentPrice.toFixed(2)}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-green-600">
                        Você economiza R$ {savings} pagando anualmente
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Método de Pagamento
                  </CardTitle>
                  <CardDescription>
                    Pagamento seguro via Pix - Aprovação instantânea
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <QrCode className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-800">Pix</div>
                      <div className="text-sm text-blue-600">Aprovação em até 2 minutos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={generatePayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                Gerar Pix para Pagamento
              </Button>
            </div>
          )}

          {paymentStep === 'payment' && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <QrCode className="w-6 h-6 mr-2" />
                  Pague com Pix
                </CardTitle>
                <CardDescription>
                  Escaneie o QR Code ou copie o código para pagar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timer */}
                <div className="flex items-center justify-center space-x-2 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-mono text-lg font-bold text-orange-800">
                    {formatTime(timeRemaining)}
                  </span>
                  <span className="text-orange-600">para pagamento</span>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                </div>

                {/* Pix Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Pix (Copia e Cola):</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={pixCode}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-xs font-mono"
                    />
                    <Button onClick={handleCopyPixCode} size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Como pagar:</h4>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. Abra o app do seu banco</li>
                    <li>2. Escolha a opção Pix</li>
                    <li>3. Escaneie o QR Code ou cole o código</li>
                    <li>4. Confirme o pagamento</li>
                    <li>5. Aguarde a confirmação automática</li>
                  </ol>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-700">Aguardando pagamento...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {paymentStep === 'success' && (
            <Card>
              <CardContent className="pt-12 pb-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Pagamento Confirmado!
                </h2>
                <p className="text-gray-600 mb-6">
                  Sua assinatura foi ativada com sucesso. Bem-vindo ao LojixApp!
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">
                      Você será redirecionado para seu dashboard em alguns segundos...
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Acessar Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
