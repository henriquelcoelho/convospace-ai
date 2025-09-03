import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon, ArrowLeft, User, Shield, Bell, Palette, Database, Cloud, Key, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [organizationSettings, setOrganizationSettings] = useState({
    name: "Acme Corporation",
    description: "Empresa líder em soluções de IA",
    region: "us-east-1",
    timezone: "America/Sao_Paulo"
  });

  const [agentDefaults, setAgentDefaults] = useState({
    defaultModel: "bedrock:anthropic.claude-3-5",
    maxTokens: 4000,
    temperature: 0.7,
    memoryRetention: 30,
    enableRAG: true,
    enableObservability: true
  });

  const [notifications, setNotifications] = useState({
    deploymentAlerts: true,
    errorNotifications: true,
    usageReports: true,
    securityAlerts: true,
    emailNotifications: true,
    slackIntegration: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    enforceSSO: true,
    requireMFA: false,
    sessionTimeout: 8,
    ipWhitelist: "",
    auditLogging: true
  });

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
                  <SettingsIcon className="h-6 w-6 mr-3 text-primary" />
                  Configurações
                </h1>
                <p className="text-muted-foreground">
                  Configure organização, segurança e preferências gerais
                </p>
              </div>
            </div>
            
            <Button className="bg-gradient-primary">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="organization">Organização</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="billing">Cobrança</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  Configurações da Organização
                </CardTitle>
                <CardDescription>
                  Informações básicas e configurações regionais
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Nome da Organização</Label>
                    <Input 
                      id="org-name"
                      value={organizationSettings.name}
                      onChange={(e) => setOrganizationSettings({...organizationSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-region">Região AWS</Label>
                    <Select value={organizationSettings.region} onValueChange={(value) => setOrganizationSettings({...organizationSettings, region: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                        <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                        <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-timezone">Fuso Horário</Label>
                    <Select value={organizationSettings.timezone} onValueChange={(value) => setOrganizationSettings({...organizationSettings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-description">Descrição</Label>
                  <Textarea 
                    id="org-description"
                    value={organizationSettings.description}
                    onChange={(e) => setOrganizationSettings({...organizationSettings, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Configurações Padrão dos Agentes
                </CardTitle>
                <CardDescription>
                  Valores padrão aplicados na criação de novos agentes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-model">Modelo Padrão</Label>
                    <Select value={agentDefaults.defaultModel} onValueChange={(value) => setAgentDefaults({...agentDefaults, defaultModel: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bedrock:anthropic.claude-3-5">Claude 3.5 Sonnet</SelectItem>
                        <SelectItem value="bedrock:anthropic.claude-3">Claude 3 Haiku</SelectItem>
                        <SelectItem value="bedrock:amazon.titan-text">Amazon Titan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <Input 
                      id="max-tokens"
                      type="number"
                      value={agentDefaults.maxTokens}
                      onChange={(e) => setAgentDefaults({...agentDefaults, maxTokens: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input 
                      id="temperature"
                      type="number"
                      step="0.1"
                      min="0"
                      max="2"
                      value={agentDefaults.temperature}
                      onChange={(e) => setAgentDefaults({...agentDefaults, temperature: parseFloat(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="memory-retention">Retenção de Memória (dias)</Label>
                    <Input 
                      id="memory-retention"
                      type="number"
                      value={agentDefaults.memoryRetention}
                      onChange={(e) => setAgentDefaults({...agentDefaults, memoryRetention: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recursos Padrão</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Habilitar RAG</div>
                      <div className="text-sm text-muted-foreground">Ativar busca em conhecimento por padrão</div>
                    </div>
                    <Switch 
                      checked={agentDefaults.enableRAG} 
                      onCheckedChange={(checked) => setAgentDefaults({...agentDefaults, enableRAG: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Observabilidade</div>
                      <div className="text-sm text-muted-foreground">Coletar métricas e traces automaticamente</div>
                    </div>
                    <Switch 
                      checked={agentDefaults.enableObservability} 
                      onCheckedChange={(checked) => setAgentDefaults({...agentDefaults, enableObservability: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Configurações de Segurança
                </CardTitle>
                <CardDescription>
                  Políticas de acesso e autenticação
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Forçar SSO</div>
                      <div className="text-sm text-muted-foreground">Exigir autenticação via provedor corporativo</div>
                    </div>
                    <Switch 
                      checked={securitySettings.enforceSSO} 
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enforceSSO: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Exigir MFA</div>
                      <div className="text-sm text-muted-foreground">Autenticação de dois fatores obrigatória</div>
                    </div>
                    <Switch 
                      checked={securitySettings.requireMFA} 
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireMFA: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Log de Auditoria</div>
                      <div className="text-sm text-muted-foreground">Registrar todas as atividades do sistema</div>
                    </div>
                    <Switch 
                      checked={securitySettings.auditLogging} 
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, auditLogging: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Timeout de Sessão (horas)</Label>
                    <Input 
                      id="session-timeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ip-whitelist">Lista de IPs Permitidos</Label>
                    <Input 
                      id="ip-whitelist"
                      placeholder="192.168.1.0/24, 10.0.0.0/8"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Configurações de Notificações
                </CardTitle>
                <CardDescription>
                  Configure quando e como receber alertas e relatórios
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Alertas de Deploy</div>
                      <div className="text-sm text-muted-foreground">Notificar sobre deploys bem-sucedidos ou falhas</div>
                    </div>
                    <Switch 
                      checked={notifications.deploymentAlerts} 
                      onCheckedChange={(checked) => setNotifications({...notifications, deploymentAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Notificações de Erro</div>
                      <div className="text-sm text-muted-foreground">Alertas imediatos para erros críticos</div>
                    </div>
                    <Switch 
                      checked={notifications.errorNotifications} 
                      onCheckedChange={(checked) => setNotifications({...notifications, errorNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Relatórios de Uso</div>
                      <div className="text-sm text-muted-foreground">Resumos semanais de utilização e custos</div>
                    </div>
                    <Switch 
                      checked={notifications.usageReports} 
                      onCheckedChange={(checked) => setNotifications({...notifications, usageReports: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Alertas de Segurança</div>
                      <div className="text-sm text-muted-foreground">Notificações sobre eventos de segurança</div>
                    </div>
                    <Switch 
                      checked={notifications.securityAlerts} 
                      onCheckedChange={(checked) => setNotifications({...notifications, securityAlerts: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Canais de Notificação</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">Enviar notificações por email</div>
                    </div>
                    <Switch 
                      checked={notifications.emailNotifications} 
                      onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Slack</div>
                      <div className="text-sm text-muted-foreground">Enviar notificações para canal do Slack</div>
                    </div>
                    <Switch 
                      checked={notifications.slackIntegration} 
                      onCheckedChange={(checked) => setNotifications({...notifications, slackIntegration: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2 text-primary" />
                  Integrações Externas
                </CardTitle>
                <CardDescription>
                  Configure conexões com serviços de terceiros
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "AWS Bedrock", status: "connected", description: "Modelos de IA e runtime" },
                    { name: "OpenAI", status: "disconnected", description: "Modelos GPT alternativos" },
                    { name: "Slack", status: "connected", description: "Notificações e webhooks" },
                    { name: "GitHub", status: "connected", description: "Repositórios e CI/CD" }
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">{integration.description}</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${integration.status === 'connected' ? 'bg-success' : 'bg-muted'}`} />
                        <Button variant="outline" size="sm">
                          {integration.status === 'connected' ? 'Configurar' : 'Conectar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2 text-primary" />
                  Cobrança e Quotas
                </CardTitle>
                <CardDescription>
                  Gerencie planos, limites e custos
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold">$127.85</div>
                    <div className="text-sm text-muted-foreground">Custo este mês</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold">1.2M</div>
                    <div className="text-sm text-muted-foreground">Tokens utilizados</div>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Agentes ativos</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Limites e Quotas</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Agentes simultâneos:</span>
                      <span className="font-medium">15 / 50</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Execuções por mês:</span>
                      <span className="font-medium">1,847 / 10,000</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Armazenamento RAG:</span>
                      <span className="font-medium">2.3 GB / 10 GB</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button className="bg-gradient-primary">
                    Upgradar Plano
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;