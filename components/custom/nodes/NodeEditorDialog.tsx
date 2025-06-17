import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCallback } from 'react';
import { HandleList } from './components/HandleList';
import { useNodeEditor } from './hooks/useNodeEditor';
import { HandleConfig } from '@/types/handleTypes';
import type { Node } from '@xyflow/react';

interface NodeEditorDialogProps<NodeType extends Node = Node> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nodeLabel: string;
  handles: HandleConfig[];
  onSave: (newLabel: string, handles: HandleConfig[]) => void;
}

export function NodeEditorDialog({ isOpen, onOpenChange, nodeLabel, handles: initialHandles, onSave }: NodeEditorDialogProps) {
  // Use the custom hook for state management
  const {
    label,
    setLabel,
    handles,
    activeHandleId,
    addNewHandle,
    updateHandle,
    removeHandle,
    toggleActiveHandle
  } = useNodeEditor({
    initialLabel: nodeLabel,
    initialHandles,
    isOpen
  });

  const handleSave = useCallback(() => {
    onSave(label, handles);
    
    onOpenChange(false);
  }, [label, handles, onSave, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>

      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[550px] h-[85vh] flex flex-col bg-gray-900 border-gray-800 text-gray-100 shadow-xl overflow-hidden p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-4"
            >
              <DialogHeader className="px-6 pt-6 mb-4 pb-2">
                <DialogTitle className="text-xl font-semibold text-gray-100">Edit Node</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 px-6">
                <div className="space-y-3.5">
                  <Label htmlFor="node-label" className="text-gray-300">Node Label</Label>
                  <Input
                    id="node-label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                    placeholder="Enter node label"
                    autoFocus
                  />
                </div>
                
                <HandleList
                  handles={handles}
                  activeHandleId={activeHandleId}
                  onAddHandle={addNewHandle}
                  onToggleActiveHandle={toggleActiveHandle}
                  onUpdateHandle={updateHandle}
                  onRemoveHandle={removeHandle}
                />
              </div>
            </motion.div>

            <DialogFooter className="border-t border-gray-800 p-4 gap-3 bg-gray-900/95">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer rounded-lg"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
