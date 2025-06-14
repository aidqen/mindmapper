import { EdgeProps, getBezierPath, useInternalNode } from '@xyflow/react';

import { getEdgeParams } from '../../../lib/initialElements';
import EdgeContainer from './EdgeContainer';

function FloatingEdge({ 
  id, 
  source, 
  target, 
  markerEnd, 
  style, 
  sourceX: _sourceX,
  sourceY: _sourceY,
  targetX: _targetX,
  targetY: _targetY,
  sourcePosition: _sourcePosition,
  targetPosition: _targetPosition,
  ...edgeProps 
}: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <EdgeContainer
      id={id}
      source={source}
      target={target}
      sourceX={sx}
      sourceY={sy}
      targetX={tx}
      targetY={ty}
      sourcePosition={sourcePos}
      targetPosition={targetPos}
      markerEnd={markerEnd}
      style={style}
      {...edgeProps}
    >
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
    </EdgeContainer>
  );
}

export default FloatingEdge;