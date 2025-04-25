import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Animated, Image, Platform } from 'react-native';

const Chapter2DetailsScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [characterName, setCharacterName] = useState('Scribeon');
  const [choiceDialogueStep, setChoiceDialogueStep] = useState(0);
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
  };

  const handleChoiceDialogueNext = () => {
    if (selectedChoice === 'Option 1' && choiceDialogueStep === 4) {
      navigation.navigate('AfterChap');
      return;
    }

    if (selectedChoice === 'Option 2' && choiceDialogueStep === 3) {
      navigation.navigate('AfterChap');
      return;
    }

    // Update characterName to Angkatan for Option 1
    if (selectedChoice === 'Option 1') {
      setCharacterName('Angkatan');
    }

    // Update characterName to Angkatan for Option 2 after the first step
    if (selectedChoice === 'Option 2' && choiceDialogueStep >= 1) {
      setCharacterName('Angkatan');
    }

    setChoiceDialogueStep((prev) => prev + 1);
  };

  const handleNextDialogue = () => {
    const dialogue = [
      { character: 'Scribeon', text: `Taon ng Siyaka 822, buwan ng Waisaka. Ang ika-apat na araw ng buwan ng pagluluksa.` },
      { character: 'Scribeon', text: `Ito ang mundo kung saan unang nalikha ang artipaktong may kaugnayan sa Baybayin. Ang Laguna Copperplate 900 CE.` },
      { character: 'Angkatan', text: `Mukhang ako ay naging si Angkatan, ang anak na babae ni Namwaran` },
      { character: 'Namwaran', text: `Ah, Bukah, Angkatan, halika rito! Tingnan ninyo ito! Isang sulat mula sa Punong-Komandante ng Tundun at Panginoong-Ministro ng Pailah.` },
      { character: 'Namwaran', text: `Pinatawad na tayo sa lahat ng ating utang. Ito ay isang masayang araw para sa ating pamilya!` },
    ];

    if (dialogueStep >= dialogue.length) {
      navigation.navigate('NextScene');
      return;
    }

    // Update characterName and increment dialogueStep
    const currentDialogue = dialogue[dialogueStep];
    setCharacterName(currentDialogue.character);
    setDialogueStep(prev => prev + 1);
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderChoiceDialogue = () => {
    const dialogueLines = {
      'Option 1': [
        { character: 'Angkatan', text: "Totoo? Syempre naman! Ang Aklatan ay hindi lamang nagpapakita ng kasaysayan—pinaparanas nito sa atin ito." },
        { character: 'Angkatan', text: "Ngunit makinig ka—hindi natin mababago ang nangyari. Ang ating misyon ay matuto, alalahanin. Kung tayo ay mabigo dito, ang Baybayin ay maaaring mawala magpakailanman." },
        { character: 'Namwaran', text: "Ano ang pinag-uusapan ninyong dalawa? Tulad nga ng sinabi ko kanina, sisimulan ko nang turuan kayong dalawa tungkol sa Baybayin." },
        { character: 'Namwaran', text: "Upang maunawaan ang makabuluhan at mahalagang pagpapala mula sa Punong-Komandante ng Tundun at Panginoong-Ministro ng Pailah." },
        { character: 'Namwaran', text: "Ito ay napakahalaga sa atin pati na rin sa ating mga susunod na henerasyon. Kailangan ninyong dalawa maghanda na matutong bumasa at sumulat ng Baybayin." },
      ],
      'Option 2': [
        { character: 'Angkatan', text: "Nai-transmigrate tayo sa kuwentong ito. Ikaw na ngayon si Bukah, ang anak na lalaki ni Namwaran. Ito ang iyong pagkakataon na matuto ng Baybayin tulad ng kanilang ginawa noon." },
        { character: 'Namwaran', text: "Ano ang pinag-uusapan ninyong dalawa? Tulad nga ng sinabi ko kanina, sisimulan ko nang turuan kayong dalawa tungkol sa Baybayin." },
        { character: 'Namwaran', text: "Upang maunawaan ang makabuluhan at mahalagang pagpapala mula sa Punong-Komandante ng Tundun at Panginoong-Ministro ng Pailah." },
        { character: 'Namwaran', text: "Ito ay napakahalaga sa atin pati na rin sa ating mga susunod na henerasyon. Kailangan ninyong dalawa maghanda na matutong bumasa at sumulat ng Baybayin." },
      ],
    };

    // Ensure selectedChoice and choiceDialogueStep are valid
    if (!selectedChoice || !dialogueLines[selectedChoice]) {
      console.log('No choice selected or invalid choiceDialogueStep');
      return null; // Return nothing if no choice is selected
    }

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter = currentLine.character; // Use the character from the current dialogue line

    // Update the characterName state to ensure correct character image is shown
    if (characterName !== currentCharacter) {
      setCharacterName(currentCharacter);
    }

    return (
      <TouchableOpacity onPress={handleChoiceDialogueNext}>
        <View style={styles.dialogueBox}>
          {/* Remove the image from here - it should only be in the main return statement */}
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentCharacter}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{currentLine.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMainDialogue = () => {
    const dialogue = [
      { character: 'Scribeon', text: `Taon ng Siyaka 822, buwan ng Waisaka. Ang ika-apat na araw ng buwan ng pagluluksa.` },
      { character: 'Scribeon', text: `Ito ang mundo kung saan unang nalikha ang artipaktong may kaugnayan sa Baybayin. Ang Laguna Copperplate 900 CE.` },
      { character: 'Angkatan', text: `Mukhang ako ay naging si Angkatan, ang anak na babae ni Namwaran` },
      { character: 'Namwaran', text: `Ah, Bukah, Angkatan, halika rito! Tingnan ninyo ito! Isang sulat mula sa Punong-Komandante ng Tundun at Panginoong-Ministro ng Pailah.` },
      { character: 'Namwaran', text: `Pinatawad na tayo sa lahat ng ating utang. Ito ay isang masayang araw para sa ating pamilya!` },
    ];

    const currentDialogue = dialogue[dialogueStep];

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.dialogueBox}>
          <View style={styles.characterNameContainer}>
            <Text style={styles.characterName}>{currentDialogue.character}:</Text>
          </View>
          <View style={styles.dialogueTextWrapper}>
            <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('../../assets/chapter2.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {/* Character image - hidden during choice selection (dialogueStep === 5) */}
        {((dialogueStep >= 2 && dialogueStep !== 5) || selectedChoice) && (
          <View style={styles.characterImageContainer} pointerEvents="none">
            <Image
              source={
                selectedChoice
                  ? (characterName === 'Namwaran'
                      ? require('../../assets/characters/namwaran2.png')
                      : require('../../assets/characters/Ankatan1.png'))
                  : (dialogueStep >= 3
                      ? require('../../assets/characters/namwaran2.png')
                      : require('../../assets/characters/Ankatan1.png'))
              }
              style={styles.characterImage}
            />
          </View>
        )}
        
        <View style={styles.dialogueContainer}>
          <View
            style={[
              styles.dialogueTextContainer,
              (selectedChoice || dialogueStep === 5) && styles.centeredDialogueTextContainer, // Apply centered style conditionally
            ]}
          >
            {selectedChoice ? renderChoiceDialogue() : (
              dialogueStep === 5 ? (
                <View style={styles.choicesContainer}>
                  <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                    <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}>
                      <Text style={styles.choiceText}>Parang totoo ito...Ito ba ang nakaraan?</Text>
                    </Animated.View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                    <Animated.View style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}>
                      <Text style={styles.choiceText}>Nasaan tayo? Sino siya?</Text>
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              ) : renderMainDialogue()
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Chapter2DetailsScreen;

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
    zIndex: 1, // Ensure it is above the dialogue box
  },
  dialogueTextContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  centeredDialogueTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  choicesContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center', // Added to center the buttons vertically
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
