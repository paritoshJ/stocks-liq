import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {isShowOwner, themeProvide} from '../util/globalMethods';
import DeviceInfo from 'react-native-device-info';
import {
  TabIcon,
  TabText,
  TabView,
  TabIconContainer,
  LabelCircleView,
  Tabcicrle,
} from './style';
import I18n from '../localization/index';
import {connect} from 'react-redux';
import {navigationRef} from './RefRootNavigation';
import {fonts} from '../../assets/fonts/fonts';

import ProfileScreen from '../screens/Profile/index';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import SalesmanScreen from '../screens/Salesman/index';
import AddSalesmanScreen from '../screens/Salesman/AddSalesman/index';
import WalletScreen from '../screens/Wallet/index';
import RedeemRequestScreen from '../screens/Wallet/RedeemRequest/index';
import ReferFriendScreen from '../screens/ReferFriend/index';
import AddBhejanScreen from '../screens/SalesmanRoute/Bhejan/AddBhejan/index';
import BhejanScreen from '../screens/SalesmanRoute/Bhejan/index';

import HomeScreenStack from '../routes/HomeScreenStack';
import ItemScreenStack from '../routes/ItemsScreenStack';
import InventoryScreenStack from '../routes/InventoryScreenStack';
import ExpenseScreenStack from '../routes/ExpenseScreenStack';
import ReportScreenStack from '../routes/ReportScreenStack';
import CommissionScreenStack from '../routes/CommissionScreenStack';
import SalesScreenStack from '../routes/SalesScreenStack';
import DashbordTabSVG from '../assets/svgs/DashbordTabSVG';
import ItemTabSvg from '../assets/svgs/ItemTabSVG';
import ExpenseTabSVG from '../assets/svgs/ExpenseTabSvg';
import ReportTabSVG from '../assets/svgs/ReportTabSvg';
import InventoryTabSVG from '../assets/svgs/InventoryTabSvg';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import {createStackNavigator} from '@react-navigation/stack';
import SalesTabSvg from '../assets/svgs/SalesTabSvg';

var exit = false;
const popText = 'Do you want to exit app ?';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TabNavigator(props) {
  // const tabBarHeight = useBottomTabBarHeight();
  const [count, setCount] = useState(false);
  Tab.navigationOptions = {
    headerLeft: null,
    backgroundColor: 'white',
  };
  const handleBackPress = () => {
    if (!props.navigation.canGoBack()) {
      if (!exit) {
        exit = true;
        Alert.alert(
          '',
          popText,
          [
            {
              text: 'YES',
              onPress: () => {
                BackHandler.exitApp();
              },
              style: 'destructive',
            },
            {text: 'NO'},
          ],
          {cancelable: false},
        );
        //ToastAndroid.show('Tap again to exit ', 1000);
        setTimeout(() => {
          exit = false;
        }, 2000);
        return true;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      console.log('MOVE OUT BACK PRESS :');
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      tabBarOptions={{
        showLabel: true,
        tabBarHideOnKeyboard: true,
        style: {
          elevation: 2,
          backgroundColor: themeProvide().primary,
          alignContent: 'center',
          height: DeviceInfo.hasNotch() ? 84 : 72,
          borderTopLeftRadius: 24,
          borderTopEndRadius: 24,
          boxShadow: '0px -5px 30px rgba(45, 49, 66, 0.1)',
        },
        activeTintColor: themeProvide().activeIconColor,
        inactiveTintColor: themeProvide().unActiveIconColor,
        labelStyle: {
          alignSelf: 'center',
          fontFamily: fonts.openSansRegular,
          textAlign: 'center',
          fontSize: 11,
        },
        // iconStyle:{},
        tabStyle: {height: 72, padding: 10, alignItems: 'center'},
      }}>
      <Tab.Screen
        name="DashboardScreen"
        component={HomeScreenStack}
        options={({route, navigation}) => ({
          tabBarIcon: ({focused}) => (
            <DashbordTabSVG
              color={
                focused
                  ? themeProvide().activeIconColor
                  : themeProvide().unActiveIconColor
              }
            />
          ),
          tabBarLabel: I18n.t('dashboardTabName'),
        })}
      />
      {isShowOwner() && (
        <Tab.Screen
          name="ItemsScreen"
          component={ItemScreenStack}
          options={{
            tabBarIcon: ({focused}) => (
              <ItemTabSvg
                color={
                  focused
                    ? themeProvide().activeIconColor
                    : themeProvide().unActiveIconColor
                }
              />
            ),
            tabBarLabel: I18n.t('itemsTabName'),
          }}
        />
      )}
      <Tab.Screen
        name="InventoryScreen"
        component={InventoryScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <InventoryTabSVG
              color={
                focused
                  ? themeProvide().activeIconColor
                  : themeProvide().unActiveIconColor
              }
            />
          ),
          tabBarLabel: I18n.t('inventoryTabName'),
        }}
      />
      {!isShowOwner() && (
        <Tab.Screen
          name="SalesScreen"
          component={SalesScreenStack}
          options={{
            tabBarIcon: ({focused}) => (
              <SalesTabSvg
                color={
                  focused
                    ? themeProvide().activeIconColor
                    : themeProvide().unActiveIconColor
                }
              />
            ),
            tabBarLabel: I18n.t('salesTabName'),
          }}
        />
      )}
      <Tab.Screen
        name="ExpenseScreen"
        component={ExpenseScreenStack}
        options={{
          tabBarIcon: ({focused}) => (
            <ExpenseTabSVG
              color={
                focused
                  ? themeProvide().activeIconColor
                  : themeProvide().unActiveIconColor
              }
            />
          ),
          tabBarLabel: I18n.t('expenseTabName'),
        }}
      />
      {isShowOwner() ? (
        <Tab.Screen
          name="ReportScreen"
          component={ReportScreenStack}
          options={{
            tabBarIcon: ({focused}) => (
              <ReportTabSVG
                color={
                  focused
                    ? themeProvide().activeIconColor
                    : themeProvide().unActiveIconColor
                }
              />
            ),
            tabBarLabel: I18n.t('reportTabName'),
          }}
        />
      ) : (
        <Tab.Screen
          name="CommissionScreen"
          component={CommissionScreenStack}
          options={{
            tabBarIcon: ({focused}) => (
              <ReportTabSVG
                color={
                  focused
                    ? themeProvide().activeIconColor
                    : themeProvide().unActiveIconColor
                }
              />
            ),
            tabBarLabel: I18n.t('commissionTabName'),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const dimensions = Dimensions.get('screen');
  return (
    <Drawer.Navigator
      screenOptions={{
        // drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeProvide().primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name={'DrawerNavigator'}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'EditProfileScreen'}
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SalesmanScreen'}
        component={SalesmanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'AddSalesmanScreen'}
        component={AddSalesmanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'WalletScreen'}
        component={WalletScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'RedeemRequestScreen'}
        component={RedeemRequestScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ReferFriendScreen'}
        component={ReferFriendScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'BhejanScreen'}
        component={BhejanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'AddBhejanScreen'}
        component={AddBhejanScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function AppRouter() {
  return <RootNavigation />;
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // backButton: {
  //   marginTop: '3%',
  //   marginStart: hp('2%'),
  // },
});

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer};
};
// const mapDispatchToProps = {};

export default connect(mapStateToProps, {})(AppRouter);
