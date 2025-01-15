/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import { useGetFilteredTodos } from '../../../helpers/getTodosHelper/useGetFilteredTodos';
import { useGetSortedTodos } from '../../../helpers/getTodosHelper/useGetSortedTodos';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = React.memo(({ setIsOpen }) => {
  const filteredTodos = useSelector((state: RootState) => state.todos.filteredTodos);
  useGetFilteredTodos();
  const [sortedTodos] = useGetSortedTodos(filteredTodos);

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
});

TodoList.displayName = 'TodoList';
