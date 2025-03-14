import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground source={require('../assets/splash.png')} style={styles.background}>
      <View style={styles.container}>
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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