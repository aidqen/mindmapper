import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';



// Position options with icons
export const POSITION_OPTIONS = [
  { value: 'Top' as const, icon: ArrowUp },
  { value: 'Bottom' as const, icon: ArrowDown },
  { value: 'Left' as const, icon: ArrowLeft },
  { value: 'Right' as const, icon: ArrowRight },
] as const;

// Type options with descriptive labels
export const TYPE_OPTIONS = [
  { value: 'source' as const, label: 'Source (Outgoing)', color: 'text-blue-400' },
  { value: 'target' as const, label: 'Target (Incoming)', color: 'text-red-400' },
] as const;

// Custom styles for dropdown items
export const dropdownItemStyles = {
  item: "data-[highlighted]:bg-gray-800 data-[highlighted]:text-gray-100",
  trigger: "bg-gray-900/90 border-gray-700 text-gray-200 cursor-pointer hover:bg-gray-800 transition-colors rounded-md",
  content: "bg-gray-900 border-gray-700 text-gray-200 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
};
