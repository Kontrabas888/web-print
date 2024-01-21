// DraggableImage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import './App.css';

const ItemTypes = {
  IMAGE: 'image',
};

const DraggableImage = ({ src, onRemove, index, isActive, setActiveIndex }) => {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [dragStart, setDragStart] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBorders, setShowBorders] = useState(true);

  const handleSizeChange = useCallback((action) => {
    const scaleFactor = 1.005;
    let newSize = { ...size };

    if (action === 'increase') {
      newSize = { width: size.width * scaleFactor, height: size.height * scaleFactor };
    } else if (action === 'decrease') {
      newSize = { width: size.width / scaleFactor, height: size.height / scaleFactor };
    }

    setSize(newSize);
    setClickCount((prevClickCount) => prevClickCount + 1);
  }, [size]);

  const handleMove = (direction) => {
    const moveStep = 2;

    if (direction === 'left') {
      setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - moveStep }));
    } else if (direction === 'right') {
      setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + moveStep }));
    } else if (direction === 'up') {
      setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - moveStep }));
    } else if (direction === 'down') {
      setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + moveStep }));
    }
  };

  const [, ref] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { src, size, position, index },
  }));

  useEffect(() => {
    setShowBorders(isActive);
  }, [isActive]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isActive) {
        if (event.key === "=" || event.key === "+") {
          handleSizeChange('increase');
        } else if (event.key === "-") {
          handleSizeChange('decrease');
        } else if (event.key === "ArrowLeft") {
          handleMove('left');
        } else if (event.key === "ArrowRight") {
          handleMove('right');
        } else if (event.key === "ArrowUp") {
          handleMove('up');
          event.preventDefault();
        } else if (event.key === "ArrowDown") {
          handleMove('down');
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSizeChange, isActive]);

  const handleMouseDown = (event) => {
    if (isActive) {
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event) => {
    if (isActive && dragStart) {
      const newWidth = size.width + event.clientX - dragStart.x;
      const newHeight = size.height + event.clientY - dragStart.y;

      setSize({ width: newWidth, height: newHeight });

      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  return (
    <>
      <div className={`resizable-image ${showBorders ? 'with-borders' : 'without-borders'}`} style={{ width: size.width, height: size.height, transform: `translate(${position.x}px, ${position.y}px)` }} ref={ref} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <img className='resizable-image' src={src} alt="Draggable" onMouseDown={handleMouseDown} draggable={false} />
        <div className='resize-handle top-left' onMouseDown={handleMouseDown} />
        <div className='resize-handle top-right' onMouseDown={handleMouseDown} />
        <div className='resize-handle bottom-left' onMouseDown={handleMouseDown} />
        <div className='resize-handle bottom-right' onMouseDown={handleMouseDown} />
        <button className='resize-button' onClick={() => handleSizeChange('increase')}>
          Увеличить
        </button>
        <button className='resize-button' onClick={() => handleSizeChange('decrease')}>
          Уменьшить
        </button>
        <p>Количество нажатий: {clickCount}</p>
      </div>
      {isActive && (
        <div className="deleteImg">
          <button className="remove-button printable" onClick={onRemove}>
            Удалить
          </button>
        </div>
      )}
      {!isActive && (
        <div className="set-active-button">
          <button className='choice-button printable' onClick={() => setActiveIndex(index)}>
            Выбрать
          </button>
        </div>
      )}
    </>
  );
};

export default DraggableImage;
