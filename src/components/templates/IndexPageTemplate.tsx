'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SlideType, slideList } from '@/scripts/slideList';
import { TextSlide } from '@/components/elements/TextSlide';
import { ImageSlide } from '@/components/elements/ImageSlide';
import { VideoSlide } from '@/components/elements/VideoSlide';

export function IndexPageTemplate() {
  const pageIndexRef = useRef(0);
  const [ pageIndex, setPageIndex ] = useState(pageIndexRef.current);
  const [ slides, setSlides ] = useState<JSX.Element[]>([]);

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
    <Wrapper className="index-page-template">
      <ol>
        { slides[pageIndex] }
      </ol>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw; height: 100vh;
  font-size: 80px;
  line-height: 1.5;
  cursor: none;
`;
