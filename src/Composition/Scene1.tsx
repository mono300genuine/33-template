import { AbsoluteFill, Img, Audio, Sequence } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import RectWithSideLines from '../components/RectWithSideLines';
import CircleGrid from '../components/CircleGrid';
import CircleOutline from '../components/CircleOutline';
import AnimatedOutlinedCircle from '../components/AnimatedOutlineCircle';
import SweepComponent from '../components/SweepComponent';
import { colorVar } from '../lib/helpers';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';

export const scene1Schema = z.object({
  logo: z.string(),
  voiceOver: z.string(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Sequence from={10}>
        <Audio src={props.voiceOver} />
      </Sequence>

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
            color={colorVar('black')}
            strokeWidth={1}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Img
            src={props.logo}
            style={{
              width: '500px',
              height: '500px',
              objectFit: 'contain',
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color={colorVar("#0A2F81")}
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
            color={colorVar("#0A2F81")}
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
            x={280}
            y={HEIGHT}
            color={colorVar("#093399")}
            strokeWidth={70}
            radius={130}
            rotation={30}
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={WIDTH}
            height={HEIGHT}
            x={1680}
            y={0}
            color={colorVar("#093399")}
            strokeWidth={40}
            radius={40}
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

export default Scene1;
