import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface Props {
  direction?: 'horizontal' | 'vertical';
  gap: number;
  color: string;
  strokeWidth: number;
  beginRadius: number;
  endRadius: number;
  x: number;
  y: number;
  width: number;
  height: number;
  clipId: string;
}

const CircleGrid: React.FC<Props> = ({
  direction = 'horizontal',
  gap = 20, // Gap in pixels between lines
  color = 'black',
  strokeWidth = 2, // Stroke width in pixels
  beginRadius = 0, // Starting radius of the circle
  endRadius = 100, // Ending radius of the circle
  x = 0, // X position for the center of the circle
  y = 0, // Y position for the center of the circle
  width = 300, // Width of the SVG
  height = 300, // Height of the SVG
  clipId,
}) => {
  const frame = useCurrentFrame();
  const duration = 30; // Animation duration in frames
  const currentRadius = interpolate(frame, [0, duration], [beginRadius, endRadius], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate the number of lines based on width/height and gap
  const numLines = direction === 'horizontal' ? Math.floor(height / gap) : Math.floor(width / gap);

  const lineElements = useMemo(() => {
    const elements = [];
    for (let i = 0; i < numLines; i++) {
      const position = i * gap; // Position for each line based on gap
      const lineProps =
        direction === 'horizontal'
          ? { x1: 0, y1: position, x2: width, y2: position } // Horizontal line positions
          : { x1: position, y1: 0, x2: position, y2: height }; // Vertical line positions

      elements.push(<line key={i} {...lineProps} stroke={color} strokeWidth={strokeWidth} />);
    }
    return elements;
  }, [direction, gap, numLines, color, strokeWidth, width, height]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx={x} cy={y} r={currentRadius} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{lineElements}</g>
    </svg>
  );
};

export default CircleGrid;
