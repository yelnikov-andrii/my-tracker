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

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();
    const delay = 2000;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setErrors({});
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const tempErrors: any = {};
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        }

        if (!formData.password) {
            tempErrors.password = "ВВедіть пароль";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            fetch('http://localhost:2000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Помилка ' + response.status + ' ' + response.statusText);
                    }

                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    setFormData({ email: '', password: '' });
                    setTimeout(() => {
                        navigate('/');
                    }, delay);
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    };

    return (
        <Container maxWidth="sm" sx={{ padding: '48px 0 0 0' }}>
            <Typography variant="h4" gutterBottom>
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
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
