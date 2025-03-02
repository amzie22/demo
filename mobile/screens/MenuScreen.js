import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Icons for navbar

const MenuScreen = ({ navigation }) => {
  const maxXP = 10000;
  const currentXP = 500;
  const currentLevel = 10;
  const progressPercentage = (currentXP / maxXP) * 1000;

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
                  colors={['#784C34', '#45251A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
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

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Practice')}>
            <Image source={require('../assets/practice.png')} style={styles.navIcon }/>
            <Text style={styles.navText}>PRACTICE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Chapter')}>
            <FontAwesome5 name="calendar-alt" size={22} color="white" />
            <Text style={styles.navText}>CHALLENGES</Text>

        <TouchableOpacity style={[styles.navItem, { marginLeft: 20 }]}>
          <Image source={require('../assets/practice.png')} style={styles.navIcon} />
          <Text style={styles.navText}>PRACTICE</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/challenges.png')} style={styles.navIcon} />
          <Text style={styles.navText}>CHALLENGES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, { marginLeft: 70 }]}>
            <Image source={require('../assets/shop.png')} style={styles.navIcon} />
            <Text style={styles.navText}>SHOP</Text>
          </TouchableOpacity>

          {/* CHAPTER Button - Centered Inside Navbar */}
          <View style={styles.chapterButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Chapter')} style={styles.chapterButton}>
              <Image source={require('../assets/chapter.png')} style={styles.chapterIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.navItem, { marginRight: 18 }]} onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/profile.png')} style={styles.navIcon} />
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
    marginTop: 50,
    marginLeft: 15,
    fontFamily: 'Cardo',
    
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
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
    marginTop: 7,
  },
  levelBarBackground: {
    width: '70%',
    height: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    overflow: 'hidden',
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Cardo',
    marginTop: 3,
  },
  /* Chat Box  */
  chatContainer: {
    flex: 1,
    backgroundColor: 'rgba(107, 103, 103, 0.61)',
    padding: 4,
    borderRadius: 10,
    marginTop: 363,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 132,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
  },

  /* CHAPTER Button - Centered */
  chapterButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: '57%',
    transform: [{ translateX: -30 }], // Center the button
  },
  chapterButton: {
    width: 63,
    height: 63,
    backgroundColor: 'rgb(50, 43, 43)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  chatBox: {
    padding: 15,
  },
  botName: {
    color: '#FFFFFF',
    marginTop: 1,
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Cardo',
  },
  chatMessage: {
    color: '#FFFFFF',
    marginTop: 7,
    marginLeft: 16,
    fontSize: 14,
    fontFamily: 'Cardo',
  },
  navIcon: {
    width: 28,  // Adjust based on your icon size
    height: 28,
    resizeMode: 'contain',
  }, 

  /* Bottom Navigation */
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(102, 99, 99, 0.67)',
    padding: 15,
    borderRadius: 10,
    marginLeft: -11,
    marginRight: -11,
    marginBottom: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontFamily: 'Cardo',
    marginTop: 5,
  },
});

export default MenuScreen;
