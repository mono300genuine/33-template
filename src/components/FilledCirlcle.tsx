import { useCurrentFrame, useVideoConfig } from 'remotion';
import { defaultSpring } from '../lib/helpers';

interface Props {
  width: number;
  height: number;
  color: string;
  beginRadius: number;
  endRadius: number;
  x: number;
  y: number;
}

const FilledCircle: React.FunctionComponent<Props> = ({
  width, // Width of the parent container
  height, // Height of the parent container
  color,
  beginRadius,
  endRadius,
  x, // X position for the circle
  y, // Y position for the circle
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentRadius = defaultSpring({
    frame,
    from: beginRadius,
    to: endRadius,
    durationInFrames: fps * 2,
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <circle
        cx={x} // Center the circle horizontally based on x
        cy={y} // Center the circle vertically based on y
        r={currentRadius}
        fill={color}
      />
    </svg>
  );
};

export default FilledCircle;
