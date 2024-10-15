import React from 'react';

interface Props {
  gridSize: number; // Now represents the gap between dots
  width: number;
  height: number;
  color: string;
  radius: number;
}

const DotGrid: React.FC<Props> = ({ gridSize, width, height, color, radius }) => {
  const numCols = Math.floor(width / gridSize);
  const numRows = Math.floor(height / gridSize);

  const dots = [];
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * gridSize + gridSize / 2}
          cy={row * gridSize + gridSize / 2}
          r={radius}
          fill={color}
          opacity={0.5}
        />
      );
    }
  }

  return (
    <svg width={width} height={height}>
      {dots}
    </svg>
  );
};

export default DotGrid;
