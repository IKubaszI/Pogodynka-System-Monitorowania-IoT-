import React, { Component, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Account {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
}

interface State {
    account: Account;
    errors: Errors;
}

interface Props {
    navigate: (path: string) => void;
}

class LoginForm extends Component<Props, State> {
    state: State = {
        account: {
            username: "",
            password: ""
        },
        errors: {}
    };

    validate = (): Errors | null => {
        const errors: Errors = {};
        const { account } = this.state;
        if (account.username.trim() === '') {
            errors.username = 'Login jest wymagany ';
        }
        if (account.password.trim() === '') {
            errors.password = 'Haselko jest wymagane';
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        axios.post('http://localhost:3100/api/user/auth', {
            name: this.state.account.username,
            password: this.state.account.password
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                window.location.reload();
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania żądania:', error);
            });
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const account = { ...this.state.account };
        account[event.currentTarget.name as keyof Account] = event.currentTarget.value;
        this.setState({ account });
    };

    render() {
        return (
            <Container maxWidth="sm">
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            label="Username"
                            value={this.state.account.username}
                            name="username"
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.username && (
                            <Alert severity="error">
                                {this.state.errors.username}
                            </Alert>
                        )}
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Password"
                            value={this.state.account.password}
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        {this.state.errors.password && (
                            <Alert severity="error">
                                {this.state.errors.password}
                            </Alert>
                        )}
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Container>
        );
    }
}

function LoginFormWithNavigate(props: any) {
    const navigate = useNavigate();
    return <LoginForm {...props} navigate={navigate} />;
}

export default LoginFormWithNavigate;
