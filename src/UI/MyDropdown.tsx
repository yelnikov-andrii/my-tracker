import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  border-radius: 8px;
  padding: 3px 6px;
`;

const SelectButton = styled.div`
  cursor: pointer;
  color: teal;
  font-size: 14px;
  border-bottom: 1px solid teal;
`;

const DropdownContent = styled.div<any>`
  display: ${props => (props.isopen ? 'block' : 'none')};
  background-color: white;
  border-radius: 8px;
  margin-top: 15px;
`;

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
    <StyledSelect 
      ref={dropdownRef}
    >
      <SelectButton  
        onClick={toggleDropdown}
      >
        {butttonContent}
      </SelectButton>
      {isOpen && (
        <DropdownContent 
          isopen={isOpen === true ? 'true' : ''}
        >
          {children}
        </DropdownContent>
      )}
    </StyledSelect>
  );
};