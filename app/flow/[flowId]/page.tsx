'use client';

import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  ConnectionMode,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { CustomControls } from '../../../components/custom/CustomControls';
import ConnectionLineAnimated from '../../../components/custom/ConnectionLineAnimated/ConnectionLineAnimated';
import { useFlowLogic } from './hooks/useFlowLogic';
import { createSmallToolbarButtons } from './config/toolbarConfig';
import { FlowHeader } from './components/FlowHeader';

export default function Home() {
  const {
    nodes,
    edges,
    locked,
    showMiniMap,
    nodeTypes,
    edgeTypes,
    setLocked,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onMoveStart,
    onMoveEnd,
    zoomIn,
    zoomOut,
    fitView,
  } = useFlowLogic();

  const smallToolbarButtons = createSmallToolbarButtons(
    zoomIn,
    zoomOut,
    fitView,
    locked,
    setLocked
  );

  // const mainToolbarButtons = createMainToolbarButtons();

  return (
    <div className="w-full h-screen relative bg-gray-900/90">
      <FlowHeader />
      
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
        <CustomControls 
          direction='column' 
          buttons={smallToolbarButtons} 
          position='bottom-left' 
        />
        {showMiniMap && (
          <MiniMap 
            nodeColor="blue" 
            bgColor='#FFFFF' 
          />
        )}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1} 
        />
      </ReactFlow>
    </div>
  );
}
