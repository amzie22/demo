import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HandleUserAvatar = ({ avatars, onNext }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { token, User_ID } = JSON.parse(userData);
          setToken(token);
          setUserId(User_ID);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleNext = async () => {
    if (selectedAvatar !== null) {
      try {
        const response = await axios.patch(`https://backend-y4fw.onrender.com/api/users/avatar/${userId}`, {
          avatar_id: selectedAvatar,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          onNext(selectedAvatar);
          Alert.alert('Success', response.data.message);
        }
      } catch (error) {
        console.error('Error saving avatar:', error);
        Alert.alert('Error', 'Failed to save avatar. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please select an avatar.');
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.questionText}>"Choose your avatar"</Text>
      <View style={styles.avatarGrid}>
      {selectedAvatar !== null && ( <Image source={avatars[selectedAvatar]} style={styles.bigAvatar} />)}
              <View style={styles.smallAvatars}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedAvatar(index)}>
            <Image
              source={avatar}
              style={[
                styles.avatar,
                selectedAvatar === index && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      </View>
      <TouchableOpacity
        style={[styles.nextButton, selectedAvatar === null && { backgroundColor: '#555' }]}
        onPress={handleNext}
        disabled={selectedAvatar === null}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    width: 310,
    height: 400,
    backgroundColor: 'rgba(41, 41, 41, 0.2)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
  },
  smallAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  selectedAvatar: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  nextButton: {
    backgroundColor: '#8B5E3C',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(43, 4, 4, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HandleUserAvatar;