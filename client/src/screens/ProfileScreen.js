import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  return (
    <LinearGradient 
      colors={['#F5E6D3', '#E6D5BC']} 
      style={styles.container}
    >
      <View style={styles.profileHeader}>
        <View style={styles.profileCircle} />
        <Text style={styles.username}>Amzlee #0010</Text>
        <Text style={styles.editProfile}>Edit Profile</Text>
      </View>

      <View style={styles.badgesSection}>
        <Text style={styles.badgesTitle}>BADGES</Text>
        <View style={styles.badgeGrid}>
          <View style={styles.badgeCircle} />
          <View style={styles.badgeCircle} />
          <View style={styles.badgeCircle} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log-out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    color: '#2C1810',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editProfile: {
    fontSize: 14,
    color: '#2C1810',
    opacity: 0.7,
  },
  badgesSection: {
    alignItems: 'center',
  },
  badgesTitle: {
    fontSize: 18,
    color: '#2C1810',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  badgeGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ProfileScreen;