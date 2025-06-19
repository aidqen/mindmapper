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
import { useFlowLogic } from '../../../hooks/useFlowLogic';
import { createSmallToolbarButtons } from './config/toolbarConfig';
import { FlowHeader } from './components/FlowHeader';
import { FlowSidebar } from '@/components/custom/FlowSidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { useCallback } from 'react';

export default function Home() {
  const { setOpen } = useSidebar();
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
    onAddNode,
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


  const handleFlowClick = useCallback((event: React.MouseEvent) => {
    if (event.target instanceof Element && event.target.classList.contains('react-flow__pane')) {
      setOpen(false);
    }
  }, [setOpen]);

  return (
    <div className="w-full h-screen relative bg-gray-900/90">
      <FlowHeader />
      <FlowSidebar onAddNode={onAddNode} />
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
        onClick={handleFlowClick}
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
