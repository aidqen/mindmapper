import React, { useCallback, useState, useMemo } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  useReactFlow,
  Node,
} from '@xyflow/react';
import { initialNodes } from '../app/flow/[flowId]/constants/initialData';
import CustomNode from '@/components/custom/nodes/CustomNode';
import BaseEdge from '@/components/custom/edges/BaseEdge';
import FloatingEdge from '@/components/custom/edges/FloatingEdge';

export function useFlowLogic() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [locked, setLocked] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);

  // Debug logging

  const onAddNode = useCallback((newNode: Node, newEdge: Edge) => {
    setNodes((nds) => [...nds, newNode as any]);
    setEdges((eds) => [...eds, newEdge]);
  }, [setNodes, setEdges]);

  const CustomNodeWithCallback = useCallback((props: any) => {
    return React.createElement(CustomNode, { ...props, onAddNode, setNodes, nodes });
  }, [onAddNode]);

  const nodeTypes = useMemo(() => ({ 
    basic: CustomNodeWithCallback 
  }), [CustomNodeWithCallback]);

  const edgeTypes = { 
    basic: BaseEdge, 
    floating: FloatingEdge 
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'basic' }, eds)),
    [setEdges],
  );

  const onMoveStart = useCallback(() => {
    setShowMiniMap(true);
  }, []);

  const onMoveEnd = useCallback(() => {
    setShowMiniMap(false);
  }, []);

  return {
    // State
    nodes,
    edges,
    locked,
    showMiniMap,
    nodeTypes,
    edgeTypes,
    
    // Actions
    onAddNode,
    setLocked,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onMoveStart,
    onMoveEnd,
    zoomIn,
    zoomOut,
    fitView,
  };
};
