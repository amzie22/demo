import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Icons for navbar

const MenuScreen = ({ navigation }) => {
  const maxXP = 10000;
  const currentXP = 500;
  const currentLevel = 10;
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Profile Header */}
        <View style={styles.profileContainer}>
          <Image source={require('../assets/rizal.png')} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Amziee #0000</Text>

            {/* XP Progress Bar */}
            <View style={styles.levelBarContainer}>
              <View style={styles.levelBarBackground}>
                <LinearGradient
                  colors={['#784C34D4', '#45251AF0']}
                  style={[styles.levelBarFill, { width: `${progressPercentage}%` }]}
                />
              </View>
              <Text style={styles.levelText}>Level {currentLevel}: {currentXP}/{maxXP}</Text>
            </View>
          </View>
        </View>

        {/* Chat Box */}
        <View style={styles.chatContainer}>
          <View style={styles.chatBox}>
            <Text style={styles.botName}>Scribeon:</Text>
            <Text style={styles.chatMessage}>Hello Amziee! How are you today?</Text>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/practice.png')} style={styles.navIcon} />
            <Text style={styles.navText}>PRACTICE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Chapter')}>
            <FontAwesome5 name="calendar-alt" size={22} color="white" />
            <Text style={styles.navText}>CHALLENGES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Shop')}>
            <Image source={require('../assets/shop.png')} style={styles.navIcon} />
            <Text style={styles.navText}>SHOP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={24} color="white" />
            <Text style={styles.navText}>PROFILE</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  /* Profile Header*/
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Cardo',
  },
  /* Level Bar */
  levelBarContainer: {
    marginTop: 5,
  },
  levelBarBackground: {
    width: '25%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Cardo',
    marginTop: 3,
  },
  /* Chat Box  */
  chatContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    padding: 20,
    borderRadius: 10,
    marginTop: 300,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 80,
    borderWidth: 1,
    filter: 'drop-shadow(0px 4px 4px rgba(81, 80, 80, 0.25))',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  chatBox: {
    padding: 20,
  },
  botName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cardo',
  },
  chatMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Cardo',
  },
  navIcon: {
    width: 24,  // Adjust based on your icon size
    height: 24,
    resizeMode: 'contain',
  }, 
  /* Bottom Navigation */
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Cardo',
    marginTop: 5,
  },
});

export default MenuScreen;
