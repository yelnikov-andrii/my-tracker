import { Box, Checkbox } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggleAll } from '../../../helpers/useToggleAll';
import { useGetTodos } from '../../../helpers/useGetTodos';
import { toggleAllAction } from '../../../store/todosSlice';

export const ToggleBlock = () => {
  const { allChecked } = useSelector((state: RootState) => state.todos);
  const toggleAll = useToggleAll();
  const [getTodos] = useGetTodos();
  const dispatch = useDispatch();

  async function handleCheckboxChange() {
    await toggleAll();
    dispatch(toggleAllAction(!allChecked));
    await getTodos();
  }

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" paddingRight="5px">
      <span>
        Вибрати усі
      </span>
      <Checkbox checked={allChecked} onChange={handleCheckboxChange} value={allChecked} />
    </Box>
  )
}
