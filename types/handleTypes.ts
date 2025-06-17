export type HandlePosition = 'Top' | 'Bottom' | 'Left' | 'Right';
export type HandleType = 'source' | 'target';

export interface HandleConfig {
  id: string;
  position: HandlePosition;
  type: HandleType;
}