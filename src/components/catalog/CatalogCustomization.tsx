import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Layout, 
  Type, 
  Image, 
  Smartphone, 
  Eye, 
  Save, 
  RotateCcw,
  Upload,
  Link,
  MessageSquare,
  Share2,
  QrCode,
  Download
} from "lucide-react";

export const CatalogCustomization = () => {
  const [catalogConfig, setCatalogConfig] = useState({
    storeName: "LojixApp Store",
    storeDescription: "Sua loja de tecnologia com os melhores preços",
    logoUrl: "",
    bannerUrl: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    textColor: "#1F2937",
    backgroundColor: "#FFFFFF",
    fontFamily: "Inter",
    showPrices: true,
    showStock: true,
    showRatings: true,
    enableWhatsApp: true,
    whatsappNumber: "",
    customDomain: "",
    seoTitle: "",
    seoDescription: "",
    enableAnalytics: false
  });

  const colorPresets = [
    { name: "Azul", primary: "#3B82F6", secondary: "#10B981" },
    { name: "Verde", primary: "#10B981", secondary: "#3B82F6" },
    { name: "Roxo", primary: "#8B5CF6", secondary: "#EC4899" },
    { name: "Laranja", primary: "#F59E0B", secondary: "#EF4444" },
    { name: "Escuro", primary: "#1F2937", secondary: "#6B7280" }
  ];

  const fontOptions = [
    "Inter", "Roboto", "Open Sans", "Poppins", "Montserrat"
  ];

  const handleConfigChange = (key: string, value: any) => {
    setCatalogConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Simular salvamento
    console.log("Configurações salvas:", catalogConfig);
  };

  const handleReset = () => {
    // Reset para configurações padrão
    setCatalogConfig({
      storeName: "LojixApp Store",
      storeDescription: "Sua loja de tecnologia com os melhores preços",
      logoUrl: "",
      bannerUrl: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      textColor: "#1F2937",
      backgroundColor: "#FFFFFF",
      fontFamily: "Inter",
      showPrices: true,
      showStock: true,
      showRatings: true,
      enableWhatsApp: true,
      whatsappNumber: "",
      customDomain: "",
      seoTitle: "",
      seoDescription: "",
      enableAnalytics: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com ações */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personalização do Catálogo
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configure a aparência e funcionalidades do seu catálogo virtual
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetar
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="appearance">Visual</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="features">Recursos</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* Aparência */}
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cores e Tipografia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={catalogConfig.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={catalogConfig.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Cor Secundária</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={catalogConfig.secondaryColor}
                          onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={catalogConfig.secondaryColor}
                          onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Presets de Cores</Label>
                    <div className="flex gap-2 mt-2">
                      {colorPresets.map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleConfigChange("primaryColor", preset.primary);
                            handleConfigChange("secondaryColor", preset.secondary);
                          }}
                          className="flex items-center gap-2"
                        >
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: preset.primary }}
                          />
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fontFamily">Fonte</Label>
                    <select
                      id="fontFamily"
                      value={catalogConfig.fontFamily}
                      onChange={(e) => handleConfigChange("fontFamily", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Imagens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Logo da Loja</Label>
                    <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para fazer upload do logo
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG até 2MB - Recomendado: 200x80px
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label>Banner Principal</Label>
                    <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para fazer upload do banner
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG até 5MB - Recomendado: 1200x400px
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações da Loja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input
                      id="storeName"
                      value={catalogConfig.storeName}
                      onChange={(e) => handleConfigChange("storeName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeDescription">Descrição</Label>
                    <Textarea
                      id="storeDescription"
                      value={catalogConfig.storeDescription}
                      onChange={(e) => handleConfigChange("storeDescription", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="customDomain">Domínio Personalizado</Label>
                    <Input
                      id="customDomain"
                      value={catalogConfig.customDomain}
                      onChange={(e) => handleConfigChange("customDomain", e.target.value)}
                      placeholder="meuloja.com.br"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deixe vazio para usar: lojixapp.com/meuloja
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recursos */}
            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funcionalidades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Preços</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibir preços dos produtos no catálogo
                      </p>
                    </div>
                    <Switch
                      checked={catalogConfig.showPrices}
                      onCheckedChange={(checked) => handleConfigChange("showPrices", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Estoque</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibir quantidade disponível
                      </p>
                    </div>
                    <Switch
                      checked={catalogConfig.showStock}
                      onCheckedChange={(checked) => handleConfigChange("showStock", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Avaliações</Label>
                      <p className="text-sm text-muted-foreground">
                        Exibir estrelas e reviews
                      </p>
                    </div>
                    <Switch
                      checked={catalogConfig.showRatings}
                      onCheckedChange={(checked) => handleConfigChange("showRatings", checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Integração WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir compras via WhatsApp
                      </p>
                    </div>
                    <Switch
                      checked={catalogConfig.enableWhatsApp}
                      onCheckedChange={(checked) => handleConfigChange("enableWhatsApp", checked)}
                    />
                  </div>

                  {catalogConfig.enableWhatsApp && (
                    <div>
                      <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
                      <Input
                        id="whatsappNumber"
                        value={catalogConfig.whatsappNumber}
                        onChange={(e) => handleConfigChange("whatsappNumber", e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="mt-1"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Otimização para Busca</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">Título SEO</Label>
                    <Input
                      id="seoTitle"
                      value={catalogConfig.seoTitle}
                      onChange={(e) => handleConfigChange("seoTitle", e.target.value)}
                      placeholder="Loja de Tecnologia - Melhores Preços"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ideal: 50-60 caracteres
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="seoDescription">Descrição SEO</Label>
                    <Textarea
                      id="seoDescription"
                      value={catalogConfig.seoDescription}
                      onChange={(e) => handleConfigChange("seoDescription", e.target.value)}
                      placeholder="Encontre os melhores produtos de tecnologia com preços incríveis..."
                      className="mt-1"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ideal: 150-160 caracteres
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Google Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Rastrear visitantes e conversões
                      </p>
                    </div>
                    <Switch
                      checked={catalogConfig.enableAnalytics}
                      onCheckedChange={(checked) => handleConfigChange("enableAnalytics", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Mobile */}
        <Card className="lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Preview Mobile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto w-80 h-96 bg-muted rounded-3xl p-4 flex flex-col">
              <div className="bg-white rounded-2xl flex-1 p-4 overflow-hidden">
                {/* Header do catálogo */}
                <div className="text-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: catalogConfig.primaryColor }}
                  >
                    <span className="text-white font-bold text-lg">
                      {catalogConfig.storeName.charAt(0)}
                    </span>
                  </div>
                  <h2 className="font-bold text-lg" style={{ color: catalogConfig.textColor }}>
                    {catalogConfig.storeName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {catalogConfig.storeDescription}
                  </p>
                </div>

                {/* Produto exemplo */}
                <div className="border rounded-lg p-3 mb-3">
                  <div className="w-full h-20 bg-muted rounded mb-2 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-sm">iPhone 15 Pro</h3>
                  {catalogConfig.showPrices && (
                    <p className="font-bold" style={{ color: catalogConfig.primaryColor }}>
                      R$ 8.999,99
                    </p>
                  )}
                  {catalogConfig.showStock && (
                    <p className="text-xs text-muted-foreground">12 disponíveis</p>
                  )}
                </div>

                {catalogConfig.enableWhatsApp && (
                  <Button 
                    size="sm" 
                    className="w-full"
                    style={{ backgroundColor: catalogConfig.primaryColor }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Comprar via WhatsApp
                  </Button>
                )}
              </div>
            </div>

            {/* Links de compartilhamento */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 p-2 bg-muted rounded">
                <Link className="w-4 h-4" />
                <span className="text-sm font-mono">
                  lojixapp.com/{catalogConfig.storeName.toLowerCase().replace(/\s+/g, '')}
                </span>
                <Button size="sm" variant="outline" className="ml-auto">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};