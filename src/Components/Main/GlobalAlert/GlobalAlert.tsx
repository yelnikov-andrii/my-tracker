import { Alert, Box, Button } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { clearGlobalAlert } from '../../../store/globalAlert';

interface GlobalAlertProps {
  alert: string;
}

const GlobalAlert: FunctionComponent<GlobalAlertProps> = ({ alert }) => {
    const dispatch = useDispatch();
    return (
        <Box sx={{ padding: '16px 0 32px' }}>
            <Alert
                severity='error'
                className='global_alert'
                variant="filled"
                action={
                    <Button color="inherit" size="small" onClick={() => {
                        dispatch(clearGlobalAlert());
                    }}>
                        ок
                    </Button>
                }
            >
                {alert}
            </Alert>
        </Box>
    );
}

export default GlobalAlert;