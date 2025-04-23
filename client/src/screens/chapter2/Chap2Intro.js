import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

const Chap2Intro = ({ route, navigation }) => {
    const { episode } = route.params; // Get the episode number from the route params
    const [showDefaultFont, setShowDefaultFont] = useState(true);
    const [showEpisodeText, setShowEpisodeText] = useState(false);

    const [fontsLoaded] = useFonts({
        DoctrinaChristianaBold: require('../../assets/fonts/DoctrinaChristianaBold.otf'),
    });

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowDefaultFont(false);
        }, 5000);

        const timer2 = setTimeout(() => {
            setShowEpisodeText(true);
        }, 10000);

        // Navigate to the appropriate screen based on the episode
        const navigateTimer = setTimeout(() => {
            if (episode === 1) {
                navigation.navigate('Chapter2Details'); // Navigate to Chapter2Details for Episode 1
            } else if (episode === 2) {
                navigation.navigate('Ep2Details'); // Navigate to a different screen for Episode 2
            }
        }, 15000); // 5 seconds after "Episode X" is displayed

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(navigateTimer); // Cleanup navigate timer
        };
    }, [episode, navigation]);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#784C34" />;
    }

    return (
        <ImageBackground source={require('../../assets/MainBG.png')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    {showEpisodeText ? (
                        <Text style={styles.title}>Episode {episode}</Text> // Dynamically show the episode number
                    ) : showDefaultFont ? (
                        <Text style={styles.title}>Kabanata 2</Text>
                    ) : (
                        <Text style={[styles.title, { fontFamily: 'DoctrinaChristianaBold' }]}>
                            Kbnt <Text style={{ fontFamily: 'default' }}>2</Text>
                        </Text>
                    )}
                    {!showEpisodeText && (
                        showDefaultFont ? (
                            <Text style={styles.subtitle}>The Laguna Copperplate {'\n'}Inscription</Text>
                        ) : (
                            <Text style={[styles.subtitle, { fontFamily: 'DoctrinaChristianaBold' }]}>
                                Inxkxripxsiyonx s {'\n'}bintxbtx n  tnxso {'\n'}Nx lgun
                            </Text>
                        )
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

export default Chap2Intro;
