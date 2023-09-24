import { Circles } from 'react-loader-spinner';
import { LoaderStyle } from './Loader.styled';
import { useImageContext } from '../Context/Context';

export const Loader = () => {
  const { isLoading } = useImageContext();
  return (
    isLoading && (
      <LoaderStyle>
        <Circles
          type="Circles"
          color="#4fa94d"
          height={100}
          width={100}
          ariaLabel="circles-loading"
        />
      </LoaderStyle>
    )
  );
};
