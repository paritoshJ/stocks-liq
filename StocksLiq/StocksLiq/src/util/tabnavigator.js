import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  BackHandler,
  Alert,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {themeProvide} from '../util/globalMethods';
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

import HomeScreenStack from '../routes/HomeScreenStack';
import ItemScreenStack from '../routes/ItemsScreenStack';
import InventoryScreenStack from '../routes/InventoryScreenStack';
import ExpenseScreenStack from '../routes/ExpenseScreenStack';
import ReportScreenStack from '../routes/ReportScreenStack';
import DashbordTabSVG from '../assets/svgs/DashbordTabSVG';
import ItemTabSvg from '../assets/svgs/ItemTabSVG';
import ExpenseTabSVG from '../assets/svgs/ExpenseTabSvg';
import ReportTabSVG from '../assets/svgs/ReportTabSvg';
import InventoryTabSVG from '../assets/svgs/InventoryTabSvg';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import {createStackNavigator} from '@react-navigation/stack';
import MoreMenuSvg from '../assets/svgs/MoreMenuSVG';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

var exit = false;
const popText =
  ' You are about to be signed out. Tap “Logout” to end your session now or tap "Cancel" to stay logged in?';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  // const tabBarHeight = useBottomTabBarHeight();
  const [count, setCount] = useState(false);
  Tab.navigationOptions = {
    headerLeft: null,
    backgroundColor: 'white',
  };
  const handleBackPress = () => {
    if (!navigationRef.current.canGoBack()) {
      if (!exit) {
        exit = true;
        Alert.alert(
          '',
          popText,
          [
            {
              text: 'Logout',
              onPress: () => {
                BackHandler.exitApp();
              },
              style: 'destructive',
            },
            {text: 'Cancel'},
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
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
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
    </Stack.Navigator>
  );
}
function AppRouter() {
  return <RootNavigation />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginTop: '3%',
    marginStart: hp('2%'),
  },
});

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer};
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
