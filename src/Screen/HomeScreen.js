import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CardScreen from '../Componants/Box';

// App component
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Use ImageBackground with your desired image source */}
            <ImageBackground
                source={require('../Images/Chopdi.png')}
                style={styles.gradientBackground}
            >
                <CardScreen />
            </ImageBackground>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Remove backgroundColor
        // You can add more styles as needed
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

// Export the App component
export default HomeScreen;
