import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChapterScreen = ({ navigation }) => {
  const [expandedChapter, setExpandedChapter] = useState(null); // State to track which chapter is expanded

  const toggleChapter = (chapter) => {
    if (chapter === 3 || chapter === 4) return; // Disable Chapters 3 and 4
    setExpandedChapter(expandedChapter === chapter ? null : chapter); // Toggle the expanded state
  };

  return (
    <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#3D261C" />
            <Text style={styles.headerText}>Chapters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        {/* Content */}
        <View style={styles.content}>
          {/* Chapter 1 */}
          <TouchableOpacity style={styles.chapterBox} onPress={() => navigation.navigate('Chapter1Details')}>
            <Text style={styles.chapterText}>Chapter 1</Text>
          </TouchableOpacity>

          {/* Chapter 2 */}
          <TouchableOpacity style={styles.chapterBox} onPress={() => toggleChapter(2)}>
            <Text style={styles.chapterText}>Chapter 2</Text>
          </TouchableOpacity>
          {expandedChapter === 2 && (
            <View style={styles.episodeList}>
              <TouchableOpacity onPress={() => navigation.navigate('Chap2Intro', { episode: 1 })}>
                <Text style={[styles.episodeText, { marginTop: 10 }]}>Episode 1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Chap2Intro', { episode: 2 })}>
                <Text style={styles.episodeText}>Episode 2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Chap2Intro', { episode: 3 })}>
                <Text style={styles.episodeText}>Episode 3</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Chapter 3 (Disabled) */}
          <View style={[styles.chapterBox, styles.disabledChapter]}>
            <Text style={styles.disabledChapterText}>Chapter 3</Text>
          </View>

          {/* Chapter 4 (Disabled) */}
          <View style={[styles.chapterBox, styles.disabledChapter]}>
            <Text style={styles.disabledChapterText}>Chapter 4</Text>
          </View>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  chapterBox: {
    width: '90%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#784C34',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chapterText: {
    color: '#d9d9d9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  episodeList: {
    width: '90%',
    backgroundColor: 'rgb(137, 90, 65)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: -15,
  },
  episodeText: {
    fontSize: 17,
    color: '#d9d9d9',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  disabledChapter: {
    backgroundColor: 'rgb(93, 93, 93)', // Lighter gray to indicate disabled
    elevation: 0, // Remove shadow
  },
  disabledChapterText: {
    color: '#FFFFFF', // White text for disabled chapters
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChapterScreen;
