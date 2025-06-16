import { Node, Edge } from '@xyflow/react';
import { DEFAULT_NEW_NODE_HANDLES } from '../constants/handleConstants';
import { generateBeautifulColor } from '@/services/util.service';

export const createNewNodeAndEdge = (
    sourceNodeId: string,
    sourceHandleId: string | undefined,
    positionX: number,
    positionY: number
): { newNode: Node; newEdge: Edge } => {
    const timestamp = Date.now();
    const newNodeId = `node-${timestamp}`;

    const randomBgColor = generateBeautifulColor()

    const newNode: Node = {
        id: newNodeId,
        position: { x: positionX, y: positionY + 100 },
        data: {
            label: 'New Node',
            handles: DEFAULT_NEW_NODE_HANDLES
        },
        type: 'basic',
        style: {
            background: randomBgColor,
            border: '1px solid #ffffff',
            borderRadius: '8px',
            color: 'white',
            width: '5rem'
        }
    };

    const newEdge: Edge = {
        id: `edge-${timestamp}`,
        source: newNodeId,
        sourceHandle: 'a',
        target: sourceNodeId,
        targetHandle: sourceHandleId,
        type: 'basic'
    };

    return { newNode, newEdge };
};
