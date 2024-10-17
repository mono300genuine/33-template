import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  spring,
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

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});
type Scene3Props = z.infer<typeof scene3Schema> & { background: BackgroundProps };

const Scene3: React.FC<Scene3Props> = (props) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const titleSplit = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 700,
  });

  const cx = width / 6;
  const cy = height / 3;
  const rx = width / 4;
  const ry = height / 2;

  const radius = 40;
  const frame = useCurrentFrame();
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
  const x = width * 0.55;
  const y = height;
  const rotation = 60;

  const x1 = width * 0.95;
  const y1 = height / 3.5;
  const currentRadius = defaultSpring({
    frame,
    from: 100,
    to: 200,
    durationInFrames: fps * 2,
  });

  // Add this new constant for the zoom effect
  const zoomScale = spring({
    frame,
    fps,
    from: 1.5,
    to: 1,
    durationInFrames: fps * 3, // 3 seconds duration
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Calculate the scaled dimensions and offsets
  const scaledWidth = width * zoomScale;
  const scaledHeight = height * zoomScale;
  const offsetX = (scaledWidth - width) / 2;
  const offsetY = (scaledHeight - height) / 2;

  return (
    <AbsoluteFill>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <clipPath id="scene-3-clip">
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  transform={`rotate(${-30}, ${cx}, ${cy})`}
                />
              </clipPath>
            </defs>

            <circle cx={width * 0.2} cy={height * 0.43} r={460} fill={'#31b3fe'} />
            <image
              href={props.img}
              x={cx - width / 2 - offsetX}
              y={cy - height / 2 - offsetY}
              width={scaledWidth}
              height={scaledHeight}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#scene-3-clip)"
            />

            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="none"
              stroke={'#093399'}
              width={width}
              height={height}
              x={width}
              y={height / 2}
              color="#093399"
              strokeWidth={40}
              radius={40}
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
            width={width}
            height={height}
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
            left: '55%',
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
            width={width}
            height={height}
            x={width / 2}
            y={height / 2}
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
            width={width}
            height={height}
            x={width * 0.85}
            y={height * 0.8}
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
            endRadius={40}
            width={width}
            height={height}
            x={width * 0.45}
            y={height * 0.7}
            clipId="scene-2-clip-2"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar('accent')}
            beginRadius={0}
            endRadius={60}
            width={width}
            height={height}
            x={width * 0.9}
            y={height * 0.55}
            clipId="scene-2-clip-3"
          />
        </AbsoluteFill>
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene3;
