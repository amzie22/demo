import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ChapterDetailsScreen = () => {
  return (
    <LinearGradient 
      colors={['#F5E6D3', '#E6D5BC']} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chapterCard}>
          <Text style={styles.chapterTitle}>Chapter 2</Text>
          <Text style={styles.chapterSubtitle}>The Laguna Copperplate Inscription</Text>
          <View style={styles.episodeList}>
            <TouchableOpacity style={styles.episodeItem}>
              <Text style={styles.episodeText}>Episode 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.episodeItem}>
              <Text style={styles.episodeText}>Episode 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.episodeItem}>
              <Text style={styles.episodeText}>Episode 3</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#8B4513',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chapterTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chapterSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  episodeList: {
    gap: 10,
  },
  episodeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  episodeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ChapterDetailsScreen;