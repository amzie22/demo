import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Image, Platform } from 'react-native';

const SetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState(0); // Set the first avatar as the default selection
  const [skillLevel, setSkillLevel] = useState('');

  // Avatar images
  const avatars = [
    require('../assets/avatars/1.jpg'),
    require('../assets/avatars/2.jpg'),
    require('../assets/avatars/3.jpg'),
    require('../assets/avatars/4.jpg'),
    require('../assets/avatars/5.jpg'),
    require('../assets/avatars/6.png'),
  ];

  const handleNext = () => {
    if (step === 1) {
      if (name.trim() !== '') {
        setStep(2); // Move to avatar selection step
      } else {
        alert('Please enter your name');
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
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        {step === 1 ? (
          // First Screen: Name Input
          <View style={styles.content}>
            <Text style={styles.questionText}>"What would you like me to call you?"</Text>
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
          <View style={styles.content}>
            <Text style={styles.questionText1}>"Choose your avatar"</Text>
            <View style={styles.avatarGrid}>
              {selectedAvatar !== null && (
                <Image source={avatars[selectedAvatar]} style={styles.bigAvatar} />
              )}
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
          <View style={styles.content}>
            <Text style={styles.questionText2}>"What's your current skill level in Baybayin?"</Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)', 
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: 310,
    height: 400,
    backgroundColor: 'rgba(41, 41, 41, 0.2)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center', // Added this line to center the text
  },
  questionText1: {
    color: '#fff',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  questionText2: {
    color: '#fff',
    fontSize: 15,
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center', // Added this line to center the text
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
    borderWidth: 1,
    borderColor: 'rgba(43, 4, 4, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
  },
  smallAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SetupScreen;