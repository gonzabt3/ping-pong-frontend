import React, { useState, useEffect } from 'react';
import Draggable from 'react-native-draggable';
import { Dimensions } from 'react-native';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.40:4001";

import {
  StyleSheet,
  View,
  Text,
  Button,

} from 'react-native';

const App: () => React$Node = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [ballPostionX, setBallPostionX] = useState(0);
  const [ballPositionY, setBallPositionY] = useState(0);
  const [response, setResponse] = useState("asd");
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      const newPosition = convertPosition(data);
      setBallPositionY(newPosition.y);
      setBallPostionX(newPosition.x);
      console.log("XXX", ballPostionX)
      console.log("YYY", ballPositionY)
    });

  }, []);

  const convertPosition = (position) => {
    return {
      y: convertionValue(400, 735-50, position.y),
      x: convertionValue(-200, 392-50, position.x)
    }
  }

  const convertionValue = (serverValue, frontValue, positionValue) => {
    return (frontValue*positionValue)/serverValue
  }

  const onLayoutEvent = (event) =>  {
    var obj = {
      x:null,
      y:null,
      width:null,
      height:null
    };
    obj = event.nativeEvent.layout;
    setWindowWidth(obj.width);
    setWindowHeight(obj.height)
  }

  const onDragHandler = (event, gestureState) => {
    console.log(gestureState.moveX)
    // console.log(event.locationY)

  }

  return (
    <>
      <View style={{ height:'100%' }} onLayout={onLayoutEvent} >
        <Draggable 
          x={200} 
          y={670}
          minY={670}
          maxY={670}
          renderColor='red'
          onDrag={onDragHandler}
        />
        <View style={{
            right: ballPostionX,
            top: ballPositionY,
            width: 50,
            height: 50,
            backgroundColor: "red" }} />
        <View style={{
            right: -200,
            top: 600,
            width: 110,
            height: 25,
            backgroundColor: "red" }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  body: {
    backgroundColor: 'red',
  },

  square: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    top: 10,
    right:0
  },

});

export default App;
