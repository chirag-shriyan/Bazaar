import { createContext } from "react";
import { TopLoadingContextProvider } from "./topLoadingContext";

const RootContext = createContext();

export default function RootContextProvider({ children }) {
    return (
        <RootContext.Provider value={null}>
            <TopLoadingContextProvider>
                {children}
            </TopLoadingContextProvider>
        </RootContext.Provider>
    )
}
