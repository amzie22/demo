// OnboardingScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const [currentScreen, setCurrentScreen] = useState(1);

    const handleNext = () => {
        if (currentScreen < 3) {
            setCurrentScreen(currentScreen + 1);
        } else {
            navigation.replace('Login');
        }
    };

    const screens = [
        {
            title: 'WELCOME',
            description: 'Welcome to Baybayin! Dive into the rich history and beautiful script of Baybayin. Let\'s embark on this learning adventure together!',
            buttonText: 'NEXT',
        },
        {
            title: 'WELCOME',
            description: 'Discover the exciting features of Baybayin Learn! From interactive quizzes to fun challenges, you\'ll master Baybayin while earning rewards and badges along the way.',
            buttonText: 'NEXT',
        },
        {
            title: 'WELCOME',
            description: 'Ready to start learning? Set up your profile and customize your learning experience. Let\'s get you started on the path to mastering Baybayin!',
            buttonText: 'SIGN-UP',
        },
    ];

    const currentData = screens[currentScreen - 1];

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}>{currentData.title}</Text>
                <Text style={styles.description}>{currentData.description}</Text>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>{currentData.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#444', // Darker content background
        padding: 30,
        borderRadius: 10,
        width: width * 0.8, // Adjust width as needed
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF', // Blue button
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
