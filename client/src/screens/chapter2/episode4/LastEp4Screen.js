import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Platform, Image } from 'react-native';

const LastEp4Screen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isCharacterVisible, setIsCharacterVisible] = useState(true); // Add character visibility state
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  // Function to hclandle dialogue progression
  const handleNextDialogue = () => {
    if (dialogueStep + 1 < lines.length) {
      setDialogueStep(prevStep => prevStep + 1);
    } else {
      // Navigate to Closing when we reach the last dialogue
      setIsCharacterVisible(false); // Hide character before navigating
      navigation.navigate('Closing');
    }
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderMainDialogue = () => {
    // Change Scribeon to Angkatan for consistency with other screens
    const currentMainCharacter = dialogueStep < 2 ? 'Namwaran' : 'Angkatan';

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
    </ImageBackground>
  );
};

export default LastEp4Screen;

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
  // Add these styles for the character image
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
