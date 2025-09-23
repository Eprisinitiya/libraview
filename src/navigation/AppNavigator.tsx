import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Screens
import LibraryMapScreen from '../screens/LibraryMapScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SpotDetailsScreen from '../screens/SpotDetailsScreen';
import ReservationScreen from '../screens/ReservationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LibraryMapStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryMap" component={LibraryMapScreen} />
      <Stack.Screen 
        name="SpotDetails" 
        component={SpotDetailsScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Spot Details',
          headerStyle: {
            backgroundColor: '#6366F1',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
      <Stack.Screen 
        name="Reservation" 
        component={ReservationScreen}
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Reserve Spot',
          headerStyle: {
            backgroundColor: '#6366F1',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#6366F1" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'LibraryHome') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'QRScanner') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else {
              iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#8B5CF6',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: '#6366F1',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen
          name="LibraryHome"
          component={LibraryMapStack}
          options={{
            tabBarLabel: 'Library Map',
            headerTitle: 'Libraview',
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{
            tabBarLabel: 'QR Scanner',
            headerTitle: 'Scan QR Code',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerTitle: 'My Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;