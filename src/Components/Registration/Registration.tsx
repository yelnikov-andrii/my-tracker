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
import { baseUrl } from '../../helpers/baseUrl';

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<ErrorI>({});
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const navigate = useNavigate();
    const delay = 3000;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAlertMessage(prev => ({...prev, success: '', error: ''}));
        setErrors({});
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const tempErrors: ErrorI = {};
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is not valid.";
        }
        if (!formData.password) {
            tempErrors.password = "ВВедіть пароль";
        }

        if (formData.confirmPassword !== formData.password) {
            tempErrors.password = 'Паролі не співпадають'
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            fetch(`${baseUrl}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
                .then(response => {
                    if (!response.ok) {
                        setAlertMessage(prev => ({...prev, error: response.statusText}));
                        throw new Error('Помилка ' + response.status + ' ' + response.statusText);
                    }

                    return response.json();
                })
                .then(() => {
                    setFormData({ email: '', password: '', confirmPassword: '' });
                    setAlertMessage(prev => ({ ...prev, success: 'Успішно зареєстрований користувач' }));
                    setTimeout(() => {
                        navigate('/login');
                    }, delay);
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: '48px'}}>
            <Typography variant="h5" gutterBottom>
                Реєстрація
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
                        <TextField
                            fullWidth
                            label="Повторіть пароль"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Зареєструватися
                        </Button>
                    </Grid>
                    {alertMessage && (
                        <Grid size={12}>
                            {alertMessage.error && (
                                <Alert severity='error'>
                                    {alertMessage.error}
                                </Alert>
                            )}
                            {alertMessage.success && (
                                <Alert severity='success'>
                                    {alertMessage.success}
                                </Alert>
                            )}
                        </Grid>
                    )}
                    {(errors.email || errors.password) && (
                        <Grid size={12}>
                            <Alert severity='error'>
                                {errors.email}
                                {errors.password}
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default Registration;
