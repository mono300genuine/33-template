import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { colorVar, defaultSpring } from '../lib/helpers';

const FadeInOutOverlayComponent = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeOutDuration = 50;
  const fadeOutOpacity = defaultSpring({
    frame,
    from: 1,
    to: 0,
    durationInFrames: fadeOutDuration,
  });

  const fadeInStart = durationInFrames - 50;
  const fadeInOpacity =
    frame > fadeInStart
      ? defaultSpring({
          frame: frame - fadeInStart,
          from: 0,
          to: 1,
          durationInFrames: fadeOutDuration,
        })
      : 0;

  const opacity = Math.max(fadeOutOpacity, fadeInOpacity);
  return (
    <AbsoluteFill
      id="fadeInOut"
      style={{
        backgroundColor: colorVar('white'),
        opacity,
        zIndex: 999,
      }}
    />
  );
};

export default FadeInOutOverlayComponent;
