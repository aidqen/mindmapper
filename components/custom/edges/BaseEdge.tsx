import { EdgeProps, getBezierPath } from '@xyflow/react';
import EdgeContainer from './EdgeContainer';

export function BaseEdge(props: EdgeProps) {
  const { 
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style
  } = props;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <EdgeContainer {...props}>
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

export default BaseEdge;
