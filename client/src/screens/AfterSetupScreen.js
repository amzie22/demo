<<<<<<< Updated upstream
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Image, Platform, Modal } from 'react-native';

const AfterSetupScreen = ({ route, navigation }) => {
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image} from 'react-native';

const AfterSetupScreen = ({ route, navigation}) => {
>>>>>>> Stashed changes
  const { userName } = route.params;
  const [dialogueStep, setDialogueStep] = useState(0);
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleNextDialogue = () => {
    if (dialogueStep < 2) {
      setDialogueStep((prevStep) => prevStep + 1);
    } else {
      setIsModalVisible(true);
    }
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC']
  });

  const renderDialogue = () => {
    const dialogues = [
      { step: 0, text: `“Oh no! ${userName}! The book is fading away from the Archives! If we don’t act quickly, it will be lost forever!”` },
      { step: 1, text: '“You must journey through the Isles of Memory to rediscover its stories.”' },
      { step: 2, text: '“Only then can we restore its light and place among the world’s greatest writing systems.”' },
    ];

    const currentDialogue = dialogues.find(d => d.step === dialogueStep);
    if (currentDialogue) {
      return (
        <TouchableOpacity onPress={handleNextDialogue}>
          <View style={styles.dialogueTextContainer}>
            <View style={styles.characterNameContainer}>
              <Text style={styles.characterName}>Scribeon/Scrib:</Text>
            </View>
            <View style={styles.dialogueTextWrapper}>
              <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('MainMenu'); // Navigate to Main Menu
  };

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
<<<<<<< Updated upstream
        {dialogueStep < 3 && (
          <View style={styles.dialogueContainer}>
            {renderDialogue()}
          </View>
        )}
      </SafeAreaView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <View style={styles.modalInnerBorder} />
                <Text style={styles.modalText}>Accept Quest?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.modalButton, styles.modalButtonYes]} onPress={() => setIsModalVisible(false)}>
                    <Text style={{ color: '#fff' }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.modalButtonNo]} onPress={handleCloseModal}>
                    <Text style={{ color: '#000' }}>No</Text>
                  </TouchableOpacity>
                </View>
=======
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
                <TouchableOpacity style={styles.choiceButton1}  onPress={() => navigation.navigate('Menu')}>
                  <Text style={styles.choiceText}>Main Menu</Text>
                 
                </TouchableOpacity>
>>>>>>> Stashed changes
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

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
    justifyContent: 'flex-end', // Align to the bottom
    alignItems: 'center',
    paddingBottom: 50, // Add padding to the bottom
  },
  dialogueContainer: {
    backgroundColor: 'rgba(252, 250, 250, 0.11)',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    width: '90%',
    height: 220,
    marginBottom: Platform.OS === 'ios' ? 20 : -25,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'flex-start',
  },
  dialogueTextContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  dialogueTextWrapper: {
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
  openModalText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    width: 260,
    height: 160, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D261C',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 90,
    borderWidth: 0.5,
    borderColor: '#3D261C',
  },
  modalButtonYes: {
    backgroundColor: '#8D5E40', 
    color: '#fff',
    fontSize: 16,
  },
  modalButtonNo: {
    backgroundColor: 'white', 
    color: '#000',
    fontSize: 16,
  },
  modalInnerBorder: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#3D261C',
    borderRadius: 10,
  },
});

export default AfterSetupScreen;
