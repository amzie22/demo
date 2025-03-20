import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Image } from 'react-native';

const SetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [skillLevel, setSkillLevel] = useState('');

  // Avatar images
  const avatars = [
    require('../assets/whiteavatar.png'),
    require('../assets/whiteavatar.png'),
    require('../assets/whiteavatar.png'),
    require('../assets/whiteavatar.png'),
    require('../assets/whiteavatar.png'),
    require('../assets/whiteavatar.png'),
  ];

  const handleNext = () => {
    if (step === 1) {
      if (name.trim() !== '') {
        setStep(2); // Move to avatar selection step
      }
    } else if (step === 2 && selectedAvatar !== null) {
      setStep(3); // Move to skill level selection step
    }
  };

  const handleSkillSelection = (level) => {
    setSkillLevel(level);
    navigation.navigate('AfterSetupScreen', { userName: name, avatar: selectedAvatar, skillLevel: level });
  };

  return (

    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        {step === 1 ? (
          // First Screen: Name Input
          <View style={styles.container}>
            <Text style={styles.questionText}>"What would you like me to call {'\n \t \t \t \t \t \t \t \t \t \t \t \t  '}you?"</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#ccc"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : step === 2 ? (
          // Second Screen: Avatar Selection
          <View style={styles.avatarContainer}>
            <Text style={styles.questionText1}>"Choose your avatar"</Text>
            <View style={styles.avatarGrid}>
              <Image source={avatars[selectedAvatar]} style={styles.bigAvatar} />
              <View style={styles.smallAvatars}>
                {avatars.map((avatar, index) => (
                  <TouchableOpacity key={index} onPress={() => setSelectedAvatar(index)}>
                    <Image
                      source={avatar}
                      style={[
                        styles.avatar,
                        selectedAvatar === index && styles.selectedAvatar,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={[styles.nextButton, selectedAvatar === null && { backgroundColor: '#555' }]}
              onPress={handleNext}
              disabled={selectedAvatar === null}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Third Screen: Skill Level Selection
          <View style={styles.container}>
            <Text style={styles.questionText2}>"What's your current skill level in {'\n \t \t \t \t \t \t \t \t \t '}Baybayin?"</Text>
            <TouchableOpacity style={styles.skillButton} onPress={() => handleSkillSelection('Beginner')}>
              <Text style={styles.skillButtonText}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skillButton} onPress={() => handleSkillSelection('Intermediate')}>
              <Text style={styles.skillButtonText}>Intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skillButton} onPress={() => handleSkillSelection('Advanced')}>
              <Text style={styles.skillButtonText}>Advanced</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '75%',
    height: '55%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 150,
    marginBottom: 20
  },
  questionText1: {
    color: '#fff',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20
  },
  questionText2: {
    color: '#fff',
    fontSize: 15,
    marginTop: 85,
    marginBottom: 20
  },
  input: {
    width: '95%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginTop: 35,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  avatarContainer: {
    backgroundColor: 'rgba(79, 79, 79, 0.34)',
    padding: 20,
    borderRadius: 15, 
    width: '78%',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.3  ,
    
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
  },
  smallAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  skillButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  skillButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SetupScreen;