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
            <Text style={styles.signupText}>Create account? Sign-up</Text>
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
    width: '78%',
    height: '56%',
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
    marginTop: '35',
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
  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -2,
    marginBottom: 18,
  },
  forgotText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
  },
  button: {
    width: '55%',
    height: 43,
    backgroundColor: '#382318',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1,
  },
  signupLink: {
    marginTop: 20,
    paddingVertical: 5,
  },
  signupText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: '-10',
  },
});

export default LoginScreen;