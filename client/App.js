import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
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
import Practices from './src/screens/Dashboard/Practices';
import TestScreen from './src/screens/Dashboard/TestScreen';
import ClickableBooksScreen from './src/screens/chapter1/ClickableBooksScreen';
import SkipScreen from './src/screens/chapter1/SkipScreen';
import SetupScreen from './src/screens/chapter1/SetupScreen';
import AfterSetupScreen from './src/screens/chapter1/AfterSetupScreen';
import IntroScreen from './src/screens/LoginSignup/IntroScreen';
import Chapter2DetailsScreen from './src/screens/chapter2/Chapter2DetailsScreen';
import AfterChapScreen from './src/screens/chapter2/AfterChapScreen';
import LastChap2Screen from './src/screens/chapter2/LastChap2Screen';
import Ep2DetailsScreen from './src/screens/chapter2/episode2/Ep2DetailsScreen';
import Ep2Screen from './src/screens/chapter2/episode2/Ep2Screen';
import LastEp2Screen from './src/screens/chapter2/episode2/LastEp2Screen';
import Ep3DetailsScreen from './src/screens/chapter2/episode3/Ep3DetailsScreen';
import Ep3Screen from './src/screens/chapter2/episode3/Ep3Screen';
import LastEp3Screen from './src/screens/chapter2/episode3/LastEp3Screen';
import Ep4DetailsScreen from './src/screens/chapter2/episode4/Ep4DetailsScreen';
import Ep4Screen from './src/screens/chapter2/episode4/Ep4Screen';
import LastEp4Screen from './src/screens/chapter2/episode4/LastEp4Screen';
import ClosingScreen from './src/screens/chapter2/episode4/ClosingScreen';

import challenges from './src/screens/Dashboard/challenges';
import learn from './src/screens/Dashboard/LearnScreen';
import pagbasa from './src/screens/Dashboard/Pagbasa';
import Pagsulat from './src/screens/Dashboard/Pagsulat';

// //chapter 2
import lesson1 from './src/screens/chapter2/Lessons/lesson1';
import act1 from './src/screens/chapter2/Lessons/act1';
import lesson3 from './src/screens/chapter2/Lessons/lesson3';
import act3 from './src/screens/chapter2/Lessons/act3';
import lesson2 from './src/screens/chapter2/Lessons/lesson2';
import act2 from './src/screens/chapter2/Lessons/act2';
import lesson4 from './src/screens/chapter2/Lessons/lesson4';
import act4 from './src/screens/chapter2/Lessons/act4';

// Introductions for each episode
import Chap1Intro from './src/screens/chapter1/Chap1Intro';
import Chap2Intro from './src/screens/chapter2/Chap2Intro';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Stack.Screen name="Practices" component={Practices} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="ClickableBooks" component={ClickableBooksScreen} />
          <Stack.Screen name="Skip" component={SkipScreen} />
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen name="AfterSetupScreen" component={AfterSetupScreen} />
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Chapter2Details" component={Chapter2DetailsScreen} />
          <Stack.Screen name="AfterChap" component={AfterChapScreen} />
          <Stack.Screen name="LastChap2" component={LastChap2Screen} />
          <Stack.Screen name="Ep2Details" component={Ep2DetailsScreen} />
          <Stack.Screen name="Ep2" component={Ep2Screen} />
          <Stack.Screen name="LastEp2" component={LastEp2Screen} />
          <Stack.Screen name="Ep3Details" component={Ep3DetailsScreen} />
          <Stack.Screen name="Ep3" component={Ep3Screen} />
          <Stack.Screen name="LastEp3" component={LastEp3Screen} />
          <Stack.Screen name="Ep4Details" component={Ep4DetailsScreen} />
          <Stack.Screen name="Ep4" component={Ep4Screen} />
          <Stack.Screen name="LastEp4" component={LastEp4Screen} />
          <Stack.Screen name="Closing" component={ClosingScreen} />
          <Stack.Screen name="Challenges" component={challenges} />
          <Stack.Screen name="Learn" component={learn} />

          <Stack.Screen name="Lesson1" component={lesson1} />
          <Stack.Screen name="Act1" component={act1} />
          <Stack.Screen name="Lesson3" component={lesson3} />
          <Stack.Screen name="Act3" component={act3} />
          <Stack.Screen name="Lesson2" component={lesson2} />
          <Stack.Screen name="Act2" component={act2} />
          <Stack.Screen name="Lesson4" component={lesson4} />
          <Stack.Screen name="Act4" component={act4} />

          <Stack.Screen name="Pagbasa" component={pagbasa} />
          <Stack.Screen name="Pagsulat" component={Pagsulat} />

          <Stack.Screen name="Chap1Intro" component={Chap1Intro} />
          <Stack.Screen name="Chap2Intro" component={Chap2Intro} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
