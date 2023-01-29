import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/configureStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/routes/RefRootNavigation';
import RootNavigator from './src/util/Root';
import SplashScreen from './src/screens/SplashScreen';
import Tabnavigator from './src/util/tabnavigator';

Icon.loadFont();

const App = (_props: any) => {
  LogBox.ignoreLogs(['Warning: ...']);
  // console.disableYellowBox = true;
  const [loading, setLoading] = useState(true);

  const isLoading = (load: boolean) => {
    setLoading(load);
  };
  const [signIn, setSignIn] = useState(false);
  const getSignIn = () => {
    getSingInValue(store.getState());
  };
  const getSingInValue = (storeData: any) => {
    setSignIn(storeData.LoginReducer.isLoggedIn);
  };
  store.subscribe(getSignIn);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {loading ? (
          <SplashScreen isLoading={isLoading} />
        ) : signIn ? (
          <Tabnavigator />
        ) : (
          <RootNavigator />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
