import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import RectWithSideLines from '../components/RectWithSideLines';
import CircleGrid from '../components/CircleGrid';
import CircleOutline from '../components/CircleOutline';
import AnimatedOutlinedCircle from '../components/AnimatedOutlineCircle';
import SweepComponent from '../components/SweepComponent';
import { colorVar, defaultSpring } from '../lib/helpers';
import { Background } from '../components/Background';
import { TextCharsRandomOpacity } from '../components/animations/TextCharsRandomOpacity';
import { useTextSplitter } from '../lib/useTextSplitter';
import { HEIGHT, WIDTH } from '../lib/consts';

export const scene8Schema = z.object({
  title: z.string(),
  logo: z.string(),
  phone: z.string(),
  voiceOver: z.string(),
});
type Scene8Props = z.infer<typeof scene8Schema> & { background: BackgroundProps };

const Scene8: React.FC<Scene8Props> = (props) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const titleText = useTextSplitter({
    text: props.title,
    fontSize: 50,
    fontWeight: '800',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: WIDTH * 0.75,
  });

  const phoneText = useTextSplitter({
    text: props.phone,
    fontSize: 40,
    fontWeight: '300',
    letterSpacing: '6px',
    maxLines: 1,
    maxWidth: 300,
  });

  const x1 = WIDTH / 2;
  const y1 = HEIGHT / 2;
  const currentRadius = defaultSpring({
    frame,
    from: 200,
    to: 400,
    durationInFrames: fps * 2,
  });
  return (
    <AbsoluteFill>
      <Audio src={props.voiceOver} />

      <SweepComponent>
        <Background {...props.background} />
        <AbsoluteFill>
          <CircleOutline
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH / 2}
            y={HEIGHT / 2}
            beginRadius={20}
            endRadius={430}
            color="black"
            strokeWidth={1}
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
            <circle cx={x1} cy={y1} r={currentRadius} fill="#02f3ff" />
          </svg>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img src={props.logo} />
          <div
            style={{
              ...titleText.style,
              textAlign: 'center',
            }}
          >
            <TextCharsRandomOpacity text={titleText.text} color={colorVar('primaryText')} />
            <div
              style={{
                ...phoneText.style,
                marginTop: 50,
              }}
            >
              <TextCharsRandomOpacity text={phoneText.text} color={colorVar('secondaryText')} />
            </div>
          </div>
        </AbsoluteFill>

        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color="#0A2F81"
            beginRadius={0}
            endRadius={40}
            width={WIDTH}
            height={HEIGHT}
            x={240}
            y={HEIGHT / 2}
            clipId="scene-1-clip-1"
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
            x={1680}
            y={HEIGHT / 2}
            clipId="scene-1-clip-2"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color="#0A2F81"
            beginRadius={0}
            endRadius={120}
            width={WIDTH}
            height={HEIGHT}
            x={260}
            y={260}
            clipId="scene-1-clip-3"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH * 0.8}
            y={HEIGHT}
            color="#093399"
            strokeWidth={150}
            radius={130}
            rotation={80}
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={WIDTH}
            height={HEIGHT}
            x={WIDTH / 5}
            y={0}
            color="#093399"
            strokeWidth={40}
            radius={30}
            rotation={-120}
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
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene8;
