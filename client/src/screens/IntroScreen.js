import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
    const navigation = useNavigation();
    
    const dialogueText1 = "Chapter 1\nThe Forgotten Glyph";
    const dialogueText2 = "𐑿𐑩𐑯𐑏 1\n𐑾𐑚 𐑩𐑤𐑣𐑡𐑩𐑯 𐑚𐑨𐑤𐑙";

    const [showSecondText, setShowSecondText] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowSecondText(true);
        }, 1000); // Delay before showing second text

        const timer2 = setTimeout(() => {
            navigation.navigate('Chapter1Details');
        }, 2000); // Delay before navigating

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [navigation]);

    return (
        <ImageBackground source={require('../assets/MainBG.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    {!showSecondText && <Text style={styles.dialogueText}>{dialogueText1}</Text>}
                    {showSecondText && <Text style={styles.dialogueTextAlt}>{dialogueText2}</Text>}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
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
        fontFamily: 'serif',
    },
    dialogueTextAlt: {
        fontSize: 32,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});

export default IntroScreen;
