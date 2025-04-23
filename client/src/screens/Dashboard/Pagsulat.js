import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const loadFonts = () => {
  return Font.loadAsync({
    'DoctrinaChristianaBold': require('../../assets/fonts/DoctrinaChristianaBold.otf'),
  });
};

const Pagsulat = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts().then(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3D261C" />
      </View>
    );
  }

  const smallTexts = [
    ['A', 'E/I', 'O/U'],
    ['Ba', 'Ka', 'Ra/Da'],
    ['Ga', 'Ha', 'La'],
    ['Ma', 'Na', 'Nga'],
    ['Pa', 'Sa', 'Ta'],
    ['Wa', 'Ya']
  ];

  const largeTexts = [
    ['A', 'E', 'O'],
    ['B', 'K', 'R'],
    ['G', 'H', 'L'],
    ['M', 'n', 'N'],
    ['P', 'S', 'T'],
    ['W', 'Y']
  ];

  const handleBoxPress = (smallText, largeText) => {
    navigation.navigate('Practices', { smallText, largeText });
  };

  const renderBoxes = () => {
    const rows = [];
    for (let i = 0; i < smallTexts.length; i++) {
      if (i === 0) {
        rows.push(
          <View key="vowelLabel" style={styles.labelContainer}>
            <Text style={styles.labelText}>Vowel</Text>
          </View>
        );
      } else if (i === 1) {
        rows.push(
          <View key="consonantLabel" style={styles.labelContainer}>
            <Text style={styles.labelText}>Consonant</Text>
          </View>
        );
      }

      rows.push(
        <View key={i} style={i === 5 ? styles.lastBoxContainer : styles.boxContainer}>
          {smallTexts[i].map((smallText, index) => (
            <TouchableOpacity key={index} style={styles.box} onPress={() => handleBoxPress(smallText, largeTexts[i][index])}>
              <Text style={styles.smallText}>{smallText}</Text>
              <Text style={styles.largeText}>{largeTexts[i][index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <ImageBackground 
      source={require('../../assets/MainBG.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#3D261C" />
            <Text style={styles.headerText}>Pagsulat ng Baybayin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {renderBoxes()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
    height: '100%',
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10, // Adjust padding for proper alignment
    marginTop: 20,
    marginLeft: 20,
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
    flex: 1, // Ensure the text takes up available space
    textAlign: 'left', // Align the text to the left
    marginLeft: 10,
  },
  line: {
    height: 1.5,
    backgroundColor: '#3D261C',
    marginHorizontal: 20,
    marginBottom: 10,
    width: '90%',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  lastBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50.5%',
    marginTop: 20,
  },
  box: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#784C34',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    position: 'absolute',
    top: 10,
    fontSize: 15,
    color: '#d9d9d9',
  },
  largeText: {
    marginTop: 15,
    fontSize: 50,
    color: '#d9d9d9',
    fontFamily: 'DoctrinaChristianaBold', 
  },
  labelContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D261C',
  },
});

export default Pagsulat;