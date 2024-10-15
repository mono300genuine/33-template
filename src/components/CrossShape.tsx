interface Props {
  size: number;
  color: string;
  x: number;
  y: number;
  strokeWidth: number;
  opacity: number;
}
const CrossShape: React.FunctionComponent<Props> = ({
  size = 100,
  color = 'black',
  x,
  y,
  strokeWidth,
  opacity,
}) => {
  const lineLength = size * 0.8; // Lines are 80% of the total size
  const center = size / 2;
  const lineStart = (size - lineLength) / 2;
  const lineEnd = lineStart + lineLength;

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      {/* Vertical line */}
      <line
        x1={center}
        y1={lineStart}
        x2={center}
        y2={lineEnd}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Horizontal line */}
      <line
        x1={lineStart}
        y1={center}
        x2={lineEnd}
        y2={center}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

export default CrossShape;
