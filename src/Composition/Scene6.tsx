import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';
import { BackgroundProps } from '../backgrounds';
import { colorVar, defaultSpring } from '../lib/helpers';
import CircleGrid from '../components/CircleGrid';
import OverlappingSquares from '../components/OverlappingSquares';
import RectWithSideLines from '../components/RectWithSideLines';
import SweepComponent from '../components/SweepComponent';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import { useTextSplitter } from '../lib/useTextSplitter';

export const scene6Schema = z.object({
  img: z.string(),
  title: z.string(),
  subtitle: z.string(),
  voiceOver: z.string(),
});

type Scene6Props = z.infer<typeof scene6Schema> & {
  background: BackgroundProps;
};

const Scene6: React.FC<Scene6Props> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const titleText = useTextSplitter({
    text: props.title,
    fontSize: 80,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: WIDTH * 0.6,
  });

  const cx = WIDTH / 4;
  const cy = HEIGHT;

  const radius = 40;
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
  const x = WIDTH;
  const y = HEIGHT / 2;
  const rotation = -30;

  const x1 = WIDTH * 1.05;
  const y1 = HEIGHT * 0.1;
  const currentRadius = defaultSpring({
    frame,
    from: 200,
    to: 300,
    durationInFrames: fps * 2,
  });

  const zoomScale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <defs>
              <clipPath id="scene-6-clip">
                <rect y="0" x="0" width="100%" height="60%" id="scene-6-clip-shape" />
              </clipPath>
            </defs>
            <circle cx={cx * 0.9} cy={cy} r={540} fill={colorVar('#31b3fe')} />

            <image
              href={props.img}
              x={(WIDTH * (1 - zoomScale)) / 2}
              y={(HEIGHT * 0.6 * (1 - zoomScale)) / 2}
              width={WIDTH * zoomScale}
              height={HEIGHT * zoomScale}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#scene-6-clip)"
            />
            <circle cx={x1} cy={y1} r={currentRadius} fill="#02f3ff" />

            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="none"
              stroke={colorVar('#093399')}
              width={WIDTH}
              height={HEIGHT}
              color={colorVar("#093399")}
              strokeWidth={40}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="square"
              transform={`rotate(${rotation} ${x} ${y})`}
            />
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
            left: '50%',
            top: '70%',
          }}
        >
          <TextCharsRandomOpacity text={titleText.text} color={colorVar('primaryText')} />
        </div>
        <AbsoluteFill>
          <OverlappingSquares
            size={50}
            overlapFactor={0.7}
            position="bottom-left"
            fraction={0.8}
            strokeWidth={5}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.91}
            y={HEIGHT * 0.62}
            renderOrder="foreground"
            fillColor={colorVar('accent')}
            strokeColor={colorVar("#1997DD")}
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <OverlappingSquares
            size={50}
            overlapFactor={0.7}
            position="top-right"
            fraction={0.8}
            strokeWidth={5}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.35}
            y={HEIGHT * 0.75}
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
            endRadius={50}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.4}
            y={HEIGHT * 0.6}
            clipId="scene-6-clip-2"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar('accent')}
            beginRadius={0}
            endRadius={70}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.75}
            y={HEIGHT * 0.2}
            clipId="scene-6-clip-3"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar('secondary')}
            beginRadius={0}
            endRadius={120}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.3}
            y={HEIGHT * 0.3}
            clipId="scene-6-clip-1"
          />
        </AbsoluteFill>
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene6;
