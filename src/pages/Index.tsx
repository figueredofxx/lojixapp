
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, TrendingUp, Users, BarChart3, ShoppingCart, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Plano Básico',
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: 'Ideal para pequenos negócios',
      features: [
        'Controle de estoque básico',
        'PDV simples',
        'Relatórios essenciais',
        'Suporte por email',
        'Até 1.000 produtos'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Plano Profissional',
      monthlyPrice: 59,
      yearlyPrice: 590,
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
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Plano Empresarial',
      monthlyPrice: 99,
      yearlyPrice: 990,
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
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    navigate(`/checkout/${planId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LojixApp
            </span>
          </div>
          <Button variant="outline" onClick={() => navigate('/login')}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            ⚡ Revolucione sua gestão
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transforme seu negócio com
            <br />
            gestão inteligente
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pare de perder vendas por falta de controle! Nossa plataforma une estoque, vendas e análises em um só lugar, 
            aumentando seus lucros em até 40% nos primeiros 3 meses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Começar agora - Grátis por 7 dias
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              Ver demonstração
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="flex">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>4.9/5 - Mais de 2.000 empresas confiam</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Cansado desses problemas no seu negócio?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📉",
                title: "Perda de vendas",
                description: "Produtos em falta quando o cliente quer comprar"
              },
              {
                icon: "📊",
                title: "Falta de controle",
                description: "Não sabe o que vende mais ou qual o lucro real"
              },
              {
                icon: "⏰",
                title: "Tempo perdido",
                description: "Horas gastas com planilhas e controles manuais"
              }
            ].map((problem, index) => (
              <Card key={index} className="text-center border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-red-800">{problem.title}</h3>
                  <p className="text-red-600">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              A solução completa que seu negócio precisa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todas as ferramentas que você precisa para crescer, integradas em uma plataforma simples e poderosa
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
                title: "PDV Inteligente",
                description: "Sistema de vendas rápido e intuitivo com todas as funcionalidades que você precisa"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
                title: "Relatórios Avançados",
                description: "Análises detalhadas para tomar decisões baseadas em dados reais"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                title: "Previsão de Demanda",
                description: "Nunca mais fique sem estoque dos produtos mais vendidos"
              },
              {
                icon: <Users className="w-8 h-8 text-orange-600" />,
                title: "CRM Integrado",
                description: "Gerencie seus clientes e aumente a fidelização"
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-600" />,
                title: "Automação",
                description: "Automatize processos repetitivos e ganhe tempo"
              },
              {
                icon: <Shield className="w-8 h-8 text-red-600" />,
                title: "Segurança Total",
                description: "Seus dados protegidos com criptografia de ponta"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Escolha o plano ideal para seu negócio
            </h2>
            <p className="text-gray-600">
              Comece grátis por 7 dias. Sem compromisso, cancele quando quiser.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">R$ {plan.monthlyPrice}</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <div className="text-sm text-green-600">
                    Economize R$ {(plan.monthlyPrice * 12) - plan.yearlyPrice} pagando anualmente
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    Começar agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Não perca mais vendas por falta de controle
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a mais de 2.000 empresas que já transformaram seus resultados
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Começar grátis por 7 dias
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                <span className="font-bold">LojixApp</span>
              </div>
              <p className="text-gray-400 text-sm">
                A plataforma completa para gestão do seu varejo
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Integrações</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Treinamentos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreira</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 LojixApp. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
