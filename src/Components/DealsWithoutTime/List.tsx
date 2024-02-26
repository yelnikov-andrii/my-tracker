import { Box, Button, Checkbox, List, ListItem, Paper, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeDealWithout, updateDealWithout } from '../../store/dealSlice';

export const DealList = () => {
  const theme = useTheme();
  const { dealsWithoutTimeline } = useSelector((state: any) => state.deal);
  const dispatch = useDispatch();

  function toggleDeal(dealId: number) {
    dispatch(updateDealWithout(dealId));
  }

  function deleteDeal(dealId: number) {
    dispatch(removeDealWithout(dealId));
  }

  return (
    <React.Fragment>
    <Typography variant='h6'>
      Список завдань
    </Typography>
    <Paper variant="outlined">
      <List>
        {dealsWithoutTimeline.length > 0 ? dealsWithoutTimeline.map((deal: any) => (
          <ListItem
            key={deal.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: deal.completed ? 'line-through' : 'none',
              border: `1px solid ${theme.palette.primary.main}`,
              fontWeight: '500',
              fontSize: '18px',
              alignItems: 'flex-start'
            }}
          >
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
            <div>
              {deal.name}
            </div>
            <Checkbox
              onChange={(e) => {
                toggleDeal(deal.id)
              }}
              checked={deal.completed}
            />
            </Box>
            <Box>
              <Button 
                onClick={() => {
                  deleteDeal(deal.id);
                }}
                variant='contained'
              >
                Видалити
              </Button>
            </Box>
          </ListItem>
        )) : (
          <ListItem>
            Немає завдань
          </ListItem>
        )}
      </List>
    </Paper>
    </React.Fragment>
  )
}
