import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
} from 'react-native';

const Ep2DetailsScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [characterName, setCharacterName] = useState('Scribeon');
  const [choiceDialogueStep, setChoiceDialogueStep] = useState(0);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setChoiceDialogueStep(0);
    setCharacterName('Scribeon');
  };

  const handleChoiceDialogueNext = () => {
    // For the first dialogue step, increase the step counter
    if (choiceDialogueStep === 0) {
      if (selectedChoice === 'Option 2') {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep(1);
    } 
    // For the second dialogue step, navigate to Ep3 (not Ep3Screen)
    else if (choiceDialogueStep === 1) {
      navigation.navigate('Ep2');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      `Before you can write, you must first learn to feel the characters in your hands`,
      `The symbols of Baybayin are not just lines—they are expressions of sound , motion, and meaning. Now, let us begin with the foundational sounds.`,
      `The first characters you both have learned are 'A,' 'E/I,' and 'O/U.' Each one is unique, yet they form the base of our writing.`,
      `Feel each character as it comes to life in your hand.`,
    ];

    if (dialogueStep === lines.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else if (dialogueStep === lines.length) {
      navigation.navigate('NextScene');
    } else {
      setDialogueStep((prev) => prev + 1);
    }
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderChoiceDialogue = () => {
    const dialogueLines = {
      'Option 1': [
        `"Writing is not only a physical act but also a connection to our spirits and ancestors."`,
        `"Feeling the characters means you will truly understand their meaning and power. Without this, Baybayin will remain lifeless."`,
      ],
      'Option 2': [
        `"Patience, my child. Mastery comes from practice, from making the characters part of your daily rhythm."`,
        `" Each line, each curve should flow as naturally as the river outside. "`,
      ],
      'Option 3': [
        `"I've studied Baybayin extensively in the Library of Languages."`,
        `"But this is different—this is living it. Don't worry, Bukah, I'll guide you through every step. Just follow my lead."`,
      ],
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter =
      (selectedChoice === 'Option 1' && choiceDialogueStep >= 1) || 
      (selectedChoice === 'Option 2' && choiceDialogueStep >= 1)
        ? 'Namwaran'
        : characterName;

    return (
      <TouchableOpacity onPress={handleChoiceDialogueNext}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentCharacter}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{currentLine}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMainDialogue = () => {
    const lines = [
      `Before you can write, you must first learn to feel the characters in your hands`,
      `The symbols of Baybayin are not just lines—they are expressions of sound , motion, and meaning. Now, let us begin with the foundational sounds.`,
      `The first characters you both have learned are 'A,' 'E/I,' and 'O/U.' Each one is unique, yet they form the base of our writing.`,
      `Feel each character as it comes to life in your hand.`,
    ];

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{characterName}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{lines[dialogueStep]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../../../assets/chapter2.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>
          <View style={styles.characterImageContainer}>
            <Image
              source={require('../../../assets/characters/Scribeon.png')}
              style={[styles.characterImage]}
            />
          </View>

          <View style={styles.dialogueTextContainer}>
            {selectedChoice ? (
              renderChoiceDialogue()
            ) : dialogueStep === 4 ? (
              <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Why do we need to feel the characters?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>How can I master Baybayin?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Angkatan, do you know how to do this?</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            ) : (
              renderMainDialogue()
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Ep2DetailsScreen;

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
  choicesContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  choiceButton: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 20,
    width: 270,
    alignItems: 'center',
  },
  choiceText: {
    color: '#d9d9d9',
    fontSize: 14,
    textAlign: 'center',
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