import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated } from 'react-native';

const Chapter1DetailsScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    setDialogueStep(4); // Move to next step
  };

  const handleNextDialogue = () => {
    // Navigate to ClickableBooks when dialog is complete
    if ((dialogueStep === 9) && (selectedChoice === 'archives' || selectedChoice === 'why' || selectedChoice === 'who')) {
      navigation.navigate('ClickableBooks');
      return;
    }
    
    setDialogueStep(dialogueStep + 1);
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC']
  });

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>

          {/* Step 1: Initial Choices */}
          {dialogueStep === 0 && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity onPress={handleNextDialogue}>
                <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                  <Text style={styles.choiceText}>"Hello? Where am I?"</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextDialogue}>
                <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                  <Text style={styles.choiceText}>(Remain silent and observe.)</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: First Response */}
          {dialogueStep === 1 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                "Welcome, Traveler, to the Archives of {'\n'} the Written World. I am Scribeon, or you {'\n'} may call me Scrib."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 3: Second Response */}
          {dialogueStep === 2 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
                "These halls contain the voices of {'\n'} countless generations, whispering their {'\n'} stories across time."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 4: New Choices */}
          {dialogueStep === 3 && (
            <View style={styles.choicesContainer1}>
              <TouchableOpacity onPress={() => handleChoiceSelection('archives')}>
                <Animated.View style={[styles.choiceButton1, { backgroundColor: interpolatedColor }]}>
                  <Text style={styles.choiceText}>"The Archives of the Written World?"</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChoiceSelection('why')}>
                <Animated.View style={[styles.choiceButton1, { backgroundColor: interpolatedColor }]}>
                  <Text style={styles.choiceText}>"Why am I here?"</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChoiceSelection('who')}>
                <Animated.View style={[styles.choiceButton1, { backgroundColor: interpolatedColor }]}>
                  <Text style={styles.choiceText}>"Who are you?"</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 5: First Response */}
          {dialogueStep === 4 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText1}>
                "This archive is the heart of all written knowledge, a living repository of words, stories, and wisdom from countless civilizations."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 6: Second Response */}
          {dialogueStep === 4 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName1}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
                "You were chosen by the words themselves. Few are called, and even fewer arrive."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 7: Third Response */}
          {dialogueStep === 4 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
                "You were chosen by the words themselves. Few are called, and even fewer arrive."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 8: Fourth Response */}
          {dialogueStep === 5 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText2}>
              “Every language, every inscription, every {'\n'} thought ever recorded finds refuge {'\n'}here.”
              </Text>
            </TouchableOpacity>
          )}
            {dialogueStep === 5 && selectedChoice === 'why' && (
              <TouchableOpacity onPress={handleNextDialogue}>
                <View style={styles.characterContainer}>
                  <Text style={styles.characterName}>Scribeon/Scrib:</Text>
                </View>
                <Text style={styles.dialogueText2}>
                “Perhaps there is a tale within you that {'\n'}must be written, or a secret within these {'\n'}walls meant only for you to uncover.”
                </Text>
              </TouchableOpacity>
          )}
          {dialogueStep === 5 && selectedChoice === 'who' && (
              <TouchableOpacity onPress={handleNextDialogue}>
                <View style={styles.characterContainer}>
                  <Text style={styles.characterName}>Scribeon/Scrib:</Text>
                </View>
                <Text style={styles.dialogueText2}>
                “Perhaps there is a tale within you that {'\n'}must be written, or a secret within these {'\n'}walls meant only for you to uncover.”
                </Text>
              </TouchableOpacity>
          )}

          {/* Step 9: Fifth Response */}
          {dialogueStep === 6 && selectedChoice === 'archives' && (
            <View style={styles.choicesContainer2}>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"Can i read these writings?"</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"Who created this place?"</Text>
              </Animated.View>
            </TouchableOpacity>
            </View>
          )}
          {dialogueStep === 6 && selectedChoice === 'why' && (
              <TouchableOpacity onPress={handleNextDialogue}>
                <View style={styles.characterContainer}>
                  <Text style={styles.characterName}>Scribeon/Scrib:</Text>
                </View>
                <Text style={styles.dialogueText3}>
                "The Archives do not bring visitors {'\n'}without reason."
                </Text>
              </TouchableOpacity>
          )}
          {dialogueStep === 6 && selectedChoice === 'who' && (
            <View style={styles.choicesContainer}>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"What really is this place?"</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"Can i read these writing?"</Text>
              </Animated.View>
            </TouchableOpacity>
            </View>
          )}
          
          {/* Step 10: Sixth Response */}
          {dialogueStep === 7 && selectedChoice === 'why' && (
            <View style={styles.choicesContainer2}>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"A tale within me? What do you mean?"</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDialogue}>
              <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedColor }]}>
                <Text style={styles.choiceText}>"How do I leave?"</Text>
              </Animated.View>
            </TouchableOpacity>
            </View>
          )}

          {/* Step 11: Seventh Response */}
          {dialogueStep === 7 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText2}>
              "Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.”
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 8 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText2}>
              "Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.”
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 7 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText2}>
              "Enough talk, Traveler. The words call to you. Look around, let the whispers of history guide your steps.”
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 12: Eight Response */}
          {dialogueStep === 8 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName1}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
              “There is much to uncover, and only you {'\n'}can decide where your journey begins."
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 9 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName1}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
              “There is much to uncover, and only you {'\n'}can decide where your journey begins."
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 8 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName1}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
              “There is much to uncover, and only you {'\n'}can decide where your journey begins."
              </Text>
            </TouchableOpacity>
          )}
          {/* Step 13: Ninth Response */}
          {dialogueStep === 9 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText4}>
              “Feel free to look around...”
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 10 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName1}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText4}>
              “Feel free to look around...”
              </Text>
            </TouchableOpacity>
          )}
          {dialogueStep === 9 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText4}>
              “Feel free to look around...”
              </Text>
            </TouchableOpacity>
          )}

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dialogueContainer: {
    backgroundColor: 'rgba(143, 139, 139, 0.38)',
    padding: 20,
    borderRadius: 15,
    width: '91%',
  },
  dialogueText: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 40,
    paddingTop: 38,
    paddingBottom: 60,
  },
  dialogueText1: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 40,
    paddingTop: 33,
    paddingBottom: 50,
  },
  dialogueText2: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 14,
    paddingTop: 26,
    paddingBottom: 57,
  },
  dialogueText3: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 14,
    paddingTop: 26,
    paddingBottom: 72,
  },
  dialogueText4: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 30,
    paddingBottom: 87,
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  characterName1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 15,
  },
  characterContainer: {
    marginTop: 2,
    marginBottom: -29,
    marginLeft: 20,
  },
  choicesContainer: {
    marginTop: 54.7,
  },
  choicesContainer1: {
    marginTop: 19,
  },
  choicesContainer2: {
    marginTop: 19,
    marginBottom: 35,
  },
  choiceButton: {
    padding: 10,
    marginLeft: 10,
    marginRight: 25,
    marginVertical: 5,
    borderRadius: 20,
  },
  choiceButton1: {
    padding: 8,
    marginLeft: 10,
    marginRight: 25,
    marginVertical: 5,
    borderRadius: 20,
  },
  choiceText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 8,
  },
});

export default Chapter1DetailsScreen;
