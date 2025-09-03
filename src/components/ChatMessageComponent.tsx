import { Bot, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ChatMessageComponentProps {
  message: ChatMessage;
}

export const ChatMessageComponent = ({ message }: ChatMessageComponentProps) => {
  const isUser = message.role === "user";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-3xl`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'ml-3' : 'mr-3'
        }`}>
          {isUser ? (
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-secondary-foreground" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block max-w-full ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border/50'
          } rounded-2xl px-4 py-3 shadow-soft`}>
            <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </div>

            {/* Message Actions */}
            {!isUser && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {message.metadata?.suggestions && (
            <div className="mt-3 space-y-2">
              {message.metadata.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="mr-2 mb-2"
                  onClick={() => {
                    // Handle suggestion click
                    console.log('Suggestion clicked:', suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          {/* Actions */}
          {message.metadata?.actions && (
            <div className="mt-3 space-y-2">
              {message.metadata.actions.map((action, index) => (
                <Card key={index} className="p-3 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">
                        {action.type}
                      </Badge>
                      <span className="text-sm font-medium">
                        {action.label}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Executar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Timestamp for user messages */}
          {isUser && (
            <div className="text-xs text-muted-foreground mt-2">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};