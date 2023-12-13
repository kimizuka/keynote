'use client';

import styled from 'styled-components';
import { useEffect, useRef } from 'react';

export function VideoSlide({
  content,
}: {
  content: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <Wrapper className="video-slide">
      <video ref={ videoRef } src={ content } />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  font-size: 80px;
  line-height: 1.5;
  cursor: none;
  background: black;

  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;