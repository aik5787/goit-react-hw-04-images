import { useImageContext } from '../Context/Context';

import { ButtonStyle } from './Button.styled';

export const Button = () => {
  const { loadMoreImages, shouldRenderButton, isLoading } = useImageContext();
  return (
    shouldRenderButton &&
    !isLoading && (
      <ButtonStyle type="button" onClick={loadMoreImages}>
        Load more
      </ButtonStyle>
    )
  );
};
