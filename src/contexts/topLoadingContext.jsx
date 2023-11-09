import { createContext, useContext } from "react";
import { useState } from 'react';

const TopLoadingContext = createContext();

export default function useTopLoading() {
    return useContext(TopLoadingContext);
}

export function TopLoadingContextProvider({ children }) {
    const [topLoadingProgress, setTopLoadingProgress] = useState(0);

    const statesObj = {
        topLoadingProgress,
        setTopLoadingProgress
    }

    return (
        <TopLoadingContext.Provider value={statesObj}>
            {children}
        </TopLoadingContext.Provider>
    )
}
