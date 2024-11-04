import { List, ListItem } from '@mui/material';
import React from 'react';

export const TodoList = () => {
  return (
    <React.Fragment>
        <List>
          <ListItem>
            Немає завдань
          </ListItem>
        </List>
    </React.Fragment>
  )
}
