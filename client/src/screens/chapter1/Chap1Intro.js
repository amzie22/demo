import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

const Chap1Intro = ({ navigation }) => {
    const [showDefaultFont, setShowDefaultFont] = useState(true);

    const [fontsLoaded] = useFonts({
        DoctrinaChristianaBold: require('../../assets/fonts/DoctrinaChristianaBold.otf'),
    });

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowDefaultFont(false);
        }, 5000);

        // Navigate to the next screen
        const navigateTimer = setTimeout(() => {
            navigation.navigate('Chapter1Details'); // Navigate to Chapter1Details
        }, 10000); // 5 seconds after the subtitle is displayed

        return () => {
            clearTimeout(timer1);
            clearTimeout(navigateTimer); // Cleanup navigate timer
        };
    }, [navigation]);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#784C34" />;
    }

    return (
        <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    {showDefaultFont ? (
                        <Text style={styles.title}>Kabanata 1</Text>
                    ) : (
                        <Text style={[styles.title, { fontFamily: 'DoctrinaChristianaBold' }]}>
                            Kbnt <Text style={{ fontFamily: 'default' }}>1</Text>
                        </Text>
                    )}
                    {showDefaultFont ? (
                        <Text style={styles.subtitle}>The Forgotten Glyph</Text>
                    ) : (
                        <Text style={[styles.subtitle, { fontFamily: 'DoctrinaChristianaBold' }]}>
                            Thx Fxrggxtxn Glypx
                        </Text>
                    )}
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        color: '#3D261C',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: '#3D261C',
        textAlign: 'center',
    },
});

export default Chap1Intro;