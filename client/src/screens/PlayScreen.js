import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput } from 'react-native';

const PlayScreen = ({ navigation, route }) => {
  // Get the mode (Tracing or Sound) from navigation params
  const mode = route.params?.mode || 'Play';
  const [playerName, setPlayerName] = useState('');
  
  const handlePlay = () => {
    // Navigate to the appropriate screen based on mode
    if (mode === 'Tracing') {
      navigation.navigate('Tracing', { playerName });
    } else if (mode === 'Sound') {
      navigation.navigate('Sound', { playerName });
    }
  };
  
  return (
    <ImageBackground 
      source={require('../assets/MainBG.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Menu</Text>
        
        <View style={styles.nameInputContainer}>
          <Text style={styles.inputLabel}>Insert Name:</Text>
          <TextInput
            style={styles.nameInput}
            value={playerName}
            onChangeText={setPlayerName}
            placeholder="Enter your name"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handlePlay}
        >
          <Text style={styles.menuButtonText}>Play</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuButtonText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Leaderboards')}
        >
          <Text style={styles.menuButtonText}>Leaderboards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Credits')}
        >
          <Text style={styles.menuButtonText}>Credits</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Main</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  nameInputContainer: {
    width: '80%',
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  nameInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  menuButton: {
    backgroundColor: 'rgba(93, 47, 14, 0.8)', // Changed from #4CAF50 to RGB
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 8,
    width: '70%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Already using RGBA format
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'rgb(0, 0, 0)', // Changed from #000 to RGB
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default PlayScreen;