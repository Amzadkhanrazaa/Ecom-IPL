import React, { createContext, useState, useContext } from 'react';

// Create a context to manage authentication and user data
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const registerUser = (userData) => {
        const teams = ['RCB', 'CSK', 'MI', 'KKR', 'DC', 'RR', 'PBKS', 'SRH', 'LSG', 'GT'];
        const assignedTeam = teams[Math.floor(Math.random() * teams.length)];
        const userWithTeam = { ...userData, team: assignedTeam };
        setUser(userWithTeam);
        return userWithTeam;
    };

    const loginUser = (email, password) => {
        // Here, you can check the credentials and fetch user details (for now, using dummy data)
        const userData = { email, team: 'RCB' };  // Assuming the user is assigned to RCB
        setUser(userData);
        return userData;
    };

    const value = {
        user,
        registerUser,
        loginUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
