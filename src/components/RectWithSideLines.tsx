import React from 'react';

const RectWithSideLines = ({
  width = 200, // Width of the parent container
  height = 100, // Height of the parent container
  color = 'black',
  sideLineLength = 20,
  strokeWidth = 2,
  paddingX = 20, // Horizontal padding around the rectangle
  paddingY = 10, // Vertical padding around the rectangle
}) => {
  const rectX = paddingX; // X position of the rectangle
  const rectY = paddingY; // Y position of the rectangle
  const rectWidth = width - 2 * paddingX; // Width of the rectangle
  const rectHeight = height - 2 * paddingY; // Height of the rectangle

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x={rectX}
        y={rectY}
        width={rectWidth}
        height={rectHeight}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <line
        x1={rectX}
        y1={rectY + rectHeight / 2}
        x2={rectX + sideLineLength}
        y2={rectY + rectHeight / 2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <line
        x1={rectX + rectWidth}
        y1={rectY + rectHeight / 2}
        x2={rectX + rectWidth - sideLineLength}
        y2={rectY + rectHeight / 2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RectWithSideLines;
