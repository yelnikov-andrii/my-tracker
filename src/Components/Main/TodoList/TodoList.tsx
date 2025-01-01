/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { List, ListItem } from '@mui/material';
import { ListItemComponent } from './ListItemComponent';
import { ToggleBlock } from './ToggleBlock';
import { useGetFilteredTodos } from '../../../helpers/useGetFilteredTodos';
import { useGetSortedTodos } from '../../../helpers/useGetSortedTodos';

interface Props {
  date: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TodoList: React.FC<Props> = ({ date, setIsOpen }) => {
  const { todos, filteredTodos } = useSelector((state: RootState) => state.todos);
  useGetFilteredTodos(todos, date);
  const [sortedTodos] = useGetSortedTodos(filteredTodos);

  const isEmptyArr = useMemo(() => {
    if (filteredTodos.length === 0) {
      return true;
    }

    return false;
  }, [filteredTodos]);

  console.log(todos, 'todos', filteredTodos, 'filteredTodos', sortedTodos, 'sorted todos');

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

export default React.memo(TodoList);
