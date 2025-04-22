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
    // Separate lines by character
    const dialogue = [
      { character: 'Scribeon', text: `Year of Siyaka 822, month of Waisaka.\nThe fourth day of the wailing moon.` },
      { character: 'Scribeon', text: `This is the world where the first artifact\nrelated to Baybayin was created. The\nLaguna Copperplate 900 CE.` },
      { character: 'Scribeon', text: `It seems I have transmigrated as\nAngkatan, the daughter of Namwaran.` },
      { character: 'Namwaran', text: `Ah, Bukah, Angkan, come here! Look\nat this! A scribe from the Commander-\nin-Chief of Tundun and Lord Minister of\nPailah` },
      { character: 'Namwaran', text: `We have been pardoned of all our\ndebts. This is a joyous day for our\nfamily!` },
    ];

    if (dialogueStep === dialogue.length) {
      navigation.navigate('NextScene');
    } else {
      // Update characterName based on the current dialogue step
      const currentDialogue = dialogue[dialogueStep];
      setCharacterName(currentDialogue.character);

      // Increment dialogueStep
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
    const dialogue = [
      { character: 'Scribeon', text: `Year of Siyaka 822, month of Waisaka. The fourth day of the wailing moon.` },
      { character: 'Scribeon', text: `This is the world where the first artifact related to Baybayin was created. The Laguna Copperplate 900 CE.` },
      { character: 'Scribeon', text: `It seems I have transmigrated as\nAngkatan, the daughter of Namwaran.` },
      { character: 'Namwaran', text: `Ah, Bukah, Angkatan, come here! Look at this! A scribe from the Commander-in-Chief of Tundun and Lord Minister of Pailah` },
      { character: 'Namwaran', text: `We have been pardoned of all our\ndebts. This is a joyous day for our family!` },
    ];

    const currentDialogue = dialogue[dialogueStep];

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentDialogue.character}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
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
          <View
            style={[
              styles.dialogueTextContainer,
              (selectedChoice || dialogueStep === 5) && styles.centeredDialogueTextContainer, // Apply centered style conditionally
            ]}
          >
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
    backgroundColor: 'rgba(20, 20, 20, 0.5)', // Increased opacity to 50% for a darker overlay
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
  centeredDialogueTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#d9d9d9',
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
    justifyContent: 'center', // Added to center the buttons vertically
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
