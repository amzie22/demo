import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import MenuScreen from './src/screens/MenuScreen';
import ChapterScreen from './src/screens/ChapterScreen';
import ChapterDetailsScreen from './src/screens/ChapterDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShopScreen from './src/screens/ShopScreen';
import PracticeScreen from './src/screens/PracticeScreen';

// Import practice screens
import PracticeAScreen from './src/screens/practices/A';
// Add other practice screens as needed

const Stack = createNativeStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'DoctrinaChristianaBold': require('./src/assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts().then(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing while waiting for fonts to load
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        {/* Add practice screens */}
        <Stack.Screen name="A" component={PracticeAScreen} />
        {/* Add other practice screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;