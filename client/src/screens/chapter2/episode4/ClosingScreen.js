import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Image, // Add Image import
} from 'react-native';

const ClosingScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [characterName, setCharacterName] = useState('Angkatan'); // Change from 'Scribeon' to 'Angkatan'
  const [choiceDialogueStep, setChoiceDialogueStep] = useState(0);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false); // Modal state
  const [showLoading, setShowLoading] = useState(false); // Loading state
  const [isCharacterVisible, setIsCharacterVisible] = useState(true); // Add character visibility state
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
    setCharacterName('Angkatan'); // Change from 'Scribeon' to 'Angkatan'
  };

  const handleChoiceDialogueNext = () => {
    const maxSteps = {
      'Option 1': 3,
      'Option 2': 3,
      'Option 3': 3,
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      // Handle character name changes for choice dialogues
      if (choiceDialogueStep === 0) {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep((prev) => prev + 1);
    } else {
      setIsCharacterVisible(false); // Hide character when showing modal
      setShowEpisodeModal(true); // Show modal after the last choice dialogue
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      `Bukah—nakikita mo ba iyon? Bumubukas na ang portal. Hinihila tayo ng Aklatan pasulong sa pamamagitan ng copperplate!`,
      `Sulat… isulat mo…" ("Write… write it down…`,
      `Ang kwento ay hindi dapat mawala…" ("The story must not be lost…)`,
    ];

    if (dialogueStep < lines.length - 1) {
      setDialogueStep((prev) => prev + 1);
    } else {
      setIsCharacterVisible(false); // Hide character when showing modal
      setShowEpisodeModal(true); // Show modal after the last main dialogue
    }
  };

  const handleGoToNextEpisode = () => {
    setShowEpisodeModal(false);
    setShowLoading(true); // Show loading screen

    // Simulate loading before navigating to the next screen
    setTimeout(() => {
      setShowLoading(false);
      navigation.navigate('NextEpisode'); // Replace with the actual next screen name
    }, 5000); // Loading duration
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderChoiceDialogue = () => {
    const dialogueLines = {
      'Option 1': [
        `Gumagalaw ang copperplate! Tinatawag tayo sa susunod na artifact, sa susunod nating destinasyon!`,
        `Ngayon, Bukah! Tumalon ka kasama ko!`,
        `Hawak! Ang susunod na artifact ay—`,
      ],
      'Option 2': [
        `Hindi mo makakalimutan. Ang Baybayin ay hindi lamang tinta—ito ay alaala. Pagkatiwalaan mo ang iyong mga kamay. Naaalala nila kahit na ang iyong isip ay nag-aalinlangan.`,
        `Ngayon, Bukah! Tumalon ka kasama ko!`,
        `Hawak! Ang susunod na artifact ay—`,
      ],
      'Option 3': [
        `Sa Aklatan, ang oras ay nagkukulupot tulad ng papel. Para sa kanya, hindi tayo umalis. Para sa atin… naghihintay ang susunod na kabanata.`,
        `Ngayon, Bukah! Tumalon ka kasama ko!`,
        `Hawak! Ang susunod na artifact ay—`,
      ],
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter = choiceDialogueStep >= 1 ? 'Namwaran' : characterName;

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
      `Bukah—nakikita mo ba iyon? Bumubukas na ang portal. Hinihila tayo ng Aklatan pasulong sa pamamagitan ng copperplate!`,
      `Sulat… isulat mo…" ("Write… write it down…`,
      `Ang kwento ay hindi dapat mawala…" ("The story must not be lost…)`,
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

  if (showLoading) {
    return (
      <ImageBackground source={require('../../../assets/chapter2.png')} style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" style={styles.loadingIcon} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../../assets/chapter2.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {/* Character image */}
        {isCharacterVisible && (
          <View style={styles.characterImageContainer} pointerEvents="none">
            <Image
              source={
                characterName === 'Namwaran'
                  ? require('../../../assets/characters/namwaran2.png')
                  : require('../../../assets/characters/Ankatan1.png')
              }
              style={styles.characterImage}
            />
          </View>
        )}

        <View style={styles.dialogueContainer}>
          <View style={styles.dialogueTextContainer}>
            {selectedChoice ? (
              renderChoiceDialogue()
            ) : (
              renderMainDialogue()
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* Modal for "Go to Next Episode?" */}
      <Modal
        visible={showEpisodeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEpisodeModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowEpisodeModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')}
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>Proceed to the next episode?</Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={handleGoToNextEpisode}
                  >
                    <Text style={styles.keepLearningText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Menu')}
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

export default ClosingScreen;

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageBackground: {
    width: 320,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  innerBorder: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  modalButtonsVertical: {
    alignItems: 'center',
    width: '100%',
  },
  keepLearningButton: {
    backgroundColor: 'rgba(83, 92, 104, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 16,
    width: 200,
    alignItems: 'center',
  },
  keepLearningText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quitText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
  },
  characterImageContainer: {
    position: 'absolute',
    left: 80,
    bottom: 260,
    width: 300,
    height: 300,
    zIndex: 3,
    pointerEvents: 'none',
  },
  characterImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});