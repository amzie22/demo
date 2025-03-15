import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Sketch from '../../components/Sketch'; // Import the custom Sketch component
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const loadFonts = () => {
  return Font.loadAsync({
    'DoctrinaChristianaBold': require('../../assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const A = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigation = useNavigation();
  const sketchRef = useRef(null);

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

  const handleClear = () => {
    if (sketchRef.current) {
      sketchRef.current.clear();
    }
  };

  const handlePlay = () => {
    // Implement play functionality
  };

  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.background}
      resizeMode="cover"
      onError={() => setImageError(true)}
    >
      {imageError ? (
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load background image</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.overlayBox}>
            <Sketch ref={sketchRef} style={styles.canvas} />
          </View>
          <View style={styles.box}>
            <Text style={styles.smallText}>A</Text>
            <Text style={styles.largeText}>A</Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handlePlay}>
                <Icon name="play" size={40} color="#000" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Animation</Text>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity onPress={handleClear}>
                <Icon name="eraser" size={40} color="#000" />
              </TouchableOpacity>
              <Text style={styles.iconText}>Erase</Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    paddingBottom: 30,
  },
  smallText: {
    fontSize: 35,
    color: '#d9d9d9',
    textAlign: 'center',
    marginBottom: 10,
    top: 35,
  },
  largeText: {
    fontSize: 300,
    color: '#d9d9d9',
    textAlign: 'center',
    top: 0,
    fontFamily: 'DoctrinaChristianaBold', // Use the custom font
  },
  box: {
    width: 320,
    borderRadius: 16,
    backgroundColor: '#3D261C',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    position: 'relative',
    opacity: 0.7,
  },
  overlayBox: {
    position: 'absolute',
    width: 320,
    height: '60%',
    borderRadius: 16,
    top: '12%', 
    transform: [{ translateY: -'50%' }], // Corrected transform value
    zIndex: 1,
  },
  canvas: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 40,

  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000',
  },
});

export default A;