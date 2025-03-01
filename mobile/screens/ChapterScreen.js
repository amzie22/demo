import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ChapterScreen = ({ navigation }) => {
  return (
    <LinearGradient 
      colors={['#F5E6D3', '#E6D5BC']} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.chapterCard}
        >
          <Text style={styles.chapterText}>Chapter 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chapterCard}  
        onPress={() => navigation.navigate('ChapterDetail')}>
          <Text style={styles.chapterText}>Chapter 2</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  chapterCard: {
    width: '80%',
    height: 150,
    backgroundColor: '#8B4513',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chapterText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default ChapterScreen;
