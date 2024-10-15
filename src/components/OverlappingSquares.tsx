import React from 'react';

interface SquareProps {
  size: number;
  fraction: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  overlapFactor: number;
  width: number;
  height: number;
  strokeWidth: number;
  x: number;
  y: number;
  renderOrder: 'background' | 'foreground';
  fillColor: string;
  strokeColor: string;
}

const OverlappingSquares: React.FC<SquareProps> = ({
  size,
  fraction,
  position,
  overlapFactor,
  width,
  height,
  strokeWidth,
  x,
  y,
  renderOrder,
  fillColor,
  strokeColor,
}) => {
  const smallSize = size * fraction;
  const offset = smallSize * overlapFactor;

  let offsetX = 0;
  let offsetY = 0;

  switch (position) {
    case 'top-left':
      offsetX = -offset;
      offsetY = -offset;
      break;
    case 'top-right':
      offsetX = size - smallSize + offset;
      offsetY = -offset;
      break;
    case 'bottom-left':
      offsetX = -offset;
      offsetY = size - smallSize + offset;
      break;
    case 'bottom-right':
      offsetX = size - smallSize + offset;
      offsetY = size - smallSize + offset;
      break;
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${x} ${y})`}>
        {renderOrder === 'background' && <rect width={size} height={size} fill={fillColor} />}
        <rect
          x={offsetX}
          y={offsetY}
          width={smallSize}
          height={smallSize}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        {renderOrder === 'foreground' && <rect width={size} height={size} fill={fillColor} />}
      </g>
    </svg>
  );
};

export default OverlappingSquares;
