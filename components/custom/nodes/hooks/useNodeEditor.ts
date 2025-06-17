import { HandleConfig } from '@/types/handleTypes';
import { useState, useEffect, useCallback } from 'react';

interface UseNodeEditorProps {
  initialLabel: string;
  initialHandles: HandleConfig[];
  isOpen: boolean;
}

export function useNodeEditor({ initialLabel, initialHandles, isOpen }: UseNodeEditorProps) {
  // State management with React hooks
  const [label, setLabel] = useState(initialLabel);
  const [handles, setHandles] = useState<HandleConfig[]>(initialHandles);
  const [activeHandleId, setActiveHandleId] = useState<string | null>(null);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setLabel(initialLabel);
      setHandles(initialHandles);
      setActiveHandleId(null);
    }
  }, [isOpen, initialLabel, initialHandles]);

  // Memoized handle operations using useCallback for better performance
  const addNewHandle = useCallback(() => {
    const newHandle: HandleConfig = {
      id: `handle-${Date.now()}`,
      position: 'Bottom',
      type: 'source'
    };
    setHandles(prevHandles => [...prevHandles, newHandle]);
    // Auto-focus the new handle
    setActiveHandleId(newHandle.id);
  }, []);

  const updateHandle = useCallback((index: number, updates: Partial<HandleConfig>) => {
    setHandles(prevHandles => {
      const newHandles = [...prevHandles];
      newHandles[index] = { ...newHandles[index], ...updates };
      return newHandles;
    });
  }, []);

  const removeHandle = useCallback((index: number) => {
    setHandles(prevHandles => {
      const newHandles = [...prevHandles];
      const removedHandle = newHandles.splice(index, 1)[0];
      
      // If the removed handle was active, clear the active handle
      if (activeHandleId === removedHandle.id) {
        setActiveHandleId(null);
      }
      
      return newHandles;
    });
  }, [activeHandleId]);

  const toggleActiveHandle = useCallback((id: string) => {
    setActiveHandleId(prevId => prevId === id ? null : id);
  }, []);

  return {
    label,
    setLabel,
    handles,
    activeHandleId,
    addNewHandle,
    updateHandle,
    removeHandle,
    toggleActiveHandle
  };
}
