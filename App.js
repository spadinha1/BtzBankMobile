/* import * as React from 'react'; */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera'
import { ActivityIndicator } from 'react-native';
const GLOBAL = require('./config/globals');

export default function App() {


  const [hasPermission, setHasPermission] = useState(null);
  const webViewRef = useRef(null);
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="#f29900" />
    </View>
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    const backAction = () => {
      webViewRef.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://app.btzbank.com.br/GIF/home/0/' }}
        ref={webViewRef}
        style={{ marginTop: GLOBAL.STATUS_BAR  }}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabledAndroid
        useWebkit
        startInLoadingState={true}
        renderLoading={Spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1c4154',
    paddingTop:20
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  view: {
    borderColor: 'red',
    marginTop: GLOBAL.STATUS_BAR
  }
});