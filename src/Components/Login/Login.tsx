import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);
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