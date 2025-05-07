import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const Tracing = ({ navigation }) => {
  const handleLevelSelect = (level) => {
    // Navigate to the selected level
    navigation.navigate('TracingLevel', { level });
  };

  return (
    <ImageBackground 
      source={require('../assets/MainBG.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Level Select</Text>
        
        <View style={styles.levelContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelBox}
              onPress={() => handleLevelSelect(level)}
            >
              <Text style={styles.levelText}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  levelBox: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default Tracing;