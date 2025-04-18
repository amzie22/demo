import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import SplashScreenComponent from './src/screens/LoginSignup/SplashScreen';
import OnboardingScreen from './src/screens/LoginSignup/OnboardingScreen';
import LoginScreen from './src/screens/LoginSignup/LoginScreen';
import SignupScreen from './src/screens/LoginSignup/SignupScreen';
import VerificationScreen from './src/screens/LoginSignup/VerificationScreen';
import MenuScreen from './src/screens/Dashboard/MenuScreen';
import ChapterScreen from './src/screens/chapter1/ChapterScreen';
import ChapterDetailsScreen from './src/screens/chapter1/ChapterDetailsScreen';
import Chapter1DetailsScreen from './src/screens/chapter1/Chapter1DetailsScreen';
import ProfileScreen from './src/screens/Dashboard/ProfileScreen';
import ShopScreen from './src/screens/Dashboard/ShopScreen';
import PracticeScreen from './src/screens/Dashboard/PracticeScreen';
import Practices from './src/screens/Dashboard/Practices';
import TestScreen from './src/screens/Dashboard/TestScreen';
import ClickableBooksScreen from './src/screens/chapter1/ClickableBooksScreen';
import SkipScreen from './src/screens/chapter1/SkipScreen';
import SetupScreen from './src/screens/chapter1/SetupScreen';
import AfterSetupScreen from './src/screens/chapter1/AfterSetupScreen';
import IntroScreen from './src/screens/LoginSignup/IntroScreen';
import Chap2Screen from './src/screens/chapter2/Chap2Screen';
import Chapter2DetailsScreen from './src/screens/chapter2/Chapter2DetailsScreen';
import AfterChapScreen from './src/screens/chapter2/AfterChapScreen';
import LastChap2Screen from './src/screens/chapter2/LastChap2Screen';
import Ep2DetailsScreen from './src/screens/chapter2/episode2/Ep2DetailsScreen';
import Ep2Screen from './src/screens/chapter2/episode2/Ep2Screen';
import LastEp2Screen from './src/screens/chapter2/episode2/LastEp2Screen';

import challenges from './src/screens/Dashboard/challenges';

// //chapter 2
import lesson1 from './src/screens/chapter2/Lessons/lesson1';
import act1 from './src/screens/chapter2/Lessons/act1'
import lesson3 from './src/screens/chapter2/Lessons/lesson3';
import act3 from './src/screens/chapter2/Lessons/act3'

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        setFontsLoaded(true); // Simulating font load success
      } catch (error) {
        console.warn('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="ChapterDetails" component={ChapterDetailsScreen} />
        <Stack.Screen name="Chapter1Details" component={Chapter1DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Practices" component={Practices} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="ClickableBooks" component={ClickableBooksScreen} />
        <Stack.Screen name="Skip" component={SkipScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="AfterSetupScreen" component={AfterSetupScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Chap2" component={Chap2Screen} />
        <Stack.Screen name="Chapter2Details" component={Chapter2DetailsScreen} />
        <Stack.Screen name="AfterChap" component={AfterChapScreen} />
        <Stack.Screen name="LastChap2" component={LastChap2Screen} />
        <Stack.Screen name="Ep2Details" component={Ep2DetailsScreen} />
        <Stack.Screen name="Ep2" component={Ep2Screen} />
        <Stack.Screen name="LastEp2" component={LastEp2Screen} />
      
        <Stack.Screen name="Challenges" component={challenges} />

        <Stack.Screen name="Lesson1" component={lesson1} />
        <Stack.Screen name="Act1" component={act1} />
        <Stack.Screen name="Lesson3" component={lesson3} />
        <Stack.Screen name="Act3" component={act3} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
