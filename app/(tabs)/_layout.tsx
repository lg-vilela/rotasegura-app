import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '@/src/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111827', // Darker navy for the tab bar
          borderTopColor: 'rgba(255, 255, 255, 0.05)',
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={26} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="salvos"
        options={{
          title: 'Salvos',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={26} name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="emergencia"
        options={{
          title: '', // Empty title to emphasize the icon
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 60,
              height: 60,
              backgroundColor: COLORS.critical,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30, // Raise the button
              elevation: 5,
              shadowColor: COLORS.critical,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              borderWidth: 4,
              borderColor: '#111827', // Matching tab bar background
            }}>
              <MaterialCommunityIcons
                size={32}
                name="shield-alert"
                color="white"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={26} name="account" color={color} />,
        }}
      />
      <Tabs.Screen
        name="alertas"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={26} name="bell" color={color} />,
        }}
      />
    </Tabs>
  );
}
