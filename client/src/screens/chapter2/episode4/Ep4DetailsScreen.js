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

const Ep4DetailsScreen = ({ navigation }) => {
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
    const maxSteps = {
      'Option 1': 3,
      'Option 2': 3,
      'Option 3': 4
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      if (selectedChoice === 'Option 2' && choiceDialogueStep === 0) {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep(prev => prev + 1);
    } else {
      navigation.navigate('Ep4');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      `Now, you will bring them to life. Writing is more than marks on parchment—it is a dance of meaning.`,
      `Each stroke must flow like the river, steady and purposeful.`,
      `Writing feels different, doesn't it, Bukah? It's like taking the sounds you've learned and giving them a physical body.`,
      `But don't rush—it's a journey, not a race.`,
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
        `Perfection is a distraction, Bukah. What matters is your intent and understanding.`,
        `Even the copperplate, which carries the most important story of our family, has imperfections. Yet its message endured for centuries.`,
        `Besides, mistakes make learning meaningful. They remind us that mastery is earned through effort.`
      ],
      'Option 2': [
        `Focus on the balance and fluidity of each line. Let your hand flow with purpose, like the river outside.`,
        `Writing is not about force—it is about connection.`,
        `And don't forget—breathing helps too! When your mind is calm, your hand will follow.`
      ],
      'Option 3': [
        `Absolutely. Writing deepens your connection to the script. It transforms knowledge into practice, and practice into preservation.`,
        `This is how Baybayin will survive.`,
        `Namwaran's right, Bukah. Writing these symbols makes you part of their story.`,
        `It's like passing on a torch that has burned for generations.`
      ]
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter = 
      (selectedChoice === 'Option 1' && choiceDialogueStep >= 1) || 
      (selectedChoice === 'Option 2' && choiceDialogueStep >= 1) ||
      (selectedChoice === 'Option 3' && choiceDialogueStep >= 1)
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
      `Now, you will bring them to life. Writing is more than marks on parchment—it is a dance of meaning.`,
      `Each stroke must flow like the river, steady and purposeful.`,
      `Writing feels different, doesn't it, Bukah? It's like taking the sounds you've learned and giving them a physical body.`,
      `But don't rush—it's a journey, not a race.`,
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
            ) : dialogueStep === 3 ? (
              <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>What if my strokes don't look perfect?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>How can I make my strokes feel alive?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Will writing them help me understand Baybayin better?</Text>
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

export default Ep4DetailsScreen;

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