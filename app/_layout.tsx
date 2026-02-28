import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { ThemeProvider } from '@/src/context/ThemeContext';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import Onboarding from '@/src/screens/Onboarding';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboarding();
    // Fallback: se em 2 segundos não carregar, libera a tela para evitar bloqueio permanente
    const timeout = setTimeout(() => {
      if (showOnboarding === null) setShowOnboarding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboarding-completed');
      setShowOnboarding(value === null);
    } catch (error) {
      setShowOnboarding(false);
    }
  };

  const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding-completed', 'true');
      setShowOnboarding(false);
    } catch (error) {
      setShowOnboarding(false);
    }
  };

  // Se ainda estiver decidindo se mostra o onboarding, mostra um background neutro
  const isLoading = showOnboarding === null;

  return (
    <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#0B1222' : '#FFFFFF' }}>
        {!isLoading && (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        )}

        {showOnboarding === true && (
          <View style={StyleSheet.absoluteFill}>
            <Onboarding onFinish={handleFinishOnboarding} />
          </View>
        )}
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
