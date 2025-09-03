import { useState } from "react";
import { Link } from "react-router-dom";
import { Rocket, ArrowLeft, Container, Cloud, CheckCircle, AlertCircle, Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Deploy = () => {
  const [deployments] = useState([
    {
      id: "deploy-001",
      agentName: "Agente Cobrança",
      version: "v2.1.0",
      environment: "production",
      status: "active",
      health: "healthy",
      replicas: 3,
      traffic: 100,
      lastDeploy: "2024-01-15 12:30:00",
      endpoint: "https://runtime.agentcore.aws.com/agents/cobranca-v2",
      image: "123456789.dkr.ecr.us-east-1.amazonaws.com/agentcore:cobranca-v2.1.0"
    },
    {
      id: "deploy-002",
      agentName: "Agente Suporte",
      version: "v1.8.2",
      environment: "staging",
      status: "deploying",
      health: "unknown",
      replicas: 1,
      traffic: 0,
      lastDeploy: "2024-01-15 14:45:00",
      endpoint: "https://staging.agentcore.aws.com/agents/suporte-v1",
      image: "123456789.dkr.ecr.us-east-1.amazonaws.com/agentcore:suporte-v1.8.2"
    }
  ]);

  const [buildHistory] = useState([
    {
      id: "build-001",
      agentName: "Agente Cobrança",
      version: "v2.1.0",
      status: "success",
      duration: "4m 32s",
      timestamp: "2024-01-15 12:25:28",
      commit: "a1b2c3d4",
      triggeredBy: "Deploy Pipeline"
    },
    {
      id: "build-002",
      agentName: "Agente Suporte", 
      version: "v1.8.2",
      status: "building",
      duration: "2m 15s",
      timestamp: "2024-01-15 14:40:45",
      commit: "e5f6g7h8",
      triggeredBy: "Manual Deploy"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'success': case 'healthy': return 'bg-success';
      case 'deploying': case 'building': return 'bg-warning';
      case 'error': case 'failed': case 'unhealthy': return 'bg-destructive';
      case 'stopped': return 'bg-muted';
      default: return 'bg-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': case 'success': case 'healthy': return CheckCircle;
      case 'deploying': case 'building': return Clock;
      case 'error': case 'failed': case 'unhealthy': return AlertCircle;
      default: return CheckCircle;
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
                  <Rocket className="h-6 w-6 mr-3 text-primary" />
                  Deploy & Ambientes
                </h1>
                <p className="text-muted-foreground">
                  Gerencie deploys, versões e ambientes dos agentes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Container className="mr-2 h-4 w-4" />
                Deploy Wizard
              </Button>
              <Button className="bg-gradient-primary">
                <Rocket className="mr-2 h-4 w-4" />
                Novo Deploy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="deployments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="environments">Ambientes</TabsTrigger>
            <TabsTrigger value="builds">Builds</TabsTrigger>
            <TabsTrigger value="wizard">Deploy Wizard</TabsTrigger>
          </TabsList>

          <TabsContent value="deployments" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {deployments.map((deployment) => {
                const StatusIcon = getStatusIcon(deployment.status);
                const HealthIcon = getStatusIcon(deployment.health);
                
                return (
                  <Card key={deployment.id} className="bg-card/50 border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            <Rocket className="h-5 w-5 mr-2 text-primary" />
                            {deployment.agentName}
                          </CardTitle>
                          <CardDescription>
                            {deployment.version} • {deployment.environment}
                          </CardDescription>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(deployment.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {deployment.status}
                          </Badge>
                          <Badge className={getStatusColor(deployment.health)}>
                            <HealthIcon className="h-3 w-3 mr-1" />
                            {deployment.health}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Deployment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Replicas</div>
                          <div className="font-medium">{deployment.replicas} instâncias</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Tráfego</div>
                          <div className="font-medium">{deployment.traffic}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Último deploy</div>
                          <div className="font-medium">{deployment.lastDeploy}</div>
                        </div>
                      </div>

                      <Separator />

                      {/* Endpoint & Image */}
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Endpoint</div>
                          <code className="text-xs bg-muted/30 px-2 py-1 rounded block">
                            {deployment.endpoint}
                          </code>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Container Image</div>
                          <code className="text-xs bg-muted/30 px-2 py-1 rounded block truncate">
                            {deployment.image}
                          </code>
                        </div>
                      </div>

                      <Separator />

                      {/* Traffic Distribution */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Distribuição de Tráfego</span>
                          <span className="font-medium">{deployment.traffic}%</span>
                        </div>
                        <Progress value={deployment.traffic} className="h-2" />
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Escalar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-2" />
                          Pausar
                        </Button>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Rollback
                        </Button>
                        <Button variant="outline" size="sm">
                          <Cloud className="h-4 w-4 mr-2" />
                          Logs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="environments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['production', 'staging', 'development'].map((env) => (
                <Card key={env} className="bg-gradient-glass border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center capitalize">
                      <Cloud className="h-5 w-5 mr-2 text-primary" />
                      {env}
                    </CardTitle>
                    <CardDescription>
                      Ambiente {env === 'production' ? 'de produção' : 
                               env === 'staging' ? 'de homologação' : 'de desenvolvimento'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Agentes ativos:</span>
                        <span className="font-medium">
                          {env === 'production' ? '3' : env === 'staging' ? '2' : '1'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={env === 'production' ? 'bg-success' : 'bg-warning'}>
                          {env === 'production' ? 'Estável' : 'Ativo'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Região:</span>
                        <span className="font-medium">us-east-1</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Gerenciar Ambiente
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builds" className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Histórico de Builds</CardTitle>
                <CardDescription>
                  Builds recentes e status de construção
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {buildHistory.map((build) => {
                    const StatusIcon = getStatusIcon(build.status);
                    
                    return (
                      <div key={build.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg ${getStatusColor(build.status)} flex items-center justify-center`}>
                            <StatusIcon className="h-5 w-5 text-white" />
                          </div>
                          
                          <div>
                            <div className="font-medium">{build.agentName}</div>
                            <div className="text-sm text-muted-foreground">
                              {build.version} • {build.timestamp}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{build.duration}</div>
                            <div className="text-muted-foreground">duração</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-medium font-mono">{build.commit}</div>
                            <div className="text-muted-foreground">commit</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-medium">{build.triggeredBy}</div>
                            <div className="text-muted-foreground">trigger</div>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            Ver Logs
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wizard" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Deploy Wizard</CardTitle>
                <CardDescription>
                  Assistente guiado para deployment de agentes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-card/30">
                    <CardContent className="p-4 text-center">
                      <Container className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">1. Build</h4>
                      <p className="text-xs text-muted-foreground">
                        Construir imagem Docker
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30">
                    <CardContent className="p-4 text-center">
                      <Cloud className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">2. Push ECR</h4>
                      <p className="text-xs text-muted-foreground">
                        Enviar para registry
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30">
                    <CardContent className="p-4 text-center">
                      <Rocket className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">3. Deploy</h4>
                      <p className="text-xs text-muted-foreground">
                        Publicar no Runtime
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-medium">4. Validar</h4>
                      <p className="text-xs text-muted-foreground">
                        Smoke tests
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button className="bg-gradient-primary" size="lg">
                    <Rocket className="mr-2 h-5 w-5" />
                    Iniciar Deploy Wizard
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

export default Deploy;