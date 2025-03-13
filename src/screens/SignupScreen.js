import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ImageBackground
      source={require('../assets/splash.png')}
      style={styles.container}
    >

        <View style={styles.formContainer}>
          <Text style={styles.title}>SIGN-UP</Text>
          
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
          
          <Text style={styles.label}>Re-enter Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Verification')}
          >
            <Text style={styles.buttonText}>SIGN-UP</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 2,
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
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#006E7F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginLink: {
    marginTop: 20,
    paddingVertical: 5,
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});

export default SignupScreen;