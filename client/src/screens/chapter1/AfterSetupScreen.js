import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Image, Platform, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

const AfterSetupScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const [dialogueStep, setDialogueStep] = useState(0);
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [showAnimation, setShowAnimation] = useState(true); // Control animation visibility

  useEffect(() => {
    // Give more time for the animation to load and play fully
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 20000); // Increased from 3000ms to 5000ms
    
    return () => clearTimeout(timer);
  }, []);

  const handleNextDialogue = () => {
    if (dialogueStep < 2) {
      setDialogueStep((prevStep) => prevStep + 1);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleAcceptQuest = () => {
    setIsModalVisible(false);
    setIsLoading(true); // Show loading screen
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Chap2Intro', { episode: 1 }); // Navigate to Chap2Intro with episode 1
    }, 3000); // Simulate a 3-second loading duration
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('Menu'); // Navigate to MenuScreen
  };

  if (isLoading) {
    return (
      <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" style={styles.loadingIcon} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

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

  return (
    <ImageBackground source={require('../../assets/back.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {showAnimation ? (
          <View style={styles.animationContainer}>
            <Image 
              source={require('../../assets/animation/fade.gif')}
              style={styles.animation}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.dialogueContainer}>
            <View style={styles.characterImageContainer}>
              {dialogueStep < 3 && (
                <Image
                  source={require('../../assets/characters/Scribeon.png')}
                  style={[styles.characterImage]}
                />
              )}
            </View>
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
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ImageBackground
                source={require('../../assets/lastquest.jpg')} // Replace with the correct background image path
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>Accept Quest?</Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={handleAcceptQuest}
                  >
                    <Text style={styles.keepLearningText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.quitText}>Main Menu</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIcon: {
    marginRight: 12,
  },
  loadingText: {
    fontSize: 20,
    color: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dialogueContainer: {
    backgroundColor: 'rgba(15, 15, 15, 0.51)',
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
  characterImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  characterImageContainer: {
    position: 'absolute',
    right: 140,
    bottom: 200,
    width: 100,
    height: '100%',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageBackground: {
    width: '90%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerBorder: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#784C34',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    textAlign: 'center',
  },
  modalButtonsVertical: {
    width: '40%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepLearningButton: {
    backgroundColor: '#784C34',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: 260,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  keepLearningText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quitText: {
    color: '#6F1D1B',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  animationContainer: {
    width: '90%',
    height: 300, // Increased height for better visibility
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 15, 0.51)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  debugText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute', 
    top: 10,
    zIndex: 10,
  },
});

export default AfterSetupScreen;
