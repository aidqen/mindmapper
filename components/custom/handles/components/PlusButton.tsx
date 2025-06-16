import { Plus } from 'lucide-react';
import { Node, Edge } from '@xyflow/react';
import { HANDLE_STYLES } from '../constants/handleConstants';
import { createNewNodeAndEdge } from '../utils/nodeCreation';

interface PlusButtonProps {
  nodeId: string;
  handleId: string | undefined;
  positionStyles: any;
  onAddNode: (newNode: Node, newEdge: Edge) => void;
  positionX: number;
  positionY: number;
}

export const PlusButton = ({ 
  nodeId, 
  handleId, 
  positionStyles, 
  onAddNode,
  positionX,
  positionY
}: PlusButtonProps) => {
  const handleClick = () => {
    const { newNode, newEdge } = createNewNodeAndEdge(nodeId, handleId, positionX, positionY);
    onAddNode(newNode, newEdge);
  };

  return (
    <div
      style={{
        ...HANDLE_STYLES.plusButton,
        ...positionStyles.plusButton,
      }}
      onClick={handleClick}
    >
      <Plus
        size={12}
        color="#ffffff"
        strokeWidth={2}
      />
    </div>
  );
};
