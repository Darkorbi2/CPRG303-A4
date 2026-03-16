import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
      >

      <Tabs.Screen
        name="employee"
        options={{
          title: 'Employee',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sign-In',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}