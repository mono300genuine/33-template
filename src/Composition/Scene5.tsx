import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { z } from 'zod';
import { Background } from '../components/Background';
import { BackgroundProps } from '../backgrounds';
import { HEIGHT, WIDTH } from '../lib/consts';
import { colorVar, defaultSpring, interpolateClamp } from '../lib/helpers';
import RectWithSideLines from '../components/RectWithSideLines';
import { useTextSplitter } from '../lib/useTextSplitter';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import SweepComponent from '../components/SweepComponent';
import OverlappingSquares from '../components/OverlappingSquares';
import CircleGrid from '../components/CircleGrid';

export const scene5Schema = z.object({
  img: z.string(),
  title: z.string(),
  voiceOver: z.string(),
});

type Scene5Props = z.infer<typeof scene5Schema> & { background: BackgroundProps };

const Scene5: React.FC<Scene5Props> = (props) => {
  const titleText = useTextSplitter({
    text: props.title,
    fontSize: 100,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 4,
    maxWidth: 700,
  });

  const radius = 80;
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = interpolateClamp(
    frame,
    [0, Math.floor(durationInFrames * 0.9)],
    [strokeDasharray, 0]
  );
  const x = WIDTH;
  const y = HEIGHT / 2;
  const rotation = -60;

  const x1 = WIDTH * 0.8;
  const y1 = HEIGHT * 0.2;
  const currentRadius = defaultSpring({
    frame,
    from: 400,
    to: 500,
    durationInFrames: fps * 2,
  });

  const zoom = interpolateClamp(frame, [0, durationInFrames], [1, 1.1]);
  const slideRight = interpolateClamp(frame, [0, durationInFrames], [-300, -220]);

  return (
    <AbsoluteFill>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <defs>
              <clipPath id="scene-5-clip">
                <rect x="18%" y="0%" width="58%" height="100%" id="scene-5-clip-shape" />
              </clipPath>
              <filter id="f1" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              </filter>
            </defs>
            <circle cx={x1} cy={y1} r={currentRadius} fill={colorVar("#02f3ff")} />

            <g transform={`translate(${slideRight}, 30) scale(${zoom * 0.95})`}>
              <rect x="21%" y="-3%" width="58%" height="100%" opacity={0.3} filter="url(#f1)" />

              <g clipPath="url(#scene-5-clip)">
                <image
                  href={props.img}
                  x="0%"
                  width="100%"
                  height="100%"
                  filter="url(#image-shadow)" // Apply the shadow filter
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            </g>

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
          <OverlappingSquares
            size={50}
            overlapFactor={0.7}
            position="top-right"
            fraction={0.8}
            strokeWidth={5}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.85}
            y={HEIGHT * 0.4}
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
            x={WIDTH * 0.55}
            y={HEIGHT * 0.8}
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
            endRadius={140}
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.8}
            y={HEIGHT * 0.25}
            clipId="scene-5-clip-3"
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
            x={WIDTH * 0.6}
            y={HEIGHT * 0.55}
            clipId="scene-5-clip-4"
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
            ...titleText.style,
            position: 'absolute',
            left: '70%',
            top: '60%',
          }}
        >
          <TextCharsRandomOpacity text={titleText.text} color={colorVar('primaryText')} />
        </div>
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene5;
