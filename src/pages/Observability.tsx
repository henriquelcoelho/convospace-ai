import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ArrowLeft, Activity, Clock, DollarSign, Zap, Filter, Play, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Observability = () => {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  
  const [executions] = useState([
    {
      id: "exec-001",
      sessionId: "sess-12345",
      agentName: "Agente Cobrança",
      status: "completed",
      startTime: "2024-01-15 14:30:25",
      duration: "00:02:15",
      steps: 8,
      tokens: 1250,
      cost: 0.045,
      score: 0.92
    },
    {
      id: "exec-002", 
      sessionId: "sess-12346",
      agentName: "Agente Suporte",
      status: "running",
      startTime: "2024-01-15 14:32:10",
      duration: "00:01:30",
      steps: 5,
      tokens: 850,
      cost: 0.028,
      score: null
    },
    {
      id: "exec-003",
      sessionId: "sess-12347",
      agentName: "Agente Cobrança",
      status: "error",
      startTime: "2024-01-15 14:25:45",
      duration: "00:00:45",
      steps: 3,
      tokens: 420,
      cost: 0.012,
      score: null
    }
  ]);

  const [metrics] = useState({
    totalExecutions: 1847,
    successRate: 94.2,
    avgDuration: "00:02:38",
    totalCost: 127.85
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'running': return 'bg-warning';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'running': return '●';
      case 'error': return '✗';
      default: return '○';
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
                  <Eye className="h-6 w-6 mr-3 text-primary" />
                  Observabilidade
                </h1>
                <p className="text-muted-foreground">
                  Monitor execuções, trajetórias e métricas dos agentes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Agentes</SelectItem>
                  <SelectItem value="cobranca">Agente Cobrança</SelectItem>
                  <SelectItem value="suporte">Agente Suporte</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Última hora</SelectItem>
                  <SelectItem value="24h">Últimas 24h</SelectItem>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{metrics.totalExecutions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total de Execuções</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{metrics.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Taxa de Sucesso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{metrics.avgDuration}</div>
                  <p className="text-xs text-muted-foreground">Duração Média</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${metrics.totalCost}</div>
                  <p className="text-xs text-muted-foreground">Custo Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="executions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="executions">Execuções</TabsTrigger>
            <TabsTrigger value="trajectories">Trajetórias</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="executions" className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Execuções Recentes</CardTitle>
                <CardDescription>
                  Histórico de execuções dos agentes com métricas detalhadas
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {executions.map((execution) => (
                    <div key={execution.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(execution.status)}`} />
                          <span className="font-mono text-sm">{execution.sessionId}</span>
                        </div>
                        
                        <div>
                          <div className="font-medium">{execution.agentName}</div>
                          <div className="text-sm text-muted-foreground">
                            {execution.startTime} • {execution.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{execution.steps}</div>
                          <div className="text-muted-foreground">passos</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium">{execution.tokens.toLocaleString()}</div>
                          <div className="text-muted-foreground">tokens</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium">${execution.cost}</div>
                          <div className="text-muted-foreground">custo</div>
                        </div>
                        
                        {execution.score && (
                          <div className="text-center">
                            <div className="font-medium">{execution.score}</div>
                            <div className="text-muted-foreground">score</div>
                          </div>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Replay
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trajectories" className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Visualização de Trajetórias</CardTitle>
                <CardDescription>
                  Trace detalhado dos passos de execução dos agentes
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Sessão: sess-12345</h4>
                    <Badge className="bg-success">Concluída</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { step: 1, action: "Inicialização", duration: "0.2s", status: "completed" },
                      { step: 2, action: "Análise da consulta", duration: "1.8s", status: "completed" },
                      { step: 3, action: "Busca RAG", duration: "2.1s", status: "completed" },
                      { step: 4, action: "Chamada CRM API", duration: "3.4s", status: "completed" },
                      { step: 5, action: "Processamento", duration: "1.2s", status: "completed" },
                      { step: 6, action: "Geração de resposta", duration: "2.8s", status: "completed" },
                      { step: 7, action: "Validação", duration: "0.5s", status: "completed" },
                      { step: 8, action: "Finalização", duration: "0.1s", status: "completed" }
                    ].map((step) => (
                      <div key={step.step} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                        <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white text-sm font-medium">
                          {step.step}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium">{step.action}</div>
                          <div className="text-sm text-muted-foreground">
                            Duração: {step.duration}
                          </div>
                        </div>
                        
                        <Progress value={100} className="w-20 h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-glass border-border/50">
                <CardHeader>
                  <CardTitle>Performance por Agente</CardTitle>
                  <CardDescription>Métricas comparativas</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {[
                    { name: "Agente Cobrança", executions: 845, successRate: 96.2, avgCost: 0.042 },
                    { name: "Agente Suporte", executions: 672, successRate: 92.1, avgCost: 0.038 },
                    { name: "Agente KYC", executions: 330, successRate: 98.5, avgCost: 0.055 }
                  ].map((agent) => (
                    <div key={agent.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{agent.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {agent.executions} execuções
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Taxa de sucesso</div>
                          <div className="font-medium">{agent.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Custo médio</div>
                          <div className="font-medium">${agent.avgCost}</div>
                        </div>
                      </div>
                      
                      <Progress value={agent.successRate} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-glass border-border/50">
                <CardHeader>
                  <CardTitle>Tendências de Uso</CardTitle>
                  <CardDescription>Evolução nas últimas 24 horas</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Gráfico de tendências será exibido aqui
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Observability;