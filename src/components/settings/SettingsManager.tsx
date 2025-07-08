
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Store, 
  FileText, 
  Printer, 
  Palette, 
  Upload,
  Bot,
  Layout,
  Save
} from 'lucide-react';

const SettingsManager = () => {
  const [storeData, setStoreData] = useState({
    name: 'Loja Tech Plus',
    cnpj: '12.345.678/0001-90',
    phone: '(11) 3456-7890',
    email: 'contato@lojatech.com',
    address: {
      street: 'Rua Comercial, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      cep: '01234-567'
    },
    website: 'www.lojatech.com',
    description: 'Especializada em produtos de tecnologia'
  });

  const [warrantySettings, setWarrantySettings] = useState({
    template: `TERMO DE GARANTIA

Produto: {PRODUTO}
Cliente: {CLIENTE}
Data da Venda: {DATA_VENDA}
Período de Garantia: {TEMPO_GARANTIA}

A garantia é válida para defeitos de fabricação nas seguintes condições:
- Produto deve estar em uso normal
- Apresentar nota fiscal
- Dentro do prazo estabelecido

Contato para assistência técnica:
{LOJA_NOME}
{LOJA_TELEFONE}
{LOJA_EMAIL}`,
    autoGenerate: false
  });

  const [visualSettings, setVisualSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    logo: null,
    theme: 'light'
  });

  const [layoutSettings, setLayoutSettings] = useState({
    dashboardLayout: 'cards',
    showQuickActions: true,
    showRecentActivities: true,
    compactMode: false
  });

  const generateWarrantyTemplate = () => {
    const aiGenerated = `CERTIFICADO DE GARANTIA

Produto: {PRODUTO}
Número de Série/IMEI: {NUMERO_SERIE}
Cliente: {CLIENTE}
CPF/CNPJ: {CLIENTE_DOCUMENTO}
Data da Compra: {DATA_VENDA}
Valor da Compra: {VALOR_VENDA}

CONDIÇÕES DE GARANTIA:
Este produto possui garantia de {TEMPO_GARANTIA} contra defeitos de fabricação, nas seguintes condições:

1. DEFEITOS COBERTOS:
- Defeitos de fabricação
- Mau funcionamento sem danos físicos
- Problemas de hardware não causados pelo usuário

2. DEFEITOS NÃO COBERTOS:
- Danos físicos (quedas, líquidos, etc.)
- Desgaste natural
- Uso inadequado ou modificações

3. PARA USAR A GARANTIA:
- Apresentar este certificado
- Produto deve estar limpo e sem danos físicos
- Dentro do prazo de garantia

ASSISTÊNCIA TÉCNICA:
{LOJA_NOME}
Endereço: {LOJA_ENDERECO}
Telefone: {LOJA_TELEFONE}
E-mail: {LOJA_EMAIL}
Horário: Segunda a Sexta, 9h às 18h

Data de emissão: {DATA_ATUAL}
Assinatura: _________________________`;

    setWarrantySettings({ ...warrantySettings, template: aiGenerated });
  };

  const saveSettings = (section) => {
    console.log(`Salvando configurações: ${section}`);
    // Lógica para salvar configurações
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="store" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="store" className="text-xs md:text-sm">Loja</TabsTrigger>
          <TabsTrigger value="warranty" className="text-xs md:text-sm">Garantia</TabsTrigger>
          <TabsTrigger value="visual" className="text-xs md:text-sm">Visual</TabsTrigger>
          <TabsTrigger value="layout" className="text-xs md:text-sm">Layout</TabsTrigger>
        </TabsList>

        {/* Dados da Loja */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Store className="w-4 h-4 md:w-5 md:h-5" />
                <span>Dados da Loja</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Informações básicas da sua loja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-sm">Nome da Loja</Label>
                  <Input
                    id="storeName"
                    value={storeData.name}
                    onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="text-sm">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={storeData.cnpj}
                    onChange={(e) => setStoreData({ ...storeData, cnpj: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone" className="text-sm">Telefone</Label>
                  <Input
                    id="storePhone"
                    value={storeData.phone}
                    onChange={(e) => setStoreData({ ...storeData, phone: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail" className="text-sm">E-mail</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeData.email}
                    onChange={(e) => setStoreData({ ...storeData, email: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm">Website</Label>
                  <Input
                    id="website"
                    value={storeData.website}
                    onChange={(e) => setStoreData({ ...storeData, website: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="storeStreet" className="text-sm">Rua e Número</Label>
                    <Input
                      id="storeStreet"
                      value={storeData.address.street}
                      onChange={(e) => setStoreData({ 
                        ...storeData, 
                        address: { ...storeData.address, street: e.target.value }
                      })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeNeighborhood" className="text-sm">Bairro</Label>
                    <Input
                      id="storeNeighborhood"
                      value={storeData.address.neighborhood}
                      onChange={(e) => setStoreData({ 
                        ...storeData, 
                        address: { ...storeData.address, neighborhood: e.target.value }
                      })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeCity" className="text-sm">Cidade</Label>
                    <Input
                      id="storeCity"
                      value={storeData.address.city}
                      onChange={(e) => setStoreData({ 
                        ...storeData, 
                        address: { ...storeData.address, city: e.target.value }
                      })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeState" className="text-sm">Estado</Label>
                    <Input
                      id="storeState"
                      value={storeData.address.state}
                      onChange={(e) => setStoreData({ 
                        ...storeData, 
                        address: { ...storeData.address, state: e.target.value }
                      })}
                      className="text-sm"
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeCep" className="text-sm">CEP</Label>
                    <Input
                      id="storeCep"
                      value={storeData.address.cep}
                      onChange={(e) => setStoreData({ 
                        ...storeData, 
                        address: { ...storeData.address, cep: e.target.value }
                      })}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription" className="text-sm">Descrição da Loja</Label>
                <Textarea
                  id="storeDescription"
                  value={storeData.description}
                  onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                  className="text-sm"
                  rows={3}
                />
              </div>

              <Button onClick={() => saveSettings('store')} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Salvar Dados da Loja
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Termo de Garantia */}
        <TabsContent value="warranty" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span>Termo de Garantia</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Personalize o modelo de garantia dos seus produtos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Modelo do Termo</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateWarrantyTemplate}
                  className="text-xs"
                >
                  <Bot className="w-3 h-3 mr-1" />
                  Gerar com IA
                </Button>
              </div>

              <div className="space-y-2">
                <Textarea
                  value={warrantySettings.template}
                  onChange={(e) => setWarrantySettings({ ...warrantySettings, template: e.target.value })}
                  className="text-sm font-mono"
                  rows={20}
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Variáveis disponíveis:</strong>
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                  <span>• {'{PRODUTO}'} - Nome do produto</span>
                  <span>• {'{CLIENTE}'} - Nome do cliente</span>
                  <span>• {'{DATA_VENDA}'} - Data da venda</span>
                  <span>• {'{TEMPO_GARANTIA}'} - Período de garantia</span>
                  <span>• {'{NUMERO_SERIE}'} - IMEI/Série</span>
                  <span>• {'{LOJA_NOME}'} - Nome da loja</span>
                  <span>• {'{LOJA_TELEFONE}'} - Telefone da loja</span>
                  <span>• {'{LOJA_EMAIL}'} - E-mail da loja</span>
                </div>
              </div>

              <Button onClick={() => saveSettings('warranty')} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Salvar Modelo de Garantia
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalização Visual */}
        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Palette className="w-4 h-4 md:w-5 md:h-5" />
                <span>Personalização Visual</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Customize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div className="space-y-2">
                <Label className="text-sm">Logo da Loja</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    {visualSettings.logo ? (
                      <img src={visualSettings.logo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Carregar Logo
                    </Button>
                    <p className="text-xs text-gray-500">
                      PNG ou JPG, máximo 2MB<br />
                      Recomendado: 200x200px
                    </p>
                  </div>
                </div>
              </div>

              {/* Cores */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Cores do Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Cor Primária</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={visualSettings.primaryColor}
                        onChange={(e) => setVisualSettings({ ...visualSettings, primaryColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <Input
                        value={visualSettings.primaryColor}
                        onChange={(e) => setVisualSettings({ ...visualSettings, primaryColor: e.target.value })}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Cor Secundária</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={visualSettings.secondaryColor}
                        onChange={(e) => setVisualSettings({ ...visualSettings, secondaryColor: e.target.value })}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <Input
                        value={visualSettings.secondaryColor}
                        onChange={(e) => setVisualSettings({ ...visualSettings, secondaryColor: e.target.value })}
                        className="flex-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label className="text-sm">Pré-visualização</Label>
                <div className="p-4 border rounded-lg" style={{ backgroundColor: visualSettings.primaryColor + '10' }}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: visualSettings.primaryColor }}
                    ></div>
                    <span className="text-sm font-medium">Título do Card</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Exemplo de conteúdo com as cores selecionadas</div>
                  <button 
                    className="px-3 py-1 rounded text-xs text-white" 
                    style={{ backgroundColor: visualSettings.secondaryColor }}
                  >
                    Botão de Ação
                  </button>
                </div>
              </div>

              <Button onClick={() => saveSettings('visual')} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Salvar Personalização
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout da Tela Inicial */}
        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base md:text-xl">
                <Layout className="w-4 h-4 md:w-5 md:h-5" />
                <span>Layout da Tela Inicial</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Configure como o dashboard é exibido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Estilo do Dashboard</Label>
                <Select 
                  value={layoutSettings.dashboardLayout} 
                  onValueChange={(value) => setLayoutSettings({ ...layoutSettings, dashboardLayout: value })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cards">Cards Grandes</SelectItem>
                    <SelectItem value="compact">Layout Compacto</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Elementos Visíveis</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={layoutSettings.showQuickActions}
                      onChange={(e) => setLayoutSettings({ ...layoutSettings, showQuickActions: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar Ações Rápidas</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={layoutSettings.showRecentActivities}
                      onChange={(e) => setLayoutSettings({ ...layoutSettings, showRecentActivities: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Mostrar Atividades Recentes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={layoutSettings.compactMode}
                      onChange={(e) => setLayoutSettings({ ...layoutSettings, compactMode: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Modo Compacto (menos espaçamento)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Modelo de Impressão Padrão</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Padrão</SelectItem>
                    <SelectItem value="thermal">Impressora Térmica</SelectItem>
                    <SelectItem value="a4">Formato A4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => saveSettings('layout')} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações de Layout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
