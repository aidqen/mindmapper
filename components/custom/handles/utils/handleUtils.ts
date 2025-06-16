import { Position } from '@xyflow/react';

export const getPositionStyles = (position: Position) => {
  const lineLength = 20;
  const handleSize = 8; // Small dot handle
  const plusButtonSize = 16; // Larger plus button
  
  switch (position) {
    case Position.Top:
      return {
        handle: {
          top: -handleSize / 2,
          left: '50%',
          transform: 'translateX(-50%)',
        },
        line: {
          top: -lineLength,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${lineLength}px`,
        },
        plusButton: {
          top: -(lineLength + plusButtonSize / 2),
          left: '50%',
          transform: 'translateX(-50%)',
        }
      };
    case Position.Bottom:
      return {
        handle: {
          bottom: -handleSize / 2,
          left: '50%',
          transform: 'translateX(-50%)',
        },
        line: {
          bottom: -lineLength,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: `${lineLength}px`,
        },
        plusButton: {
          bottom: -(lineLength + plusButtonSize / 2),
          left: '50%',
          transform: 'translateX(-50%)',
        }
      };
    case Position.Left:
      return {
        handle: {
          left: -handleSize / 2,
          top: '50%',
          transform: 'translateY(-50%)',
        },
        line: {
          left: -lineLength,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${lineLength}px`,
          height: '1px',
        },
        plusButton: {
          left: -(lineLength + plusButtonSize / 2),
          top: '50%',
          transform: 'translateY(-50%)',
        }
      };
    case Position.Right:
      return {
        handle: {
          right: -handleSize / 2,
          top: '50%',
          transform: 'translateY(-50%)',
        },
        line: {
          right: -lineLength,
          top: '50%',
          transform: 'translateY(-50%)',
          width: `${lineLength}px`,
          height: '1px',
        },
        plusButton: {
          right: -(lineLength + plusButtonSize / 2),
          top: '50%',
          transform: 'translateY(-50%)',
        }
      };
    default:
      return { handle: {}, line: {}, plusButton: {} };
  }
};
