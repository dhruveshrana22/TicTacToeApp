// CardScreen.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CardScreen = ({ }) => {
    const navigation = useNavigation();
    const handleCardPress = () => {
        navigation.navigate('DetailsScreen');
    };

    return (
        <View style={styles.container}>
           
            <TouchableOpacity style={styles.card} onPress={handleCardPress}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: "https://imgs.search.brave.com/AQcmpxQYYhdpmKZGOuoV198p8fqZQLXIQ9-bWd1wfYY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM1LmRlcG9zaXRw/aG90b3MuY29tLzEw/MDAxMjgvNDAzL2kv/NDUwL2RlcG9zaXRw/aG90b3NfNDAzMjg1/NS1zdG9jay1waG90/by10aWMtdGFjLXRv/ZS5qcGc" }}
                    />
                </View>
                <Text style={styles.text}>Tic Tac Toe</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 100

    },
    card: {
        borderWidth: 5,
        borderRadius: 10,
        padding: 20,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 200,
        overflow: 'hidden',
        borderWidth: 5,
        borderColor: 'rgba(0, 0, 255, 0.5)', // Blue glow color
        marginBottom: 15,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    text: {
        fontSize: 30,
        color: 'black',
        fontWeight: '900',
    },
    textcmd: {
        fontSize: 28,
        color: 'black',

        marginLeft: 10,
        fontWeight: '600',
        marginBottom: 30
    },
});

export default CardScreen;
