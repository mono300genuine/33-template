import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  spring,
  Easing,
} from 'remotion';

import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { colorVar, defaultSpring } from '../lib/helpers';
import CircleGrid from '../components/CircleGrid';
import OverlappingSquares from '../components/OverlappingSquares';
import RectWithSideLines from '../components/RectWithSideLines';
import SweepComponent from '../components/SweepComponent';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import { useTextSplitter } from '../lib/useTextSplitter';
import { WIDTH, HEIGHT } from '../lib/consts';

export const scene4Schema = z.object({
  img: z.string(),
  title: z.string(),
  subtitle: z.string(),
  voiceOver: z.string(),
});

type Scene4Props = z.infer<typeof scene4Schema> & {
  background: BackgroundProps;
};

const Scene4: React.FC<Scene4Props> = (props) => {
  const { durationInFrames, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const titleText = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 700,
  });

  const subtitleText = useTextSplitter({
    text: props.subtitle,
    fontSize: 70,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 700,
  });

  const cx = WIDTH / 2;
  const cy = HEIGHT;

  const radius = 80;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = interpolate(
    frame,
    [0, Math.floor(durationInFrames * 0.9)],
    [strokeDasharray, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const x = WIDTH / 2;
  const y = 0;
  const rotation = -60;

  const x1 = WIDTH * 0.95;
  const y1 = HEIGHT / 3.5;
  const currentRadius = defaultSpring({
    frame,
    from: 100,
    to: 200,
    durationInFrames: fps * 2,
  });

  const slideInDuration = fps * 1.5;
  const imageTranslateX = spring({
    frame,
    from: -WIDTH * 0.8,
    to: 0,
    durationInFrames: slideInDuration,
    fps,
    config: {
      damping: 100,
    },
  });

  const imageScale = interpolate(frame, [0, durationInFrames], [1.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Position the clip on the image.
  // This might be a problem because it's specific to the image.
  const imageOffsetX = 1.5;
  const imageOffsetY = 1.8;

  return (
    <SweepComponent>
      <Audio src={props.voiceOver} />

      <Background {...props.background} />
      <AbsoluteFill>
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <defs>
            <clipPath id="circleClip">
              <circle cx={cx} cy={cy} r={600} />
            </clipPath>
          </defs>
          <circle cx={cx * 0.9} cy={cy} r={580} fill={'#31b3fe'} />

          <g clipPath="url(#circleClip)">
            <image
              href={props.img}
              x={cx - WIDTH / imageOffsetX + imageTranslateX}
              y={cy - HEIGHT / imageOffsetY}
              width={WIDTH * imageScale}
              height={HEIGHT * imageScale}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>

          <circle
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={'#093399'}
            width={WIDTH}
            height={HEIGHT}
            color="#093399"
            strokeWidth={60}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            transform={`rotate(${rotation} ${x} ${y})`}
          />
          <circle cx={x1} cy={y1} r={currentRadius} fill="#02f3ff" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill>
        <RectWithSideLines
          width={WIDTH}
          height={HEIGHT}
          sideLineLength={80}
          paddingX={100}
          paddingY={55}
          color={colorVar('secondary')}
        />
      </AbsoluteFill>

      <div
        style={{
          ...titleText.style,
          position: 'absolute',
          left: '10%',
          top: '10%',
        }}
      >
        <TextCharsRandomOpacity text={titleText.text} color={colorVar('primaryText')} />
        <TextCharsRandomOpacity text={subtitleText.text} color={colorVar('primaryText')} />
      </div>
      <AbsoluteFill>
        <OverlappingSquares
          size={60}
          overlapFactor={0.7}
          position="bottom-left"
          fraction={0.8}
          strokeWidth={5}
          width={WIDTH}
          height={HEIGHT}
          x={WIDTH * 0.91}
          y={HEIGHT * 0.063}
          renderOrder="foreground"
          fillColor={colorVar('accent')}
          strokeColor="#1997DD"
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <OverlappingSquares
          size={60}
          overlapFactor={0.7}
          position="top-right"
          fraction={0.8}
          strokeWidth={5}
          width={WIDTH}
          height={HEIGHT}
          x={WIDTH * 0.06}
          y={HEIGHT * 0.7}
          renderOrder="foreground"
          fillColor={colorVar('accent')}
          strokeColor="#1997DD"
        />
      </AbsoluteFill>

      <AbsoluteFill>
        <CircleGrid
          gap={20}
          strokeWidth={2}
          color={colorVar('secondary')}
          beginRadius={0}
          endRadius={70}
          width={WIDTH}
          height={HEIGHT}
          x={WIDTH * 0.51}
          y={HEIGHT * 0.35}
          clipId="scene-2-clip-2"
        />
      </AbsoluteFill>
      <AbsoluteFill>
        <CircleGrid
          gap={20}
          strokeWidth={2}
          color={colorVar('accent')}
          beginRadius={0}
          endRadius={200}
          width={WIDTH}
          direction="vertical"
          height={HEIGHT}
          x={WIDTH * 0.8}
          y={HEIGHT * 0.65}
          clipId="scene-2-clip-3"
        />
      </AbsoluteFill>
    </SweepComponent>
  );
};

export default Scene4;
