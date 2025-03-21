import React from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';

const ClickableBooksScreen = ({ navigation }) => {
  const handleBookPress = (bookNumber) => {
    console.log(`Book ${bookNumber} selected`);
    
    if (bookNumber === 6) {
      navigation.navigate('Skip'); // Navigate to SkipScreen
    } else {
      navigation.navigate('ClickableBooks');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/clickablebooks.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.libraryContainer}>
          {/* You can add static library shelves here if needed */}
        </View>
        
        <TouchableOpacity 
          style={[styles.book, styles.book1]} 
          onPress={() => handleBookPress(1)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book2]} 
          onPress={() => handleBookPress(2)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book3]} 
          onPress={() => handleBookPress(3)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book4]} 
          onPress={() => handleBookPress(4)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.book, styles.book5]} 
          onPress={() => handleBookPress(5)}
        >
          <View style={styles.bookGlow} />
        </TouchableOpacity>
      </View>

      <View style={styles.book6Container}>
          <View style={[styles.book, styles.book6]}>
            <View style={styles.book6Glow} />
          </View>
          <TouchableOpacity 
            style={styles.transparentBook} 
            onPress={() => handleBookPress(6)}
          />
        </View>

      <Text style={styles.instructionText}>
        Tap on a book to select it.
      </Text>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    transform: [{ scale: 1.5 }], // Adjust the scale value to zoom in
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  book: {
    position: 'absolute',
    width: 60,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowingBook: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bookGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(242, 222, 111, 0.84)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 7,
    zIndex: 1, // Ensure the glow is below the transparent book
  },
  book1: {
    top: '59.2%',
    left: '23%',
    width: '1.2%',
    height: '1.6%',
  },
  book2: {
    top: '64.3%',
    left: '64%',
    width: '1.3%',
    height: '1.9%',
  },
  book3: {
    top: '63.6%',
    left: '43%',
    width: '1.2%',
    height: '1.6%',
  },
  book4: {
    top: '69%',
    left: '76%',
    width: '1.3%',
    height: '1.9%',
  },
  book5: {
    top: '74.8%',
    left: '47.4%',
    width: '1.2%',
    height: '1.8%',
  },
  book6Container: {
    position: 'absolute',
    top: '77%',
    left: Platform.OS === 'ios' ? '69%' : '72.3%', 
    width: '7%', // Adjust width to match other books
    height: '1.2%', // Adjust height to match other books
    justifyContent: 'center',
    alignItems: 'center',
  },
  book6: {
    width: '100%',
    height: '100%',
  },
  book6Glow: { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(162, 138, 0, 0.28)',
    shadowColor: '#00FFFF', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 0,
    zIndex: 1, // Ensure the glow is below the transparent book
  },
  transparentBook: {
    position: 'absolute',
    width: '100%', // Adjust width to match container
    height: '100%', // Adjust height to match container
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly visible for debugging
    zIndex: 2, // Ensure the transparent book is on top
  },
});

export default ClickableBooksScreen;


