import { useState } from 'react'
import useAuth from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Signup() {

    const { signup, checkIsLoggedIn, isLoggedIn } = useAuth();
    const Navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const goToNextInput = (e) => {
        e.preventDefault();
        const currentElement = document.activeElement;
        const nextElement = currentElement.nextElementSibling;

        if (nextElement && currentElement.value.trim().length !== 0) {
            nextElement.focus();
        }

    }


    const handleSignup = async () => {
        const res = await signup(username, email, password, confirmPassword);

        if (res.status === 200) {
            await checkIsLoggedIn();
            Navigate('/');
        }
        else {
            setError(res.message);
        }

    }

    return (
        isLoggedIn ? history.back() :
            <form className='pt-28 space-y-2 w-full grid place-content-center' onSubmit={(e) => { goToNextInput(e) }}>

                <h1 className='text-4xl font-bold mb-5'>Signup</h1>

                <label htmlFor="name" className='font-bold text-xl'>Name</label>
                <input autoFocus type='text' id='name' placeholder='Your name'
                    autoComplete='email'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="email" className='font-bold text-xl'>Email</label>
                <input type='email' id='email' placeholder='Your Email'
                    autoComplete='email'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <label htmlFor="password" className='font-bold text-xl'>Password</label>
                <input type='password' id='password' placeholder='Your Password'
                    autoComplete='current-password'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword" className='font-bold text-xl'>Confirm Password</label>
                <input type='password' id='confirmPassword' placeholder='Confirm Password'
                    autoComplete='confirm-password'
                    className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className='flex justify-between'>

                    <Link to={'/login'} className='text-blue-500'>Already have a account?</Link>

                </div>


                {/* Errors */}
                {error && <b className='text-red-600'>{error}</b>}

                <Button variant='contained' className='!mt-4 h-10' onClick={handleSignup}>Sign up</Button>

                <button className='hidden'></button>

            </form>
    )
}
