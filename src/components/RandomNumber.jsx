import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const RandomNumber = ({ id, number, isDisabled, onPress }) => {
  const handlePress = () => {
    console.log(id,'ss');
    if (!isDisabled) {
      onPress(id);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.disabled]}>
        {number}
      </Text>
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
  disabled: {
    opacity: 0.3,
  },
});

const propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default React.memo(RandomNumber);
