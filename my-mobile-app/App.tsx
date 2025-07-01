import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import React, { useState, createContext, useContext } from 'react';
import OffersScreen from './screens/OffersScreen';
import MyListingsScreen from './screens/MyListingsScreen';
import { Image } from 'react-native';
import MarketplaceScreen from './screens/MarketplaceScreen';
import ServicesScreen from './screens/ServicesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
} | null>(null);

export function useThemeSwitcher() {
  return useContext(ThemeContext)!;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Marketplace') iconName = 'storefront';
          if (route.name === 'Offers') iconName = 'gift';
          if (route.name === 'Services') iconName = 'briefcase';
          if (route.name === 'Messages') iconName = 'message-text';
          if (route.name === 'Profile') iconName = 'account';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="MyListings" component={MyListingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const customGreen = '#1e7d34'; // Example green, adjust to match your website
const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: customGreen,
    primary: customGreen,
    surface: '#fff',
    onPrimary: '#fff',
  },
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((d) => !d);
  const theme = isDark ? MD3DarkTheme : customTheme;
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
