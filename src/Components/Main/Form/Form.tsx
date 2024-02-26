import React from 'react';
import { hours, minutes } from '../../../helpers/hoursAndMinutes';
import { useDispatch, useSelector } from 'react-redux';
import { addDeal, addDealAfterThis, addDealBeforeThis, changeDealName, changeTheDeal, selectDealIdToAddAfterThis, selectDealIdToAddBeforeThis } from '../../../store/dealSlice';
import { closeModal } from '../../../store/modalSlice';
import { setFinishHour, setFinishMinutes, setStartHour, setStartMinutes } from '../../../store/timeSlice';
import { changeTimeAfterAddingAdeal } from '../../../helpers/changeTimeAfterAdd';
import { RootState } from '../../../store/store';
import { MySelect } from '../../../UI/MySelect';
import { Box, Button, Typography, OutlinedInput } from '@mui/material';

interface Props {
  date: string;
}

export const Form: React.FC <Props> = ({ date }) => {
  const { deals, dealIdToChange, dealName, dealIdToAddAfterThis, dealIdToAddBeforeThis } = useSelector((state: RootState) => state.deal);
  const { startHour, startMinutes, finishHour, finishMinutes } = useSelector((state: any) => state.time);
  
  const dispatch = useDispatch();

  function addDealHandler() {
    if (!dealName || !startHour || !startMinutes || !finishHour || !finishMinutes) {
      return;
    }

    const deal = {
      name: dealName,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      completed: false,
      date: date,
      id: Date.now()
    };

    if (dealIdToAddAfterThis) {
      dispatch(addDealAfterThis(deal));
      dispatch(changeDealName(''));
      changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
      dispatch(closeModal());
      dispatch(selectDealIdToAddAfterThis(null))
      return;
    }

    if (dealIdToAddBeforeThis) {
      dispatch(addDealBeforeThis(deal));
      dispatch(changeDealName(''));
      changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
      dispatch(closeModal());
      dispatch(selectDealIdToAddBeforeThis(null));
      return;
    }

    dispatch(addDeal(deal));
    dispatch(changeDealName(''));
    changeTimeAfterAddingAdeal(startHour, finishHour, finishMinutes, dispatch);
    dispatch(closeModal());
  }

  function changeTheDealHandler(dealId: number | null) {
    const foundDeal = deals.find((deal: any) => deal.id === dealId);

    if (!dealName || !startHour || !startMinutes || !finishHour || !finishMinutes || !foundDeal) {
      return;
    }

    const newDeal = {
      name: dealName,
      start: `${startHour}:${startMinutes}`,
      finish: `${finishHour}:${finishMinutes}`,
      date: foundDeal.date,
    };

    dispatch(changeTheDeal(newDeal));
    dispatch(changeDealName(''));
    dispatch(closeModal());
  }

  function changeStartHour(value: any) {
    dispatch(setStartHour(value));
  }

  function changeStartMinutes(value: any) {
    dispatch(setStartMinutes(value));
  }

  function changeFinishHour(value: any) {
    dispatch(setFinishHour(value));
  }

  function changeFinishMinutes(value: any) {
    dispatch(setFinishMinutes(value));
  }

  return (
    <Box component="form">
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
      <Box 
        display="flex" 
        justifyContent="space-between"
        alignSelf="center"
        gap={1}
        mb={1}
      >
        <Box 
          display="flex" 
          justifyContent="space-between"
          alignSelf="center"
          flexWrap="wrap"
        >
          <MySelect 
            options={hours} 
            change={changeStartHour} 
            value={startHour} 
          />
          <MySelect 
            options={minutes} 
            change={changeStartMinutes} 
            value={startMinutes} 
          />
        </Box>
        <Typography
          alignSelf="center"
          sx={{
            '@media (max-width: 425px)': {
              alignSelf: 'center'
            },
          }}
        >
          &mdash;
        </Typography>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          flexWrap="wrap"
          sx={{
            '@media (max-width: 425px)': {
              justifyContent: 'flex-end'
            },
          }}
        >
          <MySelect options={hours} change={changeFinishHour} value={finishHour} />
          <MySelect options={minutes} change={changeFinishMinutes} value={finishMinutes} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" gap={1} marginBottom={2}>
        <OutlinedInput
          fullWidth
          value={dealName}
          onChange={(e) => dispatch(changeDealName(e.target.value))}
        />
      </Box>
      <Box display="flex" justifyContent="center" gap={1}>
        {!dealIdToChange ? (
          <Button 
          onClick={addDealHandler}
          variant="contained"
        >
          Додати справу
        </Button>
        ) : (
        <Button 
          onClick={() => changeTheDealHandler(dealIdToChange)}
          variant="contained"
        >
          Редагувати справу
        </Button>
        )}
      </Box>
    </Box>
  )
}
