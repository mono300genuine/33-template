import { Composition, staticFile } from 'remotion';
import Main, { MainSchema } from './Composition/Composition';
import { Compare } from './Composition/Compare';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template"
        component={Main}
        schema={MainSchema}
        fps={30}
        width={1920}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),

          colors: {
            background: 'yellow',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#002892',
            secondary: '#333',
            secondaryText: '#333',
            accent: '#3664D1',
            accentText: '#f00',
          },
          background: {
            type: 'paper',
            image: staticFile('paper.jpg'),
          },
          fonts: {
            primary: 'Roboto',
            secondary: 'Abel',
          },
          transitionDuration: 15,
          scene1Duration: 115,
          scene1Props: {
            logo: staticFile('Logo.png'),
            voiceOver: staticFile('VO_1.mp3'),
          },
          scene2Duration: 115,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            img2: staticFile('Media_2.jpg'),
            title: 'Train Smarter,\nnot harder!',
            voiceOver: staticFile('VO_2.mp3'),
          },
          scene3Duration: 115,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_3.jpg'),
            title: 'Your Fitness,\nOur Focus!',
            voiceOver: staticFile('VO_3.mp3'),
          },
          scene4Duration: 115,
          scene4Props: {
            img: staticFile('Media_4.jpg'),
            title: 'One Goal:',
            subtitle: 'Your Success',
            voiceOver: staticFile('VO_4.mp3'),
          },
          scene5Duration: 115,
          scene5Props: {
            img: staticFile('Media_5.jpg'),
            title: 'Strength\nStamina\nResults',
            voiceOver: staticFile('VO_5.mp3'),
          },
          scene6Duration: 115,
          scene6Props: {
            img: staticFile('Media_6.jpg'),
            title: 'Transform Your Life',
            subtitle: '',
            voiceOver: staticFile('VO_6.mp3'),
          },
          scene7Duration: 115,
          scene7Props: {
            img: staticFile('Media_7.jpg'),
            title: 'Unleash',
            subtitle: 'Your Potential',
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene8Duration: 155,
          scene8Props: {
            logo: staticFile('Logo.png'),
            title: 'Your Fitness,\nOur Passion',
            phone: '505-882-5117',
            voiceOver: staticFile('VO_9.mp3'),
          },
        }}
      />
      <Composition
        id="Compare"
        component={Compare}
        schema={MainSchema}
        fps={30}
        width={1920 * 2}
        height={1080}
        durationInFrames={900}
        defaultProps={{
          audioVolume: 0.5,
          music: staticFile('music.mp3'),
          colors: {
            background: '#151515',
            backgroundText: '#FFFFFF',
            black: '#000000',
            white: '#FFFFFF',
            primary: '#f00',
            primaryText: '#FFFFFF',
            secondary: '#5118DB',
            secondaryText: '#f00',
            accent: '#FFFF08',
            accentText: '#f00',
          },
          background: {
            type: 'crosses',
            background: 'background',
            stroke: 'backgroundText',
          },
          fonts: {
            primary: 'Montserrat',
            secondary: 'Abel',
          },
          transitionDuration: 30,
          scene1Duration: 150,
          scene1Props: {
            logo: staticFile('Logo.png'),
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene2Duration: 180,
          scene2Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_1.jpg'),
            title: 'Hello world',
            img2: staticFile('Media_2.jpg'),
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene3Duration: 180,
          scene3Props: {
            logo: staticFile('Logo.png'),
            img: staticFile('Media_2.jpg'),
            title: 'Train Smarter,\nnot harder!',
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene4Duration: 180,
          scene4Props: {
            img: staticFile('Media_3.jpg'),
            title: 'Your Fitness,\nOur Focus!',
            subtitle: 'One Goal:',
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene5Duration: 180,
          scene5Props: {
            title: staticFile('Logo.png'),
            img: staticFile('Media_4.jpg'),
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene6Duration: 180,
          scene6Props: {
            subtitle: 'Your Potential',
            title: 'Unleash',
            img: staticFile('Media_7.jpg'),
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene7Duration: 180,
          scene7Props: {
            img: staticFile('Media_7.jpg'),
            title: 'Unleash',
            subtitle: 'Your Potential',
            voiceOver: staticFile('VO_7.mp3'),
          },
          scene8Duration: 180,
          scene8Props: {
            logo: staticFile('Logo.png'),
            title: 'Your Fitness,\nOur Passion',
            phone: '505-882-5117',
            voiceOver: staticFile('VO_7.mp3'),
          },
        }}
      />
    </>
  );
};
