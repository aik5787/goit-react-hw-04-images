import React, { useContext, useState } from 'react';
import Notiflix from 'notiflix';
import { searchImages } from '../Api/Api';

const ImageContext = React.createContext();

export const useImageContext = () => {
  return useContext(ImageContext);
};

export function Context({ children }) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRenderButton, setShouldRenderButton] = useState(false);
  const perPage = 12;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  // Change inpute Function

  const handleChange = e => {
    setQuery(e.target.value);
  };

  // Submit and request

  const onSubmit = async e => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    try {
      setIsLoading(true);
      setShouldRenderButton(false);
      setImages([]);
      setCurrentPage(1);
      setSelectedImage({});

      const data = await searchImages(trimmedQuery, currentPage);
      const images = data.hits;
      if (images.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const shouldRenderButton = images.length < data.totalHits;
      setImages(images);
      setShouldRenderButton(shouldRenderButton);

      if (data.totalHits <= perPage) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // LoadMoreImages

  const loadMoreImages = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const data = await searchImages(query, nextPage);
      const newImages = data.hits;
      const shouldRenderButton =
        data.totalHits > currentPage * perPage + newImages.length;

      if (!shouldRenderButton) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      setImages([...images, ...newImages]);
      setCurrentPage(nextPage);
      setShouldRenderButton(shouldRenderButton);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Opening Modal

  const openModal = image => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  // Closing Modal

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage({});
  };

  // Closing Modal with Escape

  const handleKeyDown = e => {
    if (e.code === 'Escape' && isModalOpen) {
      closeModal();
    }
  };

  return (
    <ImageContext.Provider
      value={{
        query: query,
        images: images,
        currentPage: currentPage,
        shouldRenderButton: shouldRenderButton,
        isLoading: isLoading,
        isModalOpen: isModalOpen,
        selectedImage: selectedImage,
        handleChange: handleChange,
        onSubmit: onSubmit,
        loadMoreImages: loadMoreImages,
        openModal: openModal,
        closeModal: closeModal,
        handleKeyDown: handleKeyDown,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
