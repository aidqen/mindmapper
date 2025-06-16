import { Position, HandleProps, Node, Edge } from '@xyflow/react';
import { getPositionStyles } from './utils/handleUtils';
import { HandleDot } from './components/HandleDot';
import { ConnectionLine } from './components/ConnectionLine';
import { PlusButton } from './components/PlusButton';

interface CustomHandleProps extends Omit<HandleProps, 'children'> {
    type: 'source' | 'target';
    position: Position;
    id?: string;
    isConnectable?: boolean;
    style?: React.CSSProperties;
    isConnected: boolean;
    nodeId?: string;
    onAddNode?: (newNode: Node, newEdge: Edge) => void;
    positionX: number;
    positionY: number;
}

export function CustomHandle({
    type,
    position,
    id,
    isConnectable = true,
    style,
    isConnected,
    nodeId,
    onAddNode,
    positionX,
    positionY,
    ...props
}: CustomHandleProps) {
    
    const positionStyles = getPositionStyles(position);
    const shouldShowPlusButton = type === 'target' && !isConnected;

    return (
        <>
            <HandleDot
                type={type}
                position={position}
                id={id}
                isConnectable={isConnectable}
                style={style}
                positionStyles={positionStyles}
                {...props}
            />

            {/* Connection Line and Plus Button for unconnected target handles */}
            {shouldShowPlusButton && (
                <>
                    <ConnectionLine positionStyles={positionStyles} />
                    {onAddNode && nodeId && (
                        <PlusButton
                            nodeId={nodeId}
                            handleId={id}
                            positionStyles={positionStyles}
                            onAddNode={onAddNode}
                            positionX={positionX}
                            positionY={positionY}
                        />
                    )}
                </>
            )}
        </>
    );
}
