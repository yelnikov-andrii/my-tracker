import { Box, Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggleAll } from '../../../helpers/useToggleAll';
import { useGetTodos } from '../../../helpers/useGetTodos';
import { setFilteredTodos, toggleAllAction } from '../../../store/todosSlice';

export const ToggleBlock = () => {
  const { allChecked, filteredTodos } = useSelector((state: RootState) => state.todos);
  const toggleAll = useToggleAll();
  const [getTodos] = useGetTodos();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAllChecked = filteredTodos.every(el => el.completed === true);

    if (checkAllChecked) {
      dispatch(toggleAllAction(true));
    } else {
      dispatch(toggleAllAction(false));
    }
  }, [filteredTodos, dispatch]);

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
      <Checkbox 
        checked={allChecked} 
        onChange={() => {
          handleCheckboxChange();
          const updatedTodos = filteredTodos.map(todo => ({ ...todo, completed: !allChecked }));
          dispatch(setFilteredTodos(updatedTodos));
        }} 
        value={allChecked} />
    </Box>
  )
}
