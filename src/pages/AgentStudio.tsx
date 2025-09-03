import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Plus, Settings, Play, BarChart3, ArrowLeft, Code } from "lucide-react";
import { useAgentHubStore } from "@/lib/store";
import { AgentService } from "@/lib/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AgentStudio = () => {
  const { agents, setAgents, loading, setLoading } = useAgentHubStore();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await AgentService.list();
      if (response.success) {
        setAgents(response.data);
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setLoading(false);
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
                  <Bot className="h-6 w-6 mr-3 text-primary" />
                  Agent Studio
                </h1>
                <p className="text-muted-foreground">
                  Gerencie seus agentes e versões
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link to="/chat">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Agente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : agents.length === 0 ? (
          <Card className="bg-gradient-glass border-border/50">
            <CardContent className="text-center py-12">
              <Bot className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Nenhum agente encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Crie seu primeiro agente usando nossa interface conversacional
              </p>
              <Link to="/chat">
                <Button className="bg-gradient-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Agente
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-glass border-border/50">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{agents.length}</div>
                  <p className="text-xs text-muted-foreground">Total de Agentes</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-glass border-border/50">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{agents.filter(a => a.status === 'deployed').length}</div>
                  <p className="text-xs text-muted-foreground">Em Produção</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-glass border-border/50">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{agents.filter(a => a.status === 'ready').length}</div>
                  <p className="text-xs text-muted-foreground">Prontos para Deploy</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-glass border-border/50">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{agents.filter(a => a.status === 'draft').length}</div>
                  <p className="text-xs text-muted-foreground">Em Desenvolvimento</p>
                </CardContent>
              </Card>
            </div>

            {/* Agents Table */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Seus Agentes</CardTitle>
                <CardDescription>
                  Lista completa de agentes e suas configurações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Framework</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Versões</TableHead>
                      <TableHead>Ferramentas</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {agent.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {agent.framework}
                          </Badge>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            v{agent.versions[agent.versions.length - 1]?.semver || '1.0.0'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {agent.tools.length} ferramenta{agent.tools.length !== 1 ? 's' : ''}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            {agent.status === 'deployed' && (
                              <Button variant="ghost" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Code className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentStudio;