import { useTheme } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'


export default function LoadingFromServerBlock() {
  const todosLoading = useSelector((state: RootState) => state.todos.todosLoading);
  const theme = useTheme();

  if (!todosLoading) {
    return null;
  }

  return (
    <div>
      <p style={{ color: theme?.palette?.primary.main || 'blue' }}>
        Справи завантажуються з серверу<span className='dots'></span>
      </p>
    </div>
  )
}