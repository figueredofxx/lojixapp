import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ModernStorefront from "@/components/store/ModernStorefront";
import { Loader, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StoreConfig {
  storeName: string;
  storeDescription: string;
  whatsappNumber: string;
  primaryColor: string;
}

const ModernStore = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [storeConfig, setStoreConfig] = useState<StoreConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoreConfig = async () => {
      try {
        // Simulação de carregamento da configuração da loja
        // Em produção, isso seria uma chamada para API
        setTimeout(() => {
          if (storeId === "demo" || storeId === "lojinha123" || storeId === "tecnologia" || storeId === "moderna") {
            setStoreConfig({
              storeName: "Tech Store Premium",
              storeDescription: "Os melhores produtos de tecnologia com preços imbatíveis",
              whatsappNumber: "5545999999999",
              primaryColor: "#3B82F6"
            });
          } else {
            setError("Loja não encontrada");
          }
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Erro ao carregar a loja");
        setLoading(false);
      }
    };

    loadStoreConfig();
  }, [storeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando loja...</p>
        </div>
      </div>
    );
  }

  if (error || !storeConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Loja não encontrada"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <ModernStorefront
      storeName={storeConfig.storeName}
      storeDescription={storeConfig.storeDescription}
      whatsappNumber={storeConfig.whatsappNumber}
      primaryColor={storeConfig.primaryColor}
    />
  );
};

export default ModernStore;