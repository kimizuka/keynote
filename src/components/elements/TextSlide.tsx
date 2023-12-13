'use client';

import styled from 'styled-components';

export function TextSlide({
  content,
  textAlign = 'left',
}: {
  content: string;
  textAlign?: 'left' | 'center' | 'right';
}) {
  return (
    <Wrapper className="text-slide" style={{ textAlign }}>{ content }</Wrapper>
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
  white-space: pre-wrap;
  cursor: none;
`;