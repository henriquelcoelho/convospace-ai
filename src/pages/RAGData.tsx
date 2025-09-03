import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Database, Plus, ArrowLeft, Cloud, Globe, FileText, Upload, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const RAGData = () => {
  const [dataSources] = useState([
    {
      id: "ds-001",
      name: "Políticas de Crédito S3",
      kind: "s3",
      status: "connected",
      lastSync: "2 horas atrás",
      documentCount: 145
    },
    {
      id: "ds-002", 
      name: "Confluence Docs",
      kind: "confluence",
      status: "syncing",
      lastSync: "Sincronizando...",
      documentCount: 89
    }
  ]);

  const [ragIndices] = useState([
    {
      id: "idx-001",
      name: "Políticas Corporativas",
      status: "ready",
      chunkCount: 1250,
      indexSize: "2.3 MB",
      embeddingModel: "amazon.titan-embed-text-v1",
      lastUpdate: "1 hora atrás"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': case 'connected': return 'bg-success';
      case 'syncing': case 'ingesting': return 'bg-warning';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getSourceIcon = (kind: string) => {
    switch (kind) {
      case 's3': return Cloud;
      case 'confluence': case 'notion': return FileText;
      case 'web': return Globe;
      default: return Database;
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
                  <Database className="h-6 w-6 mr-3 text-primary" />
                  RAG & Dados
                </h1>
                <p className="text-muted-foreground">
                  Gerencie fontes de dados e índices RAG
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sincronizar
              </Button>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Nova Fonte
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sources">Fontes de Dados</TabsTrigger>
            <TabsTrigger value="indices">Índices RAG</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources.map((source) => {
                const Icon = getSourceIcon(source.kind);
                return (
                  <Card key={source.id} className="bg-card/50 border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{source.name}</CardTitle>
                            <Badge variant="outline" className="text-xs mt-1">
                              {source.kind}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={getStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Documentos:</span>
                          <span className="font-medium">{source.documentCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última sync:</span>
                          <span className="font-medium">{source.lastSync}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Configurar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Sincronizar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {/* Add New Source Card */}
              <Card className="bg-gradient-glass border-border/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Upload className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium mb-2">Adicionar Nova Fonte</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    S3, Website, Confluence, Notion, SQL
                  </p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Conectar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="indices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ragIndices.map((index) => (
                <Card key={index.id} className="bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{index.name}</CardTitle>
                        <CardDescription>
                          Modelo: {index.embeddingModel}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(index.status)}>
                        {index.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Chunks:</div>
                        <div className="font-medium">{index.chunkCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Tamanho:</div>
                        <div className="font-medium">{index.indexSize}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Última atualização:</div>
                      <div className="font-medium">{index.lastUpdate}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Testar Busca
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Reindexar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card className="bg-gradient-glass border-border/50">
              <CardHeader>
                <CardTitle>Pipeline de Processamento</CardTitle>
                <CardDescription>
                  Configure estratégias de chunking e embedding
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">1. Extração</h4>
                      <p className="text-sm text-muted-foreground">
                        Extrair texto de documentos
                      </p>
                      <Progress value={100} className="mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">2. Chunking</h4>
                      <p className="text-sm text-muted-foreground">
                        Dividir em segmentos
                      </p>
                      <Progress value={75} className="mt-2" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/30">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">3. Embedding</h4>
                      <p className="text-sm text-muted-foreground">
                        Gerar embeddings vetoriais
                      </p>
                      <Progress value={45} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button className="bg-gradient-primary">
                    Configurar Pipeline
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

export default RAGData;