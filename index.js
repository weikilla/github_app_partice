/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import WelcomePage from './js/page/WelcomePage'
import {name as appName} from './app.json';
import AppNavigator from './js/navigator/AppNavigator';
import {createAppContainer} from 'react-navigation'

const AppContainer = createAppContainer(AppNavigator)
AppRegistry.registerComponent(appName, () => AppContainer);
