import { Lock, Maximize, Plus, Unlock, ZoomIn, ZoomOut } from 'lucide-react';

export const createSmallToolbarButtons = (
  zoomIn: () => void,
  zoomOut: () => void,
  fitView: () => void,
  locked: boolean,
  setLocked: (locked: boolean) => void
) => [
  {
    onClick: zoomIn,
    icon: <ZoomIn size={18} />,
    key: 'zoom-in'
  },
  {
    onClick: zoomOut,
    icon: <ZoomOut size={18} />,
    key: 'zoom-out'
  },
  {
    onClick: fitView,
    icon: <Maximize size={18} />,
    key: 'fit-view'
  },
  {
    onClick: () => setLocked(!locked),
    icon: locked ? <Lock size={18} /> : <Unlock size={18} />,
    key: 'toggle-lock'
  },
  {
    onClick: () => alert('✨ Magic'),
    icon: '✨',
    key: 'magic'
  }
];

export const createMainToolbarButtons = () => [
  {
    onClick: () => '',
    icon: <Plus size={18} />,
    key: 'plus'
  },
];
