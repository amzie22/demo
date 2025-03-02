// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={['#081c36', '#0f2e4c', '#081c36']}
      style={styles.container}
    >
      <View style={styles.cosmicOverlay}>
        <LinearGradient
          colors={['rgba(42, 82, 152, 0.6)', 'rgba(0, 0, 0, 0)']}
          style={styles.cosmicGlow}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.4 }}
        />
        
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
      
      <View style={styles.libraryBottom}>
        <View style={styles.libraryRow} />
      </View>
      
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <View style={styles.logoInner} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  cosmicGlow: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    top: 0,
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
  libraryBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(20, 35, 55, 0.8)',
  },
  libraryRow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(30, 20, 10, 0.8)',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 110, 127, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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