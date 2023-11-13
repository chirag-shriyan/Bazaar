import { createContext, useContext } from "react";
import { useState } from 'react';

const AuthContext = createContext();

export default function useAuth() {
    return useContext(AuthContext);
}




export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function signup(email, password, confirmPassword) {

        if (password === confirmPassword) {
            if (email && password) {

                const res = await fetch(import.meta.env.VITE_API_URL + '/api/sign', {
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
        else {
            return 'password and confirm password should be the same';
        }

    }

    async function login(email, password) {

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

    async function checkIsLoggedIn() {
        let res = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
            credentials: 'include'
        });
        res = await res.json();
        setIsLoggedIn(res.isLoggedIn ? res.isLoggedIn : false);
    }

    async function logout() {

        // let res = await fetch(import.meta.env.VITE_API_URL + '/api/logout', {
        //     credentials: 'include'
        // });
        // res = await res.json();
        // setIsLoggedIn(res.isLoggedIn ? res.isLoggedIn : false);
    }

    const valuesObj = {
        signup,
        login,
        logout,
        checkIsLoggedIn,
        isLoggedIn,
        setIsLoggedIn,
    }



    return (
        <AuthContext.Provider value={valuesObj}>
            {children}
        </AuthContext.Provider>
    )
}
