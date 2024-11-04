import { Box, Button } from '@mui/material';
import React from 'react';

export const MyDropdown: React.FC <any> = ({ butttonContent, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <Box 
      ref={dropdownRef}
      borderRadius={2}
      p={1}
    >
      <Button  
        onClick={toggleDropdown}
      >
        {butttonContent}
      </Button>
      {isOpen && (
        <Box 
          style={{
            display: isOpen ? 'block' : 'none',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};