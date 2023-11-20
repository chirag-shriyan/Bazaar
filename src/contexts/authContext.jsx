import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export default function useAuth() {
    return useContext(AuthContext);
}




export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({ username: null, email: null, role: null });

    const signup = async (username, email, password, confirmPassword) => {

        if (password === confirmPassword) {
            if (username && email && password) {

                const res = await fetch(import.meta.env.VITE_API_URL + '/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                    })

                });

                return await res.json();
            }
            else if (!email) {
                return 'email is required'
            }
            else if (!password) {
                return 'password is required'
            }
        }
        else {
            return 'password and confirm password should be the same';
        }

    }

    const login = async (email, password) => {

        if (email && password) {

            const res = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            return await res.json();
        }
        else if (!email) {
            return 'email is required'
        }
        else if (!password) {
            return 'password is required'
        }
    }


    const logout = async (verified) => {

        let res = await fetch(import.meta.env.VITE_API_URL + '/api/logout', {
            credentials: 'include'
        });
        res = await res.json();
        console.log(!res.status === 200 && true);
        setIsLoggedIn(!res.status === 200 && true);
        setCurrentUser({ username: null, email: null, role: null })
        return res;
    }



    const getUser = async (isLoggedIn) => {

        if (isLoggedIn) {
            let res = await fetch(import.meta.env.VITE_API_URL + '/api/users/user', {
                credentials: 'include'
            });
            res = await res.json();
            console.log(res);
            setCurrentUser(res.data);
        }

    }

    const checkIsLoggedIn = async () => {
        let res = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
            credentials: 'include'
        });
        res = await res.json();
        await getUser(res.isLoggedIn);
        setIsLoggedIn(res.isLoggedIn);
        setLoading(false);
        return res;

    }



    const valuesObj = {
        signup,
        login,
        logout,
        checkIsLoggedIn,
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
    }

    useEffect(() => {
        checkIsLoggedIn();
    }, [])



    return (
        <AuthContext.Provider value={valuesObj}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
