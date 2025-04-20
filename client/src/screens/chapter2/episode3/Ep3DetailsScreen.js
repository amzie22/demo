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

const Ep3DetailsScreen = ({ navigation }) => {
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
      'Option 2': 4,
      'Option 3': 3
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      if (selectedChoice === 'Option 2' && choiceDialogueStep === 0) {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep(prev => prev + 1);
    } else {
      navigation.navigate('Ep3');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
        `Yesterday, you both took the first step into understanding Baybayin by learning the vowels: 'A,' 'E/I,' and 'O/U.'`,
        `These pure sounds form the foundation of our script. Today, we move forward—to the consonants 'Ba,' 'Ka,' and 'Ra/Da.'`,
        `These will test your ability to carry the strength and rhythm of our language.`,
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
        `Because consonants draw their energy from vowels. Vowels are the lifeblood, the breath of every word. Without them, consonants are lifeless marks.`,
        `By mastering vowels first, you laid the foundation. Now you are ready to give strength to your words.`,
        `And 'Ba,' 'Ka,' and 'Ra/Da' are perfect to start with—because they appear in so many words. They're like the pillars of a house, sturdy and essential.`
      ],
      'Option 2': [
        `Ba' flows like the river, steady and unyielding. 'Ka' binds us together, a symbol of kinship and community.`,
        `'Ra' or 'Da' dances with motion, reflecting the balance of life. When you feel these meanings, your writing will hold power.`,
        `Think of them as the rhythm of language, Bukah. They’re not just shapes—they’re movement and connection.`,
        `Writing them is like capturing the river, the bamboo, and the wind in your hand.`
      ],
      'Option 3': [
        `You’ve already proven your diligence, Bukah. But remember—mastery is not achieved through haste.`,
        `It is a journey of understanding, patience, and care. Trust the process, and Baybayin will reward your efforts.`,
        `And don’t forget—you’re not alone in this. Namwaran and I are here to guide you every step of the way.`
      ],
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
      `Yesterday, you both took the first step into understanding Baybayin by learning the vowels: 'A,' 'E/I,' and 'O/U.'`,
      `These pure sounds form the foundation of our script. Today, we move forward—to the consonants 'Ba,' 'Ka,' and 'Ra/Da.'`,
      `These will test your ability to carry the strength and rhythm of our language.`,
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
                    <Text style={styles.choiceText}>Why are these consonants taught after the vowels?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>What makes these consonants special?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Do you think I can master them like the vowels?</Text>
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

export default Ep3DetailsScreen;

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