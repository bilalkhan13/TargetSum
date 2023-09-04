import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import RandomNumber from './RandomNumber';

const Game = ({ randomNumberCount }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);

  const target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  const isNumberSelected = (numberIndex) => {
    return selectedNumbers.indexOf(numberIndex) >= 0;
  };

  const selectNumber = (numberIndex) => {
    console.log(numberIndex);
    setSelectedNumbers((prevState) => [...prevState, numberIndex]);
  };

  const gameStatus = () => {
    const sumSelected = selectedNumbers.reduce((acc, curr)=>{
      return acc + randomNumbers[curr]
    }, 0);

    if(sumSelected < target){
      return 'PLAYING'
    }else if(sumSelected === target){
      return 'WON'
    } else {
      return 'LOST'
    }
  }

  useEffect(() => {
    console.log('Selected Numbers Updated:', selectedNumbers);
  }, [selectedNumbers]);

  useEffect(() => {
    const randomNumbers = Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );

    setRandomNumbers(randomNumbers);
  }, [randomNumberCount]);
  const game = gameStatus();

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((number, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={number}
            isDisabled={isNumberSelected(index)}
            onPress={selectNumber}
          />
        ))}
      </View>
      <Text>{game}</Text>
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
