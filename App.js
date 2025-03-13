import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Import Screens
import SplashScreenComponent from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import MenuScreen from './src/screens/MenuScreen';
import ChapterScreen from './src/screens/ChapterScreen';
import Chapter1DetailsScreen from './src/screens/Chapter1DetailsScreen';
import ChapterDetailsScreen from './src/screens/ChapterDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShopScreen from './src/screens/ShopScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import PracticeAScreen from './src/screens/PracticeScreen';
import ClickableBooksScreen from './src/screens/ClickableBooksScreen';

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    'DoctrinaChristianaBold': require('./src/fonts/DoctrinaChristianaBold.otf'),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (error) {
        console.warn(error);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="Chapter1Details" component={Chapter1DetailsScreen} />
        <Stack.Screen name="ChapterDetails" component={ChapterDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="PracticeA" component={PracticeAScreen} />
        <Stack.Screen name="ClickableBooks" component={ClickableBooksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;