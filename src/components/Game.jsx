import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

const Game = ({ randomNumberCount, onPlayAgain }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(10);
  const [shuffledNumbers, setShuffledNumbers] = useState([]);

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
    const sumSelected = selectedNumbers.reduce((acc, curr) => {
      return acc + shuffledNumbers[curr];
    }, 0);
    if (remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < target) {
      return 'PLAYING';
    } else if (sumSelected === target) {
      return 'WON';
    } else {
      return 'LOST';
    }
  };

  const gameState = gameStatus();
  useEffect(() => {
    setShuffledNumbers(shuffle(randomNumbers));
  }, [randomNumbers]);
  useEffect(() => {
    // Create the interval when the component mounts
    const interval = setInterval(() => {
      setRemainingSeconds((prevRemainingSeconds) => {
        if (
          prevRemainingSeconds === 0 ||
          gameState === 'WON' ||
          gameState === 'LOST'
        ) {
          clearInterval(interval);
          return prevRemainingSeconds;
        }
        return prevRemainingSeconds - 1;
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  useEffect(() => {
    console.log('Selected Numbers Updated:', selectedNumbers);
  }, [selectedNumbers]);

  useEffect(() => {
    const randomNumbers = Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );

    setRandomNumbers(randomNumbers);
  }, [randomNumberCount]);

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameState}`]]}>
        {target}
      </Text>
      <View style={styles.randomContainer}>
        {shuffledNumbers.map((number, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={number}
            isDisabled={isNumberSelected(index) || gameState !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      <View styles={styles.wrapper}>
        <Text style={styles.timer}>Timer: {remainingSeconds}</Text>

        {gameState !== 'PLAYING' && (
          <Pressable onPress={onPlayAgain}>
            <Text style={styles.button}>Play Again</Text>
          </Pressable>
        )}
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

  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Center content horizontally
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#bbb',
    textAlign: 'center',
    width: 100,
    fontSize: 35,
    marginHorizontal: 'auto',
  },

  timer: {
    width: 100,
    fontSize: 35,
    textAlign: 'center',
    marginHorizontal: 'auto',
    marginTop: 15,
  },
});

const propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
};

export default Game;
