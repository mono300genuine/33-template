import { TransitionPresentation } from '@remotion/transitions';
import { useMemo, CSSProperties } from 'react';
import { AbsoluteFill } from 'remotion';

const epsilon = 0.01;

type SlideProps = {
  direction?: 'from-left' | 'from-right' | 'from-top' | 'from-bottom';
  enterStyle?: CSSProperties;
  exitStyle?: CSSProperties;
};

interface SlidePresentationProps {
  children: React.ReactNode;
  presentationProgress: number;
  presentationDirection: 'entering' | 'exiting';
  passedProps: SlideProps;
}

const SlidePresentation: React.FC<SlidePresentationProps> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps: { direction = 'from-left', enterStyle, exitStyle },
}) => {
  const directionStyle = useMemo(() => {
    // Overlay the two slides barely to avoid a white line between them
    // Remove the correction once the presentation progress is 1
    const presentationProgressWithEpsilonCorrection =
      presentationProgress === 1
        ? presentationProgress * 100
        : presentationProgress * 100 - epsilon;

    if (presentationDirection === 'exiting') {
      switch (direction) {
        case 'from-left':
          return {
            transform: `translateX(${presentationProgressWithEpsilonCorrection}%)`,
          };
        case 'from-right':
          return {
            transform: `translateX(${-presentationProgress * 100}%)`,
          };
        case 'from-top':
          return {
            transform: `translateY(${presentationProgressWithEpsilonCorrection}%) `,
          };
        case 'from-bottom':
          return {
            transform: `translateY(${-presentationProgress * 100}%)`,
          };
        default:
          throw new Error(`Invalid direction: ${direction}`);
      }
    }

    switch (direction) {
      case 'from-left':
        return {
          transform: `translateX(${-100 + presentationProgress * 100}%)`,
        };
      case 'from-right':
        return {
          transform: `translateX(${100 - presentationProgressWithEpsilonCorrection}%)`,
        };
      case 'from-top':
        return {
          transform: `translateY(${-100 + presentationProgress * 100}%)`,
        };
      case 'from-bottom':
        return {
          transform: `translateY(${100 - presentationProgressWithEpsilonCorrection}%)`,
        };
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }, [presentationDirection, presentationProgress, direction]);

  const style: CSSProperties = useMemo(() => {
    return {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      ...directionStyle,
      ...(presentationDirection === 'entering' ? enterStyle : exitStyle),
    };
  }, [directionStyle, enterStyle, exitStyle, presentationDirection]);

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const WideSlidePresentation = (props?: SlideProps): TransitionPresentation<SlideProps> => {
  return {
    component: SlidePresentation,
    props: props ?? {},
  };
};
