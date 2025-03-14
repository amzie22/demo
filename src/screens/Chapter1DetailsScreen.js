import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';

const Chapter1DetailsScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    setDialogueStep(4); // Move to next step
  };

  const handleNextDialogue = () => {
    // Navigate to ClickableBooks when dialog is complete
    if ((dialogueStep === 9) && (selectedChoice === 'archives' || selectedChoice === 'why' || selectedChoice === 'who')) {
      navigation.navigate('ClickableBookScreen');
      return;
    }
    
    setDialogueStep(dialogueStep + 1);
  };

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>

          {/* Step 1: Initial Choices */}
          {dialogueStep === 0 && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"Hello? Where am I?"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>(Remain silent and observe.)</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: First Response */}
          {dialogueStep === 1 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                "Welcome, Traveler, to the Archives of the Written World. I am Scribeon, or you may call me Scrib."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 3: Second Response */}
          {dialogueStep === 2 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "These halls contain the voices of countless generations, whispering their stories across time."
              </Text>
            </TouchableOpacity>
          )}

          {/* Step 4: New Choices */}
          {dialogueStep === 3 && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('archives')}>
                <Text style={styles.choiceText}>"The Archives of the Written World?"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('why')}>
                <Text style={styles.choiceText}>"Why am I here?"
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('who')}>
                <Text style={styles.choiceText}>"Who are you?"
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {dialogueStep === 4 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "This archive is the heart of all written knowledge, a living repository of words, stories, and wisdom from countless civilizations."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 5 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Every language, every inscription, every thought ever recorded finds refuge here."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 6 && selectedChoice === 'archives' && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"Can I read these writings?"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"Who created this place?"</Text>
              </TouchableOpacity>
            </View>
          )}

          {dialogueStep === 7 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Enough talk, Traveler. The worlds call to you. Look around, let the whispers of history guide your steps."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 8 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "There is much to uncover, and only you can decide where your journey begins"
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 9 && selectedChoice === 'archives' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Feel free to look around..."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 4 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "You were chosen by the words themselves. Few are called, and even fewer arrive."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 5 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Perhaps there is a tale within you that must be written, or a secret within these walls meant only for you to uncover."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 6 && selectedChoice === 'why' && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"A tale within me? What do you mean?"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"How do I leave?"</Text>
              </TouchableOpacity>
            </View>
          )}

          {dialogueStep === 7 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Enough talk, Traveler. The worlds call to you. Look around, let the whispers of history guide your steps."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 8 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "There is much to uncover, and only you can decide where your journey begins"
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 9 && selectedChoice === 'why' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Feel free to look around..."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 4 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "I am Scribeon, guardian of these archives, and your guide."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 5 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Perhaps there is a tale within you that must be written, or a secret within these walls meant only for you to uncover."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 6 && selectedChoice === 'who' && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"What really is this place?"</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={handleNextDialogue}>
                <Text style={styles.choiceText}>"Can I read these writings?"</Text>
              </TouchableOpacity>
            </View>
          )}

          {dialogueStep === 7 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Enough talk, Traveler. The worlds call to you. Look around, let the whispers of history guide your steps."
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 8 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "There is much to uncover, and only you can decide where your journey begins"
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 9 && selectedChoice === 'who' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <Text style={styles.dialogueText}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text> "Feel free to look around..."
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
    backgroundColor: 'rgba(107, 103, 103, 0.61)',
    padding: 20,
    borderRadius: 15,
    width: '90%',
  },
  dialogueText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  choicesContainer: {
    marginTop: 54.7,
  },
  choiceButton: {
    backgroundColor: '#291711CC',
    padding: 10,
    marginLeft: 10,
    marginRight: 25,
    marginVertical: 5,
    borderRadius: 20,
  },
  choiceText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'left',
  },
});

export default Chapter1DetailsScreen;