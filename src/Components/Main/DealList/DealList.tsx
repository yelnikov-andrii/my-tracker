import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeDeal, selectDealIdToAddAfterThis, selectDealIdToAddBeforeThis, selectDealIdToChange, updateDeal } from '../../../store/dealSlice';
import { changeTime } from '../../../helpers/changeTime';
import { RootState } from '../../../store/store';
import { MyDropdown } from '../../../UI/MyDropdown';
import { openModal } from '../../../store/modalSlice';
import { Box, Button, Checkbox, List, ListItem, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const DealList: React.FC<any> = ({ date }) => {
  const { deals } = useSelector((state: RootState) => state.deal);
  const dispatch = useDispatch();

  const theme = useTheme();

  function toggleDeal(dealId: number) {
    dispatch(updateDeal(dealId));
  }

  function deleteDeal(dealId: number) {
    dispatch(removeDeal(dealId));
  }

  function changeTheDeal(deal: any) {
    dispatch(openModal());
    dispatch(selectDealIdToChange(deal));
    changeTime(deals, deal.id, dispatch);
  }

  function addDealAfter(dealId: number) {
    dispatch(openModal());
    dispatch(selectDealIdToAddAfterThis(dealId));
  }

  function addDealBefore(dealId: number) {
    dispatch(openModal());
    dispatch(selectDealIdToAddBeforeThis(dealId));
  }

  const filteredDeals = React.useMemo(() => {
    return deals.filter((deal: any) => deal.date === date);
  }, [date, deals]);

  return (
    <React.Fragment>
    <Typography variant='h6'>Список завдань</Typography>
    <Paper variant="outlined">
      <List>
        {filteredDeals.length > 0 ? filteredDeals.map((deal) => (
          <ListItem
            key={deal.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: deal.completed ? 'line-through' : 'none',
              border: `1px solid ${theme.palette.primary.main}`,
              fontWeight: '500',
              fontSize: '18px',
              alignItems: 'flex-start',
              padding: '4px'
            }}
          >
            <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
              {`${deal.start} - ${deal.finish}`}
              <div>
                {deal.name}
              </div>
              <Checkbox
                onChange={() => toggleDeal(deal.id)}
                checked={deal.completed}
              />
            </Box>
              <MyDropdown butttonContent="Вибрати опцію">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => deleteDeal(deal.id)}
                    sx={{
                      '@media (max-width: 425px)': {
                        fontSize: '14px'
                      },
                    }}
                  >
                    Видалити
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => changeTheDeal(deal)}
                    sx={{
                      '@media (max-width: 425px)': {
                        fontSize: '14px'
                      },
                    }}
                  >
                    Редагувати
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => addDealAfter(deal.id)}
                    sx={{
                      '@media (max-width: 425px)': {
                        fontSize: '14px'
                      },
                    }}
                  >
                    Додати справу після цієї
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => addDealBefore(deal.id)}
                    sx={{
                      '@media (max-width: 425px)': {
                        fontSize: '14px'
                      },
                    }}
                  >
                    Додати справу перед цією
                  </Button>
                </div>
              </MyDropdown>
          </ListItem>
        )) : (
          <ListItem>Немає завдань</ListItem>
        )}
      </List>
    </Paper>
    </React.Fragment>
  )
}
