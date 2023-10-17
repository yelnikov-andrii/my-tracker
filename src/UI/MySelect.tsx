import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
    position: relative;
    display: inline-block;
`;

const SelectButton = styled.div`
  cursor: pointer;
  background-color: teal;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
`;

const Options = styled.div<any>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid teal;
  border-radius: 8px;
  padding: 5px 0;
  max-height: 250px;
  overflow-y: auto;
  margin: 4px 0 0 0;
`;

const Option = styled.div`
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

export const MySelect: React.FC <any> = ({ options, change, value }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    change(option);
    setIsOpen(false);
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
        {value}
      </SelectButton>
      {isOpen && (
        <Options 
          isOpen={isOpen}
        >
          {options.map((option: string, index: number) => (
            <Option
              key={option + index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Option>
          ))}
        </Options>
      )}
    </StyledSelect>
  );
};
