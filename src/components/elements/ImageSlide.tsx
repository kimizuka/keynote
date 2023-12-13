'use client';

import styled from 'styled-components';

export function ImageSlide({
  content,
}: {
  content: string;
}) {
  return (
    <Wrapper className="image-slide">
      <img src={ content } />
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

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;