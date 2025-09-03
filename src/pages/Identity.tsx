import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Key, Users, Link2, Settings, Plus, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Identity = () => {
  const [inboundProviders] = useState([
    {
      id: "iam-001",
      name: "AWS IAM",
      type: "iam",
      status: "active",
      description: "Autenticação via AWS IAM roles e policies",
      connectedUsers: 45,
      lastSync: "2 horas atrás"
    },
    {
      id: "oauth-001", 
      name: "Azure AD",
      type: "oauth2",
      status: "active",
      description: "SSO corporativo via Azure Active Directory",
      connectedUsers: 120,
      lastSync: "30 minutos atrás"
    }
  ]);

  const [outboundIntegrations] = useState([
    {
      id: "int-001",
      name: "GitHub",
      type: "oauth2",
      status: "active",
      description: "Acesso a repositórios on behalf of user",
      scopes: ["repo:read", "user:email"],
      connectedUsers: 25,
      lastAuth: "1 hora atrás"
    },
    {
      id: "int-002",
      name: "Slack",
      type: "oauth2", 
      status: "active",
      description: "Envio de mensagens e notificações",
      scopes: ["chat:write", "channels:read"],
      connectedUsers: 38,
      lastAuth: "15 minutos atrás"
    },
    {
      id: "int-003",
      name: "Salesforce",
      type: "oauth2",
      status: "configured",
      description: "CRM integration para agentes de vendas",
      scopes: ["api", "refresh_token"],
      connectedUsers: 0,
      lastAuth: "Nunca"
    }
  ]);

  const [permissions] = useState([
    {
      resource: "agents",
      actions: ["create", "read", "update", "delete"],
      roles: ["admin", "developer"]
    },
    {
      resource: "deployments",
      actions: ["create", "read", "update"],  
      roles: ["admin", "deployer"]
    },
    {
      resource: "observability",
      actions: ["read"],
      roles: ["admin", "developer", "viewer"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'configured': return 'bg-warning';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'iam': return Shield;
      case 'oauth2': return Key;
      default: return Users;
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
                  <Shield className="h-6 w-6 mr-3 text-primary" />
                  Identidade & Acesso
                </h1>
                <p className="text-muted-foreground">
                  Configure autenticação inbound e delegação outbound
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Novo Provider
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="inbound" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inbound">Inbound (Autenticação)</TabsTrigger>
            <TabsTrigger value="outbound">Outbound (Delegação)</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
            <TabsTrigger value="audit">Auditoria</TabsTrigger>
          </TabsList>

          <TabsContent value="inbound" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Provedores de Autenticação</CardTitle>
                <CardDescription>
                  Configure como usuários se autenticam no AgentCore Hub
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {inboundProviders.map((provider) => {
                  const Icon = getProviderIcon(provider.type);
                  
                  return (
                    <div key={provider.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        
                        <div>
                          <div className="font-medium">{provider.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {provider.description}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>{provider.connectedUsers} usuários</span>
                            <span>•</span>
                            <span>Última sync: {provider.lastSync}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(provider.status)}>
                          {provider.status}
                        </Badge>
                        
                        <Switch checked={provider.status === 'active'} />
                        
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                  <Key className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Adicionar Novo Provider</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure OAuth2, SAML, ou outros provedores de identidade
                  </p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outbound" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Integrações Outbound</CardTitle>
                <CardDescription>
                  Configurações para agentes acessarem serviços externos "on behalf of user"
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {outboundIntegrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Link2 className="h-6 w-6 text-secondary" />
                      </div>
                      
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {integration.description}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {integration.scopes.map((scope) => (
                            <Badge key={scope} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{integration.connectedUsers} usuários conectados</span>
                          <span>•</span>
                          <span>Última auth: {integration.lastAuth}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      
                      <Switch checked={integration.status === 'active'} />
                      
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                  <Link2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Nova Integração</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conecte serviços como GitHub, Slack, Salesforce, etc.
                  </p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Integração
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Sistema de Permissões</CardTitle>
                <CardDescription>
                  Configure roles e permissões para recursos do AgentCore
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {permissions.map((permission, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium capitalize">{permission.resource}</h4>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Ações Permitidas</div>
                        <div className="flex flex-wrap gap-2">
                          {permission.actions.map((action) => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Roles com Acesso</div>
                        <div className="flex flex-wrap gap-2">
                          {permission.roles.map((role) => (
                            <Badge key={role} className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {index < permissions.length - 1 && <Separator />}
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button className="bg-gradient-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Permissão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Log de Auditoria</CardTitle>
                <CardDescription>
                  Histórico de atividades de autenticação e autorização
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      timestamp: "2024-01-15 14:30:25",
                      event: "User Login",
                      user: "john.doe@company.com",
                      provider: "Azure AD",
                      status: "success",
                      details: "Login via SSO"
                    },
                    {
                      timestamp: "2024-01-15 14:28:12",
                      event: "OAuth Consent",
                      user: "jane.smith@company.com", 
                      provider: "GitHub",
                      status: "success",
                      details: "Granted repo:read access"
                    },
                    {
                      timestamp: "2024-01-15 14:25:45",
                      event: "Permission Denied",
                      user: "user@company.com",
                      provider: "Internal",
                      status: "error",
                      details: "Insufficient permissions for agent creation"
                    }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-success' : 'bg-destructive'}`} />
                        
                        <div>
                          <div className="font-medium text-sm">{log.event}</div>
                          <div className="text-xs text-muted-foreground">
                            {log.user} via {log.provider}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium">{log.timestamp}</div>
                        <div className="text-xs text-muted-foreground">{log.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center pt-4">
                  <Button variant="outline">
                    Ver Mais Logs
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

export default Identity;