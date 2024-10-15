import React from 'react';

interface Props {
  size: number;
  color: string;
  x: number;
  y: number;
  strokeWidth: number;
  opacity: number;
}

const DiagonalShape: React.FunctionComponent<Props> = ({
  size = 200,
  color = 'black',
  strokeWidth,
  x,
  y,
  opacity,
}) => {
  const padding = strokeWidth; // Use strokeWidth for padding to avoid clipping
  const rectSize = size - padding * 2;

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <rect
        x={padding}
        y={padding}
        width={rectSize}
        height={rectSize}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <line
        x1={padding}
        y1={padding} // Top-left corner
        x2={size - padding} // Bottom-right corner
        y2={size - padding}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <line
        x1={size - padding} // Top-right corner
        y1={padding}
        x2={padding} // Bottom-left corner
        y2={size - padding}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default DiagonalShape;
