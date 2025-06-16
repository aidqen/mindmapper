import { Handle, Position, HandleProps } from '@xyflow/react';
import { HANDLE_STYLES } from '../constants/handleConstants';

interface HandleDotProps extends Omit<HandleProps, 'children'> {
  type: 'source' | 'target';
  position: Position;
  id?: string;
  isConnectable?: boolean;
  style?: React.CSSProperties;
  positionStyles: any;
}

export const HandleDot = ({
  type,
  position,
  id,
  isConnectable = true,
  style,
  positionStyles,
  ...props
}: HandleDotProps) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      isConnectable={isConnectable}
      style={{
        ...HANDLE_STYLES.handle,
        ...positionStyles.handle,
        ...style
      }}
      {...props}
    />
  );
};
