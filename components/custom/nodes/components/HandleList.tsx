import { CircleHelp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { HandleItem } from './HandleItem';
import { HandleConfig } from '@/types/handleTypes';

interface HandleListProps {
  handles: HandleConfig[];
  activeHandleId: string | null;
  onAddHandle: () => void;
  onToggleActiveHandle: (id: string) => void;
  onUpdateHandle: (index: number, updates: Partial<HandleConfig>) => void;
  onRemoveHandle: (index: number) => void;
}

export function HandleList({
  handles,
  activeHandleId,
  onAddHandle,
  onToggleActiveHandle,
  onUpdateHandle,
  onRemoveHandle
}: HandleListProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-gray-300 flex items-center gap-1.5">
          Handles
          <CircleHelp className="h-3.5 w-3.5 text-gray-500" />
        </Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={onAddHandle}
          className="h-8 w-auto bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer rounded-lg"
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add Handle
        </Button>
      </div>
      
      <div className="space-y-3">
        {handles.map((handle, index) => (
          <HandleItem
            key={handle.id}
            handle={handle}
            index={index}
            isActive={activeHandleId === handle.id}
            onToggleActive={onToggleActiveHandle}
            onUpdate={onUpdateHandle}
            onRemove={onRemoveHandle}
          />
        ))}
        
        {handles.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm bg-gray-800/50 rounded-md border border-dashed border-gray-700">
            No handles added yet. Click the "Add Handle" button to create one.
          </div>
        )}
      </div>
    </div>
  );
}
