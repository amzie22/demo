import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Ep3Screen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    // Show loading for 5 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowDialogue(true);
    }, 5000);

    // Show dialogue for 10 seconds, then navigate
    const dialogueTimer = setTimeout(() => {
      navigation.navigate('Lesson3'); // Replace with your route name if different
    }, 15000); // 5 seconds (loading) + 10 seconds (dialogue)

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(dialogueTimer);
    };
  }, []);

  const handlePress = () => {
    navigation.navigate('Lesson3'); // Replace with your route name if different
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
        ) : showDialogue ? (
          <View style={styles.contentContainer}>
            <Text style={styles.dialogue}>
              "Ang iyong susunod na gawain ay ipares ang mga tunog na ito sa kanilang mga simbolo. Ang pagsasanay na ito ay makakatulong sa iyo na maalala at igalang ang diwa ng mga katinig na ito."
            </Text>
            <Image 
              source={require('../../../assets/characters/namwaran1.png')} 
              style={styles.characterImage} 
            />
          </View>
        ) : null}
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
    marginLeft: 12,
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
    width: 350,
    height: 350,
    alignSelf: 'center',
    marginTop: 30,
    opacity: 1,
  },
});

export default Ep3Screen;
