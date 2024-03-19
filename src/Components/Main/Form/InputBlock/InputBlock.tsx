import { Box, OutlinedInput } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { changeTodoName } from '../../../../store/todosSlice';

export const InputBlock = () => {
  const { todoName } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  
  return (
    <Box display="flex" justifyContent="space-between" gap={1} marginBottom={2}>
      <OutlinedInput
        fullWidth
        value={todoName}
        onChange={(e) => dispatch(changeTodoName(e.target.value))}
      />
    </Box>
  )
}
