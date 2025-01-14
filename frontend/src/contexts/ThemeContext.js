import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);

    const setTeamTheme = (team) => {
        const themes = {
            RCB: { color: 'bg-red-600', logo: '/images/rcb-logo.png' },
            CSK: { color: 'bg-yellow-600', logo: '/images/csk-logo.png' },
            MI: { color: 'bg-blue-600', logo: '/images/mi-logo.png' },
            // Add other teams as needed
        };

        setTheme(themes[team]);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTeamTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
