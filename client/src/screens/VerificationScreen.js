// VerificationScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const VerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto-focus to next input
    if (text && index < 5) {
      codeRefs[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    // Add your verification logic here
    // If verification is successful, navigate to MenuScreen
    navigation.navigate('Menu');
  };

  const codeRefs = [];

  return (
    <LinearGradient
      colors={['#081c36', '#0f2e4c', '#081c36']}
      style={styles.container}
    >
      <View style={styles.cosmicOverlay}>
        <LinearGradient
          colors={['rgba(42, 82, 152, 0.4)', 'rgba(0, 0, 0, 0)']}
          style={styles.cosmicGlow}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.3 }}
        />
      </View>
      
      <View style={styles.libraryBottom}>
        <View style={styles.libraryRow} />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Verify your account</Text>
        
        <Text style={styles.subtitle}>
          Please enter the verification code we sent to your email/phone number
        </Text>
        
        <Text style={styles.timerText}>Code expires in 3 minutes</Text>
        
        <View style={styles.codeContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => codeRefs[index] = ref}
              style={styles.codeInput}
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
              selectionColor="white"
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resendLink}>
          <Text style={styles.resendText}>Didn't get a code? Send it again</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cosmicOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cosmicGlow: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    top: 0,
  },
  libraryBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: 'rgba(20, 35, 55, 0.8)',
  },
  libraryRow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(30, 20, 10, 0.8)',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(15, 30, 50, 0.8)',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  timerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 25,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  codeInput: {
    width: 40,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#006E7F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resendLink: {
    marginTop: 20,
    paddingVertical: 5,
  },
  resendText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
});

export default VerificationScreen;