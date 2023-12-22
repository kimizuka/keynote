'use client';

import styled, { keyframes } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SlideType, slideList } from '@/scripts/slideList';
import { TextSlide } from '@/components/elements/TextSlide';
import { ImageSlide } from '@/components/elements/ImageSlide';
import { VideoSlide } from '@/components/elements/VideoSlide';
import { Joycon } from '@/components/elements/Joycon';

export function IndexPageTemplate() {
  const timerRef = useRef<number>(-1);
  const pageIndexRef = useRef(0);
  const [ pageIndex, setPageIndex ] = useState(pageIndexRef.current);
  const [ slides, setSlides ] = useState<JSX.Element[]>([]);
  const [ isShake, setIsShake ] = useState(false);

  const handleKeyDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'ArrowLeft') {
      pageIndexRef.current = Math.max(pageIndex - 1, 0);
    } else if (evt.key === 'ArrowRight') {
      pageIndexRef.current = Math.min(pageIndex + 1, slideList.length - 1);
    }

    setPageIndex(pageIndexRef.current);
  }, [pageIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleClickBtnLeft = useCallback(() => {
    pageIndexRef.current = Math.max(pageIndex - 1, 0);
    setPageIndex(pageIndexRef.current);
  }, [pageIndex]);

  const handleClickBtnRight = useCallback(() => {
    pageIndexRef.current = Math.min(pageIndex + 1, slideList.length - 1);
    setPageIndex(pageIndexRef.current);
  }, [pageIndex]);

  const handleMoveJoyCon = useCallback(() => {
    window.clearTimeout(timerRef.current);
    window.setTimeout(() => {
      setIsShake(false);
    }, 1000);
    setIsShake(true);
  }, []);

  useEffect(() => {
    setSlides(slideList.map((slide, i) => (
      <li key={ i }>
        {(() => {
          switch (slide.type) {
            case SlideType.text:
              return (
                <TextSlide
                  content={ slide.content }
                  textAlign={ slide.textAlign }
                />
              );
            case SlideType.image:
              return (
                <ImageSlide content={ slide.content } />
              );
            case SlideType.video:
              return (
                <VideoSlide content={ slide.content } />
              );
          }
        })()}
      </li>
    )));
  }, []);

  return (
    <Wrapper
      data-is-shake={ isShake }
      className="index-page-template"
    >
      <ol>
        { slides[pageIndex] }
      </ol>
      <Joycon
        onMoveL={ handleMoveJoyCon }
        onClickLeft={ handleClickBtnLeft }
        onClickRight={ handleClickBtnRight } 
      />
    </Wrapper>
  );
}

const shake = keyframes`
  0% {
    margin: 0 0;
  }

  25% {
    margin: -16px 16px;
  }

  50% {
    margin: 16px -16px;
  }

  75% {
    margin: -16px 16px;
  }

  100% {
    margin: 0 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw; height: 100vh;
  font-size: 80px;
  line-height: 1.5;
  cursor: none;

  &[data-is-shake='true'] {
    animation: ${ shake } .1s linear infinite;
  }
`;
