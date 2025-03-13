import React from 'react';
import { View, ImageBackground, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const ClickableBooksScreen = ({ navigation }) => {
  const handleBookPress = (bookNumber) => {
    // In a real app, you would navigate to book details or content
    // For now, we'll just show which book was clicked through console
    console.log(`Book ${bookNumber} selected`);
    
    // You can add navigation to another screen here
    // navigation.navigate('BookDetails', { bookId: bookNumber });
  };

  return (
    <ImageBackground 
      source={require('../assets/back.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Library appearance matching the image */}
        <View style={styles.libraryContainer}>
          {/* You can add static library shelves here if needed */}
        </View>
        
        {/* Clickable Books with glow effect */}
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
      
      {/* Optional instruction text */}
      <Text style={styles.instructionText}>
        Select a book to begin your journey...
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    width: '130%',
    height: '130%',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  book1: {
    top: '30%',
    left: '20%',
  },
  book2: {
    top: '40%',
    left: '50%',
  },
  book3: {
    top: '50%',
    left: '30%',
  },
  book4: {
    top: '60%',
    left: '70%',
  },
  book5: {
    top: '70%',
    left: '40%',
  },
  instructionText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
});

export default ClickableBooksScreen;