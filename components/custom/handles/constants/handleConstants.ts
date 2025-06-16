import { Position } from '@xyflow/react';

export const HANDLE_STYLES = {
  handle: {
    position: 'absolute' as const,
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: '1px solid #C3C9D5',
    background: '#ffffff',
    cursor: 'crosshair',
    zIndex: 2,
  },
  line: {
    position: 'absolute' as const,
    background: '#C3C9D5',
    width: '1px',
    zIndex: 1,
    transition: 'background-color 0.2s ease',
  },
  plusButton: {
    position: 'absolute' as const,
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid #C3C9D5',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 3,
    transition: 'all 0.2s ease',
  },
} as const;

export const DEFAULT_NEW_NODE_HANDLES = [
  { id: 'a', position: 'Top' as Position, type: 'source' as const },
  { id: 'b', position: 'Bottom' as Position, type: 'target' as const }
] as const;
