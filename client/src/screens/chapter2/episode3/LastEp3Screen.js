import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated, ActivityIndicator, Platform, Image } from 'react-native';

const LastEp3Screen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false); // State for the modal
  const [showLoading, setShowLoading] = useState(false); // State for the loading screen
  const [showEpisodeIntro, setShowEpisodeIntro] = useState(false); // State for showing Episode 4 intro
  const [isCharacterVisible, setIsCharacterVisible] = useState(true); // Add this state for character visibility
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const lines = [
    `Magaling, Bukah. Maingat kang nakikinig at ipinakita mong nauunawaan mo ang lakas ng mga tunog na ito.`,
    `Bukas, tayo ay kukuha ng susunod na hakbang—pagsulat ng mga katinig na ito, pagbibigay sa kanila ng pisikal na anyo.`,
    `Mas mabilis kang umuunlad kaysa sa inaasahan ko. Ang mga pantig na ito ay nagsisimula nang maging natural, hindi ba?`,
    `Ngunit tandaan, bawat stroke ay mangangailangan ng kawastuhan at pasensya. Mamayang gabi, magpahinga kang mabuti.`,
    `Tunay nga. Ang pagsulat ay hindi lamang pagsubok ng kasanayan—ito ay koneksyon sa iyong espiritu. Matulog ka na, mga anak ko. Ang gawain bukas ay mangangailangan ng matatag na kamay at malinaw na isip.`,
  ];

  const handleNextDialogue = () => {
    if (dialogueStep === lines.length - 1) {
      setShowEpisodeModal(true); // Show the modal after the last dialogue
      setIsCharacterVisible(false); // Hide character when showing modal
    } else {
      setDialogueStep(prev => prev + 1);
    }
  };

  const handleGoToEpisode4 = () => {
    setShowEpisodeModal(false);
    setShowLoading(true); // Show the loading screen

    // Simulate loading before showing Episode 4 intro
    setTimeout(() => {
      setShowLoading(false);
      setShowEpisodeIntro(true); // Show the Episode 4 intro
      setTimeout(() => navigation.navigate('Ep4Details'), 5000); // Navigate to Ep4Details after 5 seconds
    }, 5000); // Loading screen duration
  };

  const renderMainDialogue = () => {
    const currentMainCharacter = dialogueStep < 2 ? 'Namwaran' : 'Angkatan'; // Change Scribeon to Angkatan for consistency

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
      <ImageBackground source={require('../../../assets/MainBG.png')} style={styles.background}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" style={styles.loadingIcon} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (showEpisodeIntro) {
    return (
      <ImageBackground source={require('../../../assets/MainBG.png')} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Episode 4</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../../assets/image.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {/* Add character image */}
        {isCharacterVisible && (
          <View style={styles.characterImageContainer} pointerEvents="none">
            <Image
              source={dialogueStep < 2 
                ? require('../../../assets/characters/namwaran2.png')
                : require('../../../assets/characters/Ankatan1.png')
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

      {/* Modal for "Go to Episode 4?" */}
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
                source={require('../../../assets/lastquest.jpg')} // Replace with the correct background image path
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>Go to Episode 4?</Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={handleGoToEpisode4} // Show loading screen and Episode 4 intro
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

export default LastEp3Screen;

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#3D261C',
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
