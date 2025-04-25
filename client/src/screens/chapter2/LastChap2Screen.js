import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback, Platform, Animated, ActivityIndicator, Image } from 'react-native';

const LastChap2Screen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false); // State for the modal
  const [showLoading, setShowLoading] = useState(false); // State for the loading screen
  const [showEpisodeIntro, setShowEpisodeIntro] = useState(false); // State for showing Episode 2 intro
  const [showDefaultFont, setShowDefaultFont] = useState(true);
  const [showEpisodeText, setShowEpisodeText] = useState(false);
  const [isCharacterVisible, setIsCharacterVisible] = useState(true);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const lines = [
    `Ah, magaling ang ginawa ninyong dalawa! Nagsimula na kayong maunawaan ang diwa ng Baybayin.`,
    `Ngayon, tandaan, bawat tunog ay may sariling kahalagahan. Ang mga simpleng tunog na ito ang magbubukas sa diwa ng natitirang sulat.`,
    `Malaking pag-unlad ang nagawa ninyo! Ngunit ito ay simula pa lamang. Kailangan nating magsanay at patatagin ang ating pag-unawa bago tayo magpatuloy.`,
    `Ngayon, kailangan nating tiyakin na ang mga tunog na ito ay bahagi na natin. Dahil ito ang gagabay sa atin upang mabasa ang mga kuwento ng nakaraan.`,
    `Tandaan, hindi ito karaniwang pag-aaral—ang inyong matututuhan ngayon ang magpoprotekta sa inyong kinabukasan.`,
  ];

  const handleNextDialogue = () => {
    if (dialogueStep === lines.length - 1) {
      setShowEpisodeModal(true); // Show the modal after the last dialogue
    } else {
      setDialogueStep(prev => prev + 1);
    }
  };

  const handleGoToEpisode2 = () => {
    setShowEpisodeModal(false);
    setShowLoading(true); // Show the loading screen

    // Simulate loading before showing Episode 2 intro
    setTimeout(() => {
      setShowLoading(false);
      setShowEpisodeIntro(true); // Show the Episode 2 intro
      setTimeout(() => setShowDefaultFont(false), 5000);
      setTimeout(() => setShowEpisodeText(true), 5000);
      setTimeout(() => navigation.navigate('Ep2Details'), 5000); // Navigate to Ep2Details after 15 seconds
    }, 5000); // Loading screen duration
  };

  const renderMainDialogue = () => {
    const currentMainCharacter = dialogueStep < 2 ? 'Namwaran' : 'Angkatan'; // Determine the current character

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentMainCharacter}:</Text>
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
      <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" style={styles.loadingIcon} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (showEpisodeIntro) {
    return (
      <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.textContainer}>
            {showEpisodeText ? (
              <Text style={styles.title}>Episode 2</Text> // Only "Episode 2" text
            ) : (
              <Text style={styles.title}>Episode 2</Text> // Default to "Episode 2"
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/image.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {/* Add character image outside the dialogue box */}
        {isCharacterVisible && (
          <View style={styles.characterImageContainer} pointerEvents="none">
            <Image
              source={dialogueStep < 2 
                ? require('../../assets/characters/namwaran2.png')
                : require('../../assets/characters/Ankatan1.png')
              }
              style={styles.characterImage}
            />
          </View>
        )}
        
        <View style={styles.dialogueContainer}>
          <View style={styles.dialogueTextContainer}>
            {renderMainDialogue()}
          </View>
        </View>
      </SafeAreaView>

      {/* Modal for "Go to Episode 2?" */}
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
                source={require('../../assets/lastquest.jpg')} // Replace with the correct background image path
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>Go to Episode 2?</Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={handleGoToEpisode2} // Show loading screen and Episode 2 intro
                  >
                    <Text style={styles.keepLearningText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Menu')} // Navigate to Main Menu
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

export default LastChap2Screen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.17)', // Increased opacity to 50% for a darker overlay
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
    color: '#d9d9d9',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center', // Center the modal horizontally
  },
  modalImageBackground: {
    width: '90%',
    height: 220, // Fixed height for the modal
    borderRadius: 12,
    overflow: 'hidden', // Ensures the image respects the border radius
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
    borderRadius: 12, // Slightly smaller than the outer border
    borderWidth: 2,
    borderColor: '#784C34', // Color for the inner border
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
    marginBottom: 10, // Adds spacing between the buttons
    width: 260, // Full width button
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
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#3D261C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#3D261C',
    textAlign: 'center',
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
