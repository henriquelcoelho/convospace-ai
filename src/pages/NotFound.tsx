import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <Card className="bg-gradient-glass border-border/50 shadow-soft">
          <CardHeader className="pb-4">
            <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              404
            </div>
            <CardTitle className="text-xl">Página não encontrada</CardTitle>
            <CardDescription>
              A página que você está procurando não existe ou foi movida.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground bg-muted/30 rounded px-3 py-2">
              <code>{location.pathname}</code>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link to="/">
                <Button className="w-full bg-gradient-primary">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Dashboard
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button variant="outline" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Ir para Chat Builder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-xs text-muted-foreground">
          Se você acredita que isso é um erro, entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
