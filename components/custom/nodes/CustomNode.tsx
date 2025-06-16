import { Position, NodeProps, useStore, Node, Edge, NodeResizer } from '@xyflow/react';
import { CustomHandle } from '../handles/CustomHandle';
import { Ellipsis, Pen, Trash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NodeEditorDialog } from './NodeEditorDialog'

interface CustomNodeData extends Record<string, unknown> {
  label?: string;
  handles?: Array<{
    id: string;
    position: keyof typeof Position;
    type: 'source' | 'target';
  }>;
}

interface CustomNodeProps extends NodeProps {
  data: CustomNodeData;
  onAddNode?: (newNode: Node, newEdge: Edge) => void;
}



function CustomNode({ id, data, onAddNode, positionAbsoluteX, positionAbsoluteY }: CustomNodeProps) {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [labelValue, setLabelValue] = useState(data.label || '');
  const edges = useStore((s) => s.edges);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  
  const handleNodeDoubleClick = () => {
    setIsDialogOpen(true);
  };
  
  const handleDialogSave = (newLabel: string, handleCount: any[]) => {
    setLabelValue(newLabel);
    // TODO: Update node data with new label and handle count
    console.log(`Saving node with ${handleCount} handles`);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handles = data.handles?.map((handle) => {
    const isConnected = edges.some(
      (edge) =>
        (edge.source === id && edge.sourceHandle === handle.id) ||
        (edge.target === id && edge.targetHandle === handle.id)
    );

    return { ...handle, isConnected };
  }) || [];

  const handleLabelClick = () => {
    setIsEditing(true)
  }

  const handleLabelBlur = () => {
    setIsEditing(false)
  }

  const handleLabelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setLabelValue(data.label || '')
    }
  }

  return (
    <>
      <div
        className='relative p-2.5 border border-#777 rounded-[8px] max-w-48 cursor-pointer'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onDoubleClick={handleNodeDoubleClick}
        onMouseDown={(e) => {
          // Handle double click
          const currentTime = new Date().getTime();
          const clickLength = currentTime - lastClickTime;
          if (clickLength < 300) {
            handleNodeDoubleClick();
          }
          setLastClickTime(currentTime);
        }}
      >
      <AnimatePresence>
        {isHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute -translate-x-[50%] left-[50%] -top-5 bg-gray-900 w-[4rem] h-4 rounded-sm z-10 flex items-center justify-around"
          >
            <Pen className='fill-white' size={8} />
            <Trash className='fill-white' size={8} />
            <Ellipsis className='fill-white' size={8} />
          </motion.div>
        )}
      </AnimatePresence>
      {data.label && (
        <div className='w-full overflow-hidden'>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              onBlur={handleLabelBlur}
              onKeyDown={handleLabelKeyDown}
              className="bg-transparent w-full border-none outline-none text-current font-inherit min-w-0"
            />
          ) : (
            <span className="cursor-text block truncate" onClick={handleLabelClick}>{labelValue}</span>
          )}
        </div>
      )}
      {data?.handles ? handles?.map((handle, idx) => (
        <CustomHandle
          key={idx}
          type={handle.type}
          isConnectable={true}
          id={handle.id}
          position={Position[handle.position]}
          isConnected={handle.isConnected}
          nodeId={id}
          onAddNode={onAddNode}
          positionX={positionAbsoluteX}
          positionY={positionAbsoluteY}
        />
      )) : null}
    </div>
    <NodeEditorDialog 
      isOpen={isDialogOpen} 
      onOpenChange={setIsDialogOpen}
      nodeLabel={labelValue}
      handles={handles}
      onSave={handleDialogSave}
    />
  </>
  );
}

export default CustomNode;