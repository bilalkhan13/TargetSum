import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RandomNumber = ({ number, isSelected }) => {
  const handlePress = () => {
    console.log(number);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isSelected && styles.selected]}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
    maxHeight: 50,
  },
  selected: {
    opacity: 0.3,
  }
});

const propTypes = {
  number: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default RandomNumber;
