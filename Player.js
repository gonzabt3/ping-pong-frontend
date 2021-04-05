import React, { useState, useEffect } from 'react';
import Draggable from 'react-native-draggable';
import { View } from 'react-native';

const Player = () => {

  const onDragHandler = (event, gestureState) => {
    console.log(gestureState.moveX)
    const position = convertValueOut(200, 392,gestureState.moveX)
    //socket.emit('playerPosition', position);
  }

  const convertValueOut = (serverValue, frontValue, positionValue) => {
    return (serverValue*positionValue)/frontValue
  }

  return(
    <Draggable 
      x={200} 
      y={670}
      width={200}
      minY={670}
      maxY={670}
      renderColor='red'
      onDrag={onDragHandler}
    >
      <View style={{
        width: 50,
        //width: widthPlayerBar,
        height: 30,
        backgroundColor: "green" }} />
    </Draggable>
  )
}

export default Player;