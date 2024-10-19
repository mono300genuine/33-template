import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { colorVar, interpolateClamp } from '../lib/helpers';
import CircleGrid from '../components/CircleGrid';
import OverlappingSquares from '../components/OverlappingSquares';
import RectWithSideLines from '../components/RectWithSideLines';
import SweepComponent from '../components/SweepComponent';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import { useTextSplitter } from '../lib/useTextSplitter';
import { WIDTH, HEIGHT } from '../lib/consts';

export const scene7Schema = z.object({
  img: z.string(),
  title: z.string(),
  subtitle: z.string(),
  voiceOver: z.string(),
});

type Scene7Props = z.infer<typeof scene7Schema> & {
  background: BackgroundProps;
};

const Scene7: React.FC<Scene7Props> = (props) => {
  const { width, height, durationInFrames } = useVideoConfig();
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

  const cx = width / 2;
  const cy = height;

  const radius = 80;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = interpolateClamp(
    frame,
    [0, Math.floor(durationInFrames * 0.9)],
    [strokeDasharray, 0]
  );
  const x = WIDTH * 0.75;
  const y = 0;
  const rotation = -60;

  const zoomScale = interpolateClamp(frame, [0, durationInFrames], [1.15, 1]);

  return (
    <AbsoluteFill>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <defs>
              <clipPath id="circleClip">
                <circle cx={cx} cy={cy} r={600} />
              </clipPath>
            </defs>
            <circle cx={cx * 0.9} cy={cy} r={580} fill={colorVar('#31b3fe')} />

            <image
              href={props.img}
              x={cx - (WIDTH * zoomScale) / 2}
              y={cy - (HEIGHT * zoomScale) / 1.5}
              width={WIDTH * zoomScale}
              height={HEIGHT * zoomScale}
              preserveAspectRatio="xMidYMid slice"
              clip-path="url(#circleClip)"
            />

            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="none"
              stroke={colorVar('#093399')}
              width={WIDTH}
              height={HEIGHT}
              color={colorVar("#093399")}
              strokeWidth={60}
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
            x={WIDTH * 0.06}
            y={HEIGHT * 0.7}
            renderOrder="foreground"
            fillColor={colorVar('accent')}
            strokeColor={colorVar("#1997DD")}
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
            clipId="scene-7-clip-2"
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
            clipId="scene-7-clip-3"
          />
        </AbsoluteFill>
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene7;
