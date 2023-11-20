import { Button } from '@mui/material';
import { useState } from 'react'
import useAuth from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const { login, checkIsLoggedIn, isLoggedIn } = useAuth();
    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const goToNextInput = (e) => {
        e.preventDefault();
        const currentElement = document.activeElement;
        const nextElement = currentElement.nextElementSibling;

        if (nextElement && currentElement.value.trim().length !== 0) {
            nextElement.focus();
        }

    }

    const handleLogin = async () => {
        const res = await login(email, password);

        if (res.status === 200) {
            const res = await checkIsLoggedIn();
            console.log(res);
            Navigate('/');
        } else {
            setError(res.message);
        }
    }

    return (
        isLoggedIn ? history.back() :
            <form className='pt-28 space-y-2 w-full grid place-content-center' onSubmit={(e) => { goToNextInput(e) }}>

                <h1 className='text-4xl font-bold mb-5'>Login</h1>

                <label htmlFor="email" className='font-bold text-xl'>Email</label>
                <input autoFocus type='email' id='email' placeholder='Your Email'
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

                <div className='flex justify-between'>

                    <Link className='text-blue-500'>Forgot password?</Link>
                    <Link to={'/signup'} className='text-blue-500'>Doesn't have a account?</Link>

                </div>


                {/* Errors */}
                {error && <b className='text-red-600'>{error}</b>}

                <Button variant='contained' className='!mt-4 h-10' onClick={handleLogin}>Log In</Button>

                <button className='hidden'></button>

            </form>
    )
}
