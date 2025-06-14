import { Handle, Position, HandleProps } from '@xyflow/react';
import { Plus } from 'lucide-react';
import { getPositionStyles } from './handleUtils';

interface CustomHandleProps extends Omit<HandleProps, 'children'> {
    type: 'source' | 'target';
    position: Position;
    id?: string;
    isConnectable?: boolean;
    style?: React.CSSProperties;
}

export function CustomHandle({
    type,
    position,
    id,
    isConnectable = true,
    style,
    ...props
}: CustomHandleProps) {
    const positionStyles = getPositionStyles(position);

    return (
        <>
            {/* Connection Line */}

            {/* Handle (Small Dot) - This is the actual React Flow connection point */}
            <Handle
                type={type}
                position={position}
                id={id}
                isConnectable={isConnectable}
                style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: '1px solid #6b7280',
                    background: '#ffffff',
                    cursor: 'crosshair',
                    zIndex: 2,
                    ...positionStyles.handle,
                    ...style
                }}
                {...props}
            />

            {/* Plus Button - Separate interactive element */}
            {type === 'target' && (
                <div
                    style={{
                        position: 'absolute',
                        background: '#6b7280',
                        width: '1px',
                        zIndex: 1,
                        transition: 'background-color 0.2s ease',
                        ...positionStyles.line,
                    }}
                />
            )}
            {type === 'target' && (
                <div
                    style={{
                        position: 'absolute',
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: '1px solid #374151',
                        background: '#1f2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                        transition: 'all 0.2s ease',
                        ...positionStyles.plusButton,
                    }}
                    onClick={() => {
                        // Handle plus button click - could add new nodes, etc.
                        console.log('Plus button clicked');
                    }}
                >
                    <Plus
                        size={12}
                        color="#9ca3af"
                        strokeWidth={2}
                    />
                </div>
            )}
    </>
  );
}
