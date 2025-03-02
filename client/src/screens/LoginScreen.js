// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <Text style={styles.title}>LOGIN</Text>
        
        <Text style={styles.label}>Email:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Verification')}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.signupLink}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>Create an account</Text>
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
    fontSize: 28,
    color: 'white',
    marginBottom: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 5,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 20,
  },
  forgotText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
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
  signupLink: {
    marginTop: 20,
    paddingVertical: 5,
  },
  signupText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});

export default LoginScreen;