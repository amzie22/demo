import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const TestScreen = ({ navigation }) => {

    const [Ingame_name, setIngame_name] = useState('');
    const [Avatar, setAvatar] = useState('');


    const handleUserIGN = async () => { 
        try {
            const response = await fetch('http://192.168.8.38:3000/api/users/3', {
              method: 'PUT',
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                Ingame_name: Ingame_names
              }),
            });
            const data = await response.json();
            console.log("Nickname updated successfully:", data);
        } catch (error) {
            console.log('Error saving data',error);
        }
    };

  //   const handleUserAVATAR = async () => { 
  //     try {
  //         const response = await fetch('http://192.168.8.38:3000/api/users/1', {
  //           method: 'POST',
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             Avatar: Avatar
  //           }),
  //         });
  //         const data = await response.json();
  //         console.log("Avatar Created successfully:", data);
  //     } catch (error) {
  //         console.log('Error saving data',error);
  //     }
  // };

  return (
    <LinearGradient 
      colors={['#F5E6D3', '#E6D5BC']} 
      style={styles.container}
    >
     <Text style={styles.label}>NICKNAME</Text>
             <View style={styles.inputContainer}>
               <TextInput
                 style={styles.input}
                 placeholder="Enter your nickname"
                 placeholderTextColor="rgba(255,255,255,0.5)"
                 value={Ingame_name}
                 onChangeText={setIngame_name}
               />
             </View>
             <TouchableOpacity style={styles.button} onPress={handleUserIGN}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* <Text style={styles.label}>AVATARS</Text>
             <View style={styles.inputContainer}>
               <TextInput
                 style={styles.input}
                 placeholder="CHOOSE YOUR AVATAR"
                 placeholderTextColor="rgba(255,255,255,0.5)"
                 value={Avatar}
                 onChangeText={setAvatar}
               />
             </View>
             <TouchableOpacity style={styles.button} onPress={handleUserAVATAR}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity> */}

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
export default TestScreen;