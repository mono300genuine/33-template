import { AbsoluteFill, Img } from 'remotion';
import { z } from 'zod';

import { colorVar } from '../../lib/helpers';
import { defineBackground } from '../define';

export const PaperBackground = defineBackground({
  type: 'paper',
  description: 'Background paper image and tint',
  schema: z.object({
    image: z.string(),
  }),
  component: ({ style, image }) => {
    return (
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img src={image} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        <AbsoluteFill style={{ backgroundColor: colorVar('background'), opacity: 0.3 }} />
      </AbsoluteFill>
    );
  },
});
