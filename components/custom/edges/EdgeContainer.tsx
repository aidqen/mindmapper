import { useState, useRef, ReactNode } from 'react';
import {
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react';
import { Trash } from 'lucide-react';

interface EdgeContainerProps extends EdgeProps {
  children: ReactNode;
}

export default function EdgeContainer({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  children,
  ...edgeProps
}: EdgeContainerProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
 
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
  
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      hoverTimeoutRef.current = null;
    }, 500);
  };
 
  return (
    <>
      <g
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <path
          d={edgePath}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          className="react-flow__edge-interaction"
        />
        {children}
      </g>
      {isHovered && (
        <EdgeLabelRenderer>
          <div
            className="absolute pointer-events-auto z-[1000] nodrag nopan bg-gray-900"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center cursor-pointer justify-center rounded-xs w-5 h-5 text-white border border-white"
              onClick={onEdgeClick}
            >
              <Trash size={12} />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
