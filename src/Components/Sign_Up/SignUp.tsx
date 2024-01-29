import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';

type Props = {}

const SignUp = (props: Props) => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);
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
                <input type="reset" value="Reset" className="button button--secondary" />
                <input type="submit" value="Sign-up" className="button" />
            </form>
        </>
    )
}

export default SignUp