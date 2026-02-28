import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

const ThemeContext = createContext({
    theme: 'system',
    colorScheme: 'dark',
    setTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const deviceColorScheme = useDeviceColorScheme();
    const [theme, setThemeState] = useState('system'); // 'light', 'dark', 'system'

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('user-theme');
            if (savedTheme) {
                setThemeState(savedTheme);
            }
        } catch (e) {
            // Error handled by UI or silent
        }
    };

    const setTheme = async (newTheme) => {
        try {
            setThemeState(newTheme);
            await AsyncStorage.setItem('user-theme', newTheme);
        } catch (e) {
            // Error handled by UI or silent
        }
    };

    const activeColorScheme = theme === 'system' ? (deviceColorScheme || 'dark') : theme;

    return (
        <ThemeContext.Provider value={{ theme, colorScheme: activeColorScheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
