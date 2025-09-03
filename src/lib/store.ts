import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AgentHubState, Agent, ChatMessage, AgentPlan, GatewayTool, DataSource, RAGIndex, MemoryResource, Observation } from './types';

interface AgentHubActions {
  // Agent actions
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  
  // Chat actions
  addMessage: (message: ChatMessage) => void;
  updatePlan: (plan: AgentPlan) => void;
  clearChat: () => void;
  
  // Tool actions
  setTools: (tools: GatewayTool[]) => void;
  addTool: (tool: GatewayTool) => void;
  
  // Data & RAG actions
  setDataSources: (sources: DataSource[]) => void;
  setRagIndices: (indices: RAGIndex[]) => void;
  
  // Memory actions
  setMemories: (memories: MemoryResource[]) => void;
  
  // Observability actions
  setObservations: (observations: Observation[]) => void;
  
  // UI state
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
}

const initialState: AgentHubState = {
  agents: [],
  tools: [],
  dataSources: [],
  ragIndices: [],
  memories: [],
  identities: [],
  deployments: [],
  observations: [],
  currentChat: {
    messages: [],
  },
  loading: false,
};

export const useAgentHubStore = create<AgentHubState & AgentHubActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Agent actions
      setAgents: (agents) => set({ agents }),
      addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
      updateAgent: (id, updates) => set((state) => ({
        agents: state.agents.map(agent => 
          agent.id === id ? { ...agent, ...updates } : agent
        )
      })),
      
      // Chat actions
      addMessage: (message) => set((state) => ({
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, message]
        }
      })),
      
      updatePlan: (plan) => set((state) => ({
        currentChat: {
          ...state.currentChat,
          plan
        }
      })),
      
      clearChat: () => set((state) => ({
        currentChat: {
          messages: [],
          plan: undefined
        }
      })),
      
      // Tool actions
      setTools: (tools) => set({ tools }),
      addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),
      
      // Data & RAG actions
      setDataSources: (dataSources) => set({ dataSources }),
      setRagIndices: (ragIndices) => set({ ragIndices }),
      
      // Memory actions
      setMemories: (memories) => set({ memories }),
      
      // Observability actions
      setObservations: (observations) => set({ observations }),
      
      // UI state
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'agent-hub-store',
    }
  )
);