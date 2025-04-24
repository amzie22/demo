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

const Ep3DetailsScreen = ({ navigation }) => {
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
      'Option 2': 4,
      'Option 3': 3
    };

    if (choiceDialogueStep < maxSteps[selectedChoice] - 1) {
      if (selectedChoice === 'Option 2' && choiceDialogueStep === 0) {
        setCharacterName('Namwaran');
      }
      setChoiceDialogueStep(prev => prev + 1);
    } else {
      navigation.navigate('Ep3');
    }
  };

  const handleNextDialogue = () => {
    const lines = [
        `Yesterday, you both took the first step into understanding Baybayin by learning the vowels: 'A,' 'E/I,' and 'O/U.'`,
        `These pure sounds form the foundation of our script. Today, we move forward—to the consonants 'Ba,' 'Ka,' and 'Ra/Da.'`,
        `These will test your ability to carry the strength and rhythm of our language.`,
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
       `Dahil ang mga katinig ay kumukuha ng kanilang enerhiya mula sa mga patinig. Ang mga patinig ay ang buhay, ang hininga ng bawat salita. Kung wala ang mga ito, ang mga katinig ay mga walang buhay na marka.`,
       `Sa pamamagitan ng pag-master sa mga patinig muna, inilatag mo ang pundasyon. Ngayon ay handa ka nang bigyan ng lakas ang iyong mga salita.`,
       `At ang 'Ba,' 'Ka,' at 'Ra/Da' ay perpekto para simulan—dahil sila ay lumilitaw sa maraming salita. Sila ay parang mga haligi ng bahay, matatag at mahalaga.`
      ],
      'Option 2': [
        `Ang 'Ba' ay dumadaloy tulad ng ilog, matatag at hindi nagpapatalo. Ang 'Ka' ay nagbubuklod sa atin, isang simbolo ng pagkakamag-anak at pamayanan.`,
        `Ang 'Ra' o 'Da' ay sumasayaw sa galaw, sumasalamin sa balanse ng buhay. Kapag nadama mo ang mga kahulugang ito, ang iyong pagsulat ay magkakaroon ng kapangyarihan.`,
        `Isipin mo sila bilang ritmo ng wika, Bukah. Hindi lamang sila mga hugis—sila ay galaw at koneksyon.`,
        `Ang pagsulat sa kanila ay parang pagkuha ng ilog, kawayan, at hangin sa iyong kamay.`
      ],
      'Option 3': [
        `Napatunayan mo na ang iyong kasipagan, Bukah. Ngunit tandaan—ang kahusayan ay hindi nakakamit sa pamamagitan ng pagmamadali.`,
        `Ito ay isang paglalakbay ng pag-unawa, pasensya, at pag-aalaga. Magtiwala sa proseso, at gagantimpalaan ka ng Baybayin sa iyong pagsisikap.`,
         `At huwag mong kalimutan—hindi ka nag-iisa dito. Nandito kami ni Namwaran para gabayan ka sa bawat hakbang.`
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
      `Kahapon, nagsimula na kayong dalawa sa pag-unawa sa Baybayin sa pamamagitan ng pag-aaral ng mga patinig: 'A,' 'E/I,' at 'O/U.'`,
      `Ang mga dalisay na tunog na ito ang bumubuo sa pundasyon ng ating sulat. Ngayon, tayo ay magpapatuloy—sa mga katinig na 'Ba,' 'Ka,' at 'Ra/Da.'`,
      `Ito ay susubok sa inyong kakayahang dalhin ang lakas at ritmo ng ating wika.`,
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
                    <Text style={styles.choiceText}>Bakit ang mga katinig na ito ay itinuturo pagkatapos ng mga patinig?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 2')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Ano ang nagpapakilala sa mga katinig na ito?</Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('Option 3')}>
                  <Animated.View
                    style={[styles.choiceButton, { backgroundColor: interpolatedBackgroundColor }]}
                  >
                    <Text style={styles.choiceText}>Sa tingin mo ba ay kaya kong masterin ang mga ito tulad ng mga patinig?</Text>
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

export default Ep3DetailsScreen;

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
    marginTop: -20,
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