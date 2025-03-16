import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Sketch = forwardRef((props, ref) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prevPath) => `${prevPath} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath('');
    },
  });

  useImperativeHandle(ref, () => ({
    clear: () => {
      setPaths([]);
    },
  }));

  return (
    <View {...panResponder.panHandlers} style={props.style}>
      <Svg style={{ flex: 1 }}>
        {paths.map((path, index) => (
          <Path key={index} d={path} stroke="black" strokeWidth="10" fill="none" />
        ))}
        <Path d={currentPath} stroke="black" strokeWidth="10" fill="none" />
      </Svg>
    </View>
  );
});

export default Sketch;