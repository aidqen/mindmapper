'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  useReactFlow,
  ConnectionLineType,
  ConnectionMode,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CustomControls } from '../../../components/custom/CustomControls';
import ConnectionLineAnimated from '../../../components/custom/ConnectionLineAnimated/ConnectionLineAnimated';
import FloatingEdge from '@/components/custom/edges/FloatingEdge';
import BaseEdge from '@/components/custom/edges/BaseEdge';
import CustomNode from '@/components/custom/nodes/CustomNode';
import { Lock, Maximize, Plus, Unlock, ZoomIn, ZoomOut } from 'lucide-react';


const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Central Idea', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#6366f1',
      color: 'white',
      border: '1px solid #4f46e5',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  {
    id: '2',
    position: { x: -200, y: 100 },
    data: { label: 'Branch 1', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#10b981',
      color: 'white',
      border: '1px solid #059669',
      borderRadius: '8px',
    },
  },
  {
    id: '3',
    position: { x: 200, y: 100 },
    data: { label: 'Branch 2', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#f59e0b',
      color: 'white',
      border: '1px solid #d97706',
      borderRadius: '8px',
    },
  },
  {
    id: '4',
    position: { x: -300, y: 200 },
    data: { label: 'Sub-idea A', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '1px solid #7c3aed',
      borderRadius: '8px',
    },
  },
  {
    id: '5',
    position: { x: -100, y: 200 },
    data: { label: 'Sub-idea B', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#ef4444',
      color: 'white',
      border: '1px solid #dc2626',
      borderRadius: '8px',
    },
  },
  {
    id: '6',
    position: { x: 300, y: 200 },
    data: { label: 'Detail 1', handles: [{ id: 'a', position: 'Top', type: 'source' }, { id: 'b', position: 'Bottom', type: 'target' }] },
    type: 'basic',
    style: {
      background: '#06b6d4',
      color: 'white',
      border: '1px solid #0891b2',
      borderRadius: '8px',
    },
  },
];

// const initialEdges = [
//   { id: 'e1-2', source: '1', sourceHandle: 'b', target: '2', targetHandle: 'a', type: 'basic' },
//   { id: 'e1-3', source: '1', sourceHandle: 'a', target: '3', targetHandle: 'b', type: 'basic' },
//   { id: 'e2-4', source: '2', sourceHandle: 'b', target: '4', targetHandle: 'a', type: 'basic' },
//   { id: 'e2-5', source: '2', sourceHandle: 'a', target: '5', targetHandle: 'b', type: 'basic' },
//   { id: 'e3-6', source: '3', sourceHandle: 'b', target: '6', targetHandle: 'a', type: 'basic' },
// ];

const edgeTypes = { basic: BaseEdge, floating: FloatingEdge, }

const nodeTypes = { basic: CustomNode }

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [locked, setLocked] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  console.log("🔍 ~ Home ~ app/flow/[flowId]/page.tsx:120 ~ nodes:", nodes)
  console.log("🔍 ~ Home ~ app/flow/[flowId]/page.tsx:121 ~ edges:", edges)
  const smallToolbarButtons = [
    {
      onClick: () => zoomIn(),
      icon: <ZoomIn size={18} />,
      key: 'zoom-in'
    },
    {
      onClick: () => zoomOut(),
      icon: <ZoomOut size={18} />,
      key: 'zoom-out'
    },
    {
      onClick: () => fitView(),
      icon: <Maximize size={18} />,
      key: 'fit-view'
    },
    {
      onClick: () => setLocked(!locked),
      icon: locked ? <Lock size={18} /> : <Unlock size={18} />,
      key: 'toggle-lock'
    },
    {
      onClick: () => alert('✨ Magic'),
      icon: '✨',
      key: 'magic'
    }
  ];

  const mainToolbarButtons = [
    {
      onClick: () => '',
      icon: <Plus size={18} />,
      key: 'plus'
    },
  ]

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)),
    [setEdges],
  );

  const onMoveStart = useCallback(() => {
    setShowMiniMap(true);
  }, []);

  const onMoveEnd = useCallback(() => {
    setShowMiniMap(false)
  }, []);

  return (
    <div className="w-full h-screen relative bg-gray-900/90">
      <motion.div
        className="absolute top-4 left-4 z-10 liquid-glass rounded-xl p-6"
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }}
        style={{
          willChange: "transform"
        }}
      >
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
          Mind Mapper
        </h1>
        <p className="text-sm text-white/80 drop-shadow-sm">
          Drag nodes around, connect them, and build your mind map!
        </p>
      </motion.div>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        fitView
        connectionLineType={ConnectionLineType.Step}
        connectionMode={ConnectionMode.Strict}
        connectionLineComponent={ConnectionLineAnimated}
      >
        <CustomControls direction='column' buttons={smallToolbarButtons} position='bottom-left' />
        <CustomControls direction='row' buttons={mainToolbarButtons} position='bottom-center' buttonStyles='w-10 h-10' />
        {showMiniMap && <MiniMap nodeColor={"blue"} bgColor='#FFFFF' />}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
