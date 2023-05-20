import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box } from "@mui/material";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{display:"flex", justifyContent:"end", marginTop:3, marginRight:5}} >
        <Fab
        className={`scroll-to-top-button ${isVisible ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
        >
        <UpIcon />
        </Fab>
    </Box>
  );
};

export default BackToTop;
