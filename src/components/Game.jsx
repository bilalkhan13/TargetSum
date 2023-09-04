import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import RandomNumber from './RandomNumber';

const Game = ({ randomNumberCount }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([])

  const propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };

  const randomNumbers = Array.from({ length: randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

    const isNumberSelected = (numberIndex) => {
      return selectedNumbers.indexOf(numberIndex) >= 0;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
      {randomNumbers.map((number, index) => (
        <RandomNumber key={index} number={number} isSelected={isNumberSelected(index)}/>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#bbb',
    marginHorizontal: 50,
    marginVertical: 15,
    textAlign: 'center',
  },

  randomContainer: {
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
};

export default Game;
