import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReservationScreen from '../screens/ReservationScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DB954',
    background: '#121212',
    card: '#181818',
    text: '#FFFFFF',
    border: '#282828',
  },
};

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
    <Stack.Screen name="HomeRoot" component={HomeScreen} />
    <Stack.Screen name="LibraryMapFromHome" component={MapScreen} />
    <Stack.Screen name="QRScannerFromHome" component={QRScannerScreen} />
    <Stack.Screen name="Reservation" component={ReservationScreen} options={{ presentation: 'modal' }}/>
  </Stack.Navigator>
);

const LibraryMapStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
    <Stack.Screen name="LibraryMap" component={MapScreen} />
    <Stack.Screen name="Reservation" component={ReservationScreen} options={{ presentation: 'modal' }}/>
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#121212' } }}>
    <Stack.Screen name="ProfileRoot" component={ProfileScreen} />
    <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Scan') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: '#A7A7A7',
          tabBarStyle: {
            backgroundColor: '#181818',
            borderTopColor: '#282828',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Library" component={LibraryMapStack} />
        <Tab.Screen name="Scan" component={QRScannerScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
