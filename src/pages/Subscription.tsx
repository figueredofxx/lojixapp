
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  ArrowLeft, 
  Check, 
  AlertTriangle,
  Settings,
  Bell,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Dados simulados da assinatura atual
  const currentSubscription = {
    plan: 'Plano Profissional',
    price: 59,
    billingCycle: 'Mensal',
    nextBilling: '15/01/2025',
    status: 'Ativa',
    daysRemaining: 12
  };

  const plans = [
    {
      id: 'basic',
      name: 'Plano Básico',
      monthlyPrice: 29,
      description: 'Ideal para pequenos negócios',
      features: [
        'Controle de estoque básico',
        'PDV simples',
        'Relatórios essenciais',
        'Suporte por email',
        'Até 1.000 produtos'
      ],
      current: false
    },
    {
      id: 'professional',
      name: 'Plano Profissional',
      monthlyPrice: 59,
      description: 'Para negócios em crescimento',
      features: [
        'Controle de estoque avançado',
        'PDV completo',
        'Relatórios e analytics',
        'CRM integrado',
        'Produtos ilimitados',
        'Previsão de demanda',
        'Suporte prioritário'
      ],
      current: true
    },
    {
      id: 'enterprise',
      name: 'Plano Empresarial',
      monthlyPrice: 99,
      description: 'Para grandes operações',
      features: [
        'Todas as funcionalidades',
        'Multi-lojas',
        'API personalizada',
        'Suporte 24/7',
        'Treinamento personalizado',
        'Integração ERP',
        'Consultoria especializada'
      ],
      current: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para finalizar a mudança de plano"
    });
    
    setTimeout(() => {
      navigate(`/checkout/${planId}`);
    }, 1000);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Cancelamento solicitado",
      description: "Sua assinatura será cancelada no próximo ciclo de cobrança",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Minha Assinatura</h1>
              <p className="text-gray-600">Gerencie seu plano e pagamentos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Current Plan Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                    <div>
                      <CardTitle>{currentSubscription.plan}</CardTitle>
                      <CardDescription>Assinatura {currentSubscription.billingCycle}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {currentSubscription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">R$ {currentSubscription.price}</p>
                    <p className="text-sm text-blue-700">por mês</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{currentSubscription.daysRemaining}</p>
                    <p className="text-sm text-purple-700">dias restantes</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{currentSubscription.nextBilling}</p>
                    <p className="text-sm text-green-700">próxima cobrança</p>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => setShowUpgrade(!showUpgrade)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Alterar Plano
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Fatura
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Histórico
                  </Button>
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
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PIX</span>
                    </div>
                    <div>
                      <p className="font-medium">Pix</p>
                      <p className="text-sm text-gray-600">Renovação automática</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Plans */}
            {showUpgrade && (
              <Card>
                <CardHeader>
                  <CardTitle>Planos Disponíveis</CardTitle>
                  <CardDescription>
                    Escolha o plano que melhor se adapta ao seu negócio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-4 border rounded-lg ${
                          plan.current 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{plan.name}</h3>
                              {plan.current && (
                                <Badge className="bg-blue-100 text-blue-700">Atual</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                            <p className="text-lg font-bold">
                              R$ {plan.monthlyPrice}
                              <span className="text-sm font-normal text-gray-600">/mês</span>
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">
                                {plan.features.length} funcionalidades
                              </div>
                              {!plan.current && (
                                <Button
                                  size="sm"
                                  onClick={() => handleUpgrade(plan.id)}
                                  variant={plan.id === 'enterprise' ? 'default' : 'outline'}
                                >
                                  {plan.monthlyPrice > currentSubscription.price ? 'Upgrade' : 'Downgrade'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Configurar Lembretes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferências de Cobrança
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Comprovantes
                </Button>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uso do Mês</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Produtos cadastrados</span>
                    <span>247/∞</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vendas processadas</span>
                    <span>1.247</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Relatórios gerados</span>
                    <span>23</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Precisa de Ajuda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Nossa equipe está aqui para ajudar você a aproveitar ao máximo o LojixApp.
                </p>
                <Button variant="outline" className="w-full">
                  Falar com Suporte
                </Button>
              </CardContent>
            </Card>

            {/* Cancel Subscription */}
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Cancelar Assinatura</p>
                    <p className="text-xs text-red-600 mb-3">
                      Sua assinatura permanecerá ativa até {currentSubscription.nextBilling}
                    </p>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleCancelSubscription}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
