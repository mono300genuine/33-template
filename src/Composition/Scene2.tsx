import {
  AbsoluteFill,
  Img,
  useVideoConfig,
  Audio,
  spring,
  useCurrentFrame,
} from 'remotion';

import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import CircleGrid from '../components/CircleGrid';
import RectWithSideLines from '../components/RectWithSideLines';
import SweepComponent from '../components/SweepComponent';
import { Background } from '../components/Background';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import { colorVar, interpolateClamp } from '../lib/helpers';
import OverlappingSquares from '../components/OverlappingSquares';
import AnimatedOutlinedCircle from '../components/AnimatedOutlineCircle';
import FilledCircle from '../components/FilledCirlcle';
import { HEIGHT, WIDTH } from '../lib/consts';

export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
  img2: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene2Props = z.infer<typeof scene2Schema> & { background: BackgroundProps };

const Scene2: React.FC<Scene2Props> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const circleRadius = Math.min(WIDTH, HEIGHT) * 0.35;
  const titleSplit = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 900,
  });

  const zoom = spring({
    frame,
    fps,
    from: 1,
    to: 1.2,
    durationInFrames,
    config: {
      damping: 200,
    },
  });

  const zoom2 = spring({
    frame,
    fps,
    from: 1,
    to: 1.2,
    durationInFrames,
    config: {
      damping: 200,
    },
  });

  const slide = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames,
    config: {
      damping: 200,
    },
  });

  // Calculate the horizontal translation
  const translateX = interpolateClamp(slide, [0, 1], [0, -100]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <FilledCircle
            x={WIDTH / 6}
            y={HEIGHT / 8}
            beginRadius={400}
            endRadius={600}
            height={HEIGHT}
            width={WIDTH}
            color={colorVar("#18FFFF")}
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <FilledCircle
            x={circleRadius * 0.9}
            y={HEIGHT - circleRadius / 4}
            beginRadius={circleRadius * 0.8}
            endRadius={circleRadius * 1.1}
            height={HEIGHT}
            width={WIDTH}
            color={colorVar("#093399")}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            left: '30%',
            clipPath: 'url(#clip-2)',
            overflow: 'hidden',
            transform: `translateX(${translateX}px)`,
          }}
        >
          <Img
            src={props.img2}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            left: '-10%',
            bottom: '-18%',
            clipPath: 'url(#clip)',
          }}
        >
          <Img
            src={props.img}
            style={{
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: `scale(${zoom2})`,
            }}
          />
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
            ...titleSplit.style,
            position: 'absolute',
            left: '7%',
            top: '10%',
          }}
        >
          <TextCharsRandomOpacity text={titleSplit.text} color={colorVar('primaryText')} />
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
            x={WIDTH / 2.7}
            y={HEIGHT / 2}
            renderOrder="foreground"
            fillColor={colorVar('accent')}
            strokeColor={colorVar("#1997DD")}
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
            x={WIDTH * 0.8}
            y={HEIGHT * 0.85}
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
            beginRadius={180}
            endRadius={180}
            width={WIDTH}
            height={HEIGHT}
            x={840}
            y={260}
            clipId="scene-2-clip-1"
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar('accent')}
            beginRadius={0}
            endRadius={60}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.65}
            y={HEIGHT * 0.1}
            clipId="scene-2-clip-2"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar('secondary')}
            beginRadius={0}
            endRadius={40}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.9}
            y={HEIGHT * 0.75}
            clipId="scene-2-clip-3"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH}
            y={HEIGHT / 2}
            color={colorVar("#093399")}
            strokeWidth={40}
            radius={40}
            rotation={60}
          />
        </AbsoluteFill>
      </SweepComponent>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <clipPath id="clip">
          <circle cx={circleRadius * 1.3} cy={HEIGHT - circleRadius / 4} r={circleRadius} />
        </clipPath>
        <clipPath id="clip-2">
          <rect x="20%" width="100%" height="100%" fill="red" />
        </clipPath>
      </svg>
    </AbsoluteFill>
  );
};

export default Scene2;
