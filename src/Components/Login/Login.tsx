import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Alert,
    Box
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

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
            setLoading(true);
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
                    setLoading(false);
                })
                .catch((e) => {
                    console.error(e, 'error login');
                    setAlertError(e.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    };

    function clearErrors(value: string) {
        if (value === 'errors') {
            setErrors({});
            return;
        }

        if (value === 'alert') {
            setAlertError('');
            return;
        }

        return;
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '48px' }}>
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
                            autoComplete="email"
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
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid size={12}>
                        {loading ? (
                            <Button variant="contained" size='large' color="primary" type="submit">
                                Завантаження <span className='dots'></span>
                            </Button>
                        ) : (
                            <Button variant="contained" size='large' color="primary" type="submit">
                                Логін
                            </Button>
                        )}
                    </Grid>
                    {(errors.email || errors.password) && (
                        <Grid size={12}>
                            <Alert severity='error' variant='filled'>
                                {errors.email}
                                {errors.password}
                                <Button onClick={() => {
                                    clearErrors('errors');
                                }}>
                                    Ок
                                </Button>
                            </Alert>
                        </Grid>
                    )}
                    {(alertError) && (
                        <Grid size={12}>
                            <Alert severity='error' variant='filled'>
                                <span>{alertError}</span>
                                <Button onClick={() => {
                                    clearErrors('alert');
                                }}>
                                    Ок
                                </Button>
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </form>
            {!isAuth && (
                <Box sx={{ margin: '48px 0 0 0' }}>
                    <p>
                        email: andriiyelnikov@gmail.com
                    </p>
                    <p>
                        пароль: 12345
                    </p>
                </Box>
            )}
        </Container>
    );
};

export default Login;
