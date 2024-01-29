import React, { useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

type Props = {}

const Login = (props: Props) => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/")
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // name: name,
                email: formData.email,
                password: formData.password,
            }),
        });
        const json = await res.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);

            sessionStorage.setItem('email', formData.email);
            navigate('/');
            window.location.reload()
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <p className="signup-cta">
                    Are you a new member?
                    <Link to="/SignUp" className="link">Sign up here</Link>
                </p>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={onChange}
                />
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    className="form-input"
                    value={formData.password}
                    onChange={onChange}
                />
                <Link to="" className="link password-reset">Forgot your password?</Link>
                <input type="submit" value="Login" className="button" />
            </form>
        </>

    )
}

export default Login