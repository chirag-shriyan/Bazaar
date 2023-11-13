import { Button } from '@mui/material';
import { useState } from 'react'
import useAuth from '../contexts/authContext';
import { Link } from 'react-router-dom';

export default function Login() {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await login(email, password);
        console.log(res);
        setError(res.message);
    }

    return (
        <form className='mt-28 space-y-2 w-full grid place-content-center max-sm:mt-0' onSubmit={(e) => { goToNextInput(e) }}>

            <label htmlFor="email" className='font-bold text-xl'>Email</label>
            <input autoFocus type='email' id='email' placeholder='Your Email'
                className='w-[500px] max-w-[500px] p-1 py-2 border border-black rounded max-sm:w-[320px]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />


            <label htmlFor="password" className='font-bold text-xl'>Password</label>
            <input type='password' id='password' placeholder='Your Password'
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
