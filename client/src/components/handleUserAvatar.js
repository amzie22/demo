import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HandleUserAvatar = ({ avatars, onNext }) => {
  const [selectedAvatarKey, setSelectedAvatarKey] = useState(null);
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
    if (selectedAvatarKey !== null) {
      try {
        const response = await axios.patch(`https://backend-y4fw.onrender.com/api/users/avatar/${userId}`, {
          Avatar: selectedAvatarKey,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          onNext(selectedAvatarKey);
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
    <View style={styles.container}>
      <Text style={styles.questionText}>"Choose your avatar"</Text>
      <View style={styles.avatarGrid}>
        {Object.keys(avatars).map((key) => (
          <TouchableOpacity key={key} onPress={() => setSelectedAvatarKey(key)}>
            <Image
              source={avatars[key]}
              style={[
                styles.avatar,
                selectedAvatarKey === key && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.nextButton, selectedAvatarKey === null && { backgroundColor: '#555' }]}
        onPress={handleNext}
        disabled={selectedAvatarKey === null}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: '55%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  questionText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 150,
    marginBottom: 20,
  },
  avatarGrid: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
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
    marginTop: 35,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HandleUserAvatar;