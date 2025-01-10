import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Alert
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeAuth, changeUser } from '../../store/authSlice';
import { baseUrl } from '../../helpers/baseUrl';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<ErrorI>({});
    const [alertError, setAlertError] = useState('');
    const navigate = useNavigate();
    const delay = 500;
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors({});
        setAlertError('');
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const tempErrors: ErrorI = {};
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        }

        if (!formData.password) {
            tempErrors.password = "ВВедіть пароль";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                credentials: 'include',
            })
                .then(async response => {
                    if (!response.ok) {
                        return response.json().then(errData => {
                            setAlertError(errData.message);
                            throw new Error('Error: ' + errData.message);
                        });
                    }

                    return response.json();
                })
                .then(data => {
                    setFormData({ email: '', password: '' });
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('user_todo', JSON.stringify(data.user));
                    dispatch(changeAuth(true));
                    dispatch(changeUser(data.user));
                    setTimeout(() => {
                        navigate('/');
                    }, delay);
                })
                .catch((e) => {
                    console.log(e, 'error login');
                    setAlertError(e.message);
                })
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '48px'}}>
            <Typography variant="h5" gutterBottom>
                Логін
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Пароль"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Логін
                        </Button>
                    </Grid>
                    {(errors.email || errors.password) && (
                        <Grid size={12}>
                            <Alert severity='error'>
                                {errors.email}
                                {errors.password}
                            </Alert>
                        </Grid>
                    )}
                    {(alertError) && (
                        <Grid size={12}>
                            <Alert severity='error'>
                                {alertError}
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
