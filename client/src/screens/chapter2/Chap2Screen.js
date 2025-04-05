import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Chap2Screen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [currentDialogue, setCurrentDialogue] = useState(1); // 1 for first text, 2 for second, 3 for third

    const dialogueText1 = "Chapter 2\nThe Forgotten Glyph";
    const dialogueText2 = "Kabanata 2\nAng Nakalimutang Sagisag";
    const dialogueText3 = "Episode 1";

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        const loadFonts = async () => {
            await Font.loadAsync({
                'DoctrinaChristianaBold': require('../../assets/fonts/DoctrinaChristianaBold.otf'),
            });
            setFontsLoaded(true);
            SplashScreen.hideAsync();
        };

        loadFonts();

        const timer1 = setTimeout(() => setCurrentDialogue(2), 500);
        const timer2 = setTimeout(() => setCurrentDialogue(3), 1000);
        const timer3 = setTimeout(() => navigation.navigate('Chapter2Details'), 1500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [navigation]);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3D261C" />
            </View>
        ); // Render a loading spinner while waiting for fonts to load
    }

    return (
        <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    {currentDialogue === 1 && <Text style={styles.dialogueText}>{dialogueText1}</Text>}
                    {currentDialogue === 2 && <Text style={styles.dialogueTextAlt}>{dialogueText2}</Text>}
                    {currentDialogue === 3 && <Text style={styles.dialogueText}>{dialogueText3}</Text>}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    textContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.0)', // No background
        padding: 20,
        borderRadius: 10,
    },
    dialogueText: {
        fontSize: 32,
        color: '#000', // Black text like old paper
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dialogueTextAlt: {
        fontSize: 32,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'DoctrinaChristianaBold', // Ensure the font is set here
    },
});

export default Chap2Screen;
