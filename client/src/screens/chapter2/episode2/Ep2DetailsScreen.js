import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
} from 'react-native';

const Ep2DetailsScreen = ({ navigation }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [characterName, setCharacterName] = useState('Angkatan'); // Changed from 'Scribeon' to 'Angkatan'
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
    setCharacterName('Angkatan'); // Changed from 'Scribeon' to 'Angkatan'
  };

  const handleChoiceDialogueNext = () => {
    if (choiceDialogueStep === 0) {
      if (selectedChoice === 'Option 2') {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep(1);
    } else if (choiceDialogueStep === 1) {
      navigation.navigate('Ep2');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      { character: 'Namwaran', text: `Bago ka makasulat, kailangan mo munang matutuhang damhin ang mga karakter sa iyong mga kamay` },
      { character: 'Namwaran', text: `Ang mga simbolo ng Baybayin ay hindi lamang mga linya—sila ay pagpapahayag ng tunog, galaw, at kahulugan. Ngayon, simulan natin sa mga pangunahing tunog.` },
      { character: 'Namwaran', text: `Ang unang mga karakter na natutuhan ninyong dalawa ay 'A,' 'E/I,' at 'O/U.' Bawat isa ay natatangi, ngunit sila ang bumubuo sa basehan ng ating pagsulat.` },
      { character: 'Namwaran', text: `Damhin ang bawat karakter habang ito ay nabubuhay sa iyong kamay.` },
    ];

    if (dialogueStep === lines.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else if (dialogueStep === lines.length) {
      navigation.navigate('NextScene');
    } else {
      setDialogueStep((prev) => prev + 1);
    }
  };

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2E242499', '#291711CC'],
  });

  const renderChoiceDialogue = () => {
    const dialogueLines = {
      'Option 1': [
        `"Ang pagsulat ay hindi lamang pisikal na gawain kundi isang koneksyon din sa ating mga espiritu at ninuno."`,
        `"Ang pagdama sa mga karakter ay nangangahulugan na tunay mong mauunawaan ang kanilang kahulugan at kapangyarihan. Kung wala ito, ang Baybayin ay mananatiling walang buhay."`,
      ],
      'Option 2': [
        `"Pasensya, anak ko. Ang kahusayan ay nagmumula sa pagsasanay, sa paggawa ng mga karakter na bahagi ng iyong pang-araw-araw na ritmo."`,
        `"Bawat linya, bawat kurba ay dapat dumaloy nang natural tulad ng ilog sa labas."`,
      ],
      'Option 3': [
        `"Pinag-aralan ko nang mabuti ang Baybayin sa Aklatan ng mga Wika."`,
        `"Ngunit iba ito—ito ay pagbuhay nito. Huwag kang mag-alala, Bukah, gagabayan kita sa bawat hakbang. Sundin mo lamang ako."`,
      ],
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter =
      (selectedChoice === 'Option 1' && choiceDialogueStep >= 1) || 
      (selectedChoice === 'Option 2' && choiceDialogueStep >= 1)
        ? 'Namwaran'
        : characterName;

    const characterImage = require('../../../assets/characters/namwaran2.png'); // Replace with the correct image path

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
        <Image
          source={characterImage}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderMainDialogue = () => {
    const lines = [
      { character: 'Namwaran', text: `Bago ka makasulat, kailangan mo munang matutuhang damhin ang mga karakter sa iyong mga kamay` },
      { character: 'Namwaran', text: `Ang mga simbolo ng Baybayin ay hindi lamang mga linya—sila ay pagpapahayag ng tunog, galaw, at kahulugan. Ngayon, simulan natin sa mga pangunahing tunog.` },
      { character: 'Namwaran', text: `Ang unang mga karakter na natutuhan ninyong dalawa ay 'A,' 'E/I,' at 'O/U.' Bawat isa ay natatangi, ngunit sila ang bumubuo sa basehan ng ating pagsulat.` },
      { character: 'Namwaran', text: `Damhin ang bawat karakter habang ito ay nabubuhay sa iyong kamay.` },
    ];

    const currentDialogue = lines[dialogueStep];
    const characterImage = require('../../../assets/characters/namwaran2.png'); // Replace with the correct image path

    return (
      <TouchableOpacity onPress={handleNextDialogue}>
        <View style={styles.characterImageContainer}>
          <Image
            source={characterImage}
            style={styles.characterImage}
            resizeMode="contain"
          />
        </View>
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
    <ImageBackground source={require('../../../assets/chapter2.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>
          <View style={styles.dialogueTextContainer}>
            {selectedChoice ? (
              renderChoiceDialogue()
            ) : dialogueStep === 4 ? (
              <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Bakit kailangan nating damhin ang mga karakter?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Paano ko masasanay ang Baybayin?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Angkatan, alam mo ba kung paano ito gawin?</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            ) : (
              renderMainDialogue()
            )}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Ep2DetailsScreen;

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
  characterImageContainer: {
    position: 'absolute',
    bottom: 0, // Adjust to position the image at the bottom
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0, // Ensure it is behind the dialogue box
  },
  characterImage: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    opacity: 0.8, // Optional: Add transparency
  },
});