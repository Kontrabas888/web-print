import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import yourGif from './igv/cookis-man.gif';

const InitialGifScreen = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasClicked) {
      navigate('/');
    }
  }, [hasClicked, navigate]);

  useEffect(() => {
    const handleFirstClick = () => {
      setHasClicked(true);
    };

    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  return (
    <div>
          <h1 className='fest'>Web<span className='fest-word'>Print</span></h1>
          <div className='img-gif'><img src={yourGif} alt="Loading..." />
</div>
    </div>
  );
};

export default InitialGifScreen;
