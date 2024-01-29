import React, { useState } from 'react';
import DraggableImage from './DraggableImage';
import './App.css';
import useImageLogic from './useImageLogic';

const App = () => {
  const {
    images,
    handleToggleBorders,
    handleFileChange,
    handleRemoveImage,
    handleSetActiveIndex,
    activeIndex,
    handleSetNumberOfRectangles,
    handleClearLocalStorage,
    numberOfRectangles,
  } = useImageLogic();

  const [rectangleClass, setRectangleClass] = useState('default-rectangle');

  const handleChangeRectangleClass = (newClass) => {
    setRectangleClass(newClass);
  };

  const handleSetStyleAndNumber = (style, number) => {
    handleSetNumberOfRectangles(number);
    handleChangeRectangleClass(style);
  };

  return (
    <div className='page'>
      <div className='container'>
        {images.slice(0, numberOfRectangles).map((image, index) => (
          <div key={index} className={`rectangle ${rectangleClass}`}>
            {image.src !== null && (
              <DraggableImage
                src={image.src}
                onRemove={() => handleRemoveImage(index)}
                index={index}
                isActive={index === activeIndex}
                setActiveIndex={handleSetActiveIndex}
                handleChangeRectangleClass={handleChangeRectangleClass}
              />
            )}
          </div>
        ))}
      </div>
      <div className='buttons printable'>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style1', 2)}>Большие Круглые</button>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style2', 6)}>Маленькие Круглые</button>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style3', 4)}>Рамка Большие</button>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style4', 4)}>Рамка Маленькие</button>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style5', 4)}>Прямоугольник</button>
        <button className='button-change' onClick={() => handleSetStyleAndNumber('rectangle-style6', 2)}>BadaBig=14x10.5</button>
        <button className='toggle-borders-button printable' onClick={handleToggleBorders}>
          {images[activeIndex]?.showBorders ? 'Отключить границы?' : 'Границы отключены'}
        </button>
        {images.map((image, index) => (
          <div key={index}>
            <input className='input-img-button printable' type="file" onChange={(event) => handleFileChange(event, index)} />
          </div>
        ))}
        <button className='all-remove' onClick={handleClearLocalStorage}>Очистить память приложения!!!</button>
      </div>
    </div>
  );
};

export default App;
