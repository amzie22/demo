import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const Ep4Screen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  const handlePress = () => {
    navigation.navigate('LastEp4'); // Replace with your route name if different
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress} activeOpacity={1}>
      <ImageBackground 
        source={require('../../../assets/MainBG.png')} // Parchment background
        style={styles.background}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.dialogue}>
              "Take your quill and begin. Trace the characters carefully, then write them freehand. Every stroke you make is an act of remembrance, a promise to carry the story forward."
            </Text>
            <View style={styles.silhouetteContainer}>
              <View style={styles.silhouette} />
            </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
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
  silhouetteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  silhouette: {
    width: 160,
    height: 320,
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
});

export default Ep4Screen;
