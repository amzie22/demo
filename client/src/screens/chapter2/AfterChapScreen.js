import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const AfterChapScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Simulate loading time

    return () => clearTimeout(loadingTimeout); // Cleanup timeout
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const navigateTimeout = setTimeout(() => {
        navigation.navigate('LastChap2'); // CHANGE INTO LESSON 1
      }, 15000);

      return () => clearTimeout(navigateTimeout); // Cleanup timeout
    }
  }, [isLoading]);

  return (
    <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
      <ImageBackground 
        source={require('../../assets/MainBG.png')} // Parchment background
        style={styles.background}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" style={styles.loadingIcon} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.dialogue}>
              "Before you read this inscription, you {'\n'} must understand its bones—the three {'\n'}pure sound: 'A', 'E/I', 'O/U'. {'\n'}They are the roots of our script."
            </Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#e6d2a9',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIcon: {
    marginRight: 12,
  },
  loadingText: {
    fontSize: 20,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 150,
  },
  dialogue: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    lineHeight: 25,
    paddingTop: 50,
  },
});

export default AfterChapScreen;
