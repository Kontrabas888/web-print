import { useState, useEffect } from 'react';

const useImageLogic = () => {
  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : Array.from({ length: 6 }, () => ({ src: null, showBorders: true }));
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [numberOfRectangles, setNumberOfRectangles] = useState(4);

  const handleToggleBorders = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      if (activeIndex !== null) {
        newImages[activeIndex].showBorders = !newImages[activeIndex].showBorders;

        if (!newImages[activeIndex].showBorders) {
          document.body.classList.add('hide-borders');
        } else {
          document.body.classList.remove('hide-borders');
        }
      }

      return newImages;
    });
  };

    const handleAddImage = (imageSrc) => {
    setImages(prevImages => [...prevImages, { src: imageSrc, showBorders: true }]);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index].src = reader.result;
          return newImages;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[activeIndex].src = null;
      return newImages;
    });
  };

  const handleSetActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const setImagesFunction = (newImages) => {
    setImages(newImages);
  };

  const handleSetNumberOfRectangles = (num) => {
    setNumberOfRectangles(num);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('images');
    setImages(Array.from({ length: numberOfRectangles }, () => ({ src: null, showBorders: true })));
    setActiveIndex(null);

    const inputElements = document.querySelectorAll('.input-img-button');
    inputElements.forEach((input) => {
      input.value = null;
    });

    localStorage.clear();
  };

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    const storedImages = localStorage.getItem('images');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
  setImages(Array.from({ length: numberOfRectangles }, () => ({ src: null, showBorders: true })));
  }, [numberOfRectangles]);

 return {
    images,
    activeIndex,
    handleToggleBorders,
    handleFileChange,
    handleRemoveImage,
    handleSetActiveIndex,
    setImages: setImagesFunction,
    handleSetNumberOfRectangles,
    numberOfRectangles,
   handleClearLocalStorage,
    handleAddImage
  };
};

export default useImageLogic;
