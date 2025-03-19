import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image } from 'react-native';

const AfterSetupScreen = ({ route }) => {
  const { userName } = route.params;
  const [dialogueStep, setDialogueStep] = useState(0);

  const handleNextDialogue = () => {
    setDialogueStep((prevStep) => prevStep + 1);
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
                “Oh no! {userName}! The book is fading away from {'\n'}the Archives! If we don’t act quickly, it will be lost forever!”
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 1 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
                “You must journey through the Isles of Memory to rediscover its stories.”
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 2 && (
            <TouchableOpacity onPress={handleNextDialogue}>
              <View style={styles.characterContainer}>
                <Text style={styles.characterName}>Scribeon/Scrib:</Text>
              </View>
              <Text style={styles.dialogueText}>
                “Only then can we restore its light and place among the world’s greatest writing systems.”
              </Text>
            </TouchableOpacity>
          )}

          {dialogueStep === 3 && (
            <View style={styles.questContainer}>
              {/* Background Image for the exact size */}
              <Image source={require('../assets/lastquest.jpg')} style={styles.questImage} />

              {/* Content Over Image */}
              <Text style={styles.dialogueText3}>Accept Quest?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.choiceButton}>
                  <Text style={styles.choiceText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton1}>
                  <Text style={styles.choiceText}>Main Menu</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogueContainer: {
    padding: 20,
    borderRadius: 15,
    width: '90%',
  },
  dialogueText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 15,
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  questContainer: {
    width: 305,  // Fixed width
    height: 185, // Fixed height
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#784C34',
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden', 
  },
  questImage: {
    position: 'absolute', // Puts it in the background
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Makes sure it fills the entire container
  },
  dialogueText3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 19,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  choiceButton: {
    backgroundColor: '#784C34',
    paddingVertical: 10,
    paddingHorizontal: 38,
    borderRadius: 10,
  },
  choiceButton1: {
    backgroundColor: '#784C34',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  choiceText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default AfterSetupScreen;
