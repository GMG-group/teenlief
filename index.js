/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreLogs(['useNativeDriver']);

AppRegistry.registerComponent(appName, () => App);
