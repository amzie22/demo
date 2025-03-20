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
              placeholderTextColor="#B3B3B3"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <Text style={styles.label1}>Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#B3B3B3"
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
                color="#B3B3B3" 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label1}>Re-enter Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#B3B3B3"
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
                color="#B3B3B3" 
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
    width: '78%',
    height: '61%',
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 30,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 29,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 5,
    fontSize: 15,
    marginTop: '-11',
  },
  label1: {
    alignSelf: 'flex-start',
    color: 'white',
    marginBottom: 5,
    fontSize: 15,
    marginTop: '11',
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
    height: 43,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 7,
  },
  button: {
    width: '55%',
    height: 43,
    backgroundColor: '#382318',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1,
  },
  loginLink: {
    marginTop: 20,
    paddingVertical: 5,
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: '-10',
  },
});

export default SignupScreen;