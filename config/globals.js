import {Dimensions, StatusBar} from 'react-native'; 

module.exports = {
    DEVICE_HEIGHT: Dimensions.get('screen').height,
    STATUS_BAR: StatusBar.currentHeight || 24,
    WINDOW_HEIGHT: Dimensions.get('window').height
  };