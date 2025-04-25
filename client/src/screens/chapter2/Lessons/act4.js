import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Sketch from '../../../components/Sketch'; // Adjust the path if necessary
import { Asset } from 'expo-asset'; // Import Asset from expo-asset
import { Audio } from 'expo-av'; // Import Audio from expo-av

const loadFonts = () => {
  return Font.loadAsync({
    'DoctrinaChristianaBold': require('../../../assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const preloadAssets = async () => {
  await Asset.loadAsync([
    require('../../../assets/MainBG.png'), // Preload MainBG
    require('../../../assets/lastquest.jpg'), // Preload modal background
  ]);
};

const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

const vowelsData = [
  { smallText: 'Ba', largeText: 'B', type: 1 }, // Type 1: With preview and big text
  { smallText: 'Ba', largeText: 'B', type: 2 },  // Type 2: Without preview and big text
  { smallText: 'Ka', largeText: 'K', type: 1 },
  { smallText: 'Ka', largeText: 'K', type: 2 },
  { smallText: 'Ra/Da', largeText: 'R', type: 1 },
  { smallText: 'Ra/Da', largeText: 'R', type: 2 },
];

const Act4 = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showWellDone, setShowWellDone] = useState(false); // State for "Well Done" screen
  const sketchRef = useRef(null);

  useEffect(() => {
    const loadResources = async () => {
      await preloadAssets();
      await loadFonts();
      setFontsLoaded(true);
    };

    loadResources();
  }, []);

  const handleClear = () => {
    if (sketchRef.current) {
      sketchRef.current.clear();
    }
  };

  const handleCheck = async () => {
    console.log('Checking accuracy...');
    setShowCheckModal(true); // Show the modal

    try {
      // Play sound based on accuracy
      if (currentProgress >= 70) {
        console.log('Playing CorrectModalSound');
        await playSound(require('../../../assets/sounds/CorrectModalSound.wav')); // High accuracy sound
      } else {
        console.log('Playing WrongModalSound');
        await playSound(require('../../../assets/sounds/WrongModalSound.wav')); // Low accuracy sound
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    setTimeout(() => {
      setShowPreview(false);
    }, 5800);
  };

  const handleFinish = async () => {
    try {
      // Play the FinishSound
      await playSound(require('../../../assets/sounds/FinishSound.wav'));
    } catch (error) {
      console.error('Error playing FinishSound:', error);
    }

    setShowWellDone(true); // Show the "Well Done" screen
    setTimeout(() => {
      navigation.navigate('LastEp4'); // Automatically navigate to "Challenges" after 10 seconds
    }, 10000);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../../../assets/MainBG.png')}
      style={styles.background}
    >
      {showWellDone ? (
        // "Well Done" Screen with MainBG as background
        <ImageBackground
          source={require('../../../assets/MainBG.png')}
          style={styles.finalScreenContainer}
        >
          <Text style={styles.finalScreenTitle}>Well Done!</Text>
          <Text style={styles.finalScreenSubtitle}>You completed the lesson!</Text>
        </ImageBackground>
      ) : (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => setShowQuitModal(true)}
            >
              <Ionicons name="close" size={28} color="#3D261C" />
            </TouchableOpacity>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${((currentIndex + 1) / vowelsData.length) * 100}%` },
                ]}
              />
            </View>
          </View>

          {/* Separator */}
          <View style={styles.line} />

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Draw the given syllable</Text>
          </View>

          {/* Content */}
          <View style={styles.container}>
            {vowelsData[currentIndex].type === 1 && showPreview && (
              <Image
                source={
                  currentIndex === 0
                    ? require('../../../assets/syllables/Ba.gif')
                    : currentIndex === 2
                    ? require('../../../assets/syllables/Ka.gif')
                    : currentIndex === 4
                    ? require('../../../assets/syllables/RaDa.gif')
                    : null
                }
                style={
                  currentIndex === 0
                    ? styles.gifBa
                    : currentIndex === 2
                    ? styles.gifKa
                    : currentIndex === 4
                    ? styles.gifRaDa
                    : null
                }
              />
            )}
            <View style={styles.overlayBox}>
              <Sketch ref={sketchRef} />
            </View>
            <View style={styles.box}>
              <Text style={styles.smallText}>{vowelsData[currentIndex].smallText}</Text>
              {vowelsData[currentIndex].type === 1 && (
                <Text style={styles.largeText}>{vowelsData[currentIndex].largeText}</Text>
              )}
            </View>

            {/* Progress Section */}
            <View style={styles.progressSection}>
              <View style={styles.progressRow}>
                <Text style={styles.progressText}>Goal: 70%</Text>
                <Text style={styles.progressText}>Current: {currentProgress}%</Text>
              </View>
            </View>

            <View style={styles.iconContainer}>
              {vowelsData[currentIndex].type === 1 && (
                <View style={styles.iconWrapper}>
                  <TouchableOpacity onPress={handlePreview}>
                    <FontAwesome name="play" size={35} color="#2E7D32" />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Preview</Text>
                </View>
              )}
              <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={handleClear}>
                  <FontAwesome name="repeat" size={35} color="#C62828" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Redo</Text>
              </View>
              <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={handleCheck}>
                  <FontAwesome name="check" size={35} color="#1976D2" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Check</Text>
              </View>
            </View>
          </View>

          {/* Quit Modal */}
          <Modal
            visible={showQuitModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowQuitModal(false)}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')}
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>
                  Are you sure you want to quit?{'\n'}
                  You'll lose progress in this lesson!
                </Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={() => setShowQuitModal(false)}
                  >
                    <Text style={styles.keepLearningText}>Keep Learning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.quitText}>Quit</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          {/* Check Modal */}
          <Modal
            visible={showCheckModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCheckModal(false)}
          >
            <View style={styles.modalOverlay}>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')}
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>
                  Accuracy: {currentProgress}%{/* Display current progress */}
                </Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={() => {
                      setShowCheckModal(false);
                      if (sketchRef.current) {
                        sketchRef.current.clear();
                      }
                      if (currentIndex < vowelsData.length - 1) {
                        setCurrentIndex((prev) => prev + 1); // Move to the next activity
                      } else {
                        handleFinish(); // Trigger the finish behavior
                      }
                    }}
                  >
                    <Text style={styles.keepLearningText}>
                      {currentIndex < vowelsData.length - 1 ? 'Next' : 'Finish'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowCheckModal(false)}>
                    <Text style={styles.quitText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#D4BD94',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  exitButton: {
    padding: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 15,
    borderRadius: 12,
    backgroundColor: '#d9d9d9',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3D261C',
    marginLeft: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#784C34',
    borderRadius: 12,
  },
  line: {
    height: 2,
    backgroundColor: '#3D261C',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    textAlign: 'center',
    lineHeight: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBox: {
    position: 'absolute',
    width: 320,
    height: '65%',
    borderRadius: 18,
    top: 17,
    transform: [{ translateY: -'50%' }],
    zIndex: 1,
  },
  box: {
    width: 320,
    borderRadius: 16,
    backgroundColor: '#3D261C',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65%',
    position: 'relative',
    opacity: 0.7,
    marginTop: -30,
  },
  smallText: {
    fontSize: 35,
    color: '#d9d9d9',
    textAlign: 'center',
    position: 'absolute', // Ensure consistent positioning
    top: 20, // Adjust to place it at the top
    left: 0,
    right: 0,
  },
  largeText: {
    fontSize: 300,
    color: '#d9d9d9',
    textAlign: 'center',
    top: 0,
    fontFamily: 'DoctrinaChristianaBold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    bottom: -10,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end', // Center the modal
    alignItems: 'center',
  },
  modalImageBackground: {
    width: '100%',
    height: 230, // Fixed height for the modal
    borderRadius: 16,
    overflow: 'hidden', // Ensures the image respects the border radius
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#D4BD94',
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
    width: '100%',
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
    width: 275, // Full width button
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
  progressSection: {
    marginVertical: 20,
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Adjust width as needed
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  previewGif: {
    width: 300, // Increase the width
    height: 230,// Increase the height
    position: 'absolute',
    top: 76, // Move it closer to the top
    zIndex: 2,
  },
  gifBa: {
    width: 316,
    height: 218,
    position: 'absolute',
    top: 99, // Adjust position for A
    left: 27, // Adjust horizontal position for A
    zIndex: 2,
  },
  gifKa: {
    width: 290,
    height: 235,
    position: 'absolute',
    top: 83, // Adjust position for E/I
    left: 35, // Adjust horizontal position for E/I
    zIndex: 2,
  },
  gifRaDa: {
    width: 285,
    height:220,
    position: 'absolute',
    top: 97, // Adjust position for O/U
    left: 43, // Adjust horizontal position for O/U
    zIndex: 2,
  },
  finalScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4BD94',
  },
  finalScreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D261C',
    marginBottom: 10,
  },
  finalScreenSubtitle: {
    fontSize: 18,
    color: '#3D261C',
    marginBottom: 20,
  },
});

export default Act4;