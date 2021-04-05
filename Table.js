import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.38:4001";
let socket = null;

const Table = () => {
  const [ballPostionX, setBallPostionX] = useState(0);
  const [ballPositionY, setBallPositionY] = useState(0);
  const [widthPlayerBar, setWidthPlayerBar] = useState(0);

  useEffect(() => {
    setLengthPlayersBar();
    socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
    const newPosition = convertPositionIn(data);
    if (newPosition.y && newPosition.x){
      setBallPositionY(newPosition.y);
      setBallPostionX(newPosition.x);
    }
    });

  }, []);

  const convertPositionIn = (position) => {
    return {
      y: convertValueIn(400, 735-50, position.y),
      x: convertValueIn(-200, 392-50, position.x)
    }
  }

  const convertValueIn = (serverValue, frontValue, positionValue) => {
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
  }

  const setLengthPlayersBar = () => {
    setWidthPlayerBar(convertValueIn(200, 392, 50))
  }

  return (
    <View style={{ height:'100%' }} onLayout={onLayoutEvent} >
      <View style={{
          right: ballPostionX,
          top: ballPositionY,
          width: 50,
          height: 50,
          backgroundColor: "red" }} />
    </View>
  )
}

export default Table;