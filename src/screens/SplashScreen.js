import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
  },);

  return (
    <ImageBackground source={require('../assets/splash.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.cosmicOverlay}>
          <View style={styles.starsContainer}>
            {[...Array(20)].map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.star, 
                  { 
                    top: Math.random() * 200, 
                    left: Math.random() * 400,
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2
                  }
                ]} 
              />
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cosmicOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    top: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 110, 127, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default SplashScreen;