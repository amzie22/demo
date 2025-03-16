import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const SetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.promptText}>"What would you like me to call you?"</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NextScreen', { name })}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.skipText}>Skip {'>'}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  promptText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    position: 'absolute',
    top: 40,
    right: 20,
    color: '#fff',
    fontSize: 14,
  },
});

export default SetupScreen;
