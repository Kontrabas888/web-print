import React, { useState } from 'react';
import DraggableImage from './DraggableImage';
import useImageLogic from './useImageLogic';
import './App.css';

const ShapePage = () => {
  const [shape, setShape] = useState('rectangle');
  const [size, setSize] = useState(100);
  const {
    images,
    activeIndex,
    handleSetActiveIndex,
    handleRemoveImage,
    handleAddImage,
    handleClearLocalStorage,
    handleToggleBorders,
  } = useImageLogic();

  const changeShape = (newShape) => {
    setShape(newShape);
    if (newShape === 'rectangle') {
      setSize({ width: 362, height: 502 });
    } else if (newShape === 'circle') {
      setSize({ width: 400, height: 400 });
    }
  };

  const changeSize = (newSize) => {
    setSize((prevSize) => ({
      width: prevSize.width + newSize,
      height: prevSize.height + newSize,
    }));
  };

  const handleSingleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAddImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const borderStyle = images[activeIndex]?.showBorders ? 'none' : '2px solid red';


  return (
    <div className='page'>
      <div
        style={{
          width: size.width,
          height: size.height,
          borderRadius: shape === 'circle' ? '50%' : '0',
          border: borderStyle,
          position: 'relative',
          overflow: 'hidden',
          margin: '125px 15px 1px 100px',
        }}
      >
        {images.map((image, index) => (
          image.src && (
            <DraggableImage
              key={index}
              src={image.src}
              isActive={activeIndex === index}
              setActiveIndex={() => handleSetActiveIndex(index)}
              onRemove={() => { activeIndex === index && handleRemoveImage(); }}
              index={index}
            />
          )
        ))}
      </div>
      <div className='buttons printable'>
        <button className='button-change' onClick={() => changeShape('circle')}>Круглый O</button>
        <button className='button-change' onClick={() => changeShape('rectangle')}>Прямоугольный []</button>
        <button className='plus-minus' onClick={() => changeSize(10)}>Увеличить +</button>
        <button className='plus-minus' onClick={() => changeSize(-10)}>Уменьшить -</button>
         <button className='toggle-borders-button printable' onClick={handleToggleBorders}>
          {images[activeIndex]?.showBorders ? 'Границы отключены' : 'Отключить границы?'}
        </button>
        <input className='input-img-button printable' type="file" onChange={handleSingleFileChange} />
        <button className='all-remove' onClick={handleClearLocalStorage}>Очистить память приложения!!!</button>
      </div>
    </div>
  );
};

export default ShapePage;
