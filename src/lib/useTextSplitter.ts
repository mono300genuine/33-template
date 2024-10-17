import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { continueRender, delayRender, useVideoConfig } from 'remotion';

import { useIsFontLoaded } from './LoadFonts';
import { Font } from '../types';
import { fontVar } from './helpers';

const DEBUG = false;

const createElement = (style: CSSProperties) => {
  const element = document.createElement('div');
  Object.assign(element.style, style);
  return element;
};

const findMaxFontSize = ({
  style,
  initialFontSize,
  maxLines,
  maxWidth,
  text,
  template,
}: {
  style: CSSProperties;
  initialFontSize: number;
  maxLines: number;
  maxWidth: number;
  text: string;
  template: Element;
}) => {
  const element = createElement(style);
  if (!text) return initialFontSize;

  element.textContent = text.replaceAll('-', '\u2011');
  template.appendChild(element);

  let fontSize = initialFontSize;
  const maxHeight = maxLines * initialFontSize;
  while (element.clientHeight > maxHeight || element.scrollWidth > maxWidth) {
    fontSize = Math.floor(fontSize * 0.95);
    element.style.fontSize = `${fontSize}px`;
  }
  template.removeChild(element);
  return fontSize;
};

const splitTextIntoLines = ({
  inputText,
  fontSize,
  style,
  template,
}: {
  inputText: string;
  fontSize: number;
  style: CSSProperties;
  template: Element;
}) => {
  if (!inputText) return '';
  const element = createElement(style);
  element.style.fontSize = `${fontSize}px`;
  template.appendChild(element);
  const words = inputText.replaceAll('\n', ' ').split(' ').filter(Boolean);
  let previousWords: string[] = [];
  const wordLines: string[][] = [];
  for (const word of words) {
    // Adding all the previous words + this word into line
    element.textContent = [...previousWords, word].join(' ');

    // If the height is bigger than fontSize then it is more than 1 line, so we push the previousWords as a new line.
    if (element.clientHeight > fontSize) {
      wordLines.push(previousWords);
      previousWords = [];
    }
    previousWords.push(word);
  }
  wordLines.push(previousWords);
  template.removeChild(element);

  return wordLines.map((l) => l.join(' ')).join('\n');
};

export const useTextSplitter = ({
  font = 'primary',
  ...props
}: {
  text: string;
  maxLines: number;
  font?: Font;
  fontWeight: string | undefined;
  maxWidth: number;
  fontSize: number;
  letterSpacing?: string;
}) => {
  const [handle] = useState(() => delayRender());
  const isFontLoaded = useIsFontLoaded(font);
  const key = useMemo(() => JSON.stringify(props), [props]);
  const [result, setResult] = useState<{ fontSize: number; text: string }>();
  // const context = useVideoContext()
  const { id } = useVideoConfig();
  useEffect(() => {
    // console.log(document.querySelectorAll("div"), "docu all ");
    if (!isFontLoaded) return;
    const template = document.querySelector(`#${id}`)!;
    console.log(template, 'template');

    const style: CSSProperties = {
      position: 'absolute',
      lineHeight: '1',
      opacity: '0',
      fontFamily: fontVar(font),
      width: `${props.maxWidth}px`,
      fontSize: `${props.fontSize}px`,
      fontWeight: props.fontWeight || undefined,
      letterSpacing: props.letterSpacing || undefined,
    };
    const fontSize = findMaxFontSize({
      initialFontSize: props.fontSize,
      style,
      template,
      maxLines: props.maxLines,
      maxWidth: props.maxWidth,
      text: props.text,
    });

    const text = splitTextIntoLines({ inputText: props.text, fontSize, style, template });

    if (DEBUG) console.log({ key, text, fontSize });
    setResult({ fontSize, text });
    continueRender(handle);
  }, [...Object.values(props), isFontLoaded]);

  return {
    text: result?.text || '',
    style: {
      minWidth: props.maxWidth,
      fontFamily: fontVar(font),
      fontWeight: props.fontWeight,
      fontSize: result?.fontSize || 0,
      outline: DEBUG ? 'red 1px solid' : undefined,
    },
  };
};
