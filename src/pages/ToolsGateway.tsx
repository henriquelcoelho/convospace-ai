import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Plus, ArrowLeft, Settings, Link as LinkIcon, Code, Upload } from "lucide-react";
import { useAgentHubStore } from "@/lib/store";
import { AgentCoreGateway } from "@/lib/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ToolsGateway = () => {
  const { tools, setTools, loading, setLoading } = useAgentHubStore();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [toolType, setToolType] = useState<"openapi" | "lambda" | "saas">("openapi");

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    setLoading(true);
    try {
      const response = await AgentCoreGateway.listTools();
      if (response.success) {
        setTools(response.data);
      }
    } catch (error) {
      console.error('Failed to load tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'openapi': return Code;
      case 'lambda': return Zap;
      case 'saas': return LinkIcon;
      default: return Settings;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success';
      case 'approved': return 'bg-primary';
      case 'deprecated': return 'bg-destructive';
      default: return 'bg-warning';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Zap className="h-6 w-6 mr-3 text-primary" />
                  Gateway de Ferramentas
                </h1>
                <p className="text-muted-foreground">
                  Conecte APIs, Lambdas e serviços via MCP
                </p>
              </div>
            </div>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Ferramenta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Nova Ferramenta</DialogTitle>
                  <DialogDescription>
                    Conecte uma nova ferramenta ao Gateway MCP
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tool-type">Tipo de Ferramenta</Label>
                    <Select value={toolType} onValueChange={(value: any) => setToolType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openapi">OpenAPI / REST</SelectItem>
                        <SelectItem value="lambda">AWS Lambda</SelectItem>
                        <SelectItem value="saas">Serviço SaaS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tool-name">Nome da Ferramenta</Label>
                    <Input id="tool-name" placeholder="Ex: CRM API" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">Descrição</Label>
                    <Textarea 
                      id="tool-description" 
                      placeholder="Descreva o que esta ferramenta faz..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  {toolType === 'openapi' && (
                    <div className="space-y-2">
                      <Label>Especificação OpenAPI</Label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Faça upload do arquivo OpenAPI ou cole a URL
                        </p>
                        <Button variant="outline" className="mt-2">
                          Upload Arquivo
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancelar
                    </Button>
                    <Button>
                      Conectar Ferramenta
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todas ({tools.length})</TabsTrigger>
              <TabsTrigger value="openapi">OpenAPI ({tools.filter(t => t.type === 'openapi').length})</TabsTrigger>
              <TabsTrigger value="lambda">Lambda ({tools.filter(t => t.type === 'lambda').length})</TabsTrigger>
              <TabsTrigger value="saas">SaaS ({tools.filter(t => t.type === 'saas').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <ToolsGrid tools={tools} />
            </TabsContent>
            
            <TabsContent value="openapi" className="space-y-6">
              <ToolsGrid tools={tools.filter(t => t.type === 'openapi')} />
            </TabsContent>
            
            <TabsContent value="lambda" className="space-y-6">
              <ToolsGrid tools={tools.filter(t => t.type === 'lambda')} />
            </TabsContent>
            
            <TabsContent value="saas" className="space-y-6">
              <ToolsGrid tools={tools.filter(t => t.type === 'saas')} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

const ToolsGrid = ({ tools }: { tools: any[] }) => {
  const getToolIcon = (type: string) => {
    switch (type) {
      case 'openapi': return Code;
      case 'lambda': return Zap;
      case 'saas': return LinkIcon;
      default: return Settings;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success';
      case 'approved': return 'bg-primary';
      case 'deprecated': return 'bg-destructive';
      default: return 'bg-warning';
    }
  };

  if (tools.length === 0) {
    return (
      <Card className="bg-gradient-glass border-border/50">
        <CardContent className="text-center py-12">
          <Zap className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-4">Nenhuma ferramenta encontrada</h3>
          <p className="text-muted-foreground">
            Conecte sua primeira ferramenta ao Gateway MCP
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        const Icon = getToolIcon(tool.type);
        return (
          <Card key={tool.id} className="bg-card/50 border-border/50 hover:border-border transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {tool.type}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(tool.status)}>
                  {tool.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Endpoint MCP:</div>
                <code className="text-xs bg-muted/30 px-2 py-1 rounded block truncate">
                  {tool.mcpEndpoint}
                </code>
              </div>
              
              {tool.scopes && tool.scopes.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Permissões:</div>
                  <div className="flex flex-wrap gap-1">
                    {tool.scopes.slice(0, 3).map((scope: string) => (
                      <Badge key={scope} variant="secondary" className="text-xs">
                        {scope}
                      </Badge>
                    ))}
                    {tool.scopes.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tool.scopes.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="h-3 w-3 mr-1" />
                  Config
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Code className="h-3 w-3 mr-1" />
                  Teste
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ToolsGateway;