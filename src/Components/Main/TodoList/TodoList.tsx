/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import { useGetFilteredTodos } from '../../../helpers/useGetFilteredTodos';
import { useGetSortedTodos } from '../../../helpers/useGetSortedTodos';
import { toggleAllAction } from '../../../store/todosSlice';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { todos, filteredTodos } = useSelector((state: RootState) => state.todos);
  useGetFilteredTodos(todos, date);
  const [sortedTodos] = useGetSortedTodos(filteredTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAllChecked = filteredTodos.every(el => el.completed === true);

    if (checkAllChecked) {
      dispatch(toggleAllAction(true));
    }
  }, [filteredTodos]);

  const isEmptyArr = useMemo(() => {
    if (filteredTodos.length === 0) {
      return true;
    }

    return false;
  }, [filteredTodos]);

  return (
    <React.Fragment>
      {!isEmptyArr && (
        <ToggleBlock />
      )}
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {sortedTodos.length > 0 ? sortedTodos.map((todo: TodoInterface) => (
          <ListItemComponent
            todo={todo}
            key={todo.id}
            date={date}
            setIsOpen={setIsOpen}
          />
        )) : (
          <ListItem>
            Немає завдань
          </ListItem>
        )}
      </List>
    </React.Fragment>
  )
}
