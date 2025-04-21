import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Lesson2 = () => {
  const navigation = useNavigation();
  const [currentBox, setCurrentBox] = useState(1); // State to track the current box

  const handleNext = () => {
    if (currentBox < 3) setCurrentBox(currentBox + 1);
  };

  const handlePrevious = () => {
    if (currentBox > 1) setCurrentBox(currentBox - 1);
  };

  return (
    <ImageBackground source={require('../../../assets/MainBG.png')} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3D261C" />
          <Text style={styles.headerText}>Chapter 2 Lesson 2</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.textContainer}>
        <Text style={styles.chapterText}>Chapter 2</Text>
        <Text style={styles.lessonText}>LESSON 2</Text>
        <Text style={styles.descriptionText}>Tracing Letters</Text>
      </View>
      {/* Box Navigation */}
      <View style={styles.boxNavigation}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handlePrevious}
          disabled={currentBox === 1}
        >
          <Ionicons name="chevron-back" size={42} color={currentBox === 1 ? '#BB9F6B' : '#3D261C'} />
        </TouchableOpacity>
        <View style={styles.box}>
          {currentBox === 1 && (
            <>
              <Text style={styles.boxTopText}>A</Text>
              <Image
                key={`box-1-${currentBox}`} // Add a unique key to force re-render
                source={require('../../../assets/syllables/A_inv.gif')}
                style={styles.boxGif}
              />
            </>
          )}
          {currentBox === 2 && (
            <>
              <Text style={styles.boxTopText}>E/I</Text>
              <Image
                key={`box-2-${currentBox}`} // Add a unique key to force re-render
                source={require('../../../assets/syllables/EI_inv.gif')}
                style={styles.boxGif}
              />
            </>
          )}
          {currentBox === 3 && (
            <>
              <Text style={styles.boxTopText}>O/U</Text>
              <Image
                key={`box-3-${currentBox}`} // Add a unique key to force re-render
                source={require('../../../assets/syllables/OU_inv.gif')}
                style={styles.boxGif}
              />
            </>
          )}
        </View>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleNext}
          disabled={currentBox === 3}
        >
          <Ionicons name="chevron-forward" size={42} color={currentBox === 3 ? '#BB9F6B' : '#3D261C'} />
        </TouchableOpacity>
      </View>
      {/* Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Act2')}>
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
  boxNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  arrowButton: {
    marginHorizontal: -15,
  },
  box: {
    width: 270,
    height: 290,
    backgroundColor: '#784C34',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center horizontally
    borderRadius: 12,
    marginHorizontal: 20,
    paddingTop: 20, // Add padding to create space from the top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxTopText: {
    fontSize: 40,
    fontWeight: 'normal',
    color: '#D9D9D9',
    textAlign: 'center', // Center text horizontally
  },
  boxText: {
    fontSize: 16,
    color: '#D9D9D9',
    fontWeight: 'bold',
  },
  boxGif: {
    width: 220,
    height: 220,
    marginTop: -15,
  },
  startButton: {
    marginTop: 20,
    alignSelf: 'center',
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

export default Lesson2;