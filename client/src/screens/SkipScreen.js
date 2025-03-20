import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';

const SkipScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelectedChoice(choice);
    setDialogueStep(dialogueStep + 1); // Move to next step
  };

  const handleNextDialogue = () => {
    // Navigate to SetupScreen for specific conditions
    if ((dialogueStep === 5 && selectedChoice === 'never') || 
        (dialogueStep === 5 && selectedChoice === 'know') || 
        (dialogueStep === 4 && selectedChoice === 'seen')) {
      navigation.navigate('Setup'); // Correct screen name
      return;
    }
    
    setDialogueStep(dialogueStep + 1);
  };

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>

        {dialogueStep === 0 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "Ah... this one. It seems you have stumbled{'\n'} upon something rare."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 1 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "This is Baybayin - the ancient writing system {'\n'}of the Philippines. Have you heard it before?"
            </Text>
            </TouchableOpacity>
          )}


          
          {dialogueStep === 2 && (
            <View style={styles.choicesContainer}>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('never')}>
                <Text style={styles.choiceText}>"No, I've never heard of it."</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('know')}>
                <Text style={styles.choiceText}>"Yes, I know Baybayin."
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoiceSelection('seen')}>
                <Text style={styles.choiceText}>"I've seen it, but i don't know much."
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {dialogueStep === 3 && selectedChoice === 'never' && (
            <TouchableOpacity onPress={handleNextDialogue}>
             <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "No? That's not surprising. It has been {'\n'}forgotten by many."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 4 && selectedChoice === 'never' && (
            <TouchableOpacity onPress={handleNextDialogue}>
             <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "But perhaps, with your help, it can shine and{'\n'} be known again..."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 5 && selectedChoice === 'never' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "Before we proceed, I need you to answer{'\n'} these questions first..."
            </Text>
            </TouchableOpacity>
          )}


          {dialogueStep === 3 && selectedChoice === 'know' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText1}>
              "Ah, you're familiar with Baybayin! That's wonderful. Then you may know just how precious and unique it is."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 4 && selectedChoice === 'know' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "With your knowledge, we can help bring it {'\n'}back to the forefront."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 5 && selectedChoice === 'know' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText}>
              "Before we proceed, I need you to answer {'\n'}these questions first..."
            </Text>
            </TouchableOpacity>
          )}


          {dialogueStep === 3 && selectedChoice === 'seen' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText1}>
              "Then you're in the perfect place. Let us uncover its forgotten stories, and perhaps, you'll find a piece of yourself in its symbols."
            </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 4 && selectedChoice === 'seen' && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
             </View>
            <Text style={styles.dialogueText1}>
              "Before we proceed, I need you to answer these questions first..."
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
    marginLeft: 30,
    paddingTop: 2,
    paddingBottom: 55,
    marginBottom: 20,
  },
  dialogueText1: {
    color: '#FFFFFF',
    fontSize: 13,
    textAlign: 'left',
    marginLeft: 30,
    paddingTop: 2,
    paddingBottom: 58,
  },  
  characterName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
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

export default SkipScreen;