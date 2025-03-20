import React, { useState } from 'react';
import "../App.css";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedData = localStorage.getItem('userRegistration');
        if (!storedData) {
            setError('No registered users found.');
            return;
        }

        const parsedData = JSON.parse(storedData);
        const user = parsedData.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('userLoggedIn', JSON.stringify(user));
            alert('Sign-in successful!');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <div className='input-lbl'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            placeholder="Enter your Email"
                            name='email'
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='input-lbl'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            placeholder="Enter your Password"
                            name='password'
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit'>Sign In</button>
                    {error && <p className="form-error">{error}</p>}
                    <div>New User <a href="/register" className='clk-lnk'>Register</a> </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;