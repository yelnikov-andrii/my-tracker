import { Box, Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggleAll } from '../../../helpers/pluralActions/useToggleAll';
import { setFilteredTodos, toggleAllAction } from '../../../store/todosSlice';

export const ToggleBlock = () => {
  const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
  const allChecked = useSelector((state: RootState) => state.todos.allChecked);

  const toggleAll = useToggleAll();

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
  }

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" paddingRight="5px" marginBottom={3}>
      <span style={{ fontWeight: '500', fontSize: '16px', textTransform: 'uppercase'}}>
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
