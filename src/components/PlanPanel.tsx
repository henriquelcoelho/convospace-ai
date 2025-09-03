import { useState } from "react";
import { CheckCircle2, Clock, Settings, Database, Zap, Brain, Shield, Rocket, Edit3, Save, X } from "lucide-react";
import { AgentPlan } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlanPanelProps {
  plan: AgentPlan;
}

export const PlanPanel = ({ plan }: PlanPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const progress = (completedTasks.size / plan.tasks.length) * 100;

  const handleSave = () => {
    // Update the plan in store
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPlan(plan);
    setIsEditing(false);
  };

  const toggleTaskCompletion = (index: number) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedTasks(newCompleted);
  };

  const getIcon = (section: string) => {
    switch (section) {
      case 'tools': return Zap;
      case 'memory': return Brain;
      case 'rag': return Database;
      case 'identity': return Shield;
      case 'deploy': return Rocket;
      default: return Settings;
    }
  };

  return (
    <div className="w-96 border-l border-border bg-card/30 backdrop-blur-lg">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Plano do Agente</h2>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Objective */}
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Objetivo</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedPlan.objective}
                  onChange={(e) => setEditedPlan({ ...editedPlan, objective: e.target.value })}
                  className="min-h-[60px]"
                />
              ) : (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {plan.objective}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Progresso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Tarefas concluídas</span>
                <span className="font-medium">{completedTasks.size}/{plan.tasks.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tarefas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                    completedTasks.has(index)
                      ? 'bg-success/10 border-success/30'
                      : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                  }`}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  <CheckCircle2 
                    className={`h-4 w-4 ${
                      completedTasks.has(index) ? 'text-success' : 'text-muted-foreground'
                    }`} 
                  />
                  <span className={`text-sm flex-1 ${
                    completedTasks.has(index) ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {task}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Tools */}
          {plan.suggestedTools && plan.suggestedTools.length > 0 && (
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Ferramentas Sugeridas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {plan.suggestedTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border border-border/30 bg-muted/20">
                    <span className="text-sm">{tool}</span>
                    <Button variant="outline" size="sm">
                      Conectar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Memory Configuration */}
          {plan.memoryConfig && (
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Configuração de Memória
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {plan.memoryConfig.strategies.map((strategy) => (
                    <Badge key={strategy} variant="secondary">
                      {strategy}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Retenção:</span>
                  <span className="font-medium">{plan.memoryConfig.retention} dias</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Configurar Memória
                </Button>
              </CardContent>
            </Card>
          )}

          {/* RAG Configuration */}
          {plan.ragConfig && (
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Configuração RAG
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Fontes de dados:</div>
                  {plan.ragConfig.dataSources.map((source, index) => (
                    <div key={index} className="text-xs bg-muted/30 rounded px-2 py-1">
                      {source}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Modelo de embedding:</span>
                  <span className="text-xs text-muted-foreground">
                    {plan.ragConfig.embeddingModel}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Configurar RAG
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="bg-gradient-glass border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-gradient-primary" size="sm">
                <Rocket className="h-4 w-4 mr-2" />
                Gerar Agente
              </Button>
              
              <Button variant="outline" className="w-full" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Testar Configuração
              </Button>
              
              <Button variant="outline" className="w-full" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Salvar Como Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};