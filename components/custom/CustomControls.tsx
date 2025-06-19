import { useReactFlow } from "@xyflow/react";
import { Lock, Unlock, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useState } from "react";

interface CustomControlsTypes {
  direction?: "column" | "row";
  position?: string;
  buttons: Button[];
  className?: string;
  buttonStyles?: string;
}

interface Button {
  onClick: () => void;
  icon: React.ReactNode;
  key: string;
}

export function CustomControls({ direction, buttons, position = 'bottom-left', className, buttonStyles }: CustomControlsTypes) {

  function setPosition(position: string) {
    if (position === 'bottom-left') return 'left-5 bottom-5'
    else if (position === 'bottom-center') return 'left-1/2 transform -translate-x-1/2 bottom-5'
  }

  const positionClass = setPosition(position)

  return (
    <div className={`absolute bottom-8 z-50 liquid-glass-strong flex rounded-full backdrop-blur-xs 
    ${positionClass} ${direction === 'column' ? 'flex-col' : 'flex-row'} ${className}`}>

      {buttons.map((button) => (
        <button
          key={button.key}
          onClick={button.onClick}
          className={`flex justify-center w-10 h-10 items-center cursor-pointer text-white/90 hover:bg-white/20 transition-colors rounded-full 
            ${buttonStyles}`}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
}
