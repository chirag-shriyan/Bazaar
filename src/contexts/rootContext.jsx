import { createContext } from "react";
import { TopLoadingContextProvider } from "./topLoadingContext";
import { AuthContextProvider } from "./authContext";
import { SnackbarContextProvider } from "./snackbarContext";

const RootContext = createContext();

export default function RootContextProvider({ children }) {
    return (
        <RootContext.Provider value={null}>

            <TopLoadingContextProvider>

                <AuthContextProvider>

                    <SnackbarContextProvider>

                        {children}
                        
                    </SnackbarContextProvider>

                </AuthContextProvider>

            </TopLoadingContextProvider>

        </RootContext.Provider>
    )
}
