// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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

    // Check diagonals
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

// Function to find the best move for the computer player (simple AI)
const findBestMove = (board) => {
    // Check for an empty cell and return its position
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === '') {
                return { row: i, col: j };
            }
        }
    }

    // No empty cells (should not reach here)
    return null;
};

// Main functional component
const TicTacToe2 = () => {
    const initialBoard = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
    ];

    // State to keep track of the current player, the game board, and whether the computer has made a move
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
            Alert.alert('Game Over', winner === 'Tie' ? 'It\'s a Tie!' : `Player ${winner} wins!`);
            setBoard(initialBoard);
        } else {
            // Switch to the next player
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

            // If the next player is 'O' (computer), make a move after a short delay
            if (currentPlayer === 'X') {
                setTimeout(() => makeComputerMove(), 500);
            }
        }
    };

    // Function to make a move for the computer player
    const makeComputerMove = () => {
        const { row, col } = findBestMove(board);
        handleCellPress(row, col);
    };

    // Function to render a cell
    const renderCell = (row, col) => (
        <TouchableOpacity
            key={col}
            style={styles.cell}
            onPress={() => handleCellPress(row, col)}
        >
            <Text style={styles.cellText}>{board[row][col]}</Text>
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
        <View style={styles.container}>
            {board.map((_, row) => renderRow(row, row))}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
    cellText: {
        fontSize: 24,
    },
});

// Export the main component
export default TicTacToe2;
