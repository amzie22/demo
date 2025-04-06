import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Image, Platform } from 'react-native';

const Chapter2DetailsScreen = ({ navigation }) => {
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
    setCharacterName('Scribeon'); // Reset to default
  };

  const handleChoiceDialogueNext = () => {
    if (selectedChoice === 'Option 1' && choiceDialogueStep === 4) {
      navigation.navigate('AfterChap');
      return;
    }

    if (selectedChoice === 'Option 2' && choiceDialogueStep === 3) {
      navigation.navigate('AfterChap');
      return;
    }

    if (selectedChoice === 'Option 2' && choiceDialogueStep === 0) {
      setCharacterName('Namwaran');
    }

    setChoiceDialogueStep(prev => prev + 1);
  };

  const handleNextDialogue = () => {
    const lines = [
      `Year of Siyaka 822, month of Waisaka.\nThe fourth day of the wailing moon.`,
      `This is the world where the first artifact\nrelated to Baybayin was created. The\nLaguna Copperplate 900 CE.`,
      `It seems I have transmigrated as\nAngkatan, the daughter of Namwaran.`,
      `Ah, Bukah, Angkatan, come here! Look\nat this! A scribe from the Commander-\nin-Chief of Tundun and Lord Minister of\nPailah`,
      `We have been pardoned of all our\ndebts. This is a joyous day for our\nfamily!`,
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

  const renderChoiceDialogue = () => {
    const dialogueLines = {
      'Option 1': [
        `"Real? Of course it is! The Library doesn't just show history—it lets us live it."`,
        `"But listen—we can't change what happened. Our mission is to learn, to remember. If we fail here, Baybayin might fade forever."`,
        `"What are you two whispering about? Anyways, as I said before, I'm going to start teaching both of you about Baybayin."`,
        `"To understand this meaningful and important blessing from the Commander and Chief of Tundun and Lord Minister of Pailah."`,
        `"This is very important not just to us, but also to our future generations. You both need to be ready to learn to read and write Baybayin and to fully understand this inscription."`,
      ],
      'Option 2': [
        `"We've been transmigrated into this story. You're Bukah now, Namwaran's son. This is your chance to learn Baybayin as they did back then."`,
        `"What are you two whispering about? Anyways, as I said before, I'm going to start teaching both of you about Baybayin."`,
        `"To understand this meaningful and important blessing from the Commander and Chief of Tundun and Lord Minister of Pailah."`,
        `"This is very important not just to us, but also to our future generations. You both need to be ready to learn to read and write Baybayin and to fully understand this inscription."`,
      ],
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter = (selectedChoice === 'Option 1' && choiceDialogueStep >= 2) || selectedChoice === 'Option 2'
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
      `Year of Siyaka 822, month of Waisaka.\nThe fourth day of the wailing moon.`,
      `This is the world where the first artifact\nrelated to Baybayin was created. The\nLaguna Copperplate 900 CE.`,
      `It seems I have transmigrated as\nAngkatan, the daughter of Namwaran.`,
      `Ah, Bukah, Angkatan, come here! Look\nat this! A scribe from the Commander-\nin-Chief of Tundun and Lord Minister of\nPailah`,
      `We have been pardoned of all our\ndebts. This is a joyous day for our\nfamily!`,
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
    <ImageBackground source={require('../../assets/chapter2.png')} style={styles.background}>
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
            {selectedChoice ? renderChoiceDialogue() : (
              dialogueStep === 5 ? (
                <View style={styles.choicesContainer}>
                  <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                    <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}>
                      <Text style={styles.choiceText}>This feels too real...Is this the past?</Text>
                    </Animated.View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                    <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}>
                      <Text style={styles.choiceText}>Where are we? Who is he?</Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              ) : renderMainDialogue()
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Chapter2DetailsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay with 30% opacity, consistent with Chapter 1
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dialogueContainer: {
    backgroundColor: 'rgba(252, 250, 250, 0.11)', // More transparent background like Chapter 1
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    width: '90%',
    height: 220, // Fixed height, matching Chapter 1
    marginBottom: Platform.OS === 'ios' ? 20 : -25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Optional: Add a border for better visibility
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
