import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, Settings, Play, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAgentHubStore } from "@/lib/store";
import { ChatMessage, AgentPlan } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlanPanel } from "@/components/PlanPanel";
import { ChatMessageComponent } from "@/components/ChatMessageComponent";
import { SlashCommands } from "@/components/SlashCommands";

const ChatBuilder = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentChat: { messages, plan },
    addMessage,
    updatePlan,
    clearChat 
  } = useAgentHubStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await simulateAIResponse(input);
    setIsTyping(false);
  };

  const simulateAIResponse = async (userInput: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = "";
    let newPlan: AgentPlan | undefined;

    // Simple intent detection
    if (userInput.toLowerCase().includes("agente") && userInput.toLowerCase().includes("cobrança")) {
      response = `Perfeito! Vou ajudar você a criar um agente de cobrança. 

Baseado na sua descrição, vou sugerir:
- **Framework**: LangGraph (para fluxos complexos)
- **Modelo**: Anthropic Claude 3.5 (para conversas naturais)
- **Ferramentas**: CRM API + Slack para notificações
- **Memória**: 30 dias com resumos automáticos
- **RAG**: Políticas de crédito da empresa

Quer que eu configure isso automaticamente?`;

      newPlan = {
        objective: "Criar agente de cobrança com integração CRM",
        tasks: [
          "Configurar framework LangGraph",
          "Integrar CRM via Gateway",
          "Configurar memória de 30 dias",
          "Indexar políticas de crédito",
          "Setup notificações Slack"
        ],
        suggestedTools: ["CRM API", "Slack Webhook"],
        memoryConfig: {
          strategies: ["shortTerm", "longTerm", "summary"],
          retention: 30
        },
        ragConfig: {
          dataSources: ["S3: Políticas de Crédito"],
          embeddingModel: "amazon.titan-embed-text-v1"
        }
      };
    } else if (userInput.toLowerCase().includes("/novo_agente")) {
      response = "Vamos criar um novo agente! Me diga qual tipo de agente você quer criar e qual problema ele deve resolver.";
    } else if (userInput.toLowerCase().includes("ferramenta") || userInput.toLowerCase().includes("tool")) {
      response = `Posso ajudar você a conectar ferramentas via Gateway MCP! 

As opções disponíveis são:
- **OpenAPI**: Importar especificação OpenAPI existente
- **Lambda**: Conectar função AWS Lambda 
- **SaaS**: Integrar serviços como Slack, GitHub, Salesforce

Que tipo de ferramenta você quer conectar?`;
    } else {
      response = `Entendi! Como posso ajudar você com o AgentCore?

Algumas coisas que posso fazer:
- 🤖 Criar agentes com diferentes frameworks
- 🔧 Conectar ferramentas via Gateway
- 📚 Configurar RAG com seus dados
- 💭 Setup de memória curta/longa
- 🚀 Deploy e monitoramento

Use comandos como /novo_agente, /adicionar_ferramenta, ou simplesmente me descreva o que você quer criar!`;
    }

    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: response,
      metadata: {
        suggestions: [
          "Sim, configure automaticamente",
          "Quero personalizar as configurações",
          "Adicionar mais ferramentas",
          "Ver exemplo de conversa"
        ],
        agentPlan: newPlan
      },
      timestamp: new Date().toISOString()
    };

    addMessage(assistantMessage);
    if (newPlan) {
      updatePlan(newPlan);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setShowCommands(value.startsWith('/'));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSlashCommand = (command: string) => {
    setInput(command);
    setShowCommands(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-lg">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  Chat Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Converse para criar e configurar seus agentes
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm" onClick={clearChat}>
                Nova Conversa
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
              <Bot className="h-16 w-16 text-primary/50 mb-6" />
              <h2 className="text-2xl font-semibold mb-4">
                Como posso ajudar você hoje?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Descreva que tipo de agente você quer criar ou use comandos como:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col space-y-2"
                  onClick={() => handleInputChange("/novo_agente")}
                >
                  <Bot className="h-6 w-6" />
                  <span>/novo_agente</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col space-y-2"
                  onClick={() => handleInputChange("/adicionar_ferramenta")}
                >
                  <Settings className="h-6 w-6" />
                  <span>/adicionar_ferramenta</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <ChatMessageComponent key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-lg p-6">
          <div className="max-w-4xl mx-auto">
            {showCommands && (
              <SlashCommands onSelectCommand={handleSlashCommand} />
            )}
            
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem ou use / para comandos..."
                  className="min-h-[60px] pr-12 resize-none bg-background/50"
                  disabled={isTyping}
                />
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground text-center">
              Use <kbd className="px-2 py-1 bg-muted rounded text-xs">/</kbd> para comandos •{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> para enviar •{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Shift + Enter</kbd> para quebra de linha
            </div>
          </div>
        </div>
      </div>

      {/* Plan Panel */}
      {plan && (
        <>
          <Separator orientation="vertical" />
          <PlanPanel plan={plan} />
        </>
      )}
    </div>
  );
};

export default ChatBuilder;