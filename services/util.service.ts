/**
 * Beautiful color palettes for mind mapping nodes
 */
const BEAUTIFUL_COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#84cc16', // Lime
  '#f97316', // Orange
  '#a78bfa', // Light purple
  '#fb7185', // Light pink
  '#fbbf24', // Light yellow
  '#34d399', // Light green
  '#60a5fa', // Light blue
];

/**
 * Generates a beautiful random color from predefined palette
 * @returns A hex color string
 */
export const generateBeautifulColor = (): string => {
  const randomIndex = Math.floor(Math.random() * BEAUTIFUL_COLORS.length);
  return BEAUTIFUL_COLORS[randomIndex];
};
