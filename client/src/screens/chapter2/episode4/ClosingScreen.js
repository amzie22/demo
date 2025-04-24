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
} from 'react-native';

const ClosingScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [characterName, setCharacterName] = useState('Scribeon');
  const [choiceDialogueStep, setChoiceDialogueStep] = useState(0);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false); // Modal state
  const [showLoading, setShowLoading] = useState(false); // Loading state
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
      'Option 3': 3,
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      setChoiceDialogueStep((prev) => prev + 1);
    } else {
      setShowEpisodeModal(true); // Show modal after the last choice dialogue
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      `Bukah—do you see that? The portal is already openin. The Library is pulling us forward through the copperplate!`,
      `Sulat… isulat mo…" ("Write… write it down…`,
      `Ang kwento ay hindi dapat mawala…" ("The story must not be lost…)`,
    ];

    if (dialogueStep < lines.length - 1) {
      setDialogueStep((prev) => prev + 1);
    } else {
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
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Proceed to the next episode?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleGoToNextEpisode}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowEpisodeModal(false)}
                  >
                    <Text style={styles.modalButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#784C34',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});