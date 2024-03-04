// Import necessary modules from React and React Native
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

// Function to check the winner
const checkWinner = (board) => {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 4; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === board[i][3]) {
            return board[i][0];
        }
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === board[3][i]) {
            return board[0][i];
        }
    }

    // // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[3][3]) {
        return board[0][0];
    }
    if (board[0][3] !== '' && board[0][3] === board[1][2] && board[1][2] === board[2][1] && board[2][1] === board[3][0]) {
        return board[0][3];
    }

    // Check for a tie
    let isTie = true;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === '') {
                isTie = false;
                break;
            }
        }
        if (!isTie) {
            break;
        }
    }

    if (isTie) {
        return 'Tie';
    }

    // No winner yet
    return null;
};

// Main functional component
const TicTacToe = () => {
    const navigation = useNavigation();

    const initialBoard = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ];

    // State to keep track of the current player and the game board
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [board, setBoard] = useState(initialBoard);

    // Function to handle a cell press
    const handleCellPress = (row, col) => {
        // Check if the cell is already occupied or if the game is already won
        if (board[row][col] !== '' || checkWinner(board)) {
            return;
        }

        // Update the board with the current player's symbol
        const newBoard = [...board];
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        // Check for a winner or tie
        const winner = checkWinner(newBoard);
        if (winner) {
            Alert.alert('Game Over', winner === 'Tie' ? 'It\'s a Tie!' : `Player ${winner} wins!`, [
                { text: 'OK', onPress: () => navigation.goBack() } // Navigate back to the home screen
            ]);
            setBoard(initialBoard);
        } else {
            // Switch to the next player
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    // Function to render a cell
    const renderCell = (row, col) => (
        <TouchableOpacity
            key={col}
            style={styles.cell}
            onPress={() => handleCellPress(row, col)}
        >
            {board[row][col] === 'X' && (
                <Image source={require('../Images/Chokdi.png')} style={styles.cellImage} />
            )}
            {board[row][col] === 'O' && (
                <Image source={require('../Images/Sun.png')} style={styles.cellImage} />
            )}
        </TouchableOpacity>
    );
    // Function to render a row
    const renderRow = (row, index) => (
        <View key={index} style={styles.row}>
            {board[row].map((_, col) => renderCell(row, col))}
        </View>
    );

    // Render the game board
    return (
        <View style={{ backgroundColor: '#FFD4C6', borderRadius: 20 }} >
            <View style={styles.container}>
                {board.map((_, row) => renderRow(row, row))}
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    cellImage: {
        width: 60,
        height: 60,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5, // This is for Android shadow
    },
    container: {
        overflow: 'hidden',
        borderWidth: 4,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FF6529',
        shadowOpacity: 6,
        shadowColor: 'white',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 85,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#51250A',

    },
    cellText: {
        fontSize: 35,
    },
});

// Export the main component
export default TicTacToe;