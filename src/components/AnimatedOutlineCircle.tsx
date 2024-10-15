import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

interface Props {
  width: number; // Width of the parent container
  height: number; // Height of the parent container
  color: string; // Color of the circle outline
  strokeWidth: number; // Width of the circle outline
  x: number; // X position for the circle center
  y: number; // Y position for the circle center
  radius: number;
  rotation: number;
}

const AnimatedOutlinedCircle: React.FunctionComponent<Props> = ({
  width,
  height,
  color,
  strokeWidth,
  x,
  y,
  radius,
  rotation,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const strokeDasharray = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = interpolate(
    frame,
    [0, Math.floor(durationInFrames * 0.9)],
    [strokeDasharray, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  ); // Animate from full circumference to 0

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="square"
        transform={`rotate(${rotation} ${x} ${y})`}
      />
    </svg>
  );
};

export default AnimatedOutlinedCircle;
