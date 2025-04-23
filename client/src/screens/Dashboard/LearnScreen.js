import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const LearnScreen = () => {
  const navigation = useNavigation();

  // Load the custom font
  const [fontsLoaded] = useFonts({
    DoctrinaChristianaBold: require('../../assets/fonts/DoctrinaChristianaBold.otf'), // Ensure the path is correct
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#784C34" />; // Show a loader while fonts are loading
  }

  return (
    <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#3D261C" />
          <Text style={styles.headerText}>Learn About Baybayin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} /> 
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Pagbasa')}>
        <Ionicons name="book" size={40} color="#D9D9D9" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Pgxbbs</Text>
          <Text style={styles.subText}>Pagbabasa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Pagsulat')}>
        <Ionicons name="pencil" size={40} color="#D9D9D9" style={styles.icon} /> 
        <View style={styles.textContainer}>
          <Text style={styles.text}>Pgxsusultx</Text>
          <Text style={styles.subText}>Pagsusulat</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={[styles.box, { marginTop: 50 }]} onPress={() => console.log('Box clicked')}>
        <Ionicons name="time" size={40} color="#D9D9D9" style={styles.icon} /> 
        <View style={styles.textContainer}>
          <Text style={styles.text}>Ksyxsynx</Text>
          <Text style={styles.subText}>Kasaysayan</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => console.log('Box clicked')}>
        <Ionicons name="library" size={40} color="#D9D9D9" style={styles.icon} /> 
        <View style={styles.textContainer}>
          <Text style={styles.text}>Mxg Akxltx</Text>
          <Text style={styles.subText}>Mga Aklat</Text>
        </View>
      </TouchableOpacity> */}
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
  box: {
    width: '90%',
    height: '13%',
    backgroundColor: '#784C34',
    alignSelf: 'center',
    justifyContent: 'flex-start', // Align content to the left
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3D261C',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
    flexDirection: 'row', // Align icon and text horizontally
    paddingHorizontal: 20,
    paddingLeft: 15, // Add padding to the left for spacing
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10, // Adjust spacing between icon and text
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', // Center the text vertically relative to the icon
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 15, // Add margin to the left for spacing
  },
  text: {
    fontSize: 32,
    fontFamily: 'DoctrinaChristianaBold', // Custom font
    color: '#D9D9D9',
  },
  subText: {
    fontSize: 16, // Adjust font size for the second line
    fontFamily: 'sans-serif', // Normal font
    color: '#D9D9D9', // Match the color of the first line
  },
});

export default LearnScreen;