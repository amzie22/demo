import React, { useState, useRef, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Modal } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const ClickableBooksScreen = ({ navigation }) => {
  // Replace single animation state with object to track which animation is showing
  const [animation, setAnimation] = useState({
    show: false,
    book: null
  });
  const scrollViewRef = useRef(null);
  const [scrollViewKey, setScrollViewKey] = useState(0); 

  const handleBookPress = (bookNumber) => {
    console.log(`Book ${bookNumber} selected`);
    
    // Reset zoom to original level when any book is clicked
    setScrollViewKey(prevKey => prevKey + 1);
    
    if ([1, 2, 3, 5].includes(bookNumber)) {
      // Show animation for books 1, 2, 3, and 5
      setAnimation({
        show: true,
        book: bookNumber
      });
      
      // Allow animation to play before navigating
      setTimeout(() => {
        setAnimation({
          show: false,
          book: null
        });
        navigation.navigate('ClickableBooks');
      }, 15000);
    } else if (bookNumber === 6) {
      navigation.navigate('Skip');
    } else {
      navigation.navigate('ClickableBooks');
    }
  };

  const handleAnimationClose = () => {
    setAnimation({
      show: false,
      book: null
    });
    
    // Force ScrollView to re-render with default zoom
    setScrollViewKey(prevKey => prevKey + 1);
  };

  // Add console logs to debug
  useEffect(() => {
    if (animation.show) {
      console.log(`Animation modal opened for Book ${animation.book}, attempting to load animation`);
    }
  }, [animation]);
  
  // Helper function to get the correct animation source
  const getAnimationSource = (bookNumber) => {
    switch(bookNumber) {
      case 1:
        return require('../../assets/animation/B1.gif');
      case 2:
        return require('../../assets/animation/B2.gif');
      case 3:
        return require('../../assets/animation/B3.gif');
      case 5:
        return require('../../assets/animation/B4.gif');
      default:
        return require('../../assets/animation/B1.gif');
    }
  };
  
  return (
    <>
      <ScrollView
        key={scrollViewKey}
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        minimumZoomScale={1.0} 
        maximumZoomScale={1.0}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.imageContainer}>
          <ImageBackground 
            source={require('../../assets/clickablebooks.png')} 
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
                style={[styles.book, styles.book5]} 
                onPress={() => handleBookPress(5)}
              >
                <View style={styles.bookGlow} />
              </TouchableOpacity>
            </View>

            <View style={styles.book6Container}>
              <TouchableOpacity 
                style={[styles.book, styles.book6]} 
                onPress={() => handleBookPress(6)}
              >
                <View style={styles.book6Glow} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      {/* Updated Animation Modal */}
      <Modal
        visible={animation.show}
        transparent={true}
        animationType="fade"
        onRequestClose={handleAnimationClose}
      >
        <View style={styles.animationContainer}>
          <TouchableOpacity 
            style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}
            activeOpacity={1}
            onPress={handleAnimationClose}
          >
            <Image
              source={getAnimationSource(animation.book)}
              style={styles.animation}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    width, // Match the screen width
    height, // Match the screen height
  },
  imageContainer: {
    width, // Match the screen width
    height, // Match the screen height
    overflow: 'hidden', // Prevent white space from showing
  },
  background: {
    width, // Match the screen width
    height, // Match the screen height
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
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(223, 193, 23, 0.72)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 7,
  },
  book1: {
    top: '57.5%',
    left: '20%',
    width: '2%',
    height: '3%',
  },
  book2: {
    top: '64.9%',
    left: '69%',
    width: '2%',
    height: '3%',
  },
  book3: {
    top: '61.7%',
    left: '39.1%',
    width: '2%',
    height: '3%',
  },
  book4: {
    top: '70%',
    left: '80.2%',
    width: '2%',
    height: '3%',
  },
  book5: {
    top: '75.1%',
    left: '47.4%',
    width: '2%',
    height: '3%',
  },
  book6Container: {
    position: 'absolute',
    top: '75%',
    left: '63%', 
  },
  book6: {
    width: 15,
    height: 15,
  },
  book6Glow: { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 1,
    backgroundColor: 'rgba(253, 255, 151, 0.36)',
    shadowColor: '#00FFFF', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 0,
  },
  animationContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '90%',
    height: '90%',
  },
});

export default ClickableBooksScreen;

