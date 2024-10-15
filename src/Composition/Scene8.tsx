import { AbsoluteFill, Img } from 'remotion';
import { z } from 'zod';
import Circle from '../components/Circle';
import { BackgroundProps } from '../backgrounds';
import { Background } from '../components/Background';
import { HEIGHT, WIDTH } from '../lib/consts';
import { colorVar } from '../lib/helpers';

export const scene8Schema = z.object({
  logo: z.string(),
});

type Scene6Props = z.infer<typeof scene8Schema> & { background: BackgroundProps };

const Scene8: React.FC<Scene6Props> = (props) => {
  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Background {...props.background} />
      <div
        style={{
          position: 'relative',
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Img src={props.logo} width={500} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Circle radius={200} strokeColor={colorVar('secondary')} strokeWidth={40} />
        </div>
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          <Circle radius={200} strokeColor={colorVar('secondary')} strokeWidth={40} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Scene8;
