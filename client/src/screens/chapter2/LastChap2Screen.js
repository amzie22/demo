import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Image, Platform } from 'react-native';

const LastChap2Screen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleNextDialogue = () => {
    const lines = [
      `Ah, you both have done well! You’ve taken the first steps into understanding the essence of Baybayin.`,
      `This is the world where the first artifact\nrelated to Baybayin was created. The\nLaguna Copperplate 900 CE.`,
      `You’ve made great progress! But this is just the beginning. Now, we must practice and solidify our understanding before we can move on.`,
      `Now, we must make sure these sounds are part of us. Because it will guide us to read the stories of the past.`,
      `Remember, this is no ordinary learning—what you learn now will protect you future.`,
    ];

    if (dialogueStep === lines.length) {
      navigation.navigate('NextScene');
    } else {
      setDialogueStep(prev => prev + 1);
    }
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderMainDialogue = () => {
    const lines = [
      `Ah, you both have done well! You’ve taken the first steps into understanding the essence of Baybayin.`,
      `Now, remember, each sound holds its own significance. These simple sounds will unlock the rest of the script’s essence.`,
      `You’ve made great progress! But this is just the beginning. Now, we must practice and solidify our understanding before we can move on.`,
      `Now, we must make sure these sounds are part of us. Because it will guide us to read the stories of the past.`,
      `Remember, this is no ordinary learning—what you learn now will protect you future.`,
    ];

    const currentMainCharacter = dialogueStep < 2 ? 'Namwaran' : 'Scribeon';

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentMainCharacter}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{lines[dialogueStep]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../../assets/image.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>
          <View style={styles.characterImageContainer}>
            <Image
              source={require('../../assets/characters/Scribeon.png')}
              style={[styles.characterImage]}
            />
          </View>
          <View style={styles.dialogueTextContainer}>
            {renderMainDialogue()}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LastChap2Screen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dialogueContainer: {
    backgroundColor: 'rgba(252, 250, 250, 0.11)',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    width: '90%',
    height: 220,
    marginBottom: Platform.OS === 'ios' ? 20 : -25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: 2,
  },
  dialogueTextContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  dialogueBox: {
    width: '100%',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  dialogueTextWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  characterNameContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  dialogueText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    flexWrap: 'wrap',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  characterImageContainer: {
    position: 'absolute',
    left: -70,
    bottom: 200,
    width: 100,
    height: '100%',
    justifyContent: 'center',
    zIndex: 0,
  },
  characterImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
