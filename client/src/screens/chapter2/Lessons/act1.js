import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated, Easing, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import { Platform } from 'react-native'; // Import Platform module

// Utility Functions
const randomizeChoices = () => {
  // Always return the same three choices in randomized order
  const allChoices = ['A', 'E/I', 'O/U'];
  return allChoices.sort(() => Math.random() - 0.5);
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

const getCurrentLetter = (activity) => {
  // Define the correct answer for each activity
  if (activity >= 1 && activity <= 3) return 'A';
  if (activity >= 4 && activity <= 6) return 'E/I';
  if (activity >= 7 && activity <= 9) return 'O/U';
  return null; // Default case (e.g., for activity 10)
};

// Header Component
const Header = ({ progress, onExit }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.exitButton} onPress={onExit}>
      <Ionicons name="close" size={28} color="#3D261C" />
    </TouchableOpacity>
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  </View>
);

// Hearts Component
const Hearts = ({ hearts }) => (
  <View style={styles.heartsContainer}>
    {hearts.map((isFilled, index) => (
      <Ionicons
        key={index}
        name={isFilled ? 'heart' : 'heart-outline'}
        size={24}
        color="red"
        style={{ marginHorizontal: 5 }}
      />
    ))}
  </View>
);

// Activity Component
const Activity = ({ type, letter, displayLetter, choices, title, onCorrect, onWrong }) => {
  return (
    <View style={styles.activityContainer}>
      <Text style={styles.activityText}>{title}</Text>
      <View style={styles.bigBoxContainer}>
        {type !== 3 && (
          <TouchableOpacity
            style={[
              styles.bigBox,
              type === 2 && { width: 197, height: 187 }, // Adjust size for type 2
            ]}
            // onPress={type !== 3 ? () => playSound(require(`../../../assets/sounds/${letter}.mp3`)) : null}
          >
            {type === 1 && <Text style={styles.bigBoxText}>{displayLetter}</Text>}
            <Ionicons
              name="volume-high"
              size={type === 1 || type === 4 || type === 7 ? 40 : 80} // Different sizes for 1,4,7 and 2,5,8
              color="#d9d9d9"
              style={[
                type === 1 || type === 4 || type === 7
                  ? styles.soundIconType1
                  : styles.soundIconType2, // Apply different styles
              ]}
            />
          </TouchableOpacity>
        )}
        {type === 3 && (
          <View style={styles.bigBox}>
            <Text style={styles.bigBoxText}>{displayLetter}</Text>
          </View>
        )}
      </View>
      <View style={styles.smallBoxesContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.smallBox}
            onPress={choice === letter ? onCorrect : onWrong}
          >
            <Text
              style={[
                styles.smallBoxText,
                // Apply DoctrinaChristianaBold font for all choices in activities 2, 5, 8
                (type === 2 || type === 5 || type === 8) && { fontFamily: 'DoctrinaChristianaBold' },
                (type === 2 || type === 5 || type === 8) && {
                  fontSize: Platform.OS === 'ios' ? 60 : 50, // Adjust font size for iOS and Android
                },
              ]}
            >
              {/* Display simplified letters for activities 2, 5, 8 */}
              {(type === 2 || type === 5 || type === 8) && choice === 'A'
                ? 'A'
                : (type === 2 || type === 5 || type === 8) && choice === 'E/I'
                ? 'E'
                : (type === 2 || type === 5 || type === 8) && choice === 'O/U'
                ? 'O'
                : choice}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MatchingActivity = ({ pairs, title, onComplete }) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    // Shuffle the left and right items
    setLeftItems(pairs.map((pair) => pair.normal).sort(() => Math.random() - 0.5));
    setRightItems(pairs.map((pair) => pair.bold).sort(() => Math.random() - 0.5));
  }, [pairs]);

  const playSound = async (soundFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync(); // Unload the sound after it finishes playing
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleMatch = async () => {
    if (selectedLeft && selectedRight) {
      const match = pairs.find(
        (pair) => pair.normal === selectedLeft && pair.bold === selectedRight
      );
      if (match) {
        await playSound(require('../../../assets/sounds/CorrectModalSound.wav')); // Play correct sound
        setMatchedPairs((prev) => [...prev, match]);
        setSelectedLeft(null);
        setSelectedRight(null);

        // Check if all pairs are matched
        if (matchedPairs.length + 1 === pairs.length) {
          onComplete();
        }
      } else {
        await playSound(require('../../../assets/sounds/WrongModalSound.wav')); // Play wrong sound
        setSelectedLeft(null);
        setSelectedRight(null);
      }
    }
  };

  useEffect(() => {
    handleMatch();
  }, [selectedLeft, selectedRight]);

  const isMatched = (item, type) => {
    return matchedPairs.some((pair) =>
      type === 'left' ? pair.normal === item : pair.bold === item
    );
  };

  return (
    <View style={styles.matchingContainer}>
      <Text style={styles.matchingTitle}>{title}</Text>
      <View style={styles.matchingColumnsContainer}>
        {/* Left Column */}
        <View style={styles.matchingColumn}>
          {leftItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.matchingItem,
                selectedLeft === item && styles.selectedItem,
                isMatched(item, 'left') && styles.lockedItem, // Apply locked style if matched
              ]}
              onPress={() => !isMatched(item, 'left') && setSelectedLeft(item)} // Disable selection if locked
              disabled={isMatched(item, 'left')} // Disable button if matched
            >
              <Text style={styles.matchingText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Column */}
        <View style={styles.matchingColumn}>
          {rightItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.matchingItem,
                selectedRight === item && styles.selectedItem,
                isMatched(item, 'right') && styles.lockedItem, // Apply locked style if matched
              ]}
              onPress={() => !isMatched(item, 'right') && setSelectedRight(item)} // Disable selection if locked
              disabled={isMatched(item, 'right')} // Disable button if matched
            >
              <Text style={[styles.matchingText, { fontFamily: 'DoctrinaChristianaBold', fontSize: 70 }]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

// Main Component
const Act1 = ({ navigation }) => {
  const [progress, setProgress] = useState(0.1);
  const [hearts, setHearts] = useState([true, true, true, true]);
  const [currentActivity, setCurrentActivity] = useState(1);
  const [choices, setChoices] = useState([]);
  const [showQuitModal, setShowQuitModal] = useState(false); // State for quit modal visibility
  const [showHeartLostModal, setShowHeartLostModal] = useState(false); // State for heart lost modal visibility
  const [isHeartLostModalShown, setIsHeartLostModalShown] = useState(false); // Tracks if heart lost modal has been shown
  const [showCorrectModal, setShowCorrectModal] = useState(false); // State for correct answer modal visibility
  const [showWrongModal, setShowWrongModal] = useState(false); // State for wrong answer modal visibility
  const [orchiviumCount, setOrchiviumCount] = useState(0); // State to track Orchivium count
  const [showWellDone, setShowWellDone] = useState(false); // State to control "Well Done" visibility
  const [showLoadingScreen, setShowLoadingScreen] = useState(false); // State to control loading screen visibility
  const [bgMusic, setBgMusic] = useState(null); // State for background music

  useEffect(() => {
    const preloadAssets = async () => {
      await Asset.loadAsync([
        require('../../../assets/MainBG.png'),
        require('../../../assets/lastquest.jpg'),
      ]);
    };

    const loadMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        // require('../../../assets/sounds/LessonBgMusic.mp3')
      );
      setBgMusic(sound);
      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.2);
      await sound.playAsync();
    };

    preloadAssets();
    loadMusic();

    return () => {
      if (bgMusic) {
        bgMusic.stopAsync();
        bgMusic.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const updateChoices = () => {
      setChoices(randomizeChoices());
    };

    updateChoices();
  }, [currentActivity]);

  useEffect(() => {
    const handleFinishActivity = async () => {
      if (currentActivity === 11) {
        if (bgMusic) {
          await bgMusic.stopAsync();
          await bgMusic.unloadAsync();
        }

        await playSound(require('../../../assets/sounds/FinishSound.wav'));
        setShowWellDone(true);

        const timeout = setTimeout(() => {
          navigation.navigate('LastChap2');
        }, 10000);

        return () => clearTimeout(timeout);
      }
    };

    handleFinishActivity();
  }, [currentActivity]);

  const pauseMusic = async () => {
    if (bgMusic) {
      await bgMusic.pauseAsync();
    }
  };

  const resumeMusic = async () => {
    if (bgMusic) {
      await bgMusic.playAsync();
    }
  };

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 0.1, 1));
    setCurrentActivity((prev) => prev + 1);
  };

  const incrementOrchivium = () => {
    setOrchiviumCount((prev) => prev + 1); // Increment Orchivium count
  };

  const handleCorrectAnswer = async () => {
    await playSound(require('../../../assets/sounds/CorrectModalSound.wav'));
    incrementOrchivium(); // Increment Orchivium count
    setShowCorrectModal(true); // Show the correct answer modal
  };

  const handleWrongAnswer = async () => {
    await playSound(require('../../../assets/sounds/WrongModalSound.wav'));
    setHearts((prev) => {
      const updatedHearts = [...prev];
      const lastFilledIndex = updatedHearts.lastIndexOf(true);
      if (lastFilledIndex !== -1) {
        updatedHearts[lastFilledIndex] = false;
      }

      // Show the heart lost modal only on the first mistake
      if (!isHeartLostModalShown) {
        setShowHeartLostModal(true);
        setIsHeartLostModalShown(true);
      } else {
        // Show the wrong answer modal on subsequent mistakes
        setShowWrongModal(true);
      }

      return updatedHearts;
    });
  };

  const getTitle = (activity) => {
    // Return a custom title for specific activities
    if ([2, 5, 7].includes(activity)) {
      return "What do you hear?";
    }
    if (activity === 10) {
      return "Tap the matching pairs";
    }
    return "Select the correct syllable/letter";
  };

  return (
    <ImageBackground source={require('../../../assets/MainBG.png')} style={styles.background}>
      {currentActivity !== 11 && (
        <>
          <Header progress={progress} onExit={() => {
            setShowQuitModal(true);
            pauseMusic();
          }} />
          <View style={styles.line} />
          <Hearts hearts={hearts} />
        </>
      )}
      {currentActivity === 11 && showWellDone && (
        <View style={styles.finalScreenContainer}>
          <Text style={styles.finalScreenTitle}>Well Done!</Text>
          <Text style={styles.finalScreenSubtitle}>{orchiviumCount} Orchivium</Text>
        </View>
      )}
      {/* Quit Modal */}
      <Modal
        visible={showQuitModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowQuitModal(false);
          resumeMusic();
        }}
      >
        <TouchableWithoutFeedback onPress={() => {
          setShowQuitModal(false);
          resumeMusic();
        }}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
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
                    onPress={() => {
                      setShowQuitModal(false);
                      resumeMusic();
                    }}
                  >
                    <Text style={styles.keepLearningText}>Keep Learning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      if (bgMusic) {
                        await bgMusic.stopAsync();
                      }
                      navigation.goBack();
                    }}
                  >
                    <Text style={styles.quitText}>Quit</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Heart Lost Modal */}
      <Modal
        visible={showHeartLostModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {}} // Disable dismissing the modal with the back button
      >
        <View style={styles.modalOverlay}>
          <ImageBackground
            source={require('../../../assets/lastquest.jpg')} // Replace with the correct path to your background image
            style={styles.modalImageBackground}
            imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          >
            <View style={styles.innerBorder} />
            {/* Hearts Display */}
            <View style={styles.modalHeartsContainer}>
              {hearts.map((isFilled, index) => (
                <Ionicons
                  key={index}
                  name={isFilled ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isFilled ? 'red' : '#808080'} // Gray for removed heart
                  style={{
                    marginHorizontal: 5,
                    transform: !isFilled ? [{ scale: 1 }] : [], // Highlight the removed heart
                  }}
                />
              ))}
            </View>
            {/* Modal Content */}
            <Text style={styles.modalTitle}>Each mistake costs 1 heart.</Text>
            <View style={styles.modalButtonsVertical}>
              <TouchableOpacity
                style={styles.keepLearningButton}
                onPress={() => {
                  setShowHeartLostModal(false); // Close the modal
                  incrementProgress(); // Move to the next activity
                }}
              >
                <Text style={styles.keepLearningText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>
      {/* All Hearts Used Modal */}
      <Modal
        visible={hearts.every((heart) => !heart)} // Show modal when all hearts are used
        transparent={true}
        animationType="slide"
        onRequestClose={() => navigation.navigate('Lesson1')} // Navigate to Lesson1 on close
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')} // Replace with the correct path to your background image
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                <Text style={styles.modalTitle}>Oops! You have used all hearts.{'\n'}Try Again</Text>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={() => {
                      setHearts([true, true, true, true]); // Reset hearts to full
                      navigation.navigate('Lesson1'); // Navigate to Lesson1
                    }}
                  >
                    <Text style={styles.keepLearningText}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Correct Answer Modal */}
      <Modal
        visible={showCorrectModal} // State to control the visibility of the modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCorrectModal(false)} // Close the modal on request
      >
        <TouchableWithoutFeedback onPress={() => setShowCorrectModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')} // Replace with the correct path to your background image
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                {/* Wrap the icon and text in a horizontal View */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons
                    name="checkmark-circle"
                    size={50}
                    color="green"
                    style={{ marginRight: 10 }} // Add spacing between the icon and text
                  />
                  <View>
                    <Text style={[styles.modalTitle, { textAlign: 'left' }]}>Correct!</Text>
                    <Text style={[styles.modalTitle, { textAlign: 'left', fontSize: 14 }]}>+1 Orchivium</Text>
                  </View>
                </View>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={() => {
                      setShowCorrectModal(false); // Close the modal
                      incrementProgress(); // Move to the next activity
                    }}
                  >
                    <Text style={styles.keepLearningText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Wrong Answer Modal */}
      <Modal
        visible={showWrongModal} // State to control the visibility of the modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWrongModal(false)} // Close the modal on request
      >
        <TouchableWithoutFeedback onPress={() => setShowWrongModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ImageBackground
                source={require('../../../assets/lastquest.jpg')} // Replace with the correct path to your background image
                style={styles.modalImageBackground}
                imageStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              >
                <View style={styles.innerBorder} />
                {/* Wrap the icon and text in a horizontal View */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons
                    name="close-circle"
                    size={50}
                    color="red"
                    style={{ marginRight: 10 }} // Add spacing between the icon and text
                  />
                  <Text style={[styles.modalTitle, { textAlign: 'left' }]}>Wrong Answer!</Text>
                </View>
                <View style={styles.modalButtonsVertical}>
                  <TouchableOpacity
                    style={styles.keepLearningButton}
                    onPress={() => {
                      setShowWrongModal(false); // Close the modal
                      incrementProgress(); // Move to the next activity
                    }}
                  >
                    <Text style={styles.keepLearningText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Activities */}
      {currentActivity === 1 && (
        <Activity
          type={1}
          letter="A"
          displayLetter="A" // Display "A" in the big box
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 2 && (
        <Activity
          type={2}
          letter="A"
          displayLetter="A"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 3 && (
        <Activity
          type={3}
          letter="A"
          displayLetter="A"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 4 && (
        <Activity
          type={1}
          letter="E/I" // Correct answer for activities 4-6
          displayLetter="E" // Display "E" in the big box
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 5 && (
        <Activity
          type={2}
          letter="E/I" // Correct answer for activities 4-6
          displayLetter="E"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 6 && (
        <Activity
          type={3}
          letter="E/I" // Correct answer for activities 4-6
          displayLetter="E"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 7 && (
        <Activity
          type={1}
          letter="O/U" // Correct answer for activities 7-9
          displayLetter="O" // Display "O" in the big box
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 8 && (
        <Activity
          type={2}
          letter="O/U" // Correct answer for activities 7-9
          displayLetter="O"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 9 && (
        <Activity
          type={3}
          letter="O/U" // Correct answer for activities 7-9
          displayLetter="O"
          choices={choices}
          title={getTitle(currentActivity)}
          onCorrect={handleCorrectAnswer}
          onWrong={handleWrongAnswer}
        />
      )}
      {currentActivity === 10 && (
        <MatchingActivity
          pairs={[
            { normal: 'A', bold: 'A' },
            { normal: 'E/I', bold: 'E' },
            { normal: 'O/U', bold: 'O' },
          ]}
          title={getTitle(currentActivity)}
          onComplete={incrementProgress}
        />
      )}
      {currentActivity === 11 && (
        <View style={styles.finalScreenContainer}></View>
      )}
    </ImageBackground>
  );
};

// Updated AnimatedLoadingIcon component
const AnimatedLoadingIcon = () => {
  return (
    <View style={styles.loadingScreenContainer}>
      <ActivityIndicator size="large" color="#3D261C" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
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
    padding: 1,
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
    marginVertical: 5,
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // Use 'space-around' to distribute space more evenly
    paddingHorizontal: 20, // Keep padding for alignment
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    textAlign: 'center', // Center text
    marginTop: 20, // Add margin to separate from the header
  },
  bigBoxContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the big box vertically between title and small boxes
    alignItems: 'center',
  },
  bigBox: {
    width: '70%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#3D261C',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#784C34',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : 5,
    shadowRadius: Platform.OS === 'ios' ? 3 : 5,
    elevation: 10, // Add this for Android shadows
  },
  bigBoxText: {
    fontSize: 160,
    fontFamily: 'DoctrinaChristianaBold',
    color: '#d9d9d9',
  },
  smallBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%', // Ensure consistent width for all activities
    marginTop: 0, // Remove extra margin to bring it closer to the big box
    marginBottom: 70, // Add a small margin at the bottom if needed
  },
  smallBox: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#3D261C',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#784C34',
    marginHorizontal: 5, // Add horizontal margin to create space between boxes
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : 10,
    shadowRadius: Platform.OS === 'ios' ? 3 : 10,
    elevation: 10, // Add this for Android shadows
  },
  smallBoxText: {
    fontSize: 24,
    color: '#d9d9d9',
  },
  matchingContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20, // Added padding for better alignment
  },
  matchingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    textAlign: 'center', // Center the title
    marginBottom: 20,
  },
  matchingColumnsContainer: {
    flexDirection: 'row', // Ensures left and right columns are side by side
    justifyContent: 'space-evenly', // Distributes space evenly between columns
    alignItems: 'center', // Centers items vertically
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20, // Adds spacing above the container
  },
  matchingColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10, // Adds spacing between columns
  },
  matchingItem: {
    width: '80%', // Use percentage for responsiveness
    aspectRatio: 1, // Maintain square shape
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#3D261C',
    borderRadius: 8,
    backgroundColor: '#784C34',
  },
  selectedItem: {
    backgroundColor: '#D9A34A',
  },
  lockedItem: {
    backgroundColor: '#A9A9A9', // Gray background
    borderColor: '#808080', // Darker gray border
    opacity: 0.6, // Slightly transparent
  },
  matchingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center', // Center textxxxzz
  },
  soundIcon: {
    opacity: 0.6,
  },
  soundIconMargin: {
  },
  soundIconType1: {
    opacity: 0.6,
    marginTop: -10,
  },
  soundIconType2: {
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end', // Aligns the modal at the bottom
  },
  bottomModalContainer: {
    width: '100%',
    height: 230,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 5,
    position: 'relative', // Ensure the inner border is positioned correctly
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
  modalImageBackground: {
    width: '100%',
    height: 230, // Fixed height for the modal
    borderRadius: 16,
    overflow: 'hidden', // Ensures the image respects the border radius
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalHeartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add spacing below the hearts
  },
  finalScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalScreenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3D261C',
    textAlign: 'center',
  },
  finalScreenSubtitle: {
    fontSize: 24,
    color: '#3D261C',
    textAlign: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  loadingBottomLeftContainer: {
    position: 'absolute',
    bottom: 20, // Position near the bottom
    left: 20, // Position near the left
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingScreenContainer: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  },
  loadingText: {
    marginLeft: 10, // Add spacing between the icon and text
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
  },
});

export default Act1;