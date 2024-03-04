import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';


const DetailsScreen = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const handleCardPress = (gameType) => {

        // Handle navigation based on the game type (D vs Com or D vs D)
        console.log(`Navigating to ${gameType}`);
        navigation.navigate('GameScreen', { gameType });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }, 500);

        return () => clearTimeout(timeout); // Clear the timeout on component unmount

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures it runs only once on mount

    const animatedStyle = {
        transform: [{ scale: animatedValue }],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tic-Tac-Toe</Text>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Image source={require('../Images/sunChokdi.png')} style={{ width: 310, height: 310 }} />

                </View>
            </View>
            <TouchableOpacity style={[styles.vsCard, animatedStyle]} onPress={() => handleCardPress("D vs Com")}>
                <Text style={styles.vsText}>Play!         D vs Com</Text>
                <View style={[styles.vsOverlay, styles.vsOverlayRight]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.vsCard, animatedStyle]} onPress={() => handleCardPress("D vs D")}>
                <Text style={styles.vsText}>Play!              D vs D</Text>
                <View style={[styles.vsOverlay, styles.vsOverlayLeft]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000035', // Purple background color
    },
    title: {
        fontSize: 50,
        fontWeight: '900',
        color: '#ff5f1f', // White text color
        marginBottom: 20,
    },
    cardContainer: {
    },
    card: {
        borderRadius: 10,
        width: '80%',
        aspectRatio: 1, // Maintain aspect ratio
        paddingLeft: 10,
    },
    grid: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    boxText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    oText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue', // Color for "O"
    },
    xText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red', // Color for "X"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.08)', // Softer and subtle opacity
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)', // Gentle glow color
        shadowColor: 'rgba(255, 255, 255, 0.4)', // Same as borderColor for consistency
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5, // Android elevation for a shadow effect
    },



    vsCard: {
        borderWidth: 2,
        borderColor: '#ff5f1f',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
        position: 'relative', // Make the position relative to allow overlay positioning
    },
    vsText: {
        color: '#ff5f1f',
        fontSize: 24,
        fontWeight: 'bold',
    },
    vsOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 102, 102, 0.1)', // Light red color with subtle opacity
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 102, 102, 0.4)', // Lighter red glow color
        shadowRadius: 10,
        elevation: 5, // Android elevation for a shadow effect
    },
    vsOverlayLeft: {
        shadowColor: 'rgba(255, 102, 102, 0.4)', // Same as borderColor for consistency
        shadowOffset: {
            width: -5, // Negative value to make it come from the left side
            height: 0,
        },
        shadowOpacity: 1,
    },
    vsOverlayRight: {
        shadowColor: 'rgba(255, 102, 102, 0.4)', // Same as borderColor for consistency
        shadowOffset: {
            width: 5, // Positive value to make it come from the right side
            height: 0,
        },
        shadowOpacity: 1,
    },

});

export default DetailsScreen;
