import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export default function useSnackbar() {
    return useContext(SnackbarContext);
}

export function SnackbarContextProvider({ children }) {

    const [snackbar, setSnackbar] = useState({ showSnackbar: false, autoHide: 6000, message: '' });

    const valuesObj = {
        snackbar,
        setSnackbar
    }

    return (
        <SnackbarContext.Provider value={valuesObj}>
            {children}
        </SnackbarContext.Provider>
    )
}