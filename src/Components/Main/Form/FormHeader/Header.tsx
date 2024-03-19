import { Box, Typography } from '@mui/material'
import React from 'react'

export const FormHeader = () => {
  return (
    <Box
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      gap={1}
      mb={1}
    >
      <Typography>
        Початок
      </Typography>
      <Typography>
        Кінець
      </Typography>
    </Box>
  )
}
