import React, { useState, useEffect } from 'react';
import { interpolate, random, useCurrentFrame } from 'remotion';
import CrossShape from './CrossShape';
import DiagonalShape from './DiagonalShape';

interface Props {
  width: number;
  height: number;
  durationInFrames: number;
  rectInterval: number;
  circleInterval: number;
  crossSize: number;
  squareSize: number;
  color: string;
}

interface Point {
  x: number;
  y: number;
}

const getRandomPosition = (max: number) => random(null) * max;

const AnimatedShapes: React.FC<Props> = ({
  width,
  height,
  rectInterval,
  circleInterval,
  squareSize,
  crossSize,
  color,
}) => {
  const frame = useCurrentFrame();

  const [rectPosition, setRectPosition] = useState<Point>({
    x: getRandomPosition(width - 50),
    y: getRandomPosition(width - 50),
  });
  const [crossPosition, setCirclePosition] = useState<Point>({
    x: getRandomPosition(width - 50),
    y: getRandomPosition(width - 50),
  });

  useEffect(() => {
    if (frame % rectInterval === 0) {
      setRectPosition({
        x: getRandomPosition(width - 50),
        y: getRandomPosition(height - 50),
      });
    }
  }, [frame, rectInterval, width, height]);

  useEffect(() => {
    if (frame % circleInterval === 0) {
      setCirclePosition({
        x: getRandomPosition(width - 30),
        y: getRandomPosition(height - 30),
      });
    }
  }, [frame, circleInterval, width, height]);

  const diagonalOpacity = interpolate(
    frame % rectInterval,
    [0, rectInterval * 0.2, rectInterval * 0.8, rectInterval],
    [0, 1, 1, 0]
  );

  const crossOpacity = interpolate(
    frame % circleInterval,
    [0, circleInterval * 0.2, circleInterval * 0.8, circleInterval],
    [0, 1, 1, 0]
  );

  return (
    <svg width={width} height={height}>
      <DiagonalShape
        x={rectPosition.x}
        y={rectPosition.y}
        size={squareSize}
        color={color}
        opacity={diagonalOpacity}
        strokeWidth={2}
      />

      <CrossShape
        x={crossPosition.x}
        y={crossPosition.y}
        color={color}
        size={crossSize}
        strokeWidth={2}
        opacity={crossOpacity}
      />
    </svg>
  );
};

export default AnimatedShapes;
