// AgentCore Types - Complete data models for the Agent Hub

export type FrameworkType = "langgraph" | "crewai" | "strands" | "llamaindex";
export type AgentStatus = "draft" | "ready" | "deployed" | "error";
export type DataSourceKind = "s3" | "web" | "db" | "confluence" | "notion" | "upload";
export type ToolType = "openapi" | "lambda" | "saas" | "mcp";
export type MemoryStrategy = "shortTerm" | "longTerm" | "summary";
export type IdentityKind = "iam" | "oauth2";
export type DeploymentStatus = "pending" | "building" | "deploying" | "running" | "failed" | "stopped";

export interface GatewayToolRef {
  id: string;
  mcpEndpoint: string;
  scopes: string[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  framework: FrameworkType;
  model: string;
  tools: GatewayToolRef[];
  memoryId?: string;
  ragIndexIds: string[];
  policies: {
    piiMasking?: boolean;
    maxTokens?: number;
    timeout?: number;
  };
  versions: AgentVersion[];
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AgentVersion {
  id: string;
  agentId: string;
  semver: string;
  status: AgentStatus;
  runtimeArn?: string;
  endpointUrl?: string;
  definition: Record<string, any>;
  createdAt: string;
  deployedAt?: string;
}

export interface GatewayTool {
  id: string;
  name: string;
  description: string;
  type: ToolType;
  mcpEndpoint: string;
  scopes: string[];
  config: Record<string, any>;
  status: "draft" | "published" | "approved" | "deprecated";
  createdAt: string;
}

export interface DataSource {
  id: string;
  name: string;
  kind: DataSourceKind;
  connectorConfig: Record<string, any>;
  status: "connected" | "error" | "syncing";
  lastSync?: string;
  createdAt: string;
}

export interface RAGIndex {
  id: string;
  name: string;
  dataSourceId: string;
  status: "draft" | "ingesting" | "embedding" | "ready" | "stale" | "error";
  chunkingConfig: {
    strategy: "fixed" | "semantic" | "hierarchical";
    size: number;
    overlap: number;
  };
  embeddingModel: string;
  refreshPolicy: {
    enabled: boolean;
    schedule?: string;
  };
  metrics?: {
    documentCount: number;
    chunkCount: number;
    indexSize: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MemoryResource {
  id: string;
  name: string;
  strategies: MemoryStrategy[];
  retentionPolicy: {
    days: number;
    autoSummary: boolean;
  };
  status: "active" | "inactive" | "error";
  associatedAgents: string[];
  createdAt: string;
}

export interface IdentityProvider {
  id: string;
  name: string;
  kind: IdentityKind;
  config: Record<string, any>;
  consents: {
    service: string;
    scopes: string[];
    status: "pending" | "granted" | "denied";
  }[];
  status: "active" | "inactive";
  createdAt: string;
}

export interface Deployment {
  id: string;
  agentVersionId: string;
  status: DeploymentStatus;
  logsUrl?: string;
  image?: string;
  ecrRepo?: string;
  runtimeArn?: string;
  endpointUrl?: string;
  environment: "sandbox" | "staging" | "production";
  trafficSplit?: {
    percentage: number;
    target: string;
  };
  createdAt: string;
  deployedAt?: string;
}

export interface Observation {
  id: string;
  agentId: string;
  sessionId: string;
  userId?: string;
  steps: ObservationStep[];
  metrics: {
    totalTokens: number;
    duration: number;
    cost: number;
    latency: number;
  };
  score?: {
    value: number;
    feedback?: string;
  };
  status: "running" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
}

export interface ObservationStep {
  id: string;
  type: "tool_call" | "llm_call" | "memory_access" | "rag_retrieval";
  name: string;
  input: Record<string, any>;
  output: Record<string, any>;
  metadata: {
    tokens?: number;
    duration: number;
    model?: string;
  };
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: {
    suggestions?: string[];
    actions?: ChatAction[];
    agentPlan?: AgentPlan;
  };
  timestamp: string;
}

export interface ChatAction {
  id: string;
  label: string;
  type: "create_agent" | "add_tool" | "setup_rag" | "setup_memory" | "deploy" | "test";
  payload: Record<string, any>;
}

export interface AgentPlan {
  objective: string;
  tasks: string[];
  suggestedTools: string[];
  memoryConfig?: {
    strategies: MemoryStrategy[];
    retention: number;
  };
  ragConfig?: {
    dataSources: string[];
    embeddingModel: string;
  };
  identityConfig?: {
    inbound: IdentityKind;
    outbound: string[];
  };
  deployConfig?: {
    environment: string;
    scaling: {
      min: number;
      max: number;
    };
  };
}

// Chat slash commands
export interface SlashCommand {
  command: string;
  description: string;
  handler: (params: string[]) => void;
}

// Store states
export interface AgentHubState {
  agents: Agent[];
  tools: GatewayTool[];
  dataSources: DataSource[];
  ragIndices: RAGIndex[];
  memories: MemoryResource[];
  identities: IdentityProvider[];
  deployments: Deployment[];
  observations: Observation[];
  currentChat: {
    messages: ChatMessage[];
    plan?: AgentPlan;
  };
  loading: boolean;
  error?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}