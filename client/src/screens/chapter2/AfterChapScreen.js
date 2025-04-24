import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

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
        navigation.navigate('Lesson1'); // CHANGE INTO LESSON 1
      }, 5000); // Navigate after loading

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
              "Bago mo basahin ang inskripsiyong ito, kailangan mong maunawaan ang mga ugat nito—ang tatlong dalisay na tunog: 'A', 'E/I', 'O/U'. Sila ang mga pinagmulan ng ating sulat."
            </Text>
            <Image 
              source={require('../../assets/characters/namwaran1.png')} 
              style={styles.characterImage} 
            />
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
    paddingTop: 120,
  },
  dialogue: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
  },
  characterImage: {
    width: 350, // Adjust width as needed
    height: 350, // Adjust height as needed
    alignSelf: 'center',
    marginTop: 30,
    opacity: 1, // Adjust opacity to make it subtle
  },
});

export default AfterChapScreen;
