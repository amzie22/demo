import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Pagbasa = () => {
  const navigation = useNavigation();

  // Array of syllables
  const syllables = [
    { top: 'A', bottom: 'A' },
    { top: 'E', bottom: 'E/I' },
    { top: 'O', bottom: 'O/U' },
    { top: 'B', bottom: 'Ba' },
    { top: 'K', bottom: 'Ka' },
    { top: 'R', bottom: 'Ra/Da' },
    { top: 'G', bottom: 'Ga' },
    { top: 'H', bottom: 'Ha' },
    { top: 'L', bottom: 'La' },
    { top: 'M', bottom: 'Ma' },
    { top: 'n', bottom: 'Na' },
    { top: 'N', bottom: 'Nga' },
    { top: 'P', bottom: 'Pa' },
    { top: 'S', bottom: 'Sa' },
    { top: 'T', bottom: 'Ta' },
    { top: 'W', bottom: 'Wa' },
    { top: 'Y', bottom: 'Ya' },
  ];

  return (
    <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#3D261C" />
            <Text style={styles.headerText}>Pagbasa ng Baybayin</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Vowels Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mga Silabang (Syllables)</Text>
        </View>

        {/* Render syllables dynamically in rows */}
        {Array.from({ length: Math.ceil(syllables.length / 4) }, (_, rowIndex) => {
          const rowSyllables = syllables.slice(rowIndex * 4, rowIndex * 4 + 4);
          return (
            <View
              key={rowIndex}
              style={[
                styles.groupedTextRow,
                rowSyllables.length < 4 && { justifyContent: 'center' }, // Center items if fewer than 4
              ]}
            >
              {rowSyllables.map((syllable, index) => (
                <View key={index} style={styles.groupedTextContainer}>
                  <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>
                    {syllable.top}
                  </Text>
                  <Text style={styles.textBottom}>{syllable.bottom}</Text>
                </View>
              ))}
            </View>
          );
        })}

        <View style={[styles.line, { marginTop: 30, width: '75%', alignSelf: 'center' }]} />

        {/* Kudlit */}
        <View style={[styles.titleContainer, { marginTop: 20 }]}>
          <Text style={styles.title}>Kudlit</Text>
        </View>

        {/* New grouped text */}
        <View style={[styles.groupedTextRow, { marginTop: 30, paddingHorizontal: 70, marginBottom: 10 }]}>
          <View style={styles.groupedTextContainer}>
            <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>B</Text>
            <Text style={styles.textBottom}>Ba</Text>
          </View>
          <View style={styles.groupedTextContainer}>
            <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>Be</Text>
            <Text style={styles.textBottom}>Be/Bi</Text>
          </View>
          <View style={styles.groupedTextContainer}>
            <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>Bo</Text>
            <Text style={styles.textBottom}>Bo/Bu</Text>
          </View>
        </View>
        <Text style={[styles.textBottom, { textAlign: 'center', paddingHorizontal: 20}]}>
            Add a <Text style={{ fontWeight: 'bold' }}>Kudlit</Text> at the top to change a syllable into vowel E/I.{'\n\n'}Add a <Text style={{ fontWeight: 'bold' }}>Kudlit</Text> at the bottom to change a syllable into vowel O/U.
        </Text>

      <View style={[styles.line, { marginTop: 30, width: '75%', alignSelf: 'center' }]} />

      {/* Vowel Killer  */}
        <View style={[styles.titleContainer, { marginTop: 20 }]}>
          <Text style={styles.title}>Vowel Killer</Text>
        </View>

        {/* New grouped text */}
        <View style={[styles.groupedTextRow, { marginTop: 30, paddingHorizontal: 110, marginBottom: 10 }]}>
          <View style={styles.groupedTextContainer}>
            <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>B</Text>
            <Text style={styles.textBottom}>Ba</Text>
          </View>
          <View style={styles.groupedTextContainer}>
            <Text style={[styles.textTop, { fontFamily: 'DoctrinaChristianaBold' }]}>Bx</Text>
            <Text style={styles.textBottom}>B</Text>
          </View>
        </View>
        <Text style={[styles.textBottom, { textAlign: 'center', paddingHorizontal: 20, marginBottom: 70 }]}>
            Add a <Text style={{ fontWeight: 'bold' }}>x or +</Text> at the bottom of a syllable to make it a standalone letter.
        </Text>
      </ScrollView>

    </ImageBackground>

    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding to prevent content from being cut off
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
  titleContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: '#3D261C',
    fontStyle: 'italic',
  },
  groupedTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 40,
    flexWrap: 'wrap',
  },
  groupedTextContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textTop: {
    fontSize: 50,
    color: '#3D261C',
  },
  textBottom: {
    fontSize: 16,
    color: '#3D261C',
    marginTop: 5,
  },
});

export default Pagbasa;