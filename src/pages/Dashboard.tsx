import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, Activity, Database, Zap, BarChart3, Plus } from "lucide-react";
import { useAgentHubStore } from "@/lib/store";
import { AgentService, AgentCoreMemory, AgentCoreGateway, AgentCoreObservability } from "@/lib/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const {
    agents,
    memories,
    tools,
    observations,
    setAgents,
    setMemories,
    setTools,
    setObservations,
    setLoading,
    loading
  } = useAgentHubStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [agentsRes, memoriesRes, toolsRes, obsRes] = await Promise.all([
        AgentService.list(),
        AgentCoreMemory.list(),
        AgentCoreGateway.listTools(),
        AgentCoreObservability.listSessions()
      ]);

      if (agentsRes.success) setAgents(agentsRes.data);
      if (memoriesRes.success) setMemories(memoriesRes.data);
      if (toolsRes.success) setTools(toolsRes.data);
      if (obsRes.success) setObservations(obsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'deployed').length,
    totalExecutions: observations.length,
    avgScore: observations.length > 0 
      ? observations.reduce((sum, obs) => sum + (obs.score?.value || 0), 0) / observations.length 
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AgentCore Hub
              </h1>
              <p className="text-muted-foreground">
                Infraestrutura gerenciada para agentes em produção
              </p>
            </div>
            <Link to="/chat">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <MessageCircle className="mr-2 h-4 w-4" />
                Criar via Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Agentes</CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAgents}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeAgents} ativos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Execuções</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalExecutions}</div>
              <p className="text-xs text-muted-foreground">
                Últimas 24h
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
              <BarChart3 className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avgScore.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                De 5.0
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ferramentas</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tools.length}</div>
              <p className="text-xs text-muted-foreground">
                No Gateway
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Agents */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meus Agentes</CardTitle>
                  <CardDescription>
                    Agentes criados recentemente
                  </CardDescription>
                </div>
                <Link to="/agents">
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {agents.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Nenhum agente criado ainda
                  </p>
                  <Link to="/chat">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar primeiro agente
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {agents.slice(0, 3).map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20"
                    >
                      <div className="flex items-center space-x-3">
                        <Bot className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {agent.framework} • {agent.model}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          agent.status === 'deployed' ? 'default' : 
                          agent.status === 'ready' ? 'secondary' : 
                          'outline'
                        }
                        className={
                          agent.status === 'deployed' ? 'bg-agent-active' :
                          agent.status === 'draft' ? 'bg-agent-draft' :
                          ''
                        }
                      >
                        {agent.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>
                    Execuções e eventos recentes
                  </CardDescription>
                </div>
                <Link to="/observability">
                  <Button variant="outline" size="sm">
                    Ver detalhes
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {observations.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma execução recente
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {observations.slice(0, 3).map((obs) => (
                    <div
                      key={obs.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20"
                    >
                      <div className="flex items-center space-x-3">
                        <Activity className="h-6 w-6 text-success" />
                        <div>
                          <h4 className="font-medium">Sessão {obs.sessionId}</h4>
                          <p className="text-sm text-muted-foreground">
                            {obs.metrics.totalTokens} tokens • {obs.metrics.duration}ms
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Score: {obs.score?.value || 'N/A'}
                        </div>
                        <Badge 
                          variant={obs.status === 'completed' ? 'default' : 'secondary'}
                          className={obs.status === 'completed' ? 'bg-success' : ''}
                        >
                          {obs.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Principais funcionalidades do AgentCore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/chat">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <MessageCircle className="h-6 w-6" />
                    <span>Chat Builder</span>
                  </Button>
                </Link>
                
                <Link to="/tools">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <Zap className="h-6 w-6" />
                    <span>Gateway Tools</span>
                  </Button>
                </Link>
                
                <Link to="/rag">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span>RAG & Dados</span>
                  </Button>
                </Link>
                
                <Link to="/memory">
                  <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span>Memória</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;