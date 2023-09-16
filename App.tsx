import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const buttonPress = (text: string) => {
    if (text === '=') {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (text === 'C') {
      setInput('');
      setResult('');
    } else if (text === '←') {
      setInput(input.slice(0, -1));
    } else if (text === 'AC') {
      setInput('');
      setResult('');
    } else {
      setInput(input + text);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+'],
    ['←', 'AC'], // Backspace and Clear buttons
  ];

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          editable={false}
          value={input}
        />
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonText, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.button,
                  buttonText === '=' ? styles.buttonEquals : null,
                  buttonText === 'AC' ? styles.buttonClear : null,
                ]}
                onPress={() => buttonPress(buttonText)}>

                <Text
                  style={[
                    styles.buttonText,
                    buttonText === 'AC' ? styles.buttonClearText : null,
                  ]}>
                  {buttonText}
                </Text>
                
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  result: {
    flex: 1,
    backgroundColor: '#17171C',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  resultText: {
    fontSize: 40,
    color: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  inputText: {
    fontSize: 40,
    color: 'white',
  },
  buttons: {
    flex: 4,
    backgroundColor: '#444',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  buttonText: {
    fontSize: 40,
    color: 'black',
  },
  buttonEquals: {
    backgroundColor: '#FF9800', // Change background color for the equals button
  },
  buttonClear: {
    backgroundColor: '#FF0000', // Change background color for the clear button
  },
  buttonClearText: {
    color: 'white', // Change text color for the clear button
  },
});
