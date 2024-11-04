import { FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

export const MySelect: React.FC <any> = ({ options, change, value }) => {
  return (
    <FormControl sx={{ m: '2px', minWidth: 10 }} size="small">
          <Select
            value={value}
            onChange={(e) => {
              change(e.target.value)
            }}
            >
            {options.map((option: any) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
            </Select>
    </FormControl>
  );
};
