import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Plus, ArrowLeft, Settings, Clock, Archive, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Memory = () => {
  const [memories] = useState([
    {
      id: "mem-001",
      name: "Cobrança Memory",
      strategies: ["shortTerm", "longTerm", "summary"],
      retentionDays: 30,
      status: "active",
      associatedAgents: ["Agente Cobrança"],
      usage: {
        shortTerm: 85,
        longTerm: 45,
        summary: 12
      },
      stats: {
        totalSessions: 1250,
        avgSessionLength: "15min",
        memorySize: "2.1 MB"
      }
    }
  ]);

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'shortTerm': return 'bg-primary';
      case 'longTerm': return 'bg-secondary';
      case 'summary': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'shortTerm': return Clock;
      case 'longTerm': return Archive;
      case 'summary': return BarChart3;
      default: return Brain;
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
                  <Brain className="h-6 w-6 mr-3 text-primary" />
                  Gerenciamento de Memória
                </h1>
                <p className="text-muted-foreground">
                  Configure recursos de memória para seus agentes
                </p>
              </div>
            </div>
            
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Nova Memória
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{memories.length}</div>
              <p className="text-xs text-muted-foreground">Recursos de Memória</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {memories.filter(m => m.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Ativos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {memories.reduce((sum, m) => sum + m.stats.totalSessions, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total de Sessões</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {memories.reduce((sum, m) => sum + parseFloat(m.stats.memorySize), 0).toFixed(1)} MB
              </div>
              <p className="text-xs text-muted-foreground">Uso Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Memory Resources */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recursos de Memória</h2>
          </div>

          {memories.length === 0 ? (
            <Card className="bg-gradient-glass border-border/50">
              <CardContent className="text-center py-12">
                <Brain className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">Nenhum recurso de memória</h3>
                <p className="text-muted-foreground mb-6">
                  Crie seu primeiro recurso de memória para habilitar persistência nos agentes
                </p>
                <Button className="bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Recurso
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {memories.map((memory) => (
                <Card key={memory.id} className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-primary" />
                          {memory.name}
                        </CardTitle>
                        <CardDescription>
                          Retenção: {memory.retentionDays} dias • {memory.associatedAgents.length} agente(s) conectado(s)
                        </CardDescription>
                      </div>
                      <Badge className="bg-success">
                        {memory.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Strategies */}
                    <div>
                      <h4 className="font-medium mb-3">Estratégias de Memória</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {memory.strategies.map((strategy) => {
                          const Icon = getStrategyIcon(strategy);
                          const usage = memory.usage[strategy as keyof typeof memory.usage];
                          
                          return (
                            <Card key={strategy} className="bg-gradient-glass border-border/50">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className={`w-8 h-8 rounded-lg ${getStrategyColor(strategy)} flex items-center justify-center`}>
                                    <Icon className="h-4 w-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium capitalize text-sm">
                                      {strategy === 'shortTerm' ? 'Curto Prazo' : 
                                       strategy === 'longTerm' ? 'Longo Prazo' : 'Resumos'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {usage}% utilização
                                    </div>
                                  </div>
                                </div>
                                <Progress value={usage} className="h-2" />
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    <Separator />

                    {/* Stats */}
                    <div>
                      <h4 className="font-medium mb-3">Estatísticas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total de sessões:</span>
                          <span className="font-medium">{memory.stats.totalSessions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duração média:</span>
                          <span className="font-medium">{memory.stats.avgSessionLength}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tamanho da memória:</span>
                          <span className="font-medium">{memory.stats.memorySize}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Associated Agents */}
                    <div>
                      <h4 className="font-medium mb-3">Agentes Conectados</h4>
                      <div className="flex flex-wrap gap-2">
                        {memory.associatedAgents.map((agent, index) => (
                          <Badge key={index} variant="secondary">
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Métricas
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4 mr-2" />
                        Arquivar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Memory Strategies Info */}
        <Card className="bg-gradient-glass border-border/50">
          <CardHeader>
            <CardTitle>Sobre as Estratégias de Memória</CardTitle>
            <CardDescription>
              Entenda como cada estratégia funciona no AgentCore
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Curto Prazo</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mantém contexto da conversa atual. Ideal para manter coerência dentro de uma sessão.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Archive className="h-4 w-4 text-secondary" />
                  <h4 className="font-medium">Longo Prazo</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Armazena informações persistentes entre sessões. Permite personalização e aprendizado.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-accent" />
                  <h4 className="font-medium">Resumos</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cria resumos automáticos de conversas longas para otimizar uso de tokens.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Memory;