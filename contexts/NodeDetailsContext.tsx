'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

interface NodeDetails {
  nodeId: string;
  handleId: string;
  positionX: string | number;
  positionY: string | number;
}

interface NodeDetailsContextType {
  nodeDetails: NodeDetails;
  setNodeDetails: (details: NodeDetails) => void;
}

const NodeDetailsContext = createContext<NodeDetailsContextType | undefined>(undefined);

export function NodeDetailsProvider({ children }: { children: ReactNode }) {
  const [nodeDetails, setNodeDetails] = useState<NodeDetails>({
    nodeId: '',
    handleId: '',
    positionX: '',
    positionY: '',
  });

  return (
    <NodeDetailsContext.Provider value={{ nodeDetails, setNodeDetails }}>
      {children}
    </NodeDetailsContext.Provider>
  );
}

export function useNodeDetails() {
  const context = useContext(NodeDetailsContext);
  if (context === undefined) {
    throw new Error('useNodeDetails must be used within a NodeDetailsProvider');
  }
  return context;
}
