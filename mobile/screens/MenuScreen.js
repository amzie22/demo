import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MenuScreen = ({ navigation }) => {
  return (
    <LinearGradient 
      colors={['#2C1810', '#3D261C']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileCircle} />
          <Text style={styles.username}>Amzlee #0010</Text>
          <Text style={styles.userStatus}>Online</Text>
        </View>

        {/* Chat Section */}
        <View style={styles.chatSection}>
          <Text style={styles.botName}>Scribeon:</Text>
          <Text style={styles.chatMessage}>Hello Amzlee! How are you today?</Text>
        </View>

        {/* Navigation Bar */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>CALENDAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chapter')}>
             <Text style={styles.navText}>LIBRARY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>CHAT</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.navText}>PROFILE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
    marginRight: 10,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStatus: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 10,
    opacity: 0.7,
  },
  chatSection: {
    flex: 1,
    padding: 20,
  },
  botName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 15,
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
export default MenuScreen;