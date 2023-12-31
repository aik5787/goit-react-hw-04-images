import styled from 'styled-components';

export const ImageGalleryStyle = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 20px 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
