import { useImageContext } from '../Context/Context';
import {
  ImageGalleryItemStyle,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = () => {
  const { images, openModal } = useImageContext();
  return images.map(image => (
    <ImageGalleryItemStyle key={image.id}>
      <ImageGalleryItemImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => openModal(image)}
      />
    </ImageGalleryItemStyle>
  ));
};

// import PropTypes from 'prop-types';
// import {
//   ImageGalleryItemStyle,
//   ImageGalleryItemImage,
// } from './ImageGalleryItem.styled';

// export const ImageGalleryItem = ({ images, openModal }) => {
//   return images.map(image => (
//     <ImageGalleryItemStyle key={image.id}>
//       <ImageGalleryItemImage
//         src={image.webformatURL}
//         alt={image.tags}
//         onClick={() => openModal(image)}
//       />
//     </ImageGalleryItemStyle>
//   ));
// };

// ImageGalleryItem.propTypes = {
//   images: PropTypes.array.isRequired,
//   openModal: PropTypes.func.isRequired,
// };
