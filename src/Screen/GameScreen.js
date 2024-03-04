import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground } from 'react-native';
import TicTacToe from './TicTacToe';
import TicTacToe2 from './tictoc2';

const GameScreen = () => {
    const translateXAnim = useRef(new Animated.Value(-400)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current; // new Animated value for translateY
    const [showTicTacToe, setShowTicTacToe] = useState(false);

    useEffect(() => {
        const animatedTextTimeout = setTimeout(() => {
            Animated.parallel([
                Animated.timing(translateXAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: -300, // adjust the value as needed
                    duration: 3000, // adjust the duration as needed
                    useNativeDriver: true,
                }),
            ]).start(() => setShowTicTacToe(true));
        }, 1000);

        return () => clearTimeout(animatedTextTimeout);
    }, [translateXAnim, translateYAnim]);

    return (
        <ImageBackground
            source={require('../Images/bgimg.png')} // Replace with the actual path to your background image
            style={styles.backgroundImage}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            { translateX: translateXAnim },
                            { translateY: translateYAnim },
                        ],
                    },
                ]}
            >
                <Text style={styles.text}>Start the Game!</Text>
            </Animated.View>

            {showTicTacToe && <TicTacToe />}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "#FFD4C6",
        fontSize: 50,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GameScreen;
