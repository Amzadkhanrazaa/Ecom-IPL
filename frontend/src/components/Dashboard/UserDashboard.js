import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import ProductList from '../Products/ProductList';

const UserDashboard = () => {
    const { user } = useAuth();
    const { setTeamTheme } = useTheme();

    useEffect(() => {
        if (user) {
            setTeamTheme(user.team); // Set team theme upon login
        }
    }, [user, setTeamTheme]);

    if (!user) return <div>Please log in to view your dashboard</div>;

    return (
        <div className={`min-h-screen ${user.team === 'RCB' ? 'bg-red-600' : 'bg-blue-600'}`}>
            <div className="text-white p-6">
                <h1 className="text-4xl mb-4">Welcome to the {user.team} Fan Store!</h1>
                <ProductList />
            </div>
        </div>
    );
};

export default UserDashboard;
