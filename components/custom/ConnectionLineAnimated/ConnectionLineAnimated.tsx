import React from 'react';
import { getSmoothStepPath, type ConnectionLineComponentProps } from '@xyflow/react';
import './ConnectionLineAnimated.css';

export default function ConnectionLineAnimated({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionStatus
}: ConnectionLineComponentProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        className="animated-connection-line"
        fill="none"
        stroke={connectionStatus === 'valid' ? '#00ff88' : connectionStatus === 'invalid' ? '#ff4444' : '#00aaff'}
        strokeWidth={1}
        strokeDasharray="8,4"
        d={edgePath}
      />
      <path
        className="animated-connection-line-glow"
        fill="none"
        stroke={connectionStatus === 'valid' ? '#00ff88' : connectionStatus === 'invalid' ? '#ff4444' : '#00aaff'}
        strokeWidth={3}
        strokeOpacity={0.3}
        d={edgePath}
      />
    </g>
  );
}