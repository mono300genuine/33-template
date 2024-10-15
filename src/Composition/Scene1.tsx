import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { BackgroundProps } from '../backgrounds';
import RectWithSideLines from '../components/RectWithSideLines';
import CircleGrid from '../components/CircleGrid';
import CircleOutline from '../components/CircleOutline';
import AnimatedOutlinedCircle from '../components/AnimatedOutlineCircle';
import SweepComponent from '../components/SweepComponent';
import { colorVar, defaultSpring } from '../lib/helpers';

export const scene1Schema = z.object({
  logo: z.string(),
  image: z.string(),
});
type Scene1Props = z.infer<typeof scene1Schema> & { background: BackgroundProps };

const Scene1: React.FC<Scene1Props> = (props) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <SweepComponent>
        <Img
          src={props.image}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <AbsoluteFill style={{ backgroundColor: 'yellow', opacity: 0.3 }} />

        <AbsoluteFill>
          <CircleOutline
            width={width}
            height={height}
            x={width / 2}
            y={height / 2}
            beginRadius={20}
            endRadius={430}
            color="black"
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
              width: '900px',
              height: '900px',
              objectFit: 'contain',
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <CircleGrid
            gap={20}
            strokeWidth={2}
            color="#0A2F81"
            beginRadius={0}
            endRadius={40}
            width={width}
            height={height}
            x={240}
            y={height / 2}
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
            width={width}
            height={height}
            x={1680}
            y={height / 2}
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
            width={width}
            height={height}
            x={260}
            y={260}
            clipId="scene-1-clip-3"
          />
        </AbsoluteFill>
        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={width}
            height={height}
            x={280}
            y={height}
            color="#093399"
            strokeWidth={70}
            radius={130}
            rotation={30}
          />
        </AbsoluteFill>

        <AbsoluteFill>
          <AnimatedOutlinedCircle
            width={width}
            height={height}
            x={1680}
            y={0}
            color="#093399"
            strokeWidth={40}
            radius={40}
            rotation={-120}
          />
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
      </SweepComponent>
    </AbsoluteFill>
  );
};

export default Scene1;
