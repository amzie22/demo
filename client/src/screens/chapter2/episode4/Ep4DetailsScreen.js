import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';

const Ep4DetailsScreen = ({ navigation }) => {
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
    setCharacterName('Scribeon');
  };

  const handleChoiceDialogueNext = () => {
    const maxSteps = {
      'Option 1': 3,
      'Option 2': 3,
      'Option 3': 4,
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      if (selectedChoice === 'Option 2' && choiceDialogueStep === 0) {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep((prev) => prev + 1);
    } else {
      navigation.navigate('Ep4');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
      `Ngayon, bibigyan mo sila ng buhay. Ang pagsulat ay higit pa sa mga marka sa pergamino—ito ay sayaw ng kahulugan.`,
      `Bawat stroke ay dapat dumaloy tulad ng ilog, matatag at may layunin.`,
      `Iba ang pakiramdam ng pagsulat, hindi ba, Bukah? Parang kinukuha mo ang mga tunog na iyong natutuhan at binibigyan sila ng pisikal na katawan.`,
      `Ngunit huwag kang magmadali—ito ay isang paglalakbay, hindi isang karera.`,
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
        `Ang perpeksyon ay isang pagkagambala, Bukah. Ang mahalaga ay ang iyong intensyon at pag-unawa.`,
        `Kahit ang copperplate, na nagdadala ng pinakamahalagang kuwento ng ating pamilya, ay may mga imperpeksyon. Ngunit ang mensahe nito ay nanatili sa loob ng mga siglo.`,
        `Bukod pa rito, ang mga pagkakamali ay nagbibigay ng kahulugan sa pag-aaral. Ipinapaalala nila sa atin na ang kahusayan ay nakakamit sa pamamagitan ng pagsisikap.`
      ],
      'Option 2': [
        `Magpokus sa balanse at daloy ng bawat linya. Hayaan mong ang iyong kamay ay dumaloy nang may layunin, tulad ng ilog sa labas.`,
        `Ang pagsulat ay hindi tungkol sa puwersa—ito ay tungkol sa koneksyon.`,
        `At huwag mong kalimutan—ang paghinga ay nakakatulong din! Kapag kalmado ang iyong isip, susunod ang iyong kamay.`
      ],
      'Option 3': [
        `Tiyak. Ang pagsulat ay nagpapalalim ng iyong koneksyon sa sulat. Binabago nito ang kaalaman sa pagsasanay, at ang pagsasanay sa pagpreserba.`,
        `Ito ay kung paano mabubuhay ang Baybayin.`,
        `Tama si Namwaran, Bukah. Ang pagsulat sa mga simbolong ito ay ginagawa kang bahagi ng kanilang kuwento.`,
         `Ito ay parang pagpasa ng sulo na nagniningas sa loob ng mga henerasyon.`
      ],
    };

    const currentLine = dialogueLines[selectedChoice][choiceDialogueStep];
    const currentCharacter =
      (selectedChoice === 'Option 1' && choiceDialogueStep >= 1) ||
      (selectedChoice === 'Option 2' && choiceDialogueStep >= 1) ||
      (selectedChoice === 'Option 3' && choiceDialogueStep >= 1)
        ? 'Namwaran'
        : characterName;

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
      `Ngayon, bibigyan mo sila ng buhay. Ang pagsulat ay higit pa sa mga marka sa pergamino—ito ay sayaw ng kahulugan.`,
      `Bawat stroke ay dapat dumaloy tulad ng ilog, matatag at may layunin.`,
      `Iba ang pakiramdam ng pagsulat, hindi ba, Bukah? Parang kinukuha mo ang mga tunog na iyong natutuhan at binibigyan sila ng pisikal na katawan.`,
      `Ngunit huwag kang magmadali—ito ay isang paglalakbay, hindi isang karera.`,
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

  return (
    <ImageBackground source={require('../../../assets/chapter2.png')} style={styles.background}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.dialogueContainer}>
          <View style={styles.dialogueTextContainer}>
            {selectedChoice ? (
              renderChoiceDialogue()
            ) : dialogueStep === 3 ? (
              <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleChoice('Option 1')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Paano kung hindi perpekto ang hitsura ng aking mga stroke?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Paano ko magagawa na parang buhay ang aking mga stroke?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Makakatulong ba ang pagsulat sa akin na mas maunawaan ang Baybayin?</Text>
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

export default Ep4DetailsScreen;

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
});