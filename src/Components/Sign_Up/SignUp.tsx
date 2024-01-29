import React from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

type Props = {}

const SignUp = (props: Props) => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
    });
    const [showerr, setShowerr] = React.useState('');
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", formData.name);
            // phone and email
            sessionStorage.setItem("phone", formData.phone);
            sessionStorage.setItem("email", formData.email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <>
            <h1>Sign-up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <p className="login-cta">
                    Already a member?
                    <Link to="/Login" className="link">Login here</Link>
                </p>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={onChange}
                />
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
                <label htmlFor="role" className="form-label">Role</label>
                <select name="role" required className="form-input" value={formData.role} onChange={onChange}>
                    <option value="">Choose your role</option>
                    <option value="role1">Role 1</option>
                    <option value="role2">Role 2</option>
                    <option value="role3">Role 3</option>
                </select>
                <label htmlFor="phone" className="form-label">Phone number</label>
                <span className="form-helper">Please use 10 or fewer numbers</span>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                    pattern="[0-9]{1,10}"
                    className="form-input"
                    value={formData.phone}
                    onChange={onChange}
                />
                {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                <input type="reset" value="Reset" className="button button--secondary" />
                <input type="submit" value="Sign-up" className="button" />
            </form>
        </>
    )
}

export default SignUp