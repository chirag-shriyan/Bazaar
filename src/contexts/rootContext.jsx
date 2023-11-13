import { createContext } from "react";
import { TopLoadingContextProvider } from "./topLoadingContext";
import { AuthContextProvider } from "./authContext";

const RootContext = createContext();

export default function RootContextProvider({ children }) {
    return (
        <RootContext.Provider value={null}>
            <TopLoadingContextProvider>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </TopLoadingContextProvider>
        </RootContext.Provider>
    )
}
