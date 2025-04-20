import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font'; // Import expo-font
import { useFonts } from 'expo-font'; // Import useFonts

const Lesson3 = () => {
  const navigation = useNavigation();

    // Load the custom font
    const [fontsLoaded] = useFonts({
      DoctrinaChristianaBold: require('../../../assets/fonts/DoctrinaChristianaBold.otf'), // Ensure the path is correct
    });
  
    if (!fontsLoaded) {
      console.log('Font not loaded'); // Debug log
      return <ActivityIndicator size="large" color="#784C34" />; // Show a loader while fonts are loading
    }
    console.log('Font loaded successfully'); // Debug log

  // Function to play sound for Box 1
  const playSoundBox1 = async () => {
    // const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/A.mp3'));
    await sound.playAsync();
  };

  // Function to play sound for Box 2
  const playSoundBox2 = async () => {
    // const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/EI.mp3'));
    await sound.playAsync();
  };

  // Function to play sound for Box 3
  const playSoundBox3 = async () => {
    // const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/OU.mp3'));
    await sound.playAsync();
  };

  return (
    <ImageBackground source={require('../../../assets/MainBG.png')} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3D261C" />
          <Text style={styles.headerText}>Chapter 2 Lesson 3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.textContainer}>
        <Text style={styles.chapterText}>Chapter 2</Text>
        <Text style={styles.lessonText}>LESSON 3</Text>
        <Text style={styles.descriptionText}>Sound Recognition</Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.boxWrapper}>
          <TouchableOpacity style={styles.box} onPress={playSoundBox1}>
            <Text style={styles.boxText}>B</Text>
            <Ionicons name="volume-high" size={30} color="#000" style={{ opacity: 0.6 }} />
          </TouchableOpacity>
          <Text style={styles.boxLabel}>Ba</Text>
        </View>
        <View style={styles.boxWrapper}>
          <TouchableOpacity style={styles.box} onPress={playSoundBox2}>
            <Text style={styles.boxText}>K</Text>
            <Ionicons name="volume-high" size={30} color="#000" style={{ opacity: 0.6 }} />
          </TouchableOpacity>
          <Text style={styles.boxLabel}>Ka</Text>
        </View>
        <View style={styles.boxWrapper}> 
          <TouchableOpacity style={styles.box} onPress={playSoundBox3}>
            <Text style={styles.boxText}>R</Text>
            <Ionicons name="volume-high" size={30} color="#000" style={{ opacity: 0.6 }} />
          </TouchableOpacity>
          <Text style={styles.boxLabel}>Ra/Da</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Act3')}>
        <Text style={styles.startButtonText}>Start</Text>
        <Ionicons name="arrow-forward" size={20} color="#d9d9d9" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D261C',
    marginLeft: 10,
  },
  line: {
    height: 1.5,
    backgroundColor: '#3D261C',
    marginHorizontal: 20,
    marginBottom: 10,
    width: '90%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  chapterText: {
    fontSize: 15,
    color: '#3D261C',
    fontStyle: 'italic',
  },
  lessonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  descriptionText: {
    fontSize: 20,
    color: '#3D261C',
    marginTop: 15,
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginHorizontal: 20,
  },
  boxWrapper: {
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 130,
    backgroundColor: '#784C34',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3D261C',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 5,
  },
  boxText: {
    fontSize: 80,
    fontWeight: 'normal', // Avoid using 'bold' if the font itself is bold
    color: '#D9D9D9',
    fontFamily: 'DoctrinaChristianaBold', // Ensure this matches the font name
    marginBottom: -5,
  },
  boxLabel: {
    fontSize: 24,
    color: '#3D261C',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 120,
    height: 50,
    borderWidth: 2,
    borderColor: '#3D261C',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#784C34',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D9D9D9',
    marginRight: 5,
  },
});

export default Lesson3;