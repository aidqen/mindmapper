import { Position, NodeProps } from '@xyflow/react';
import { CustomHandle } from '../handles/CustomHandle';

interface CustomNodeData extends Record<string, unknown> {
  label?: string;
  handles?: HandleTypes[];
}

interface HandleTypes {
  id: string;
  position: 'Top' | 'Bottom' | 'Left' | 'Right';
  type: 'source' | 'target';
}

interface CustomNodeProps extends NodeProps {
  data: CustomNodeData;
}

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div style={{ 
      padding: 10, 
      border: '1px solid #777', 
      borderRadius: 8,
      position: 'relative',
    }}>
      {data.label && <div>{data.label}</div>}
      {data?.handles ? data.handles?.map((handle, idx) => (
        <CustomHandle 
          key={idx} 
          type={handle.type} 
          isConnectable={true} 
          id={handle.id} 
          position={Position[handle.position]} 
        />
      )) : null}
    </div>
  );
}

export default CustomNode;