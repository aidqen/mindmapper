import { HANDLE_STYLES } from '../constants/handleConstants';

interface ConnectionLineProps {
  positionStyles: any;
}

export const ConnectionLine = ({ positionStyles }: ConnectionLineProps) => {
  return (
    <div
      style={{
        ...HANDLE_STYLES.line,
        ...positionStyles.line,
      }}
    />
  );
};
