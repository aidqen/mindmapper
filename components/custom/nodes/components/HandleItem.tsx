import { motion } from 'framer-motion';
import { Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  HandleConfig,
  HandlePosition,
} from '@/types/handleTypes';
import {
  POSITION_OPTIONS,
  TYPE_OPTIONS,
  dropdownItemStyles
} from '../constants/nodeEditorConstants';
import { useState } from 'react';

interface HandleItemProps {
  handle: HandleConfig;
  index: number;
  isActive: boolean;
  onToggleActive: (id: string) => void;
  onUpdate: (index: number, updates: Partial<HandleConfig>) => void;
  onRemove: (index: number) => void;
}

export function HandleItem({
  handle,
  index,
  isActive,
  onToggleActive,
  onUpdate,
  onRemove
}: HandleItemProps) {
  const [isHover, setIsHover] = useState(false)
  const PositionIcon = POSITION_OPTIONS.find(p => p.value === handle.position)?.icon || POSITION_OPTIONS[0].icon;

  return (
    <motion.div 
      key={handle.id} 
      className={`flex relative items-center gap-3 p-3 border rounded-md ${
        isActive 
          ? 'bg-gray-800/80 border-blue-600 ring-1 ring-blue-600/30' 
          : 'bg-gray-800/60 border-gray-700'
      } hover:border-gray-600 transition-all cursor-pointer`}
      onClick={() => onToggleActive(handle.id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex-1 grid grid-cols-2 gap-3 pr-2">
        <div>
          <Label className="text-xs text-gray-400 mb-1 block">Position</Label>
          <Select
            value={handle.position}
            onValueChange={(value: HandlePosition) => 
              onUpdate(index, { position: value })
            }
          >
            <SelectTrigger className={`h-8  w-42 ${dropdownItemStyles.trigger}`}>
              <div className="flex items-center gap-2">
                <PositionIcon className="h-3.5 w-3.5 text-gray-400" />
                <SelectValue placeholder="Select position" />
              </div>
            </SelectTrigger>
            <SelectContent className={dropdownItemStyles.content}>
              {POSITION_OPTIONS.map(option => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="cursor-pointer hover:bg-gray-800 hover:text-gray-100 data-[highlighted]:bg-gray-800 data-[highlighted]:text-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {/* <option.icon className="h-3.5 w-3.5" /> */}
                    {option.value}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-gray-400 mb-1 block">Type</Label>
          <Select
            value={handle.type}
            onValueChange={(value: 'source' | 'target') => 
              onUpdate(index, { type: value })
            }
          >
            <SelectTrigger className={`h-8 w-42 ${dropdownItemStyles.trigger}`}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className={dropdownItemStyles.content}>
              {TYPE_OPTIONS.map(option => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="cursor-pointer hover:bg-gray-800 hover:text-gray-100 data-[highlighted]:bg-gray-800 data-[highlighted]:text-gray-100"
                >
                  <span className={option.color}>{option.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isHover && <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-3 -translate-y-1/2 top-[50%] h-8 w-8 text-gray-400 hover:text-white hover:bg-red-900/30 transition-colors cursor-pointer rounded-md flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        <Trash className={``} size={8} />
      </Button>}
    </motion.div>
  );
}
