import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type HandlePosition = 'Top' | 'Bottom' | 'Left' | 'Right';

interface HandleConfig {
  id: string;
  position: HandlePosition;
  type: 'source' | 'target';
}

interface NodeEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nodeLabel: string;
  handles: HandleConfig[];
  onSave: (newLabel: string, handles: HandleConfig[]) => void;
}

export function NodeEditorDialog({ isOpen, onOpenChange, nodeLabel, handles: initialHandles, onSave }: NodeEditorDialogProps) {
  const [label, setLabel] = useState(nodeLabel);
  const [handles, setHandles] = useState<HandleConfig[]>(initialHandles);

  useEffect(() => {
    if (isOpen) {
      setLabel(nodeLabel);
      setHandles(initialHandles);
    }
  }, [isOpen, nodeLabel, initialHandles]);

  const addNewHandle = () => {
    const newHandle: HandleConfig = {
      id: `handle-${Date.now()}`,
      position: 'Bottom',
      type: 'source'
    };
    setHandles([...handles, newHandle]);
  };

  const updateHandle = (index: number, updates: Partial<HandleConfig>) => {
    const newHandles = [...handles];
    newHandles[index] = { ...newHandles[index], ...updates };
    setHandles(newHandles);
  };

  const removeHandle = (index: number) => {
    const newHandles = handles.filter((_, i) => i !== index);
    setHandles(newHandles);
  };

  const handleSave = () => {
    onSave(label, handles);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[500px] h-[90vh] max-h-[800px] flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto p-1"
            >
              <DialogHeader>
                <DialogTitle>Edit Node</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="node-label">Node Label</Label>
                  <Input
                    id="node-label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Handles</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addNewHandle}
                      className="h-8"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Add Handle
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {handles.map((handle, index) => (
                      <div key={handle.id} className="flex items-center gap-2 p-2 border rounded-md bg-background">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">Position</Label>
                            <Select
                              value={handle.position}
                              onValueChange={(value: HandlePosition) => 
                                updateHandle(index, { position: value })
                              }
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Top">Top</SelectItem>
                                <SelectItem value="Bottom">Bottom</SelectItem>
                                <SelectItem value="Left">Left</SelectItem>
                                <SelectItem value="Right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Type</Label>
                            <Select
                              value={handle.type}
                              onValueChange={(value: 'source' | 'target') => 
                                updateHandle(index, { type: value })
                              }
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="source">Source</SelectItem>
                                <SelectItem value="target">Target</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeHandle(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {handles.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No handles added yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
