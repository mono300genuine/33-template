import React from 'react';
import { PropsWithChildren, useMemo } from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';

const SweepComponent: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const clipId = useMemo(() => String(random(null)), []);
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const percentageWidth = 18;

  const delayFrames = fps;
  const progress = interpolate(
    frame,
    [delayFrames, delayFrames + fps], // Start from 30 frames, end after 30 frames
    [-percentageWidth, 100],
    { extrapolateLeft: 'clamp' } // Prevents going below -percentageWidth before the delay
  );

  const style: React.CSSProperties = useMemo(
    () => ({
      filter: `grayscale(1)`,
      clipPath: `url(#${clipId})`,
      transform: 'scale(1.4)',
      transformOrigin: 'center',
    }),
    [clipId]
  );

  return (
    <AbsoluteFill>
      {children}
      <AbsoluteFill style={style}>{children}</AbsoluteFill>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <clipPath id={clipId}>
            <rect x={`${progress}%`} width={`${percentageWidth}%`} height="100%" />
          </clipPath>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};

export default SweepComponent;
