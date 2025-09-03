import { Bot, Zap, Database, Brain, Shield, BarChart3, Rocket, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SlashCommandsProps {
  onSelectCommand: (command: string) => void;
}

const commands = [
  {
    command: "/novo_agente",
    description: "Criar um novo agente conversacional",
    icon: Bot,
    category: "Agente"
  },
  {
    command: "/adicionar_ferramenta",
    description: "Conectar ferramenta via Gateway MCP",
    icon: Zap,
    category: "Gateway"
  },
  {
    command: "/fonte_rag",
    description: "Adicionar fonte de dados para RAG",
    icon: Database,
    category: "RAG"
  },
  {
    command: "/indexar",
    description: "Iniciar indexação de documentos",
    icon: Database,
    category: "RAG"
  },
  {
    command: "/memoria",
    description: "Configurar recurso de memória",
    icon: Brain,
    category: "Memory"
  },
  {
    command: "/identidade",
    description: "Configurar autenticação e permissões",
    icon: Shield,
    category: "Identity"
  },
  {
    command: "/deploy",
    description: "Fazer deploy no AgentCore Runtime",
    icon: Rocket,
    category: "Deploy"
  },
  {
    command: "/teste",
    description: "Testar agente em ambiente sandbox",
    icon: BarChart3,
    category: "Testing"
  },
  {
    command: "/observabilidade",
    description: "Ver métricas e trajetórias",
    icon: BarChart3,
    category: "Observability"
  },
  {
    command: "/rollback",
    description: "Fazer rollback para versão anterior",
    icon: ArrowLeft,
    category: "Deploy"
  }
];

const categoryColors = {
  "Agente": "bg-primary/10 text-primary border-primary/30",
  "Gateway": "bg-accent/10 text-accent border-accent/30",
  "RAG": "bg-success/10 text-success border-success/30",
  "Memory": "bg-warning/10 text-warning border-warning/30",
  "Identity": "bg-destructive/10 text-destructive border-destructive/30",
  "Deploy": "bg-secondary/10 text-secondary border-secondary/30",
  "Testing": "bg-muted/30 text-muted-foreground border-muted",
  "Observability": "bg-primary/10 text-primary border-primary/30"
};

export const SlashCommands = ({ onSelectCommand }: SlashCommandsProps) => {
  return (
    <Card className="mb-4 border-border/50 bg-card/80 backdrop-blur-sm shadow-soft">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-3 font-medium">
          Comandos Disponíveis
        </div>
        
        <div className="grid gap-2 max-h-64 overflow-y-auto">
          {commands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <Button
                key={cmd.command}
                variant="ghost"
                className="justify-start h-auto p-3 text-left hover:bg-muted/50 transition-colors"
                onClick={() => onSelectCommand(cmd.command)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">
                      {cmd.command}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {cmd.description}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs border ${
                    categoryColors[cmd.category as keyof typeof categoryColors] || categoryColors.Testing
                  }`}>
                    {cmd.category}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="text-xs text-muted-foreground">
            Digite <kbd className="px-1 py-0.5 bg-muted rounded text-xs">/</kbd> seguido do comando ou clique para selecionar
          </div>
        </div>
      </CardContent>
    </Card>
  );
};